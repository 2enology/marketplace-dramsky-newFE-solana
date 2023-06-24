import Head from "next/head";
import Wallet from "../components/WalletProvider/Wallet";
import "../../styles/global-styles.scss";
import "../../styles/toast-transition.scss";
import GetNFTDataProvider from "../contexts/NFTDataProvider";
import GetActivityDataProvider from "../contexts/ActivityDataProvider";
import {Layout} from "../modules/Layout/Layout";
import {ModalContextProvide} from "../hooks/use-modal";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import ToastRegister from "../components/Toast/Toast";
import {QueryClient, QueryClientProvider} from "react-query";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";

export const queryClient = new QueryClient();

function Marketplace({Component, pageProps}: {Component: any; pageProps: any}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Wallet>
        <WalletModalProvider>
          <GetNFTDataProvider>
            <ModalContextProvide>
              <Head>
                <link rel="icon" type="image/x-icon" href="/favicon.svg" />
                <title>Dramsky Marketplace</title>
              </Head>
              <Layout {...pageProps}>
                <Component {...pageProps} />
              </Layout>
            </ModalContextProvide>
            <ProgressBar />
          </GetNFTDataProvider>
        </WalletModalProvider>
      </Wallet>
      <ToastRegister />
    </QueryClientProvider>
  );
}

export default Marketplace;
