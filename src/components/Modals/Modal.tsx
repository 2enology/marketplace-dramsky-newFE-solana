import React, {FC, useRef} from "react";
import cn from "classnames";
import {GlobalEvents} from "../GlobalEvents/GlobalEvents";

type Props = {
  className?: string | null;
  content: JSX.Element | JSX.Element[];
  onDismiss: () => void;
  contentWidth?: number | string;
  cantClickOut?: boolean;
};

export const Modal: FC<Props> = ({className, content, onDismiss, contentWidth, cantClickOut}) => {
  const overlayElem = useRef<HTMLDivElement>(null);

  return (
    <div className="app-modal">
      <div
        className="app-modal-overlay"
        onMouseDown={(e) => !cantClickOut && e.target == overlayElem.current && onDismiss()}
        onTouchStart={(e) => !cantClickOut && e.target == overlayElem.current && onDismiss()}
        ref={overlayElem}
      >
        <div className={cn(className || "app-modal-box")} style={{width: contentWidth}}>
          {content}
        </div>
      </div>

      <GlobalEvents
        fn={(e) => {
          if (e.key == "Escape" && !cantClickOut) {
            onDismiss();
          }
        }}
        eventName="keydown"
      />
    </div>
  );
};
