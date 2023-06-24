import {NextPage} from "next";

const Index: NextPage = () => <></>;

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: `/myprofile/unlisted`,
      permanent: false,
    },
  };
};

export default Index;
