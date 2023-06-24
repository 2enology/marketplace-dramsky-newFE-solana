import React, {FC, useEffect, useRef, useState} from "react";
import styles from "./Tooltip.module.scss";
import cn from "classnames";
import {useEventListener} from "../../hooks/use-event-listener";

type Props = {
  text: string;
  className?: string;
  width: number;
};

export const Tooltip: FC<Props> = ({text, children, className, width}) => {
  const [position, setPosition] = useState<null | {top: number; left: number; height: number; wrapperWidth: number}>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState<boolean>(false);

  const {top, left, height, wrapperWidth} = position || {};

  useEffect(() => {
    const pos = wrapperRef.current?.getBoundingClientRect();
    const tooltipPos = ref.current?.getBoundingClientRect();
    if (pos && tooltipPos) {
      const {top, left} = pos;
      setPosition({
        top,
        left,
        height: tooltipPos.height,
        wrapperWidth: pos.width,
      });
    }
  }, []);

  useEventListener("scroll", () => {
    setHovering(false);
  });

  return (
    <div
      className={cn(styles["tooltip"], className)}
      ref={wrapperRef}
      onMouseEnter={() => {
        const parentRef = wrapperRef.current?.getBoundingClientRect();
        if (parentRef) {
          setPosition((p) => {
            if (p) {
              return {...p, top: parentRef.top, left: parentRef.left};
            }

            return null;
          });
          setHovering(true);
        }
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      {children}

      <div
        className={cn(styles["tooltip-data"], hovering && styles["show"])}
        style={{width, top: (top || 0) - (height || 0) - 15, left: (left || 0) - width / 2 + (wrapperWidth || 0) / 2}}
        ref={ref}
      >
        {text}
      </div>
    </div>
  );
};
