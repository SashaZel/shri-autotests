import { test, expect } from "@playwright/test";
import { mockProduct, mockShortProduct } from "../test/unit/mockData";

/*
test('Path /contacts render "Contacts" page', async ({ page }) => {
  await page.goto("/hw/store/contacts");
  // await page.screenshot({ path: 'e2e/screenshots/contacts.png', fullPage: true });
  await page.screenshot({ path: 'e2e/screenshots/contacts.png', fullPage: true });

  // await expect(page.getByTestId("page-title")).toHaveText("About");
  await expect(page.getByRole("heading", { name: "Contacts"})).toHaveText("Contacts");
});
*/

test("Navbar render", async ({ page }) => {
  await page.goto("/hw/store/");
  await expect(page.locator("nav")).toHaveScreenshot();
  expect(await page.locator("nav").screenshot()).toMatchSnapshot();
});

test("Mobile Menu open", async ({ page }) => {
  await page.goto("/hw/store/");
  page.setViewportSize({ width: 400, height: 800 });
  const hamburger = await page.waitForSelector(".navbar-toggler-icon");
  hamburger.click();
  await expect(page).toHaveScreenshot();
  expect(await page.screenshot()).toMatchSnapshot();
});

test("Mobile Menu closed", async ({ page }) => {
  await page.goto("/hw/store/");
  // await page.screenshot({ path: 'e2e/screenshots/contacts.png', fullPage: true });
  //await page.screenshot({ path: 'e2e/screenshots/contacts.png', fullPage: true });
  page.setViewportSize({ width: 400, height: 800 });
  const hamburger = await page.waitForSelector(".navbar-toggler-icon");
  hamburger.click();
  // const contactLink = page.getByRole("button", { name: "Contact" });
  const contactLink = page.getByTestId("link-contacts");
  contactLink.click();
  // page.waitForSelector('collapse')
  // page.waitForLoadState('networkidle')
  // await page.waitForTimeout(1000);
  await expect(page).toHaveScreenshot();
  expect(await page.screenshot()).toMatchSnapshot();

  // await expect(page.getByTestId("page-title")).toHaveText("About");
  //await expect(page.getByRole("heading", { name: "Contacts" })).toHaveText("Contacts");
});

test("Home page content", async ({ page }) => {
  await page.goto("/hw/store/");
  await expect(page.locator(".Home")).toHaveScreenshot();
  expect(await page.locator(".Home").screenshot()).toMatchSnapshot();
});

test("Contacts page content render", async ({ page }) => {
  await page.goto("/hw/store/contacts");
  await expect(page.locator(".Contacts")).toHaveScreenshot();
  expect(await page.locator(".Contacts").screenshot()).toMatchSnapshot();
});

test("Delivery page content render", async ({ page }) => {
  await page.goto("/hw/store/delivery");
  await expect(page.locator(".Delivery")).toHaveScreenshot();
  expect(await page.locator(".Delivery").screenshot()).toMatchSnapshot();
});

test("Catalog page content load", async ({ page }) => {
  await page.goto("/hw/store/catalog");
  await expect(page.locator(".Catalog")).toContainText("$");
  await expect(page.locator(".Catalog")).toContainText("Details");
});

test("Catalog page content render", async ({ page }) => {
  await page.route("/hw/store/api/products", async (route) => {
    const json = mockShortProduct;
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog");
  await expect(page.locator(".Catalog")).toHaveScreenshot();
  expect(await page.locator(".Catalog").screenshot()).toMatchSnapshot();
});

test("Product page content render", async ({ page }) => {
  await page.route("/hw/store/api/products/3", async (route) => {
    const json = mockProduct[3];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/3");
  await expect(page.locator(".Product")).toHaveScreenshot();
  expect(await page.locator(".Product").screenshot()).toMatchSnapshot();
});

test("Cart(1) icon indicator", async ({ page }) => {
  await page.goto("/hw/store/catalog/4");
  const addToCartButton = await page.waitForSelector(".ProductDetails-AddToCart");
  addToCartButton.click();
  await expect(page.locator(".navbar-nav")).toHaveScreenshot();
  expect(await page.locator(".navbar-nav").screenshot()).toMatchSnapshot();
});

test("Cart state persist reload", async ({ page }) => {
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.reload({waitUntil:'load'});
  await expect(page.locator(".navbar-nav")).toHaveScreenshot();
  expect(await page.locator(".navbar-nav").screenshot()).toMatchSnapshot();
});

test("Cart add 3 items", async ({ page }) => {
  await page.route("/hw/store/api/products/4", async (route) => {
    const json = mockProduct[4];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.click(".ProductDetails-AddToCart");
  await page.click(".ProductDetails-AddToCart");
  await page.goto("/hw/store/cart");
  await expect(page.locator(".Cart-Table")).toHaveScreenshot();
  expect(await page.locator(".Cart-Table").screenshot()).toMatchSnapshot();
});

test("Cart page content empty", async ({ page }) => {
  await page.goto("/hw/store/cart");
  await expect(page.locator(".Cart")).toHaveScreenshot();
  expect(await page.locator(".Cart").screenshot()).toMatchSnapshot();
});

test("Cart page content product", async ({ page }) => {
  await page.route("/hw/store/api/products/4", async (route) => {
    const json = mockProduct[4];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.goto("/hw/store/cart");
  await expect(page.locator(".Cart")).toHaveScreenshot();
  expect(await page.locator(".Cart").screenshot()).toMatchSnapshot();
});

test("Cart clear click", async ({ page }) => {
  await page.route("/hw/store/api/products/4", async (route) => {
    const json = mockProduct[4];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.goto("/hw/store/cart");
  await page.click(".Cart-Clear");
  await expect(page.locator(".Cart")).toHaveScreenshot();
  expect(await page.locator(".Cart").screenshot()).toMatchSnapshot();
});

test("Cart page form warning", async ({ page }) => {
  await page.route("/hw/store/api/products/5", async (route) => {
    const json = mockProduct[5];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.goto("/hw/store/cart");
  await page.getByLabel("Phone").fill("12345JohnDoue901234");
  await page.click(".Form-Submit");
  await expect(page.locator(".Form")).toHaveScreenshot();
  expect(await page.locator(".Form").screenshot()).toMatchSnapshot();
});

test("Cart page order submit", async ({ page }) => {
  await page.route("/hw/store/api/products/5", async (route) => {
    const json = mockProduct[5];
    await route.fulfill({ json });
  });
  await page.goto("/hw/store/catalog/4");
  await page.click(".ProductDetails-AddToCart");
  await page.goto("/hw/store/cart");
  await page.getByLabel("Name").fill("Leo Tolstoy");
  await page.getByLabel("Phone").fill("12345901234");
  await page.getByLabel("Address").fill("Russian Empire, Krasnaya Polyana, Count's palace");
  await page.click(".Form-Submit");
  await expect(page).toHaveScreenshot();
  expect(await page.screenshot()).toMatchSnapshot();
});
