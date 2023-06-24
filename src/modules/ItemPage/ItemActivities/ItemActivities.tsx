import React, {FC} from "react";
import styles from "./ItemActivities.module.scss";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../common/constant";
import {api} from "../../../apis/api";
import {useRouter} from "next/router";
import {NFTCard} from "../../../components/DataTypes";
import {ActivityTable} from "../../../components/ActivityTable/ActivityTable";

type Props = {
  nft: NFTCard;
};

export const ItemActivities: FC<Props> = ({nft}) => {
  const router = useRouter();

  const {data: activities} = useQuery({
    queryKey: [QUERY_KEYS.activity.itemActivities, router.query["item-id"]],
    enabled: !!router.query["item-id"] && !!nft,
    queryFn: async () => {
      const [resp] = await api.activity.getItemActivities((router.query["item-id"] as string) || "");
      return resp;
    },
  });

  return <ActivityTable activities={activities || []} />;
};
