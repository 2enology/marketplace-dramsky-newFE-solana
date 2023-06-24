import * as anchor from "@project-serum/anchor";
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";
import {TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {PublicKey, Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction} from "@solana/web3.js";
import {
  MARKETPLACE_PROGRAM_ID,
  GLOBAL_AUTHORITY_SEED,
  GlobalPool,
  SellData,
  SELL_DATA_SEED,
  SELL_DATA_SIZE,
  USDT_TOKEN_MINT,
  ESCROW_VAULT_SEED,
  USER_DATA_SEED,
  UserData,
  OFFER_DATA_SEED,
  OfferData,
  OFFER_DATA_SIZE,
  COLLECTION_INFO_SEED,
  COLLECTION_INFO_SIZE,
  CollectionInfo,
} from "./types";
import {
  getAssociatedTokenAccount,
  getATokenAccountsNeedCreate,
  getNFTTokenAccount,
  getOwnerOfNFT,
  getMetadata,
  isExistAccount,
  getTokenAccount,
  METAPLEX,
  isInitializedUser,
} from "./utils";

/** Get all registered collections */
export const getAllAddedCollections = async (connection: Connection, rpcUrl: string | undefined) => {
  let solConnection = connection;

  if (rpcUrl) {
    solConnection = new anchor.web3.Connection(rpcUrl, "confirmed");
  }

  let poolAccounts = await solConnection.getProgramAccounts(MARKETPLACE_PROGRAM_ID, {
    filters: [
      {
        dataSize: COLLECTION_INFO_SIZE,
      },
    ],
  });

  let result: CollectionInfo[] = [];

  try {
    for (let idx = 0; idx < poolAccounts.length; idx++) {
      let data = poolAccounts[idx].account.data;
      const address = new PublicKey(data.slice(8, 40));
      const fee = new anchor.BN(data.slice(40, 48).reverse());
      const active = data[48];

      if (active == 1)
        result.push({
          address,
          fee,
          active,
        });
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return {
    count: result.length,
    data: result.map((info: CollectionInfo) => {
      return {
        address: info.address.toBase58(),
        fee: info.fee.toNumber(),
        active: info.active,
      };
    }),
  };
};

/** Get all registered NFTs info for max stake amount calculation */
export const getAllListedNFTs = async (connection: Connection, rpcUrl: string | undefined) => {
  let solConnection = connection;

  if (rpcUrl) {
    solConnection = new anchor.web3.Connection(rpcUrl, "confirmed");
  }

  let poolAccounts = await solConnection.getProgramAccounts(MARKETPLACE_PROGRAM_ID, {
    filters: [
      {
        dataSize: SELL_DATA_SIZE,
      },
    ],
  });

  console.log(`Encounter ${poolAccounts.length} NFT Data Accounts`);

  let result: SellData[] = [];

  try {
    for (let idx = 0; idx < poolAccounts.length; idx++) {
      let data = poolAccounts[idx].account.data;
      const mint = new PublicKey(data.slice(8, 40));
      let seller = new PublicKey(data.slice(40, 72));
      let collection = new PublicKey(data.slice(72, 104));

      let buf = data.slice(104, 112).reverse();
      let priceSol = new anchor.BN(buf);
      buf = data.slice(112, 120).reverse();
      let priceToken = new anchor.BN(buf);

      buf = data.slice(120, 128).reverse();
      let listedDate = new anchor.BN(buf);
      buf = data.slice(128, 136).reverse();
      let active = new anchor.BN(buf);

      if (active.toNumber() == 1)
        result.push({
          mint,
          seller,
          collection,
          priceSol,
          priceToken,
          listedDate,
          active,
        });
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return {
    count: result.length,
    data: result.map((info: SellData) => {
      return {
        mint: info.mint.toBase58(),
        seller: info.seller.toBase58(),
        collection: info.collection.toBase58(),
        priceSol: info.priceSol.toNumber(),
        priceToken: info.priceToken.toNumber(),
        listedDate: info.listedDate.toNumber(),
        active: info.active.toNumber(),
      };
    }),
  };
};

/** Get all registered NFTs info for max stake amount calculation */
export const getAllOffersForListedNFT = async (mint: string, connection: Connection, rpcUrl: string | undefined) => {
  let solConnection = connection;

  if (rpcUrl) {
    solConnection = new anchor.web3.Connection(rpcUrl, "confirmed");
  }

  let poolAccounts = await solConnection.getProgramAccounts(MARKETPLACE_PROGRAM_ID, {
    filters: [
      {
        dataSize: OFFER_DATA_SIZE,
      },
      {
        memcmp: {
          offset: 8,
          bytes: mint,
        },
      },
    ],
  });

  console.log(`Encounter ${poolAccounts.length} Offer Data Accounts for ${mint} NFT`);

  let result: OfferData[] = [];

  try {
    for (let idx = 0; idx < poolAccounts.length; idx++) {
      let data = poolAccounts[idx].account.data;
      const mint = new PublicKey(data.slice(8, 40));
      let buyer = new PublicKey(data.slice(40, 72));

      let buf = data.slice(72, 80).reverse();
      let offerPrice = new anchor.BN(buf);
      buf = data.slice(80, 88).reverse();
      let offerListingDate = new anchor.BN(buf);
      buf = data.slice(88, 96).reverse();
      let byToken = new anchor.BN(buf);
      buf = data.slice(96, 104).reverse();
      let active = new anchor.BN(buf);

      if (active.toNumber() == 1)
        result.push({
          mint,
          buyer,
          offerPrice,
          byToken,
          offerListingDate,
          active,
        });
    }
  } catch (e) {
    console.log(e);
    return {};
  }

  return {
    count: result.length,
    data: result.map((info: OfferData) => {
      return {
        mint: info.mint.toBase58(),
        buyer: info.buyer.toBase58(),
        offerPrice: info.offerPrice.toNumber(),
        offerListingDate: info.offerListingDate.toNumber(),
        byToken: info.byToken.toNumber(),
        active: info.active.toNumber(),
      };
    }),
  };
};

export const getGlobalState = async (program: anchor.Program): Promise<GlobalPool | null> => {
  const [globalAuthority, _] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );
  try {
    let globalState = await program.account.globalPool.fetch(globalAuthority);
    return globalState as unknown as GlobalPool;
  } catch {
    return null;
  }
};

export const getUserPoolState = async (userAddress: PublicKey, program: anchor.Program): Promise<UserData | null> => {
  if (!userAddress) return null;

  const [userPool, _] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );
  console.log("User Data PDA: ", userPool.toBase58());
  try {
    let poolState = await program.account.userData.fetch(userPool);
    return poolState as unknown as UserData;
  } catch {
    return null;
  }
};

export const getNFTPoolState = async (mint: PublicKey, program: anchor.Program): Promise<SellData | null> => {
  if (!mint) return null;

  const [sellData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );
  console.log("Sell Data PDA: ", sellData.toBase58());
  try {
    let poolState = await program.account.sellData.fetch(sellData);
    return poolState as unknown as SellData;
  } catch {
    return null;
  }
};

export const getOfferDataState = async (
  mint: PublicKey,
  userAddress: PublicKey,
  program: anchor.Program
): Promise<OfferData | null> => {
  if (!mint) return null;

  const [offerData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), mint.toBuffer(), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );
  console.log("Offer Data PDA: ", offerData.toBase58());
  try {
    let offerDataState = await program.account.offerData.fetch(offerData);
    return offerDataState as unknown as OfferData;
  } catch {
    return null;
  }
};

export const createInitializeTx = async (userAddress: PublicKey, program: anchor.Program) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );
  const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_VAULT_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>initializing program", globalAuthority.toBase58());

  tx.add(
    program.instruction.initialize(bump, escrow_bump, {
      accounts: {
        admin: userAddress,
        globalAuthority,
        escrowVault,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createAddTreasuryTx = async (
  userAddress: PublicKey,
  address: PublicKey,
  rate: number,
  program: anchor.Program,
  connection: Connection
) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();

  let ret1 = await getATokenAccountsNeedCreate(connection, userAddress, address, [USDT_TOKEN_MINT]);
  console.log("Treasury USDT Account = ", ret1.destinationAccounts[0].toBase58());

  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));
  console.log("==>adding team treasury", globalAuthority.toBase58(), address.toBase58(), rate);
  tx.add(
    program.instruction.addTeamTreasury(bump, address, new anchor.BN(rate), {
      accounts: {
        admin: userAddress,
        globalAuthority,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createRemoveTreasuryTx = async (userAddress: PublicKey, program: anchor.Program, address: PublicKey) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>removing team treasury", globalAuthority.toBase58(), address.toBase58());

  tx.add(
    program.instruction.removeTeamTreasury(bump, address, {
      accounts: {
        admin: userAddress,
        globalAuthority,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createInitUserTx = async (userAddress: PublicKey, program: anchor.Program) => {
  const [userPool, user_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  console.log("==>initializing user pool", userPool.toBase58());

  const tx = await program.methods
    .initUserPool()
    .accounts({
      owner: userAddress,
      userPool,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .transaction();

  return tx;
};

export const createDepositTx = async (
  userAddress: PublicKey,
  sol: number,
  token: number,
  program: anchor.Program,
  connection: Connection
) => {
  let ret = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [USDT_TOKEN_MINT]);

  let tx = new Transaction();
  let userTokenAccount = ret.destinationAccounts[0];
  if (!(await isExistAccount(userTokenAccount, connection))) {
    try {
      let accountOfABB = await getTokenAccount(USDT_TOKEN_MINT, userAddress, connection);
      userTokenAccount = accountOfABB;
    } catch (e) {
      if (token == 0) {
        tx.add(ret.instructions[0]);
      } else throw "No USDT Token Account for this user";
    }
  }
  console.log("User USDT Account = ", userTokenAccount.toBase58());

  const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_VAULT_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [userPool, user_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let ret1 = await getATokenAccountsNeedCreate(connection, userAddress, escrowVault, [USDT_TOKEN_MINT]);
  console.log("escrowVault = ", escrowVault.toBase58());
  console.log("EscrowVault USDT Account = ", ret1.destinationAccounts[0].toBase58());

  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));
  console.log("==> Depositing", userAddress.toBase58(), "Sol", sol, "Token:", token);
  tx.add(
    program.instruction.depositToEscrow(user_bump, escrow_bump, new anchor.BN(sol), new anchor.BN(token), {
      accounts: {
        owner: userAddress,
        userPool,
        escrowVault,
        userTokenAccount,
        escrowTokenAccount: ret1.destinationAccounts[0],
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createWithdrawTx = async (
  userAddress: PublicKey,
  sol: number,
  token: number,
  program: anchor.Program,
  connection: Connection
) => {
  const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_VAULT_SEED)],
    MARKETPLACE_PROGRAM_ID
  );
  let escrowTokenAccount = await getAssociatedTokenAccount(escrowVault, USDT_TOKEN_MINT);
  console.log("escrowVault = ", escrowVault.toBase58());
  console.log("Escrow USDT Account = ", escrowTokenAccount.toBase58());

  const [userPool, user_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let ret1 = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [USDT_TOKEN_MINT]);
  console.log("User USDT Account = ", ret1.destinationAccounts[0].toBase58());

  let tx = new Transaction();

  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));
  console.log("==> Withdrawing", userAddress.toBase58(), "Sol", sol, "Token:", token);
  tx.add(
    program.instruction.withdrawFromEscrow(user_bump, escrow_bump, new anchor.BN(sol), new anchor.BN(token), {
      accounts: {
        owner: userAddress,
        userPool,
        escrowVault,
        userTokenAccount: ret1.destinationAccounts[0],
        escrowTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createInitSellDataTx = async (mint: PublicKey, userAddress: PublicKey, program: anchor.Program) => {
  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  console.log("==>initializing sell PDA", mint.toBase58(), nftData.toBase58());

  const tx = program.methods
    .initSellData(mint, nft_bump)
    .accounts({
      payer: userAddress,
      sellDataInfo: nftData,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .transaction();

  return tx;
};

export const createListForSellNftTx = async (
  mint: PublicKey,
  userAddress: PublicKey,
  program: anchor.Program,
  connection: Connection,
  priceSol: number,
  priceToken: number
) => {
  if (priceSol < 0 || priceToken < 0) {
    throw "Invalid Price Value";
  }

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [sellData, _] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );
  console.log("Sell Data PDA: ", sellData.toBase58());

  let sellInitTx = null;
  let poolAccount = await connection.getAccountInfo(sellData);
  if (poolAccount === null || poolAccount.data === null) {
    sellInitTx = await createInitSellDataTx(mint, userAddress, program);
  }

  let userInitTx = null;
  if (!(await isInitializedUser(userAddress, connection))) {
    userInitTx = await createInitUserTx(userAddress, program);
  }

  let userTokenAccount = await getAssociatedTokenAccount(userAddress, mint);
  if (!(await isExistAccount(userTokenAccount, connection))) {
    let accountOfNFT = await getNFTTokenAccount(mint, connection);
    if (userTokenAccount.toBase58() != accountOfNFT.toBase58()) {
      let nftOwner = await getOwnerOfNFT(mint, connection);
      if (nftOwner.toBase58() == userAddress.toBase58()) userTokenAccount = accountOfNFT;
      else if (nftOwner.toBase58() !== globalAuthority.toBase58()) {
        throw "Error: Nft is not owned by user";
      }
    }
  }
  console.log("NFT = ", mint.toBase58(), userTokenAccount.toBase58());

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let {instructions, destinationAccounts} = await getATokenAccountsNeedCreate(
    connection,
    userAddress,
    globalAuthority,
    [mint]
  );

  console.log("Dest NFT Account = ", destinationAccounts[0].toBase58());

  const metadata = await getMetadata(mint);
  console.log("Metadata=", metadata.toBase58());

  let collectionAddress = null;
  const meta = await Metadata.fromAccountAddress(connection, metadata);
  if (meta.data.creators == null) return;
  for (let creator of meta.data.creators) {
    if (creator.verified == true) {
      collectionAddress = creator.address;
      break;
    }
  }
  console.log("Nft creator: ", collectionAddress?.toBase58());

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress?.toBuffer() as Buffer],
    MARKETPLACE_PROGRAM_ID
  );

  console.log("collectionInfor: ", collectionInfo.toBase58());

  let tx = new Transaction();

  if (userInitTx != null) tx.add(userInitTx.instructions[0]);
  if (sellInitTx != null) tx.add(sellInitTx.instructions[0]);

  if (instructions.length > 0) instructions.map((ix) => tx.add(ix));
  console.log("==>listing", mint.toBase58(), priceSol, priceToken);

  tx.add(
    program.instruction.listNftForSale(bump, nft_bump, new anchor.BN(priceSol), new anchor.BN(priceToken), {
      accounts: {
        owner: userAddress,
        globalAuthority,
        sellDataInfo: nftData,
        userTokenAccount,
        destNftTokenAccount: destinationAccounts[0],
        nftMint: mint,
        mintMetadata: metadata,
        collectionInfo,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METAPLEX,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createUpdateNftPriceTx = async (
  mint: PublicKey,
  userAddress: PublicKey,
  program: anchor.Program,
  connection: Connection,
  priceSol: number,
  priceToken: number
) => {
  let ret = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [mint]);
  let userTokenAccount = ret.destinationAccounts[0];
  console.log("User NFT = ", mint.toBase58(), userTokenAccount.toBase58());

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();

  if (ret.instructions.length > 0) ret.instructions.map((ix) => tx.add(ix));
  console.log("==> updating", mint.toBase58());
  tx.add(
    program.instruction.updateNftPrice(new anchor.BN(priceSol), new anchor.BN(priceToken), {
      accounts: {
        owner: userAddress,
        globalAuthority,
        sellDataInfo: nftData,
        nftMint: mint,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createDelistNftTx = async (
  mint: PublicKey,
  userAddress: PublicKey,
  program: anchor.Program,
  connection: Connection
) => {
  let ret = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [mint]);
  let userTokenAccount = ret.destinationAccounts[0];
  console.log("User NFT = ", mint.toBase58(), userTokenAccount.toBase58());

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let {instructions, destinationAccounts} = await getATokenAccountsNeedCreate(
    connection,
    userAddress,
    globalAuthority,
    [mint]
  );

  console.log("Dest NFT Account = ", destinationAccounts[0].toBase58());

  let tx = new Transaction();

  if (ret.instructions.length > 0) ret.instructions.map((ix) => tx.add(ix));
  console.log("==> withdrawing", mint.toBase58());
  tx.add(
    program.instruction.delistNft(bump, nft_bump, {
      accounts: {
        owner: userAddress,
        globalAuthority,
        sellDataInfo: nftData,
        userTokenAccount,
        destNftTokenAccount: destinationAccounts[0],
        nftMint: mint,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createPurchaseTx = async (
  mint: PublicKey,
  userAddress: PublicKey,
  byToken: boolean,
  treasuryAddresses: PublicKey[],
  program: anchor.Program,
  connection: Connection
) => {
  let ret = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [mint]);
  let userNftTokenAccount = ret.destinationAccounts[0];
  console.log("User NFT = ", mint.toBase58(), userNftTokenAccount.toBase58());

  let ret2 = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [USDT_TOKEN_MINT]);

  let tx = new Transaction();
  let userTokenAccount = ret2.destinationAccounts[0];

  let userInitTx = null;
  if (!(await isInitializedUser(userAddress, connection))) {
    userInitTx = await createInitUserTx(userAddress, program);
  }

  if (!(await isExistAccount(userTokenAccount, connection))) {
    try {
      let accountOfABB = await getTokenAccount(USDT_TOKEN_MINT, userAddress, connection);
      userTokenAccount = accountOfABB;
    } catch (e) {
      if (!byToken) tx.add(ret2.instructions[0]);
      else throw "No USDT Token Account for this user";
    }
  }
  console.log("User USDT Account = ", userTokenAccount.toBase58());

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [buyerUserPool, buyer_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let {destinationAccounts} = await getATokenAccountsNeedCreate(connection, userAddress, globalAuthority, [mint]);

  console.log("Dest NFT Account = ", destinationAccounts[0].toBase58());

  const metadata = await getMetadata(mint);
  console.log("Metadata=", metadata.toBase58());

  let collectionAddress = null;
  const meta = await Metadata.fromAccountAddress(connection, metadata);
  if (meta.data.creators == null) return;
  for (let creator of meta.data.creators) {
    if (creator.verified == true) {
      collectionAddress = creator.address;
      break;
    }
  }
  console.log("Nft creator: ", collectionAddress?.toBase58());

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress?.toBuffer() as Buffer],
    MARKETPLACE_PROGRAM_ID
  );

  console.log("collectionInfor: ", collectionInfo.toBase58());

  let sellInfo = await getNFTPoolState(mint, program);
  let seller = sellInfo?.seller as PublicKey;

  const [sellerUserPool, seller_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), seller.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let ret1 = await getATokenAccountsNeedCreate(connection, userAddress, seller, [USDT_TOKEN_MINT]);
  console.log("Seller = ", seller?.toBase58());
  console.log("seller USDT Account = ", ret1.destinationAccounts[0].toBase58());

  let treasuryAccounts: PublicKey[] = treasuryAddresses;
  if (byToken) {
    for (let idx in treasuryAccounts) {
      console.log(" treasury wallet : ", treasuryAccounts[idx].toBase58());
      treasuryAccounts[idx] = await getAssociatedTokenAccount(treasuryAccounts[idx], USDT_TOKEN_MINT);
    }
  }
  console.log(
    "=> Treasury Accounts:",
    treasuryAccounts.map((address) => address.toBase58())
  );

  if (ret.instructions.length > 0) ret.instructions.map((ix) => tx.add(ix));
  console.log(" > tx length ", tx.instructions.length);
  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));
  console.log("   > tx length ", tx.instructions.length);
  console.log("==> Purchasing", mint.toBase58(), "By Token:", byToken);
  if (userInitTx != null) tx.add(userInitTx.instructions[0]);
  tx.add(
    program.instruction.purchase(bump, nft_bump, buyer_bump, seller_bump, new anchor.BN(byToken ? 1 : 0), {
      accounts: {
        buyer: userAddress,
        globalAuthority,
        buyerUserPool,
        sellDataInfo: nftData,
        userNftTokenAccount,
        destNftTokenAccount: destinationAccounts[0],
        nftMint: mint,
        mintMetadata: metadata,
        seller,
        sellerUserPool,
        userTokenAccount,
        sellerTokenAccount: ret1.destinationAccounts[0],
        collectionInfo,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METAPLEX,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
      remainingAccounts: treasuryAccounts.map((address) => {
        return {
          pubkey: address,
          isWritable: true,
          isSigner: false,
        };
      }),
    })
  );

  return tx;
};

export const createInitOfferDataTx = async (mint: PublicKey, userAddress: PublicKey, program: anchor.Program) => {
  const [offerData, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), mint.toBuffer(), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>initializing offer PDA", mint.toBase58(), offerData.toBase58());

  tx.add(
    program.instruction.initOfferData(mint, bump, {
      accounts: {
        payer: userAddress,
        offerDataInfo: offerData,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createMakeOfferTx = async (
  mint: PublicKey,
  userAddress: PublicKey,
  price: number,
  byToken: boolean,
  program: anchor.Program,
  connection: Connection
) => {
  let ret = await getATokenAccountsNeedCreate(connection, userAddress, userAddress, [USDT_TOKEN_MINT]);

  let userInitTx = null;
  if (!(await isInitializedUser(userAddress, connection))) {
    userInitTx = await createInitUserTx(userAddress, program);
  }

  let tx = new Transaction();
  let userTokenAccount = ret.destinationAccounts[0];
  if (!(await isExistAccount(userTokenAccount, connection))) {
    try {
      let accountOfABB = await getTokenAccount(USDT_TOKEN_MINT, userAddress, connection);
      userTokenAccount = accountOfABB;
    } catch (e) {
      if (!byToken) tx.add(ret.instructions[0]);
      else throw "No USDT Token Account for this user";
    }
  }
  console.log("User USDT Account = ", userTokenAccount.toBase58());

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [offerData, offer_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), mint.toBuffer(), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_VAULT_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [userPool, user_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let ret1 = await getATokenAccountsNeedCreate(connection, userAddress, escrowVault, [USDT_TOKEN_MINT]);
  console.log("escrowVault = ", escrowVault.toBase58());
  console.log("EscrowVault USDT Account = ", ret1.destinationAccounts[0].toBase58());

  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));
  console.log("==> making Offer", mint.toBase58(), userAddress.toBase58(), "Price:", price, "ByToken:", byToken);

  if (userInitTx != null) tx.add(userInitTx.instructions[0]);

  tx.add(
    program.instruction.makeOffer(
      nft_bump,
      offer_bump,
      user_bump,
      escrow_bump,
      new anchor.BN(price),
      new anchor.BN(byToken ? 1 : 0),
      {
        accounts: {
          owner: userAddress,
          sellDataInfo: nftData,
          offerDataInfo: offerData,
          nftMint: mint,
          userPool,
          escrowVault,
          userTokenAccount,
          escrowTokenAccount: ret1.destinationAccounts[0],
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        },
        instructions: [],
        signers: [],
      }
    )
  );

  return tx;
};

export const createCancelOfferTx = async (mint: PublicKey, userAddress: PublicKey, program: anchor.Program) => {
  let tx = new Transaction();

  const [offerData, offer_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), mint.toBuffer(), userAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );
  console.log("==> canceling Offer", mint.toBase58(), userAddress.toBase58());
  tx.add(
    program.instruction.cancelOffer(offer_bump, {
      accounts: {
        owner: userAddress,
        offerDataInfo: offerData,
        nftMint: mint,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createAcceptOfferTx = async (
  mint: PublicKey,
  buyer: PublicKey,
  treasuryAddresses: PublicKey[],
  program: anchor.Program,
  connection: Connection
) => {
  let sellInfo = await getNFTPoolState(mint, program);
  let seller = sellInfo?.seller as PublicKey;
  let offerInfo = await getOfferDataState(mint, buyer, program);

  let tx = new Transaction();

  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [nftData, nft_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(SELL_DATA_SEED), mint.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [offerData, offer_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(OFFER_DATA_SEED), mint.toBuffer(), buyer.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [escrowVault, escrow_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(ESCROW_VAULT_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [buyerUserPool, buyer_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), buyer.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  const [sellerUserPool, seller_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_DATA_SEED), seller.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let ret = await getATokenAccountsNeedCreate(connection, seller, buyer, [mint]);

  let destNftTokenAccount = await getAssociatedTokenAccount(globalAuthority, mint);

  const metadata = await getMetadata(mint);
  console.log("Metadata=", metadata.toBase58());

  let collectionAddress = null;
  const meta = await Metadata.fromAccountAddress(connection, metadata);
  if (meta.data.creators == null) return;
  for (let creator of meta.data.creators) {
    if (creator.verified == true) {
      collectionAddress = creator.address;
      break;
    }
  }
  console.log("Nft creator: ", collectionAddress?.toBase58());

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress?.toBuffer() as Buffer],
    MARKETPLACE_PROGRAM_ID
  );

  console.log("collectionInfor: ", collectionInfo.toBase58());

  let ret1 = await getATokenAccountsNeedCreate(connection, seller, seller, [USDT_TOKEN_MINT]);
  console.log("Seller USDT Account = ", ret.destinationAccounts[0].toBase58());

  let escrowTokenAccount = await getAssociatedTokenAccount(escrowVault, USDT_TOKEN_MINT);
  console.log("escrowVault = ", escrowVault.toBase58());
  console.log("EscrowVault USDT Account = ", escrowTokenAccount.toBase58());

  if (ret.instructions.length > 0) ret.instructions.map((ix) => tx.add(ix));
  if (ret1.instructions.length > 0) ret1.instructions.map((ix) => tx.add(ix));

  let treasuryAccounts: PublicKey[] = treasuryAddresses;
  if (offerInfo && offerInfo.byToken.toNumber()) {
    for (let idx in treasuryAccounts) {
      treasuryAccounts[idx] = await getAssociatedTokenAccount(treasuryAccounts[idx], USDT_TOKEN_MINT);
    }
  }
  console.log(
    "=> Treasury Accounts:",
    treasuryAccounts.map((address) => address.toBase58())
  );

  console.log(
    "==> Accept Offer  Mint:",
    mint.toBase58(),
    "Buyer:",
    buyer.toBase58(),
    "Seller:",
    seller.toBase58(),
    "OfferPrice:",
    offerInfo?.offerPrice.toNumber(),
    "ByToken:",
    offerInfo?.byToken.toNumber()
  );

  tx.add(
    program.instruction.acceptOffer(bump, nft_bump, offer_bump, buyer_bump, seller_bump, escrow_bump, {
      accounts: {
        seller,
        sellDataInfo: nftData,
        buyer,
        offerDataInfo: offerData,
        sellerUserPool,
        nftMint: mint,
        globalAuthority,
        buyerUserPool,
        userNftTokenAccount: ret.destinationAccounts[0],
        destNftTokenAccount,
        escrowVault,
        userTokenAccount: ret1.destinationAccounts[0],
        escrowTokenAccount,
        mintMetadata: metadata,
        collectionInfo,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METAPLEX,
        systemProgram: SystemProgram.programId,
      },
      instructions: [],
      signers: [],
      remainingAccounts: treasuryAccounts.map((address) => {
        return {
          pubkey: address,
          isWritable: true,
          isSigner: false,
        };
      }),
    })
  );

  return tx;
};

export const createUpdateAuthorityTx = async (userAddress: PublicKey, newAdmin: PublicKey, program: anchor.Program) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>update authority", globalAuthority.toBase58());

  tx.add(
    program.instruction.updateAuthority(bump, newAdmin, {
      accounts: {
        admin: userAddress,
        globalAuthority,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createAddAdminTx = async (userAddress: PublicKey, adminAddress: PublicKey, program: anchor.Program) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>add admin", globalAuthority.toBase58());

  tx.add(
    program.instruction.addAdmin(adminAddress, {
      accounts: {
        admin: userAddress,
        globalAuthority,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createRemoveAdminTx = async (userAddress: PublicKey, adminAddress: PublicKey, program: anchor.Program) => {
  const [globalAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>remove admin", globalAuthority.toBase58());

  tx.add(
    program.instruction.removeAdmin(bump, adminAddress, {
      accounts: {
        admin: userAddress,
        globalAuthority,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createInitCollectionInfoTx = async (
  userAddress: PublicKey,
  collectionAddress: PublicKey,
  program: anchor.Program
) => {
  const [globalState, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>init collection info", globalState.toBase58());

  tx.add(
    program.instruction.initCollectionInfo(collectionAddress, {
      accounts: {
        payer: userAddress,
        globalState,
        collectionInfo,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createAddCollectionTx = async (
  userAddress: PublicKey,
  collectionAddress: PublicKey,
  fee: number,
  program: anchor.Program
) => {
  const [globalState, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>add collection info", globalState.toBase58());

  tx.add(
    program.instruction.addCollection(collectionAddress, new anchor.BN(fee), {
      accounts: {
        payer: userAddress,
        globalState,
        collectionInfo,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createUpdateCollectionFeeTx = async (
  userAddress: PublicKey,
  collectionAddress: PublicKey,
  fee: number,
  program: anchor.Program
) => {
  const [globalState, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>update collection fee", globalState.toBase58());

  tx.add(
    program.instruction.updateCollectionFee(collectionAddress, new anchor.BN(fee), {
      accounts: {
        payer: userAddress,
        globalState,
        collectionInfo,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};

export const createRemoveCollectionTx = async (
  userAddress: PublicKey,
  collectionAddress: PublicKey,
  program: anchor.Program
) => {
  const [globalState, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    MARKETPLACE_PROGRAM_ID
  );

  const [collectionInfo, collection_bump] = await PublicKey.findProgramAddress(
    [Buffer.from(COLLECTION_INFO_SEED), collectionAddress.toBuffer()],
    MARKETPLACE_PROGRAM_ID
  );

  let tx = new Transaction();
  console.log("==>remove collection", globalState.toBase58());

  tx.add(
    program.instruction.removeCollection(collectionAddress, {
      accounts: {
        payer: userAddress,
        globalState,
        collectionInfo,
      },
      instructions: [],
      signers: [],
    })
  );

  return tx;
};
