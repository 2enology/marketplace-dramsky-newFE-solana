import React, {FC} from "react";
import {AppHeader} from "./Header/AppHeader";
import {AppFooter} from "./Footer/AppFooter";
import {useWindowSize} from "../../hooks/use-window-size";

type Props = {
  hideHeaderInMobile?: boolean;
};

export const Layout: FC<Props> = ({children, hideHeaderInMobile}) => {
  const {width} = useWindowSize();

  const useCustomHeader = !(hideHeaderInMobile && (width || Infinity) < 1024);

  return (
    <>
      {useCustomHeader && <AppHeader />}

      <div
        style={{
          paddingTop: !useCustomHeader ? 85 : 0,
        }}
      >
        {children}
      </div>

      <AppFooter />
    </>
  );
};
