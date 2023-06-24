import {GetServerSideProps, NextPage} from "next";
import {BrandPage} from "../modules/BrandPage/BrandPage";

const Brands: NextPage = () => <BrandPage />;

export default Brands;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hideHeaderInMobile: true,
    },
  };
};
