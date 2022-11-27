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

  async confirmAge() {
    const element = await this.findByXpath("//button[text()='YES']");
    await element.click();
    
    return this;
  }
}

module.exports = BasePage;
