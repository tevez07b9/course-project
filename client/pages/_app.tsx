import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
