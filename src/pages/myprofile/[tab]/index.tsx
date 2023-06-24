import {GetServerSideProps, NextPage} from "next";
import {SellerPage} from "../../../modules/SellerPage/SellerPage";
import {SellerProfileTabID} from "../../../modules/SellerPage/CollectionList/SellerCollectionList";

const MyProfile = ({tab}: {tab: SellerProfileTabID}) => <SellerPage defaultTab={tab} />;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    props: {
      tab: query.tab,
    },
  };
};

export default MyProfile;
