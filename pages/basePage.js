const { By, until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    await this.driver.get(url);
    return this;
  }

  async findByXpath(xpath) {
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
  }

  async findElementsByXpath(xpath) {
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), 5000);
  }

  async confirmAge() {
    const element = await this.findByXpath("//button[text()='YES']");
    await element.click();
    
    return this;
  }

  async closePopup() {
    let popup = await this.findByXpath("//div[@class='popup_block sale_popup showed']");

    const element = await this.findByXpath("//button[@class='popup_close icon_close']");
    await element.click();

    return this;
  }
}

module.exports = BasePage;
