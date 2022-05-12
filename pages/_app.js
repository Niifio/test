import Layout from "../components/Layout";
import "../styles/globals.css";
import { TableProvider } from "../components/ContextApi";

function MyApp({ Component, pageProps }) {
  return (
    <TableProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TableProvider>
  );
}

export default MyApp;
