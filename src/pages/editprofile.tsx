import {GetServerSideProps, NextPage} from "next";
import {EditProfilePage} from "../modules/EditProfilePage/EditProfilePage";

const EditProfile: NextPage = () => <EditProfilePage />;

export default EditProfile;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hideHeaderInMobile: true,
    },
  };
};
