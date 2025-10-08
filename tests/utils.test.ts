import { toQueryParams, ApiError } from '../src/utils';

describe('utils', () => {
  describe('toQueryParams', () => {
    test('should return empty string for null/undefined/falsy values', () => {
      expect(toQueryParams(null)).toBe('');
      expect(toQueryParams(undefined)).toBe('');
      expect(toQueryParams(false)).toBe('');
      expect(toQueryParams(0)).toBe('');
      expect(toQueryParams('')).toBe('');
    });

    test('should convert object to query string', () => {
      const params = { key1: 'value1', key2: 'value2' };
      const result = toQueryParams(params);
      expect(result).toBe('key1=value1&key2=value2');
    });

    test('should handle special characters by encoding them', () => {
      const params = { search: 'hello world', special: 'a+b=c' };
      const result = toQueryParams(params);
      expect(result).toBe('search=hello%20world&special=a%2Bb%3Dc');
    });

    test('should filter out falsy values', () => {
      const params = { key1: 'value1', key2: '', key3: null, key4: 'value4', key5: undefined };
      const result = toQueryParams(params);
      expect(result).toBe('key1=value1&key4=value4');
    });

    test('should handle numbers as values', () => {
      const params = { page: 1, limit: 50 };
      const result = toQueryParams(params);
      expect(result).toBe('page=1&limit=50');
    });

    test('should handle boolean values', () => {
      const params = { enabled: true, disabled: false };
      const result = toQueryParams(params);
      expect(result).toBe('enabled=true');
    });
  });

  describe('ApiError', () => {
    test('should create ApiError instance', () => {
      const mockAxiosError = {
        message: 'Request failed with status code 404',
        name: 'AxiosError',
        response: {
          status: 404,
          statusText: 'Not Found',
          data: {},
          headers: {},
          config: {},
        }
      } as any;
      
      const error = new ApiError(mockAxiosError);
      
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ApiError');
      expect(error.message).toBe('Request failed with status code 404');
      expect(error.error).toBe(mockAxiosError);
    });

    test('should create ApiError and maintain stack trace', () => {
      const mockAxiosError = {
        message: 'Network Error',
        name: 'AxiosError',
      } as any;
      
      const error = new ApiError(mockAxiosError);
      
      expect(error.name).toBe('ApiError');
      expect(error.error).toBe(mockAxiosError);
      expect(error.stack).toBeDefined();
    });
  });
});