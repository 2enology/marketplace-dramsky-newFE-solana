import React, {FC, useEffect, useRef} from "react";

type Props = {
  fn: (e: any) => void;
  eventName: string;
};

export const GlobalEvents: FC<Props> = ({fn, eventName}) => {
  const listener = useRef<any>();

  useEffect(() => {
    const listener1 = (e: any) => {
      fn(e);
    };

    window.addEventListener(eventName, listener1);
    listener.current = listener1;

    return () => {
      const l1 = listener.current;
      if (l1) {
        window.removeEventListener(eventName, l1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
