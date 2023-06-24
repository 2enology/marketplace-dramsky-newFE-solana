import React, {FC} from "react";
import {GlobalEvents} from "./GlobalEvents";

type Props = {
  fn: (e: any) => void;
};

export const GlobalMouseMove: FC<Props> = ({fn}) => {
  return <GlobalEvents fn={fn} eventName="mousemove" />;
};
