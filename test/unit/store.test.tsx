import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import { ExampleApi } from "../../src/client/api";
import {
  ApplicationState,
  addToCart,
  checkout,
  checkoutComplete,
  clearCart,
  initStore,
  productDetailsLoad,
  productDetailsLoaded,
  productsLoad,
  productsLoaded,
} from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StabCartApi, StabNoEmptyCartApi, StubExampleApi } from "./stubAPI";
import { mockProduct, mockShortProduct } from "./mockData";

const basename = "/hw/store";

describe("Test Redux productsLoad action", () => {
  it("Should add products when call productsLoad() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(productsLoad())}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    const expectedState: ApplicationState = { products: mockShortProduct, details: {}, cart: {} };

    expect(store.getState()).toStrictEqual(expectedState);
  });
});

describe("Test Redux productsLoaded action", () => {
  it("Should add products when call productsLoaded() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(productsLoaded(mockShortProduct))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    const expectedState: ApplicationState = { products: mockShortProduct, details: {}, cart: {} };

    expect(store.getState()).toStrictEqual(expectedState);
  });
});

describe("Test Redux productDetailsLoad action", () => {
  it("Should add product details when call productDetailsLoad() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(productDetailsLoad(2))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    const expectedState: ApplicationState = { details: { "2": mockProduct[2] }, cart: {} };

    expect(store.getState()).toStrictEqual(expectedState);
  });
});

describe("Test Redux productDetailsLoaded() action", () => {
  it("Should add product details when call productDetailsLoaded() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(productDetailsLoaded(mockProduct[3]))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    const expectedState: ApplicationState = { details: { "3": mockProduct[3] }, cart: {} };

    expect(store.getState()).toStrictEqual(expectedState);
  });
});

describe("Test Redux AddToCart() action", () => {
  it("Should add product to Cart when call AddToCart() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(addToCart(mockProduct[4]))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    const expectedState: ApplicationState = {
      details: {},
      cart: { "4": { count: 1, name: mockProduct[4].name, price: mockProduct[4].price } },
      latestOrderId: undefined,
    };

    expect(store.getState()).toStrictEqual(expectedState);
  });
});

describe("Test Redux clearCart action", () => {
  it("Should clear cart when call clearCart() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(clearCart())}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(store.getState()).toStrictEqual({ details: {}, cart: {}, latestOrderId: undefined });
  });
});

describe("Test Redux checkout action", () => {
  it("Should update state when call checkout() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      const storeState = store.getState();
      const formState = {
        name: "Anton Checkhov",
        phone: "8800888888",
        address: "Moscow, China-town",
      };
      return <button onClick={() => dispatch(checkout(formState, storeState.cart))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(store.getState()).toStrictEqual({ details: {}, cart: {}, latestOrderId: 2 });
  });
});

describe("Test Redux checkoutComplete action", () => {
  it("Should update state when call checkoutComplete() action", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const MockComponent = () => {
      const dispatch = useDispatch();
      return <button onClick={() => dispatch(checkoutComplete(2))}>Mock Button</button>;
    };

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <MockComponent />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button"));

    expect(store.getState()).toStrictEqual({ details: {}, cart: {}, latestOrderId: 2 });
  });
});
