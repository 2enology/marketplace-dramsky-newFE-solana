const GetNFTDataProvider = () => {
  // const [getDataLoadingState, setGetDataLoadingState] = useState<boolean>(true);
  // const [getAllListedNftsLoadingState, setGetAllListedNftsLoadingState] = useState<boolean>(true);
  //
  // const [collectionData, setCollectionData] = useState<CollectionData>([]);
  // const [myNftList, setMyNftList] = useState<NFTCard[] | null>(null);
  // const [allListedNfts, setAllListedNfts] = useState<NFTCard[]>([]);
  // const [myListedNfts, setMyListedNfts] = useState<NFTCard[]>([]);
  // const [userProfile, setUserProfile] = useState<UserProfile[]>([]);

  // Get nfts from the wallet || Get collections added in the contract
  // const getOwnNfts = async () => {
  //   let collectionAddrArray: CollectionData = [];
  //   let data: NFTCard[] = [];
  //   setGetDataLoadingState(true);
  //   try {
  //     const collectionResult = await getAllCollections();
  //     if (collectionResult && collectionResult.count) {
  //       for (let i = 0; i < collectionResult.count; i++) {
  //         collectionAddrArray.push({
  //           collectionAddr: collectionResult.data[i].address,
  //         });
  //       }
  //     }
  //     setCollectionData(collectionAddrArray);
  //   } catch (error) {
  //     console.log("error ==>", error);
  //   }
  //
  //   const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));
  //   if (wallet.publicKey === null) return;
  //   try {
  //     const nftList = await getParsedNftAccountsByOwner({
  //       publicAddress: wallet.publicKey.toBase58(),
  //       connection: solConnection,
  //     });
  //
  //     if (nftList.length > 0) {
  //       for (let item of nftList) {
  //         for (let addr of collectionAddrArray)
  //           if (item.data?.creators && addr.collectionAddr.includes(item.data.creators[0].address)) {
  //             try {
  //               const response = await fetch(item?.data.uri, {
  //                 method: "GET",
  //               });
  //               const responsedata = await response.json();
  //
  //               data.push({
  //                 tokenId: item?.data.name,
  //                 collectionAddr: item.data?.creators[0].address,
  //                 imgUrl: responsedata.image,
  //                 mintAddr: item?.mint,
  //                 metaDataUrl: item?.data.uri,
  //                 solPrice: 0,
  //                 tokenPrice: 0,
  //                 collectionName: "",
  //                 listed: false,
  //               });
  //             } catch (error) {
  //               console.error("Unable to fetch data:", error);
  //             }
  //           }
  //       }
  //     }
  //     setMyNftList(data);
  //     setGetDataLoadingState(false);
  //   } catch (error) {
  //     console.log("error>>>", error);
  //     setGetDataLoadingState(false);
  //   }
  // };

  // Get user data from the database
  // const getUserProfileData = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/userprofile/${wallet.publicKey?.toBase58()}`);
  //     const userData = res.data;
  //     if (Object.keys(userData).length === 0 && userData.constructor === Object) {
  //       console.log("No data found");
  //     } else {
  //       const data = [
  //         {
  //           name: userData.name,
  //           bio: userData.bio,
  //           avatarImg: userData.avatarImg,
  //           bannerImg: userData.bannerImg,
  //         },
  //       ];
  //       setUserProfile(data);
  //     }
  //   } catch (err: any) {
  //     if (err.status === 404) {
  //       console.log("No data found");
  //     } else {
  //       console.error(err);
  //       // display a more user-friendly error message
  //     }
  //   }
  // };

  // Get listed data from the database
  // const getListedNfts = async () => {
  //   try {
  //     const [userData] = await api.items.getListedItems(wallet.publicKey?.toBase58() || "");
  //     if (userData) {
  //       const data: NFTCard[] = [];
  //       for (let i = 0; i < userData.length; i++) {
  //         data.push({
  //           tokenId: userData[i].tokenId,
  //           collectionAddr: userData[i].collectionAddr || "",
  //           imgUrl: userData[i].imgUrl,
  //           mintAddr: userData[i].mintAddr,
  //           metaDataUrl: userData[i].metaDataUrl,
  //           solPrice: userData[i].solPrice,
  //           tokenPrice: userData[i].tokenPrice,
  //           listed: true,
  //           collectionName: "",
  //         });
  //       }
  //
  //       setMyListedNfts(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setMyListedNfts([]);
  //   }
  // };

  // Get all listed data from the database
  // const getAllListedNfts = async () => {
  //   setGetAllListedNftsLoadingState(true);
  //   try {
  //     const res = await axios.get(`http://localhost:3000/listednfts/`);
  //     const userData = res.data;
  //     console.log("listedallnfts", userData);
  //     const data: NFTCard[] = [];
  //     for (let i = 0; i < userData.length; i++) {
  //       data.push({
  //         tokenId: userData[i].tokenId,
  //         collectionAddr: userData[i].collectionAddr,
  //         imgUrl: userData[i].imgUrl,
  //         mintAddr: userData[i].mintAddr,
  //         metaDataUrl: userData[i].metaDataUrl,
  //         solPrice: userData[i].solPrice,
  //         tokenPrice: userData[i].tokenPrice,
  //         listed: true,
  //         collectionName: "",
  //       });
  //     }
  //     setAllListedNfts(data);
  //     setGetAllListedNftsLoadingState(false);
  //   } catch (err) {
  //     console.error(err);
  //     setGetAllListedNftsLoadingState(false);
  //   }
  // };

  // Get all listed data from the database
  // const getMyActivityDatas = async () => {
  //   setGetAllListedNftsLoadingState(true);
  //   try {
  //     const res = await axios.get(`http://api.dramsky.xyz/activity/findById/${wallet.publicKey?.toBase58()}`);
  //     const userData = res.data;
  //     console.log("myactivitydata", userData);
  //     const data: NFTCard[] = [];
  //     // for (let i = 0; i < userData.length; i++) {
  //     //   data.push({
  //     //     tokenId: userData[i].tokenId,
  //     //     collectionAddr: userData[i].collectionAddr,
  //     //     imgUrl: userData[i].imgUrl,
  //     //     mintAddr: userData[i].mintAddr,
  //     //     metaDataUrl: userData[i].metaDataUrl,
  //     //     solPrice: userData[i].solPrice,
  //     //     tokenPrice: userData[i].tokenPrice,
  //     //     listed: true,
  //     //     collectionName: "",
  //     //   });
  //     // }
  //     setGetAllListedNftsLoadingState(false);
  //   } catch (err) {
  //     console.error(err);
  //     setGetAllListedNftsLoadingState(false);
  //   }
  // };

  // useEffect(() => {
  //   if (wallet.publicKey && wallet.connected) {
  //     getOwnNfts();
  //     getUserProfileData();
  //     getListedNfts();
  //     getAllListedNfts();
  //   }
  //   // eslint-disable-next-line
  // }, [wallet.publicKey, wallet.connected]);

  return null;
};

export default GetNFTDataProvider;
