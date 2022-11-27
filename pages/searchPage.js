const BasePage = require("./basePage");
const { Key } = require("selenium-webdriver");

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
  }
  
  async clickSearchButton() {
    const element = await this.findByXpath("//button[@class='icon_search']");
    await element.click();

    return this;
  }

  async enterNameOfTheProductToSearch(productToSearch) {
    const element = await this.findByXpath("//input[@placeholder='Search']");
    await element.sendKeys(productToSearch, Key.ENTER);

    return this;
  }

  async checkNoResults() {
    const element = await this.findByXpath("//div[@class='news_title']");
    return element.getText();
  }

  async checkNumberResults() {
    const elements = await this.findElementsByXpath("//li[@class='combo_hover']");
    return elements.length;
  }
}

module.exports = ProductPage;
