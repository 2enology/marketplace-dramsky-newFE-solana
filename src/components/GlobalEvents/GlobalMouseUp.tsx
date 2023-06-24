import React, {FC} from "react";
import {GlobalEvents} from "./GlobalEvents";

type Props = {
  fn: (e: any) => void;
};

export const GlobalMouseUp: FC<Props> = ({fn}) => {
  return <GlobalEvents fn={fn} eventName="mouseup" />;
};
