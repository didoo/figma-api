import { Api, oAuthLink, oAuthToken } from '../src/api-class';
import { ApiError } from '../src/utils';
import axios, { AxiosResponse } from 'axios';

// Mock axios module
jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;
mockedAxios.post = jest.fn();

describe('api-class', () => {
  describe('Api class', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('constructor', () => {
      test('should create instance with personal access token', () => {
        const api = new Api({ personalAccessToken: 'test-token' });
        
        expect(api.personalAccessToken).toBe('test-token');
        expect(api.oAuthToken).toBeUndefined();
      });

      test('should create instance with OAuth token', () => {
        const api = new Api({ oAuthToken: 'oauth-token' });
        
        expect(api.oAuthToken).toBe('oauth-token');
        expect(api.personalAccessToken).toBeUndefined();
      });
    });

    describe('appendHeaders', () => {
      test('should append personal access token header', () => {
        const api = new Api({ personalAccessToken: 'test-token' });
        const headers: { [x: string]: string } = {};
        
        api.appendHeaders(headers);
        
        expect(headers['X-Figma-Token']).toBe('test-token');
        expect(headers['Authorization']).toBeUndefined();
      });

      test('should append OAuth token header', () => {
        const api = new Api({ oAuthToken: 'oauth-token' });
        const headers: { [x: string]: string } = {};
        
        api.appendHeaders(headers);
        
        expect(headers['Authorization']).toBe('Bearer oauth-token');
        expect(headers['X-Figma-Token']).toBeUndefined();
      });
    });

    describe('request', () => {
      test('should make successful request with personal access token', async () => {
        const mockResponse: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          data: { test: 'data' },
          headers: {},
          config: {} as any,
        };
        mockedAxios.mockResolvedValueOnce(mockResponse);

        const api = new Api({ personalAccessToken: 'test-token' });
        const result = await api.request('https://api.figma.com/v1/test');

        expect(mockedAxios).toHaveBeenCalledWith({
          url: 'https://api.figma.com/v1/test',
          headers: { 'X-Figma-Token': 'test-token' },
        });
        expect(result).toEqual({ test: 'data' });
      });

      test('should make successful request with OAuth token', async () => {
        const mockResponse: AxiosResponse = {
          status: 200,
          statusText: 'OK',
          data: { test: 'data' },
          headers: {},
          config: {} as any,
        };
        mockedAxios.mockResolvedValueOnce(mockResponse);

        const api = new Api({ oAuthToken: 'oauth-token' });
        const result = await api.request('https://api.figma.com/v1/test');

        expect(mockedAxios).toHaveBeenCalledWith({
          url: 'https://api.figma.com/v1/test',
          headers: { 'Authorization': 'Bearer oauth-token' },
        });
        expect(result).toEqual({ test: 'data' });
      });

      test('should make request with custom method and data', async () => {
        const mockResponse: AxiosResponse = {
          status: 201,
          statusText: 'Created',
          data: { created: true },
          headers: {},
          config: {} as any,
        };
        mockedAxios.mockResolvedValueOnce(mockResponse);

        const api = new Api({ personalAccessToken: 'test-token' });
        const requestData = { name: 'test' };
        
        const result = await api.request('https://api.figma.com/v1/test', {
          method: 'POST',
          data: requestData,
        });

        expect(mockedAxios).toHaveBeenCalledWith({
          url: 'https://api.figma.com/v1/test',
          method: 'POST',
          data: requestData,
          headers: { 'X-Figma-Token': 'test-token' },
        });
        expect(result).toEqual({ created: true });
      });

      test('should throw ApiError for axios errors', async () => {
        const mockAxiosError = {
          message: 'Request failed with status code 404',
          name: 'AxiosError',
          response: {
            status: 404,
            statusText: 'Not Found',
            data: {},
            headers: {},
            config: {} as any,
          }
        };
        mockedAxios.mockRejectedValueOnce(mockAxiosError);

        const api = new Api({ personalAccessToken: 'test-token' });
        
        try {
          await api.request('https://api.figma.com/v1/test');
          fail('Expected request to throw an error');
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          expect((error as ApiError).error).toBe(mockAxiosError);
        }
      });
    });

    describe('endpoint methods', () => {
      test('should have all expected endpoint methods', () => {
        const api = new Api({ personalAccessToken: 'test-token' });
        
        // Test a few key endpoint methods exist
        expect(typeof api.getFile).toBe('function');
        expect(typeof api.getFileNodes).toBe('function');
        expect(typeof api.getImages).toBe('function');
        expect(typeof api.getUserMe).toBe('function');
        expect(typeof api.getComments).toBe('function');
        expect(typeof api.postComment).toBe('function');
      });
    });
  });

  describe('oAuthLink', () => {
    test('should generate correct OAuth link', () => {
      const link = oAuthLink(
        'client123',
        'https://example.com/callback',
        'file_read',
        'state123',
        'code'
      );

      expect(link).toBe(
        'https://www.figma.com/oauth?client_id=client123&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=file_read&state=state123&response_type=code'
      );
    });
  });

  describe('oAuthToken', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should exchange code for OAuth token', async () => {
      const mockResponse: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        data: {
          user_id: 'user123',
          access_token: 'token123',
          refresh_token: 'refresh123',
          expires_in: 3600,
        },
        headers: {},
        config: {} as any,
      };
      (mockedAxios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockResponse);

      const result = await oAuthToken(
        'client123',
        'secret456',
        'https://example.com/callback',
        'code789',
        'authorization_code'
      );

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.figma.com/v1/oauth/token?redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&code=code789&grant_type=authorization_code',
        null,
        {
          headers: {
            'Authorization': `Basic ${Buffer.from('client123:secret456').toString('base64')}`,
          },
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    test('should throw ApiError for non-200 status', async () => {
      const mockResponse: AxiosResponse = {
        status: 400,
        statusText: 'Bad Request',
        data: {},
        headers: {},
        config: {} as any,
      };
      (mockedAxios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(mockResponse);

      try {
        await oAuthToken(
          'client123',
          'secret456',
          'https://example.com/callback',
          'invalid-code',
          'authorization_code'
        );
        fail('Expected oAuthToken to throw an error');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
      }
    });
  });
});