import * as apiEndpoints from '../src/api-endpoints';
import { API_DOMAIN, API_VER, API_VER_WEBHOOKS } from '../src/config';

describe('api-endpoints', () => {
  let mockApiClass: { request: jest.Mock };

  beforeEach(() => {
    mockApiClass = {
      request: jest.fn(),
    };
  });

  describe('Files endpoints', () => {
    test('getFileApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };
      const queryParams = { version: '123', ids: '1,2,3' };

      apiEndpoints.getFileApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key?version=123&ids=1%2C2%2C3`
      );
    });

    test('getFileNodesApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };
      const queryParams = { ids: 'node1,node2' };

      apiEndpoints.getFileNodesApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/nodes?ids=node1%2Cnode2`
      );
    });

    test('getImagesApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };
      const queryParams = { ids: 'node1,node2', format: 'png' as const };

      apiEndpoints.getImagesApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/images/test-file-key?ids=node1%2Cnode2&format=png`
      );
    });

    test('getImageFillsApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getImageFillsApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/images`
      );
    });
  });

  describe('Comments endpoints', () => {
    test('getCommentsApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getCommentsApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments`
      );
    });

    test('postCommentApi should generate correct URL and method', () => {
      const pathParams = { file_key: 'test-file-key' };
      const requestBody = { message: 'Test comment' };

      apiEndpoints.postCommentApi.call(mockApiClass, pathParams, requestBody);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments`,
        {
          method: 'POST',
          data: requestBody,
        }
      );
    });

    test('deleteCommentApi should generate correct URL and method', () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };

      apiEndpoints.deleteCommentApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123`,
        {
          method: 'DELETE',
          data: '',
        }
      );
    });

    test('getCommentReactionsApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };
      const queryParams = { cursor: 'abc123' };

      apiEndpoints.getCommentReactionsApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123/reactions?cursor=abc123`
      );
    });

    test('postCommentReactionApi should generate correct URL and method', () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };
      const requestBody = { emoji: '👍' };

      apiEndpoints.postCommentReactionApi.call(mockApiClass, pathParams, requestBody);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123/reactions`,
        {
          method: 'POST',
          data: requestBody,
        }
      );
    });

    test('deleteCommentReactionsApi should generate correct URL and method', () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };

      apiEndpoints.deleteCommentReactionsApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123/reactions`,
        {
          method: 'DELETE',
          data: '',
        }
      );
    });
  });

  describe('Users endpoints', () => {
    test('getUserMeApi should generate correct URL', () => {
      apiEndpoints.getUserMeApi.call(mockApiClass);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/me`
      );
    });
  });

  describe('Version History endpoints', () => {
    test('getFileVersionsApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getFileVersionsApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/versions`
      );
    });
  });

  describe('Projects endpoints', () => {
    test('getTeamProjectsApi should generate correct URL', () => {
      const pathParams = { team_id: 'team123' };

      apiEndpoints.getTeamProjectsApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/teams/team123/projects`
      );
    });
  });

  describe('Endpoint function existence', () => {
    test('should export all expected endpoint functions', () => {
      // Test that key endpoint functions are exported
      expect(typeof apiEndpoints.getFileApi).toBe('function');
      expect(typeof apiEndpoints.getFileNodesApi).toBe('function');
      expect(typeof apiEndpoints.getImagesApi).toBe('function');
      expect(typeof apiEndpoints.getImageFillsApi).toBe('function');
      expect(typeof apiEndpoints.getCommentsApi).toBe('function');
      expect(typeof apiEndpoints.postCommentApi).toBe('function');
      expect(typeof apiEndpoints.deleteCommentApi).toBe('function');
      expect(typeof apiEndpoints.getUserMeApi).toBe('function');
      expect(typeof apiEndpoints.getFileVersionsApi).toBe('function');
      expect(typeof apiEndpoints.getTeamProjectsApi).toBe('function');
    });
  });

  describe('URL generation with empty/undefined query params', () => {
    test('should handle undefined query params', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getFileApi.call(mockApiClass, pathParams, undefined);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key?`
      );
    });

    test('should handle empty query params object', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getFileApi.call(mockApiClass, pathParams, {});

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key?`
      );
    });
  });
});