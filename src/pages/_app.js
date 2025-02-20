import "@/styles/globals.css";
//import "@/styles/caja.css";
import "@/styles/modal.css";

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

import { useEffect } from "react";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    fetch("/api/socket");
  }, []);
  return (
    <>
      <ProgressBar
        options={{
          showSpinner: true,
        }}
        shallowRouting
        color="var(--primary-color)"
      />
      <Component {...pageProps} />

    </>
  );
}
