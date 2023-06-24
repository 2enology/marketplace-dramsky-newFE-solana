import React, {useEffect} from "react";
import NProgress from "nprogress";
import {useRouter} from "next/router";

export default function ProgressBar({}) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", async (url, {shallow}) => {
      if (!shallow) {
        NProgress.start();
      }
    });
    router.events.on("routeChangeComplete", (url, {shallow}) => {
      if (!shallow) {
        NProgress.done();
      }
    });
    router.events.on("routeChangeError", (url, {shallow}) => {
      if (!shallow) {
        NProgress.done();
      }
    });
    // eslint-disable-next-line
  }, []);

  return <div />;
}
