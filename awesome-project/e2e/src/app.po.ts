import {browser, by, element, protractor} from 'protractor';

export class AppPage {
  navigateTo(url: string): Promise<unknown> {
    return browser.get(url) as Promise<unknown>;
  }

  getCurrentUrl(): Promise<unknown> {
    return browser.getCurrentUrl() as Promise<unknown>;
  }

  getTextByElement(selector): Promise<unknown> {
    return element(by.css(selector)).getText() as Promise<unknown>;
  }

  setFormField(selector, value): Promise<unknown> {
    const elm = element(by.css(selector));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(elm), 15000);
    return elm.sendKeys(value) as Promise<unknown>;
  }

  clickByElement(selector): Promise<unknown> {
    const elm = element(by.css(selector));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(elm), 15000);
    return elm.click() as Promise<unknown>;
  }
}
