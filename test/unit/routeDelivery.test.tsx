import React from "react";
import { render, screen } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";

import { ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { StabCartApi } from "./stubAPI";

const basename = "/hw/store";
const DELIVERY_P1 = "Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedi";
const DELIVERY_P2 = "Dolores magnam consequatur iste aliquam qui sint non ab. Culpa saepe omn";
const DELIVERY_P3 = "Pariatur nisi nobis hic ut facilis sunt reru";

describe("Render all pages", () => {
  it("Should render root route and navigate to static pages", async () => {
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

    // find link to Delivery and navigate
    await user.click(screen.getByRole("link", { name: "Delivery" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Delivery");
    expect(screen.getByText(DELIVERY_P1, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(DELIVERY_P2, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(DELIVERY_P3, { exact: false })).toBeInTheDocument();
  });
});
