import {Program, web3} from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import {ComputeBudgetProgram, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction} from "@solana/web3.js";
import fs from "fs";
import path from "path";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

import {
  GlobalPool,
  GLOBAL_AUTHORITY_SEED,
  MARKETPLACE_PROGRAM_ID,
  OfferData,
  OFFER_DATA_SEED,
  SellData,
  SELL_DATA_SEED,
  UserData,
  USER_DATA_SEED,
} from "./lib/types";
import {
  createAcceptOfferTx,
  createCancelOfferTx,
  createDelistNftTx,
  createInitOfferDataTx,
  createInitSellDataTx,
  createInitUserTx,
  createListForSellNftTx,
  createMakeOfferTx,
  createPurchaseTx,
  createUpdateNftPriceTx,
  createWithdrawTx,
  getAllAddedCollections,
  getAllListedNFTs,
  getAllOffersForListedNFT,
  getGlobalState,
  getNFTPoolState,
  getOfferDataState,
  getUserPoolState,
} from "./lib/scripts";
import {isInitializedUser} from "./lib/utils";
import {AnchorWallet} from "@solana/wallet-adapter-react";

import {DramskyMarketplace} from "./lib/dramsky_marketplace";
import {PROGRAM_ID, SOLANA_DECIMAL, USDC_TOKEN_DECIMAL} from "../config";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {NFTCard, NFTCardType} from "../components/DataTypes";
import axios from "axios";
import {DeListPayload} from "../apis/items-api";
import {OfferType} from "../apis/offer-api";

const devnetEndpoint = process.env.NEXT_PUBLIC_NFT_ENDPOINT as string;
let solConnection = new web3.Connection(devnetEndpoint);

export const initSellData = async (payer: AnchorWallet, mint: PublicKey) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const tx = await createInitSellDataTx(mint, payer.publicKey, program);
  const {blockhash} = await solConnection.getRecentBlockhash("finalized");
  tx.feePayer = payer.publicKey;
  tx.recentBlockhash = blockhash;
  payer.signTransaction(tx);
  let stx = (await payer.signTransaction(tx)).serialize();

  const options = {
    commitment: "confirmed",
    skipPreflight: false,
  };

  const txId = await solConnection.sendRawTransaction(stx, options);
  await solConnection.confirmTransaction(txId, "finalized");
  console.log("Your transaction signature", txId);
};

export const initUserPool = async (payer: AnchorWallet) => {
  try {
    let cloneWindow: any = window;
    let provider = new anchor.AnchorProvider(
      solConnection,
      cloneWindow["solana"],
      anchor.AnchorProvider.defaultOptions()
    );
    const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
    const tx = await createInitUserTx(payer.publicKey, program);
    const blockhash = (await solConnection.getLatestBlockhash()).blockhash;

    if (!tx) return;
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    let stx = (await payer.signTransaction(tx)).serialize();

    const options = {
      commitment: "confirmed",
      skipPreflight: false,
    };

    const txId = await solConnection.sendRawTransaction(stx, options);
    await solConnection.confirmTransaction(txId, "finalized");
    console.log("Your transaction signature", txId);
  } catch (e) {
    console.log(e);
  }
};

export const listNftToWalletForSale = async (payer: AnchorWallet, items: NFTCardType[]) => {
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const txs = [];

  for (let i = 0; i < items.length; i++) {
    const listTx = await createListForSellNftTx(
      new PublicKey(items[i].mintAddr),
      payer.publicKey,
      program,
      solConnection,
      items[i].solPrice * SOLANA_DECIMAL,
      items[i].tokenPrice * USDC_TOKEN_DECIMAL
    );
    if (!listTx) return;
    listTx.feePayer = payer.publicKey;
    txs.push(listTx);
  }
  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  const listData = [];

  for (let i = 0; i < items.length; i++) {
    txs[i].recentBlockhash = blockhash;

    listData.push({
      tokenId: items[i].tokenId,
      imgUrl: items[i].imgUrl,
      mintAddr: items[i].mintAddr,
      seller: payer?.publicKey.toBase58(),
      buyer: "",
      collectionAddr: items[i].collectionAddr,
      metaDataUrl: items[i].metaDataUrl,
      solPrice: items[i].solPrice,
      tokenPrice: items[i].tokenPrice,
      txType: 0,
    });
  }

  let signedTxs = await payer.signAllTransactions(txs);
  let serializedTxs = signedTxs.map((tx) => tx.serialize());

  return {listData, transactions: serializedTxs};
};

export const updatePrice = async (payer: AnchorWallet, items: NFTCardType) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );

  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const mintAddr = items.mintAddr;
  if (!(await isInitializedUser(payer.publicKey, solConnection))) {
    console.log("User PDA is not Initialized. Should Init User PDA for first usage");
    return;
  }

  const updateTx = await createUpdateNftPriceTx(
    new PublicKey(mintAddr),
    payer.publicKey,
    program,
    solConnection,
    items.solPrice * SOLANA_DECIMAL,
    items.tokenPrice * USDC_TOKEN_DECIMAL
  );

  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  updateTx.feePayer = payer.publicKey;
  updateTx.recentBlockhash = blockhash;
  let transaction = (await payer.signTransaction(updateTx)).serialize();

  // Save delisted NFT data to database
  const updateData = {
    tokenId: items.tokenId,
    imgUrl: items.imgUrl,
    mintAddr: items.mintAddr,
    seller: payer?.publicKey.toBase58(),
    buyer: "",
    collectionAddr: items.collectionAddr,
    metaDataUrl: items.metaDataUrl,
    solPrice: items.solPrice,
    tokenPrice: items.tokenPrice,
    txType: 0,
  };

  return {
    updateData,
    mintAddr,
    transaction,
  };
};

export const delistNft = async (payer: AnchorWallet, items: NFTCardType[]) => {
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);

  const mintAddrArray: PublicKey[] = items.map((item) => new PublicKey(item.mintAddr));
  const txs = [];

  for (let i = 0; i < items.length; i++) {
    const tx = await createDelistNftTx(mintAddrArray[i], payer.publicKey, program, solConnection);
    if (!tx) return null;
    tx.feePayer = payer.publicKey;
    txs.push(tx);
  }
  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  const delistData = [];

  for (let i = 0; i < items.length; i++) {
    txs[i].recentBlockhash = blockhash;

    delistData.push({
      tokenId: items[i].tokenId,
      imgUrl: items[i].imgUrl,
      mintAddr: items[i].mintAddr,
      seller: payer?.publicKey.toBase58(),
      buyer: "",
      collectionAddr: items[i].collectionAddr,
      metaDataUrl: items[i].metaDataUrl,
      solPrice: items[i].solPrice,
      tokenPrice: items[i].tokenPrice,
      txType: 1,
    });
  }

  let signedTxs = await payer.signAllTransactions(txs);
  let serializedTxs = signedTxs.map((tx) => tx.serialize());

  return {
    delistData,
    mintAddrArray,
    transactions: serializedTxs,
  };
};

export const purchase = async (payer: AnchorWallet, items: any[]) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const globalPool: GlobalPool = (await getGlobalState(program)) as GlobalPool;
  const mintAddrArray: PublicKey[] = items.map((item) => new PublicKey(item.mintAddr));
  const txs = [];

  for (let i = 0; i < items.length; i++) {
    const tx = await createPurchaseTx(
      new PublicKey(items[i].mintAddr),
      payer.publicKey,
      items[i].solPrice === 0 ? false : true,
      globalPool.teamTreasury.slice(0, globalPool.teamCount.toNumber()),
      program,
      solConnection
    );
    if (!tx) return null;
    tx.feePayer = payer.publicKey;
    txs.push(tx);
  }
  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  const purchaseData = [];

  for (let i = 0; i < items.length; i++) {
    txs[i].recentBlockhash = blockhash;

    purchaseData.push({
      tokenId: items[i].tokenId,
      imgUrl: items[i].imgUrl,
      mintAddr: items[i].mintAddr,
      seller: items[i].seller,
      buyer: payer?.publicKey.toBase58(),
      collectionAddr: items[i].collectionAddr,
      metaDataUrl: items[i].metaDataUrl,
      solPrice: items[i].solPrice,
      tokenPrice: items[i].tokenPrice,
      txType: 4,
    });
  }

  let signedTxs = await payer.signAllTransactions(txs);
  let serializedTxs = signedTxs.map((tx) => tx.serialize());

  return {
    purchaseData,
    mintAddrArray,
    transaction: serializedTxs,
  };
};

export const initOfferData = async (payer: AnchorWallet, mint: PublicKey) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const tx = await createInitOfferDataTx(mint, payer.publicKey, program);
  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  tx.feePayer = payer.publicKey;
  tx.recentBlockhash = blockhash;
  let stx = (await payer.signTransaction(tx)).serialize();

  const options = {
    commitment: "confirmed",
    skipPreflight: false,
  };

  const txId = await solConnection.sendRawTransaction(stx, options);
  await solConnection.confirmTransaction(txId, "finalized");
  console.log("Your transaction signature", txId);
};

export const makeOffer = async (
  payer: AnchorWallet,
  items: any,
  offerExpireTimeStamp: number,
  offerSolPrice: number,
  offerTokenPrice: number
) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const mintAddr = items.mintAddr;

  const [offerData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), new PublicKey(mintAddr).toBuffer(), payer.publicKey.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let poolAccount = await solConnection.getAccountInfo(offerData);
  if (poolAccount === null || poolAccount.data === null) {
    await initOfferData(payer, new PublicKey(mintAddr));
  }

  try {
    const tx = await createMakeOfferTx(
      new PublicKey(mintAddr),
      payer.publicKey,
      offerSolPrice !== 0 ? offerSolPrice * SOLANA_DECIMAL : offerTokenPrice * USDC_TOKEN_DECIMAL,
      offerSolPrice === 0 ? true : false,
      program,
      solConnection
    );
    const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    let transaction = (await payer.signTransaction(tx)).serialize();

    // Save delisted NFT data to database
    const offerData = {
      imgUrl: items.imgUrl,
      tokenId: items.tokenId,
      mintAddr: items.mintAddr,
      seller: items.seller,
      buyer: payer?.publicKey.toBase58(),
      collectionAddr: items.collectionAddr,
      offerSolPrice: offerSolPrice,
      offerTokenPrice: offerTokenPrice,
      solPrice: items.solPrice,
      tokenPrice: items.tokenPrice,
      listedNftId: items.id,
      expiresAt: offerExpireTimeStamp,
      txType: 2,
    };

    return {offerData, transaction};
  } catch (e) {
    throw e;
  }
};

export const cancelOffer = async (payer: AnchorWallet, items: any) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const mintAddr = items.mintAddr;

  if (!(await isInitializedUser(payer.publicKey, solConnection))) {
    console.log("User PDA is not Initialized. Should Init User PDA for first usage");
    return;
  }

  const tx = await createCancelOfferTx(new PublicKey(mintAddr), payer.publicKey, program);
  const withdrawTx = await createWithdrawTx(
    payer.publicKey,
    items.offerPrice * LAMPORTS_PER_SOL,
    0,
    program,
    solConnection
  );
  withdrawTx.instructions.forEach((ix) => {
    tx.add(ix);
  });

  const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
  tx.feePayer = payer.publicKey;
  tx.recentBlockhash = blockhash;
  let transaction = (await payer.signTransaction(tx)).serialize();

  // Save cancel Offer data to database
  const offerData = {
    imgUrl: items.imgUrl,
    tokenId: items.tokenId,
    mintAddr: items.mintAddr,
    seller: "",
    buyer: payer?.publicKey.toBase58(),
    // collectionAddr: items.collectionAddr,
    solPrice: items.solPrice,
    tokenPrice: items.tokenPrice,
    txType: 3,
  };

  return {offerData, mintAddr, transaction};
};

export const acceptOffer = async (payer: AnchorWallet, items: OfferType) => {
  console.log("itemsdddddddddddds", items);
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const mintAddr = items.mintAddr;

  if (!(await isInitializedUser(payer.publicKey, solConnection))) {
    console.log("User PDA is not Initialized. Should Init User PDA for first usage");
    return;
  }

  const globalPool: GlobalPool = (await getGlobalState(program)) as GlobalPool;

  try {
    const tx = await createAcceptOfferTx(
      new PublicKey(mintAddr),
      new PublicKey(items.buyer),
      globalPool.teamTreasury.slice(0, globalPool.teamCount.toNumber()),
      program,
      solConnection
    );
    if (!tx) return;
    const blockhash = (await solConnection.getLatestBlockhash()).blockhash;
    tx.feePayer = payer.publicKey;
    tx.recentBlockhash = blockhash;
    let transaction = (await payer.signTransaction(tx)).serialize();

    // Save cancel Offer data to database
    const offerData = {
      imgUrl: items.imgUrl,
      tokenId: items.tokenId,
      mintAddr: items.mintAddr,
      seller: items.seller,
      buyer: items.buyer,
      solPrice: items.byToken ? 0 : items.offerPrice,
      tokenPrice: items.byToken ? items.offerPrice : 0,
      txType: 4,
    };

    return {offerData, mintAddr, transaction};
  } catch (e) {
    console.log(e);
  }
};

export const getNFTPoolInfo = async (mint: PublicKey) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const nftData: SellData = (await getNFTPoolState(mint, program)) as SellData;
  return {
    mint: nftData.mint.toBase58(),
    seller: nftData.seller.toBase58(),
    collection: nftData.collection.toBase58(),
    priceSol: nftData.priceSol.toNumber(),
    priceToken: nftData.priceToken.toNumber(),
    listedDate: nftData.listedDate.toNumber(),
    active: nftData.active.toNumber(),
  };
};

export const getOfferDataInfo = async (mint: PublicKey, userAddress: PublicKey) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const offerData: OfferData = (await getOfferDataState(mint, userAddress, program)) as OfferData;
  return {
    mint: offerData.mint.toBase58(),
    buyer: offerData.buyer.toBase58(),
    offerPrice: offerData.offerPrice.toNumber(),
    offerListingDate: offerData.offerListingDate.toNumber(),
    byToken: offerData.byToken.toNumber(),
    active: offerData.active.toNumber(),
  };
};

export const getUserPoolInfo = async (userAddress: PublicKey) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const userData: UserData = (await getUserPoolState(userAddress, program)) as UserData;
  return {
    address: userData.address.toBase58(),
    escrowSol: userData.escrowSolBalance.toNumber(),
    escrowTokenBalance: userData.escrowTokenBalance.toNumber(),
    tradedVolume: userData.tradedVolume.toNumber(),
    tradedTokenVolume: userData.tradedTokenVolume.toNumber(),
  };
};

export const getGlobalInfo = async () => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  const globalPool: GlobalPool = (await getGlobalState(program)) as GlobalPool;
  const result = {
    superAdmin: globalPool.superAdmin.toBase58(),
    admins: globalPool.admins.slice(0, globalPool.adminsCount.toNumber()).map((info) => info.toBase58()),
    admins_count: globalPool.adminsCount.toNumber(),
    collection_count: globalPool.collectionCount.toNumber(),
    teamCount: globalPool.teamCount.toNumber(),
    teamTreasury: globalPool.teamTreasury.slice(0, globalPool.teamCount.toNumber()).map((info) => info.toBase58()),
    treasuryRate: globalPool.treasuryRate.slice(0, globalPool.teamCount.toNumber()).map((info) => info.toNumber()),
  };

  return result;
};

export const getAllCollections = async (rpc?: string) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  return await getAllAddedCollections(solConnection, rpc);
};

export const getAllNFTs = async (rpc?: string) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  return await getAllListedNFTs(solConnection, rpc);
};

export const getAllOffersForNFT = async (address: string, rpc?: string) => {
  let cloneWindow: any = window;
  let provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(DramskyMarketplace as anchor.Idl, PROGRAM_ID, provider);
  return await getAllOffersForListedNFT(address, solConnection, rpc);
};
