import * as FigmaAPI from '../src/index';
import { API_DOMAIN, API_VER, API_VER_WEBHOOKS } from '../src/config';
import { Api } from '../src/api-class';

describe('index exports', () => {
  test('should export config constants', () => {
    expect(FigmaAPI.API_DOMAIN).toBe(API_DOMAIN);
    expect(FigmaAPI.API_VER).toBe(API_VER);
    expect(FigmaAPI.API_VER_WEBHOOKS).toBe(API_VER_WEBHOOKS);
  });

  test('should export Api class', () => {
    expect(FigmaAPI.Api).toBe(Api);
    expect(typeof FigmaAPI.Api).toBe('function');
  });

  test('should export oAuthLink and oAuthToken functions', () => {
    expect(typeof FigmaAPI.oAuthLink).toBe('function');
    expect(typeof FigmaAPI.oAuthToken).toBe('function');
  });
});