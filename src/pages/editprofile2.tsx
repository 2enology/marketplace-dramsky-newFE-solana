import Link from "next/link";
import {useRef, useState, useEffect, useContext} from "react";
import axios from "axios";
import {useWallet} from "@solana/wallet-adapter-react";
import {GetNFTDataContext} from "../contexts/NFTDataProvider";
import {error} from "console";

export default function Editprofile2() {
  // const wallet = useWallet();
  // const hiddenAvatarInput = useRef(null);
  // const uploadedAvatarImg = useRef(null);
  //
  // const hiddenBannerInput = useRef(null);
  // const uploadedBannerImg = useRef(null);
  //
  // const [selectedAvatarImg, setSelectedAvatarImg] = useState<any>(null);
  // const [selectedBannerImg, setSelectedBannerImg] = useState<any>(null);
  //
  // const {userProfile, getUserProfileData} = useContext(GetNFTDataContext);
  //
  // const [userName, setUserName] = useState<string>(userProfile[0]?.name === "undefined" ? "" : userProfile[0]?.name);
  // const [userBio, setUserBio] = useState<string>(userProfile[0]?.bio === "undefined" ? "" : userProfile[0]?.bio);
  // const [loadingState, setLoadingState] = useState<boolean>(false);
  //
  // const handleAvatarAdd = () => {
  //   if (hiddenAvatarInput.current) {
  //     (hiddenAvatarInput.current as HTMLInputElement).click();
  //   }
  // };
  //
  // const handleAvatarChange = (event: any): void => {
  //   const fileUploaded: File = event.target.files[0];
  //   if (fileUploaded) {
  //     const reader: FileReader = new FileReader();
  //     const {current}: any = uploadedAvatarImg;
  //     current.fileUploaded = fileUploaded;
  //     setSelectedAvatarImg(fileUploaded);
  //     console.log("fileupload", fileUploaded);
  //     reader.onload = (e: ProgressEvent<FileReader>): void => {
  //       current.src = e.target?.result as string;
  //       console.log("blobimg>>>", current.src);
  //     };
  //     reader.readAsDataURL(fileUploaded);
  //   }
  // };
  //
  // const handlePublicSave = async () => {
  //   if (wallet.publicKey) {
  //     setLoadingState(true);
  //     const formData = new FormData();
  //     if (uploadedAvatarImg && uploadedAvatarImg.current && (uploadedAvatarImg.current as any).fileUploaded) {
  //       formData.append("avatar", (uploadedAvatarImg.current as any).fileUploaded);
  //     }
  //
  //     if (uploadedBannerImg && uploadedBannerImg.current && (uploadedBannerImg.current as any).fileUploaded) {
  //       formData.append("banner", (uploadedBannerImg.current as any).fileUploaded);
  //     }
  //
  //     formData.append("walletAddr", wallet.publicKey.toBase58());
  //     formData.append("username", userName);
  //     formData.append("bio", userBio);
  //     try {
  //       const response = await axios.post(`https://adae-3-89-168-19.ngrok.io/api/userprofile/create`, formData);
  //       if (response.status === 200) {
  //         await getUserProfileData();
  //         setLoadingState(false);
  //         successAlert("Your profile is saved!");
  //       } else {
  //         errorAlert("Profile save failed. please try again.");
  //         setLoadingState(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setLoadingState(false);
  //       errorAlert("Profile save failed. please try again.");
  //     }
  //   } else {
  //     errorAlert("Invalid input.");
  //   }
  // };
  //
  // const handleBannerAdd = () => {
  //   if (hiddenBannerInput.current) {
  //     (hiddenBannerInput.current as HTMLInputElement).click();
  //   }
  // };
  //
  // const handleBannerChange = (event: any): void => {
  //   const fileUploaded: File = event.target.files[0];
  //   if (fileUploaded) {
  //     const reader: FileReader = new FileReader();
  //     const {current}: any = uploadedBannerImg;
  //     current.fileUploaded = fileUploaded;
  //     setSelectedBannerImg(fileUploaded);
  //     reader.onload = (e: ProgressEvent<FileReader>): void => {
  //       current.src = e.target?.result as string;
  //     };
  //     reader.readAsDataURL(fileUploaded);
  //   }
  // };
  //
  // return (
  //   <motion.section
  //     initial={{opacity: 0}}
  //     animate={{opacity: 1}}
  //     transition={{ease: "easeInOut", duration: 0.5, delay: 0.5}}
  //   >
  //     <div className="w-full px-[25px] items-center bg-black py-5 lg:hidden relative">
  //       <Link href={`/sellerpage`} passHref>
  //         <div className="absolute flex items-center justify-center cursor-pointer left-4 top-5">
  //           <ProfileBackSVG color={"white"} />
  //         </div>
  //       </Link>
  //       <p className="text-center text-white text-tmd">Edit Profile</p>
  //     </div>
  //     <div className="w-full xl:px-[100px] lg:px-[80px] md:px-[50px] px-5md:mb-[198px] mb-20 overflow-hidden">
  //       <div className="w-full relative -z-[99] hidden md:block">
  //         <div className="absolute -z-[99] md:top-[302px] top-[300px] -left-40 blur-3xl -rotate-90 opacity-15">
  //           <GreenSVG width={800} heigth={800} />
  //         </div>
  //         <div className="absolute z-[99] -top-32 -right-40 blur-lg rotate-0">
  //           <GraySVG width={800} heigth={800} />
  //         </div>
  //       </div>
  //
  //       <div className="items-center justify-between hidden w-full lg:flex">
  //         <p className="text-sm font-bold mt-[80px] text-white">Edit Profile</p>
  //         <Link href={`/sellerpage`} passHref>
  //           <button className="py-2 w-9 h-9 md:flex hidden mt-[70px] gap-2 items-center justify-center z-1 cursor-pointer">
  //             <div className="flex items-center justify-center text-white">
  //               <ProfileBackSVG color={"white"} /> Back
  //             </div>
  //           </button>
  //         </Link>
  //       </div>
  //
  //       <div className="relative lg:mt-[102px] mt-2 z-1">
  //         <img
  //           src={
  //             userProfile[0]?.bannerImg !== undefined && userProfile[0]?.bannerImg !== null
  //               ? "http://localhost:8080/public/assets/imgs/userBanners/" + userProfile[0]?.bannerImg
  //               : "/img/catalog/catalogBanner.png"
  //           }
  //           ref={uploadedBannerImg}
  //           className="w-full md:h-[300px] h-[164px] object-cover md:rounded-tl-[60px] md:rounded-br-[60px] relative"
  //           alt=""
  //         />
  //         <input
  //           style={{display: "none"}}
  //           accept="image/*"
  //           type="file"
  //           name="myImage"
  //           ref={hiddenBannerInput}
  //           onChange={handleBannerChange}
  //           defaultValue=""
  //         />
  //         <div className="absolute top-6 right-3 md:top-6 md:right-6">
  //           <div className="flex gap-5">
  //             <div className="z-50 flex items-center justify-center bg-gray-800 rounded-full cursor-pointer h-7 w-7 md:h-9 md:w-9">
  //               <div onClick={() => handleBannerAdd()}>
  //                 <AddImgSVG width={17} height={17} />
  //               </div>
  //             </div>
  //             <div className="flex items-center justify-center bg-transparent border-[1px] border-white rounded-full h-7 w-7 md:h-9 md:w-9 cursor-pointer z-50">
  //               <DeleteSVG width={17} height={17} />
  //             </div>
  //           </div>
  //         </div>
  //         <div className="absolute bottom-0 right-0 left-0 flex justify-center mb-[-45px] rounded-full z-[1]">
  //           <img
  //             ref={uploadedAvatarImg}
  //             src={
  //               userProfile[0]?.avatarImg !== undefined && userProfile[0]?.avatarImg !== null
  //                 ? "http://localhost:8080/public/assets/imgs/userAvatars/" + userProfile[0]?.avatarImg
  //                 : "/img/profileAvatar.png"
  //             }
  //             className="w-[100px] h-[100px] md:w-[160px] md:h-[160px] rounded-full object-cover border-[7px] border-gray-600 border-opacity-20"
  //             alt=""
  //           />
  //           <input
  //             style={{display: "none"}}
  //             accept="image/*"
  //             type="file"
  //             name="myImage"
  //             ref={hiddenAvatarInput}
  //             onChange={handleAvatarChange}
  //             defaultValue=""
  //           />
  //
  //           <div className="absolute bottom-0 md:-right-32 -right-20 left-0 flex justify-center mb-[10px] md:mb-[25px] rounded-full">
  //             <div
  //               className="flex items-center justify-center bg-gray-800 rounded-full cursor-pointer h-7 w-7 md:h-9 md:w-9"
  //               onClick={() => handleAvatarAdd()}
  //             >
  //               <AddImgSVG width={17} height={17} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="w-full mt-0 md:mt-[56px] block md:flex gap-x-32 justify-between z-[1] relative px-5">
  //         <div className="flex flex-col justify-start w-full mt-12 md:items-center md:justify-center">
  //           <p className="font-medium text-white text-tlg">Public profile</p>
  //           <div className="mt-5 space-y-5">
  //             <div className="px-[14px] py-2 md:w-[422px] w-full flex border-[1px] border-gray-500">
  //               <input
  //                 placeholder="name"
  //                 type="text"
  //                 className="w-full placeholder-gray-500 bg-transparent rounded-sm outline-none"
  //                 onChange={(e) => setUserName(e.target.value)}
  //                 value={userName}
  //               />
  //             </div>
  //             <div className="px-[14px] py-2 md:w-[422px] w-full flex border-[1px] border-gray-500">
  //               <textarea
  //                 placeholder="Bio"
  //                 className="w-full placeholder-gray-500 bg-transparent rounded-sm outline-none min-h-[50px] max-h-[300px]"
  //                 onChange={(e) => setUserBio(e.target.value)}
  //                 value={userBio}
  //               />
  //             </div>
  //           </div>
  //           <div className="flex gap-[34px] pb-8 border-gray-500 z-[1]">
  //             <button
  //               className="py-2 px-[14px] rounded-sm mt-10 text-white bg-gray-800"
  //               onClick={() => handlePublicSave()}
  //             >
  //               Save
  //             </button>
  //             <button className="py-2 px-[14px] rounded-sm mt-10 border-[1px] border-white text-white">Cancel</button>
  //           </div>
  //           <div className="w-full border-[1px] border-[#393837] mt-3 border-dashed z-0" />
  //           <p className="z-0 mt-8 font-medium text-white text-tlg">Private profile</p>
  //           <div className="mt-5 space-y-5">
  //             <div className="px-[14px] py-2 md:w-[422px] w-full flex border-[1px] border-gray-500">
  //               <input
  //                 placeholder="Username"
  //                 className="w-full placeholder-gray-500 bg-transparent rounded-sm outline-none"
  //               />
  //             </div>
  //             <div className="px-[14px] py-2 md:w-[422px] w-full flex border-[1px] border-gray-500">
  //               <input
  //                 placeholder="Bio"
  //                 className="w-full placeholder-gray-500 bg-transparent rounded-sm outline-none"
  //                 type="text"
  //               />
  //             </div>
  //           </div>
  //           <div className="flex gap-[34px] pb-8 border-gray-500">
  //             <button className="py-2 px-[14px] rounded-sm mt-10 text-white bg-gray-800">Save</button>
  //             <button className="py-2 px-[14px] rounded-sm mt-10 border-[1px] border-white text-white">Cancel</button>
  //           </div>
  //         </div>
  //       </div>
  //       {loadingState && (
  //         <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-4 bg-black bg-opacity-50 backdrop-blur-sm">
  //           <CircleSpinner /> <p className="text-[20px] text-white">Saving profile</p>
  //         </div>
  //       )}
  //     </div>
  //   </motion.section>
  // );
}
