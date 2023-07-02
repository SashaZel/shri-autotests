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

describe("Cart render order form", () => {
  it("Should render order form when cart is not empty", async () => {
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

    expect(screen.queryByRole("heading", { level: 2, name: "Сheckout" })).toBeInTheDocument();
    expect(screen.queryAllByRole("textbox")).toHaveLength(3);
    expect(screen.queryByLabelText("Name")).toBeInTheDocument();
    expect(screen.queryByLabelText("Phone")).toBeInTheDocument();
    expect(screen.queryByLabelText("Address")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Checkout" })).toBeInTheDocument();
  });
});

describe("Cart Order Form require Name", () => {
  it("Should render warning message if Checkout with empty name field", async () => {
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

    expect(screen.queryByLabelText("Name")?.className).not.toContain("is-invalid");
    await user.click(screen.getByRole("button", { name: "Checkout" }));
    expect(screen.queryByLabelText("Name")?.className).toContain("is-invalid");
  });
});

describe("Cart Order Form require phone", () => {
  it("Should render warning message if Checkout with empty phone field", async () => {
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

    expect(screen.queryByLabelText("Phone")?.className).not.toContain("is-invalid");
    await user.click(screen.getByRole("button", { name: "Checkout" }));
    expect(screen.queryByLabelText("Phone")?.className).toContain("is-invalid");
  });
});

describe("Cart Order Form require address", () => {
  it("Should render warning message if Checkout with empty address field", async () => {
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

    expect(screen.queryByLabelText("Address")?.className).not.toContain("is-invalid");
    await user.click(screen.getByRole("button", { name: "Checkout" }));
    expect(screen.queryByLabelText("Address")?.className).toContain("is-invalid");
  });
});

describe("Cart Order Form wrong phone", () => {
  it("Should render warning message if Checkout with wrong format phone", async () => {
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

    expect(screen.queryByLabelText("Phone")?.className).not.toContain("is-invalid");
    await user.type(screen.getByLabelText("Phone"), "hello phone123");
    await user.click(screen.getByRole("button", { name: "Checkout" }));
    expect(screen.queryByLabelText("Phone")?.className).toContain("is-invalid");
  });
});

describe("Cart Order Form happy path", () => {
  it("Should render confirmation message after Checkout with right form input", async () => {
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

    expect(screen.queryByRole("heading", { name: "Well done!" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("paragraph", { name: "Please wait for confirmation of delivery." })
    ).not.toBeInTheDocument();
    await user.type(screen.getByLabelText("Name"), "Leo Tolstoy");
    await user.type(screen.getByLabelText("Phone"), "1234567890");
    await user.type(screen.getByLabelText("Address"), "Russian Empire, Yasnaya Polyana, count's palace");
    await user.click(screen.getByRole("button", { name: "Checkout" }));
    const confirmationHeader = await waitFor(() => screen.queryByRole("heading", { name: "Well done!" }), {
      timeout: 2000,
    });
    const confirmationParagraph = await waitFor(() => screen.queryByText("Please wait for confirmation of delivery."), {
      timeout: 2000,
    });
    expect(confirmationHeader).toBeInTheDocument();
    expect(confirmationParagraph).toBeInTheDocument();
  });
});
