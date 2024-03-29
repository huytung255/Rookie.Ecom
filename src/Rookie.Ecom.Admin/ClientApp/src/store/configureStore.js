import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as Counter from "./Counter";
import * as WeatherForecasts from "./WeatherForecasts";
import * as Category from "./Category";
import * as Product from "./Product";
import * as Profile from "./Profile";
import * as Order from "./Order";
import createOidcMiddleware from "redux-oidc";
import { reducer as oidc } from "redux-oidc";
import userManager from "../utils/userManager";

export default function configureStore(history, initialState) {
  const reducers = {
    categories: Category.reducer,
    products: Product.reducer,
    profile: Profile.reducer,
    orders: Order.reducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    oidc,
  };

  const oidcMiddleware = createOidcMiddleware(userManager);
  const middleware = [thunk, routerMiddleware(history), oidcMiddleware];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
