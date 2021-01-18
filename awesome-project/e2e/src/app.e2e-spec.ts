import {AppPage} from './app.po';
import {browser, logging} from 'protractor';
import {ROUTE} from '../../src/app/shared/routes/routes';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display AWESOME PROJECT', () => {
    page.navigateTo('/');
    expect(page.getTextByElement('.awesome')).toEqual('AWESOME PROJECT');
  });

  it('should set values to userName and password, and login', () => {
    page.setFormField('.userName', '1');
    page.setFormField('.password', '1');

    page.clickByElement('.sign-in');
    expect(page.getCurrentUrl()).toEqual(`http://localhost:1234/${ROUTE.main}`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
