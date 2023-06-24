import {GetServerSideProps, NextPage} from "next";
import {CollectionPage} from "../../../modules/CollectionPage/CollectionPage";

const Product: NextPage = () => <CollectionPage />;

export default Product;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hideHeaderInMobile: true,
    },
  };
};
