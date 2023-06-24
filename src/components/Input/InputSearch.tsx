import React, {FC} from "react";
import styles from "./InputSearch.module.scss";
import {Input, InputProp} from "./Input";
import {SearchIcon} from "../Icons/Icons";

export const InputSearch: FC<InputProp> = (props) => {
  return <Input {...props} rightIcon={<SearchIcon />} />;
};
