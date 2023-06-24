/* eslint-disable @next/next/no-img-element */
import {NextPage} from "next";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";

import {useRouter} from "next/router";
import {PublicKey} from "@solana/web3.js";
import {METAPLEX} from "../contexts/lib/utils";
import {Metadata} from "@metaplex-foundation/mpl-token-metadata";
import {web3} from "@project-serum/anchor";
import {delistNft, getAllNFTs, initUserPool, makeOffer, purchase} from "../contexts/scripts";
import {useAnchorWallet, useWallet} from "@solana/wallet-adapter-react";
import axios from "axios";
import {IndividualNFTDataType} from "../components/DataTypes";
import {GetNFTDataContext} from "../contexts/NFTDataProvider";

const Individualproduct: NextPage = () => {
  // const router = useRouter();
  // const wallet = useWallet();
  // const anchorWallet = useAnchorWallet();
  //
  // const [startLoading, setStartLoading] = useState<boolean>(false);
  // const [dataLoadingState, setDataLoadingState] = useState<boolean>(false);
  //
  // const [detailState, setDetailState] = useState(true);
  // const devnetEndpoint = "https://api.devnet.solana.com";
  // const solConnection = new web3.Connection(devnetEndpoint);
  //
  // const [nftData, setNftData] = useState<IndividualNFTDataType[]>([]);
  //
  // const {refetchOwnNFTs, getAllListedNfts, getUserProfileData} = useContext(GetNFTDataContext);
  //
  // const handledeBuyFunc = async () => {
  //   if (anchorWallet) {
  //     setStartLoading(true);
  //     const mintPubkey = new PublicKey(nftData[0]?.mintAddr);
  //     try {
  //       const txId = await purchase(anchorWallet, mintPubkey, false);
  //       if (txId) await handleListNftDataSave(txId);
  //       try {
  //         await axios.delete(`https://adae-3-89-168-19.ngrok.io/api/listednfts/${router.query.mintaddr}`);
  //         setStartLoading(false);
  //         refetchOwnNFTs();
  //         getAllListedNfts();
  //         router.push("/");
  //       } catch (err) {
  //         setStartLoading(false);
  //       }
  //
  //       setStartLoading(false);
  //       router.push("/");
  //     } catch (e) {
  //       setStartLoading(false);
  //     }
  //   }
  // };
  //
  // // Save the list nft data in backend
  // const handleListNftDataSave = async (txId: string) => {
  //   if (anchorWallet) {
  //     setStartLoading(true);
  //     const formData = new FormData();
  //
  //     formData.append("imgUrl", nftData[0].imgUrl);
  //     formData.append("collectionName", nftData[0].name);
  //     formData.append("price", nftData[0].solPrice.toString());
  //     formData.append("byToken", "0");
  //     formData.append("transaction", txId);
  //     formData.append("mintAddr", nftData[0].mintAddr);
  //     formData.append("seller", nftData[0].seller);
  //     if (wallet.publicKey) formData.append("buyer", wallet.publicKey?.toBase58());
  //     try {
  //       const response = await axios.post(`https://adae-3-89-168-19.ngrok.io/api/activity/create`, formData);
  //       if (response.status === 200) {
  //         setStartLoading(false);
  //         successAlert("Purchased successful.");
  //       } else {
  //         errorAlert("Purchaing failed. please try again.");
  //         setStartLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setStartLoading(false);
  //       errorAlert("Purchaing please try again.");
  //     }
  //   }
  // };
  //
  // const handleMakeOfferFunc = async () => {
  //   if (anchorWallet) {
  //     setStartLoading(true);
  //     const mintPubkey = new PublicKey(nftData[0]?.mintAddr);
  //     try {
  //       await makeOffer(anchorWallet, mintPubkey, 800000000, false);
  //       setStartLoading(false);
  //       router.push("/");
  //     } catch (e) {
  //       setStartLoading(false);
  //     }
  //     // .then((tx: any) => {
  //     //   tx.wait()
  //     //     .then(() => {
  //     //       alert("Completed");
  //     //       setStartLoading(false);
  //     //     })
  //     //     .catch((error: Error) => {
  //     //       alert("error");
  //     //       setStartLoading(false);
  //     //     });
  //     // })
  //     // .catch((error: Error) => {
  //     //   alert("error ===>");
  //     //   setStartLoading(false);
  //     // });
  //   }
  // };
  //
  // const handleDeListFunc = async () => {
  //   if (anchorWallet) {
  //     setStartLoading(true);
  //     const mintPubkey = new PublicKey(nftData[0].mintAddr);
  //     try {
  //       await delistNft(anchorWallet, mintPubkey as any);
  //       try {
  //         const res = await axios.delete(`https://adae-3-89-168-19.ngrok.io/api/listednfts/${router.query.mintaddr}`);
  //         successAlert("Canceled successfully.");
  //         setStartLoading(false);
  //         refetchOwnNFTs();
  //         getAllListedNfts();
  //         router.push("/");
  //       } catch (err) {
  //         setStartLoading(false);
  //       }
  //     } catch (e) {
  //       errorAlert("Cancel failed.");
  //       setStartLoading(false);
  //     }
  //   }
  // };
  //
  // // Get individual nft data from database
  // const getIndividualNftData = async () => {
  //   setDataLoadingState(true);
  //   const data = [];
  //   try {
  //     const res = await axios.get(`https://adae-3-89-168-19.ngrok.io/api/listednfts/${router.query.mintaddr}`);
  //     const nftListedData = res.data;
  //     console.log("nftListedData =>", nftListedData);
  //     try {
  //       const response = await fetch(nftListedData[0].metaDataUrl, {
  //         method: "GET",
  //       });
  //       const responsedata = await response.json();
  //       data.push({
  //         name: responsedata.name,
  //         description: responsedata.description,
  //         imgUrl: responsedata.image,
  //         creator: nftListedData[0].creator,
  //         seller: nftListedData[0].seller,
  //         mintAddr: nftListedData[0].mintAddr,
  //         brand: responsedata.attributes[0].value,
  //         caskType: responsedata.attributes[1].value,
  //         size: responsedata.attributes[2].value,
  //         abv: responsedata.attributes[3].value,
  //         region: responsedata.attributes[4].value,
  //         solPrice: nftListedData[0].solPrice,
  //         tokenPrice: nftListedData[0].tokenPrice,
  //       });
  //       console.log("Individual data => ", data);
  //       setNftData(data);
  //       setDataLoadingState(false);
  //     } catch (error) {
  //       console.error("Unable to fetch data:", error);
  //       setDataLoadingState(false);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     // Handle the error here
  //     // You could display an error message to the user or retry the request
  //   }
  // };
  //
  // useEffect(() => {
  //   if (router.query.mintaddr) {
  //     getIndividualNftData();
  //   }
  //   // eslint-disable-next-line
  // }, [router]);
  //
  // return (
  //   <>
  //     <SubHeader />
  //     <div className="w-full xl:px-[100px] lg:px-[80px] md:px-[50px] px-5">
  //       <div className="items-center hidden gap-3 p-3 my-3 cursor-pointer lg:flex">
  //         <ProductBackSVG />
  //         <p className="font-medium transition-all duration-300 text-tmd hover:translate-x-2">
  //           <Link href="/products">Back to collection</Link>
  //         </p>
  //       </div>
  //       <div className="grid md:grid-cols-2 grid-cols-1 gap-x-11 md:mb-[120px] mb-5 mt-5 lg:mt-0">
  //         <div className="relative">
  //           {nftData[0]?.imgUrl && <img src={nftData[0].imgUrl} className="object-cover w-full h-auto" alt="" />}
  //           {/* <div className="absolute top-6 right-0 lg:right-[28px] flex gap-x-4">
  //           <button className="py-3 px-4 lg:border-[1px] border-white rounded-sm flex items-center gap-2 text-white">
  //             <ProductHeartSVG /> {`120`}
  //           </button>
  //           <div className="hidden w-full h-full lg:block">
  //             <div className="w-12 h-12 cursor-pointer flex items-center justify-center border-[1px] border-white rounded-full">
  //               <CatalogDetailSVG />
  //             </div>
  //           </div>
  //         </div> */}
  //         </div>
  //         <div>
  //           <div className="detailOfProduct">
  //             <div className={`mt-4 font-bold lg:text-sm text-txl md:mt-0 min-h-[30px] ${dataLoadingState && ""}`}>
  //               {nftData[0]?.name}
  //             </div>
  //             <p
  //               className={`text-gray-200 text-tmd font-regular min-h-[70px] mt-1 ${
  //                 dataLoadingState && "bg-gray-700 animate-pulse"
  //               }`}
  //             >
  //               {nftData[0]?.description}
  //             </p>
  //             <p className="font-bold text-tmd text-gold-500">Read more</p>
  //           </div>
  //           <div className="flex justify-start mt-6 gap-x-20">
  //             <div>
  //               <p className="font-medium text-gray-500 text-tmd">Creator:</p>
  //               <div className="flex gap-[10px] items-center mt-[6px]">
  //                 <DramskySVG /> <p>Dramsky</p>
  //               </div>
  //             </div>
  //             <div>
  //               <p className="font-medium text-gray-500 text-tmd">Collections:</p>
  //               <div className="flex gap-[10px] items-center mt-[6px]">
  //                 <DramskySVG /> <p>{`Salder's`}</p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex w-full mt-8 rounded-sm">
  //             <div className="bg-mainbg-700 w-1/2 py-4 flex items-center justify-center flex-col border-r-[1px] border-mainbg-500">
  //               <p className="text-white text-txs">Bid price</p>
  //               <p className="font-bold text-tmd text-gold-500">$10890</p>
  //             </div>
  //             <div className="flex flex-col items-center justify-center w-1/2 py-4 bg-mainbg-700">
  //               <p className="text-white text-txs">Buy it now</p>
  //               <p className="font-bold text-tmd text-gold-500">$10890</p>
  //             </div>
  //           </div>
  //           <div className="w-full rounded-sm p-4 bg-mainbg-700 mt-[20px]">
  //             <div className="w-full border-b-[1px] border-gray-500">
  //               <div className="flex">
  //                 <button
  //                   className={`px-[14px] py-2 text-gold-500 ${
  //                     detailState ? "border-b-[1px] border-gold-500" : "text-gray-300"
  //                   }`}
  //                   onClick={() => setDetailState(true)}
  //                 >
  //                   Details
  //                 </button>
  //                 <button
  //                   className={`px-[14px] py-2  ${
  //                     detailState ? "text-gray-300" : "border-b-[1px] border-gold-500 text-gold-500"
  //                   }`}
  //                   onClick={() => setDetailState(false)}
  //                 >
  //                   Activity
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="flex flex-col w-full gap-2 my-4">
  //               <div className="flex justify-between">
  //                 <p className="text-gray-300 text-tmd min-h-[30px] px-1">Brand</p>
  //                 <p
  //                   className={`font-bold text-white text-tmd min-h-[30px] px-1 min-w-[70px] ${
  //                     dataLoadingState && "animate-pulse bg-gray-700"
  //                   }`}
  //                 >
  //                   {nftData[0]?.brand}
  //                 </p>
  //               </div>
  //               <div className="flex justify-between">
  //                 <p className="text-gray-300 text-tmd min-h-[30px] px-1 min-w-[70px]">Cask type</p>
  //                 <p
  //                   className={`font-bold text-white text-tmd min-h-[30px] px-1 min-w-[70px] ${
  //                     dataLoadingState && "animate-pulse bg-gray-700"
  //                   }`}
  //                 >
  //                   {nftData[0]?.caskType}
  //                 </p>
  //               </div>
  //               <div className="flex justify-between">
  //                 <p className="text-gray-300 text-tmd min-h-[30px] px-1">Size</p>
  //                 <p
  //                   className={`font-bold text-white text-tmd min-h-[30px] px-1 min-w-[70px] ${
  //                     dataLoadingState && "animate-pulse bg-gray-700"
  //                   }`}
  //                 >
  //                   {nftData[0]?.size}
  //                 </p>
  //               </div>
  //               <div className="flex justify-between">
  //                 <p className="text-gray-300 text-tmd min-h-[30px] px-1">ABV</p>
  //                 <p
  //                   className={`font-bold text-white text-tmd min-h-[30px] px-1 min-w-[70px] ${
  //                     dataLoadingState && "animate-pulse bg-gray-700"
  //                   }`}
  //                 >
  //                   {nftData[0]?.abv}
  //                 </p>
  //               </div>
  //               <div className="flex justify-between">
  //                 <p className="text-gray-300 text-tmd min-h-[30px] px-1">Region</p>
  //                 <p
  //                   className={`font-bold text-white text-tmd min-h-[30px] px-1 min-w-[70px] ${
  //                     dataLoadingState && "animate-pulse bg-gray-700"
  //                   }`}
  //                 >
  //                   {nftData[0]?.region}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="w-full right-0 py-7 px-4 md:border-[1px] rounded-sm border-gray-500 bg-mainbg-800 md:bg-mainbg-700 mt-5 fixed md:static z-[9999] bottom-0">
  //             <div className="flex justify-between py-3">
  //               <p className="font-medium text-white text-tmd">Current price</p>
  //               <div className="flex items-center justify-center gap-3">
  //                 <SolanaIconSVG />
  //                 <p className="text-xs text-gold-500">{nftData[0]?.solPrice} SOL</p>
  //               </div>
  //             </div>
  //             {wallet.publicKey?.toBase58() !== nftData[0]?.seller ? (
  //               <div className="flex flex-row w-full gap-3 mt-6">
  //                 <button
  //                   className="w-1/2 py-[10px] bg-gray-800 border-[1px] border-gold-500 font-bold text-gold-500 hover:bg-[#b89b5c1a] hover:border-gold-700 hover:text-gold-500 transition-all duration-300"
  //                   onClick={() => handleMakeOfferFunc()}
  //                 >
  //                   Place a bid
  //                 </button>
  //                 <button
  //                   className="w-1/2 py-3 font-bold text-black bg-gold_gradient hover:bg-gold-700"
  //                   onClick={() => handledeBuyFunc()}
  //                 >
  //                   Buy now
  //                 </button>
  //               </div>
  //             ) : (
  //               <button
  //                 className="w-full py-3 font-bold text-black transition-all duration-300 bg-gold_gradient hover:bg-gold-700 hover:text-black active:bg-gold-500"
  //                 onClick={() => handleDeListFunc()}
  //               >
  //                 Cancel Listing
  //               </button>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //       {startLoading && (
  //         <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 bg-black bg-opacity-50 backdrop-blur-sm">
  //           <CircleSpinner size={35} />{" "}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return null;
};

export default Individualproduct;
