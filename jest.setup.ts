declare let global: any;
import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
// tslint:disable-next-line:no-var-requires
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

class FormDataMock {
  public append = jest.fn();
}

global.FormData = FormDataMock;
