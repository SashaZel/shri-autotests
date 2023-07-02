import React from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";

import {
  ExampleApi
} from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StabCartApi } from "./stubAPI";

const basename = "/hw/store";
const HOME_HEADER = "Welcome to Example store!";
const CONTACT_P1 =
  "Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur";
const CONTACT_P2 =
  "Molestias inventore illum architecto placeat molestias ipsam facilis";

describe("Contact page test", () => {
  it("Should render root route and navigate to Contact page", async () => {
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
    const user = userEvent.setup();

    // find link to Catalog and navigate
    await user.click(screen.getByRole("link", { name: "Contacts" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Contacts"
    );
    expect(screen.getByText(CONTACT_P1, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(CONTACT_P2, { exact: false })).toBeInTheDocument();

  });

});
