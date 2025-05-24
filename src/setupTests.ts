/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

beforeAll(() => {
  (function () {
    if (!('checkVisibility' in Element.prototype)) {
      // @ts-ignore
      Element.prototype.checkVisibility = function () {
        return true;
      };
    }
  })();
});
