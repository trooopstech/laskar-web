import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@szhsin/react-menu/dist/index.css";
import "emoji-mart/css/emoji-mart.css";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import AppRoute from "./pages/app";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import client from "hooks/useApollo";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ReactGA from "react-ga";

Sentry.init({
  dsn: "https://bb7103eba8cd43d398c1abe6d11cdce8@o1054055.ingest.sentry.io/6039146",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactGA.initialize("G-DVXXV5HTRJ", { standardImplementation: true });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastContainer />
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
