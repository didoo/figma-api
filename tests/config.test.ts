import { API_DOMAIN, API_VER, API_VER_WEBHOOKS } from '../src/config';

describe('config', () => {
  test('API_DOMAIN should be the correct Figma API domain', () => {
    expect(API_DOMAIN).toBe('https://api.figma.com');
  });

  test('API_VER should be v1', () => {
    expect(API_VER).toBe('v1');
  });

  test('API_VER_WEBHOOKS should be v2', () => {
    expect(API_VER_WEBHOOKS).toBe('v2');
  });

  test('all exports should be strings', () => {
    expect(typeof API_DOMAIN).toBe('string');
    expect(typeof API_VER).toBe('string');
    expect(typeof API_VER_WEBHOOKS).toBe('string');
  });
});