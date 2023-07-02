import React from "react";
import { render, screen } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import "@testing-library/jest-dom";
import { StabCartApi } from "./stubAPI";

const basename = "/hw/store";
const HOME_HEADER = "Welcome to Example store!";
const HOME_P1 = "Culpa perspiciatis corporis facilis fugit similique";
const HOME_P2 = "Modi corporis consectetur aliquid sit cum tenetur enim.";

describe("Index page tests", () => {
  it("Should render Index page with nav elements", async () => {
    const api = new ExampleApi(basename);
    const cart = new StabCartApi();
    const store = initStore(api, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    render(application);

    // find links in the nav
    expect(screen.getByRole("link", { name: "Delivery" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contacts" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  it("Should render Index page with content", async () => {
    const api = new ExampleApi(basename);
    const cart = new StabCartApi();
    const store = initStore(api, cart);

    const application = (
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>
    );

    render(application);

    // test homepage header
    const homeHeader = await screen.findByText(HOME_HEADER);
    expect(homeHeader).toBeInTheDocument();

    // find cards headers
    expect(
      screen.getByRole("heading", { level: 1, name: "Quickly" }).textContent
    ).toBe("Quickly");
    expect(
      screen.getByRole("heading", { level: 1, name: "Qualitatively" })
        .textContent
    ).toBe("Qualitatively");
    expect(
      screen.getByRole("heading", { level: 1, name: "Inexpensive" }).textContent
    ).toBe("Inexpensive");
    expect(screen.getByText(HOME_P1, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(HOME_P2, { exact: false })).toBeInTheDocument();
  });
});
