const assert = require("chai").assert;
const { Builder, Capabilities } = require("selenium-webdriver");
const ProductPage = require("../pages/productPage");

describe("Adding an item to the bag", () => {
  const pageUrl = "https://www.honeyroseusa.com/ecwid#!/WHITE/p/47998162/category=32354212";

  beforeEach(async function () {
    const capabilities = {
      ...Capabilities.chrome(),
    };
    this.driver = await new Builder().usingServer("http://localhost:4444/wd/hub").withCapabilities(capabilities).build();
    await this.driver.manage().window().maximize();
  });

  it("Choose Quantity of the product lower then 1", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(pageUrl);
    await productPage.confirmAge();
    await productPage.choseQuantity("0");
    await productPage.clickAddButton();
    await productPage.goToTheBag();
    const element = await productPage.getNumberElements();
    assert.isTrue(element.includes("1"));
  }).timeout(20000);

  it("Choose Quantity of the product is true", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(pageUrl);
    await productPage.confirmAge();
    await productPage.choseQuantity("5");
    await productPage.clickAddButton();
    await productPage.goToTheBag();
    const element = await productPage.getNumberElements();
    assert.isTrue(element.includes("5"));
  }).timeout(20000);

  it("Add more button is shown", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(pageUrl);
    await productPage.confirmAge();
    await productPage.choseQuantity("5");
    await productPage.clickAddButton();
    const element = await productPage.getAddMoreButton();
    assert.isTrue(element == "Add More");
  }).timeout(20000);

  it("Product is shown in the bag", async function () {
    const productPage = new ProductPage(this.driver);
    await productPage.openPage(pageUrl);
    await productPage.confirmAge();
    await productPage.choseQuantity("5");
    await productPage.clickAddButton();
    await productPage.goToTheBag();
    const element = await productPage.getNumberElements();
    assert.isTrue(element.includes("5"));
  }).timeout(20000);

  afterEach(async function () {
    await this.driver.quit();
  });
});
