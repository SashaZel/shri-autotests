import React from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";

import { ExampleApi, } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CartState } from "../../src/common/types";
import { StubExampleApi } from "./stubAPI";
import { mockProduct } from "./mockData";

const basename = "/hw/store";
const HOME_HEADER = "Welcome to Example store!";

export class StabCartApi {
  getState(): CartState {
    return {};
  }
  setState(cart: CartState) {}
}

describe("Catalog tests", () => {


  it("Should render root route and navigate to Catalog", async () => {
    const api = new ExampleApi(basename);
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

    // test homepage header
    const homeHeader = await screen.findByText(HOME_HEADER);
    expect(homeHeader).toBeInTheDocument();

    // find link to Catalog and navigate
    await user.click(screen.getByRole("link", { name: "Catalog" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Catalog"
    );
    expect(screen.getByText(mockProduct[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[2].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[3].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[4].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[5].name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct[6].name)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[0].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[1].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[2].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[3].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[4].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[5].price)}`)).toBeInTheDocument();
    expect(screen.getByText(`$${String(mockProduct[6].price)}`)).toBeInTheDocument();

  });

});
