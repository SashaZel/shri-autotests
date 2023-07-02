import React from "react";

import { createBrowserHistory, createMemoryHistory } from "history";
import {
  findByText,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";

import {
  ExampleApi,
  CartApi,
  LOCAL_STORAGE_CART_KEY,
} from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CartState } from "../../src/common/types";
import { StabCartApi, StubExampleApi } from "./stubAPI";
import { CartBadge } from "../../src/client/components/CartBadge";
import { Form } from "../../src/client/components/Form";
import { Image } from "../../src/client/components/Image";
import { ProductDetails } from "../../src/client/components/ProductDetails";
import { mockProduct } from "./mockData";
import { ProductItem } from "../../src/client/components/ProductItem";

const basename = "/hw/store";
const STORE_NAME = "Example store";
const HOST = "http://localhost/";
const HOME_HEADER = "Welcome to Example store!";
const CONTACT_P1 =
  "Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur";
const CONTACT_P2 =
  "Molestias inventore illum architecto placeat molestias ipsam facilis";
const DELIVERY_P1 =
  "Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedi";
const DELIVERY_P2 =
  "Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omn";
const DELIVERY_P3 = "Pariatur nisi nobis hic ut facilis sunt reru";

describe("Render components", () => {
  it("Should mount BrowserRouter without crash", () => {
    const application = (
      <BrowserRouter basename={basename}>
        <></>
      </BrowserRouter>
    );

    render(application);
  });

  it("Should mount Redux provider with stub API without crash ", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <Provider store={store}>
        <></>
      </Provider>
    );

    render(application);
  });

  it("Should mount Redux provider with real API without crash", async () => {
    const api = new ExampleApi(basename);
    const cart = new StabCartApi();
    const store = initStore(api, cart);

    const application = (
      <Provider store={store}>
        <></>
      </Provider>
    );
    render(application);
  });

  it("Should render Application without crash", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    render(application);
  });

  it("Should render CartBadge without crash", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <CartBadge id={5} />
        </Provider>
      </BrowserRouter>
    );

    render(application);
  });

  it("Should render Form without crash", async () => {
    const application = <Form onSubmit={() => {}} />;
    render(application);
  });

  it("Should render Image without crash", async () => {
    const application = <Image className="awesomeClass" />;
    render(application);
  });

  it("Should render ProductDetails without crash", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductDetails product={mockProduct[1]} />
        </Provider>
      </BrowserRouter>
    );

    render(application);
  });

  it("Should render ProductItem without crash", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <ProductItem product={mockProduct[0]} />
        </Provider>
      </BrowserRouter>
    );

    render(application);
  });
});
