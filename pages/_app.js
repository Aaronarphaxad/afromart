import "@/styles/globals.css";
import "@/styles/newstyles.css";
import { Layout } from "../components";
import ErrorBoundary from "@/components/ErrorBoundary";
import { StateContext } from "@/context/StateContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </ErrorBoundary>
  );
}
