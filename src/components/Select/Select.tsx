import React, {FC, useRef, useState} from "react";
import styles from "./Select.module.scss";
import {ChevDownIcon} from "../Icons/Icons";
import {Checkbox} from "../Checkbox/Checkbox";
import {useOnClickOutside} from "../../hooks/use-onclick-outside";
import cn from "classnames";

type Props = {
  list: any[];
  value: any;
  displayAs: (v: any) => any;
  onChange: (v: any) => void;
  className?: string;
  popupClassName?: string;
  selectValueClassName?: string;
  valueAs?: (v: any) => any;
  label?: string;
};

export const Select: FC<Props> = ({
  list,
  value,
  displayAs,
  className,
  onChange,
  popupClassName,
  selectValueClassName,
  label,
  valueAs,
}) => {
  const [open, setOpen] = useState(false);

  const elem = useRef(null);
  useOnClickOutside(elem, () => setOpen(false));

  return (
    <>
      {label && <div className={styles["label"]}>{label}</div>}

      <div className={cn(styles["select"], className)} ref={elem}>
        <div
          className={cn(styles["select-value"], open && styles["open"], selectValueClassName)}
          onClick={() => setOpen(true)}
        >
          <div className={styles["value"]}>{valueAs ? valueAs(value) : displayAs(value)}</div> <ChevDownIcon />
        </div>

        <div className={cn(styles["popup"], open && styles["open"], popupClassName)}>
          {list.map((item) => (
            <div
              className={styles["select-item"]}
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {displayAs(item)}

              {item == value && <Checkbox className={styles["checkbox"]} value={true} onChange={() => {}} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
