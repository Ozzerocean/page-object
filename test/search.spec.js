const assert = require("chai").assert;
const { Builder, Capabilities } = require("selenium-webdriver");
const SearchPage = require("../pages/searchPage");

describe("Search any product", () => {
  const pageUrl = "https://www.honeyroseusa.com/";

  beforeEach(async function () {
    const capabilities = {
      ...Capabilities.chrome(),
    };
    this.driver = await new Builder().usingServer("http://localhost:4444/wd/hub").withCapabilities(capabilities).build();
    await this.driver.manage().window().maximize();
  });

  afterEach(async function () {
    await this.driver.quit();
  });

  it("Search 'askdkskdaaksdkakdk' product", async function () {
    const searchPage = new SearchPage(this.driver);
    await searchPage.openPage(pageUrl);
    await searchPage.confirmAge();
    await searchPage.closePopup();
    await searchPage.clickSearchButton();
    await searchPage.enterNameOfTheProductToSearch("askdkskdaaksdkakdk");
    assert.isTrue(await searchPage.checkNoResults() == "Sorry, no result");
  }).timeout(20000);

  it("Search 'Cigarettes' product", async function () {
    const searchPage = new SearchPage(this.driver);
    await searchPage.openPage(pageUrl);
    await searchPage.confirmAge();
    await searchPage.closePopup();
    await searchPage.clickSearchButton();
    await searchPage.enterNameOfTheProductToSearch("Cigarettes");
    assert.isTrue(await searchPage.checkNumberResults() > 0);
  }).timeout(20000);
});
