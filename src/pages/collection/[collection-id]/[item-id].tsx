import {GetServerSideProps, NextPage} from "next";
import {ItemPage} from "../../../modules/ItemPage/ItemPage";
import {api} from "../../../apis/api";

const Item: NextPage = (props: any) => <ItemPage {...props} />;

export default Item;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const [nftDetails, error] = await api.items.getItemDetails(query["item-id"] as string);
  let nftMetaData = null;

  if (nftDetails) {
    const [resp] = await api.items.getItemAttrs(nftDetails.metaDataUrl);
    nftMetaData = resp;
  }

  return {
    props: {
      hideHeaderInMobile: true,
      nftMetaData,
      nftDetails,
    },
  };
};
