import axios, { AxiosResponse } from "axios";
import { ProductShortInfo, Product, CheckoutFormData, CartState, CheckoutResponse } from "../../src/common/types";
import { mockProduct, mockShortProduct } from "./mockData";
import { ExampleApi } from "../../src/client/api";

export class StubExampleApi {
  constructor(private readonly basename: string) {}

  async getProducts(): Promise<AxiosResponse<ProductShortInfo[], any>> {
    const mockResp: AxiosResponse<ProductShortInfo[], any> = {
      data: mockShortProduct,
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    return await mockResp;
  }

  async getProductById(id: number) {
    const mockResp: AxiosResponse<Product, any> = {
      data: mockProduct[id],
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    return await mockResp;
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    const mockResp: AxiosResponse<CheckoutResponse, any> = {
      data: { "id": 2 },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {},
    };
    return await mockResp;
  }
}

export class StabCartApi {
  getState(): CartState {
    return {};
  }
  setState(cart: CartState) {}
}

export class StabNoEmptyCartApi {
  getState(): CartState {
    return {
      1: { name: mockProduct[1].name, count: 1, price: mockProduct[1].price },
      4: { name: mockProduct[4].name, count: 5, price: mockProduct[4].price },
      6: { name: mockProduct[6].name, count: 2, price: mockProduct[6].price },
    };
  }
  setState(cart: CartState) {}
}
