const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  
  async choseQuantity(quantity) {
    const element = await this.findByXpath("//input[@id='qty-field']");
    await element.sendKeys(quantity, Key.ENTER);

    return this;
  }

  async clickAddButton() {
    const element = await this.findByXpath("//span[text()='Add to Bag']//ancestor::button");
    await element.click();

    return this;
  }

  async getAddMoreButton() {
    const element = await this.findByXpath("//button/span[text()='Add More']");
    return element.getAttribute("innerHTML");
  }

  async goToTheBag() {
    const element = await this.findByXpath("//div[@class='ec-minicart ec-minicart--m ec-minicart--inline ec-minicart--responsive ec-minicart--no-shape ec-minicart--animation-default ec-minicart--animated']");
    await element.click();

    return this;
  }

  async getNumberElements() {
    const element = await this.findByXpath("//div[@class='form-control--select-inline  form-control ec-link']//child::div");
    return element.getText();
  }
}

module.exports = ProductPage;
