import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";

import { ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StabCartApi, StabNoEmptyCartApi, StubExampleApi } from "./stubAPI";
import { mockProduct } from "./mockData";

const basename = "/hw/store";

describe("Cart render (empty)", () => {
  it("Should render empty Cart", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);

    expect(
      screen.getByText("Cart is empty. Please select products in the ", {
        exact: false,
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Сheckout" })).not.toBeInTheDocument();
  });
});

describe("Cart render items", () => {
  it("Should render items in the Cart", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);

    expect(
      screen.queryByText("Cart is empty. Please select products in the ", {
        exact: false,
      })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(mockProduct[1].name)).toBeInTheDocument();
    expect(screen.queryByText(mockProduct[4].name)).toBeInTheDocument();
    expect(screen.queryByText(mockProduct[6].name)).toBeInTheDocument();
  });
});

describe("Cart calculate price", () => {
  it("Should calculate price*quantity for each item and total price", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);

    const totalForItem4 = `$${String(mockProduct[4].price * 5)}`;
    const totalForItem6 = `$${String(mockProduct[6].price * 2)}`;
    const total = `$${String(mockProduct[4].price * 5 + mockProduct[6].price * 2 + mockProduct[1].price)}`;
    expect(screen.queryByText(totalForItem4)).toBeInTheDocument();
    expect(screen.queryByText(totalForItem6)).toBeInTheDocument();
    expect(screen.queryByText(total)).toBeInTheDocument();
    expect(screen.queryAllByText(`$${mockProduct[1].price}`)).toHaveLength(2);
  });
});

describe("Cart Clear button action", () => {
  it("Should delete items when click Clear Shopping Cart", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabNoEmptyCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    const clearButton = await waitFor(() => screen.getByRole("button", { name: "Clear shopping cart" }), {
      timeout: 2000,
    });
    await user.click(clearButton);

    expect(screen.queryByRole("button", { name: "Clear shopping cart" })).not.toBeInTheDocument();
    expect(
      screen.getByText("Cart is empty. Please select products in the ", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Cart tests nav", () => {
  it("Should render root route and navigate to empty Cart", async () => {
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
    const user = userEvent.setup();

    // find link to Catalog and navigate
    await user.click(screen.getByRole("link", { name: "Cart" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Shopping cart");
  });
});

describe("Item in Cart indication", () => {
  it("Should update Cart indicator in header", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/catalog/2"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    const addButton = await waitFor(() => screen.getByRole("button", { name: "Add to Cart" }), { timeout: 2000 });
    await user.click(addButton);

    const wrongLinkToTheEmptyCart = screen.queryByRole("link", { name: "Cart" });
    expect(wrongLinkToTheEmptyCart).not.toBeInTheDocument();
    let linkToTheCartWithOneItem = screen.queryByRole("link", { name: "Cart (1)" });
    expect(linkToTheCartWithOneItem).toBeInTheDocument();
  });
});

describe("Add item", () => {
  it("Should render item page and add item to the Cart", async () => {
    const stabApi = new StubExampleApi(basename) as unknown;
    const cart = new StabCartApi();
    const store = initStore(stabApi as ExampleApi, cart);

    const application = (
      <MemoryRouter initialEntries={["/catalog/2"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(application);
    const user = userEvent.setup();

    const linkToTheEmptyCart = screen.queryByRole("link", { name: "Cart" });
    expect(linkToTheEmptyCart).toBeInTheDocument();

    const addButton = await waitFor(() => screen.getByRole("button", { name: "Add to Cart" }), { timeout: 2000 });
    await user.click(addButton);

    const wrongLinkToTheEmptyCart = screen.queryByRole("link", { name: "Cart" });
    expect(wrongLinkToTheEmptyCart).not.toBeInTheDocument();
    let linkToTheCartWithOneItem = screen.queryByRole("link", { name: "Cart (1)" });
    expect(linkToTheCartWithOneItem).toBeInTheDocument();

    linkToTheCartWithOneItem = screen.getByRole("link", { name: "Cart (1)" });
    await user.click(linkToTheCartWithOneItem);
  });
});
