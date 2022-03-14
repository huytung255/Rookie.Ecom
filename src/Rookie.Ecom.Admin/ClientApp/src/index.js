import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/assets/plugins/nucleo/css/nucleo.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/css/argon-dashboard-react.css";
import "../src/assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { OidcProvider } from "redux-oidc";
import userManager from "./utils/userManager";
// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const history = createBrowserHistory({ basename: baseUrl });
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      {/* <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter> */}
      <App />
    </OidcProvider>
  </Provider>,
  rootElement
);

registerServiceWorker();
export { store };
