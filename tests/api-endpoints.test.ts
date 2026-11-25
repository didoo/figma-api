import * as apiEndpoints from '../src/api-endpoints';
import type { GetCommentReactionsResponse, PostCommentReactionResponse } from '@figma/rest-api-spec';
import { Api } from '../src/api-class';
import { API_DOMAIN, API_VER, API_VER_FOLDERS } from '../src/config';

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

    test('getFileMetaApi should generate correct URL', () => {
      const pathParams = { file_key: 'test-file-key' };

      apiEndpoints.getFileMetaApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/meta`
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

    test('getImagesApi should preserve false boolean query parameters', () => {
      const pathParams = { file_key: 'test-file-key' };
      const queryParams = { ids: 'node1,node2', format: 'svg' as const, svg_outline_text: false };

      apiEndpoints.getImagesApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/images/test-file-key?ids=node1%2Cnode2&format=svg&svg_outline_text=false`
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

    test('getCommentReactionsApi should return reactions for the requested page', async () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };
      const queryParams = { cursor: 'abc123' };

      const page: GetCommentReactionsResponse = { reactions: [], pagination: {} };
      mockApiClass.request.mockResolvedValueOnce(page);
      const result: GetCommentReactionsResponse = await apiEndpoints.getCommentReactionsApi.call(mockApiClass, pathParams, queryParams);
      expect(result).toBe(page);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123/reactions?cursor=abc123`
      );
    });

    test('postCommentReactionApi should submit a reaction and return its status', async () => {
      const pathParams = { file_key: 'test-file-key', comment_id: 'comment123' };
      const requestBody = { emoji: '👍' };

      const response: PostCommentReactionResponse = { status: 200, error: false };
      mockApiClass.request.mockResolvedValueOnce(response);
      const result: PostCommentReactionResponse = await apiEndpoints.postCommentReactionApi.call(mockApiClass, pathParams, requestBody);
      expect(result).toBe(response);

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

      apiEndpoints.deleteCommentReactionsApi.call(mockApiClass, pathParams, { emoji: ':+1:' });

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER}/files/test-file-key/comments/comment123/reactions?emoji=%3A%2B1%3A`,
        {
          method: 'DELETE',
          data: '',
        }
      );
    });

  });

  describe('public endpoint requests', () => {
    const file = { file_key: 'file1' };
    const team = { team_id: 'team1' };
    const item = { key: 'item1' };
    const webhook = { webhook_id: 'hook1' };
    const hookUpdate = { event_type: 'FILE_UPDATE' as const, endpoint: 'https://example.com/hook', passcode: 'fixture' };
    const hookCreate = { ...hookUpdate, context: 'team', context_id: team.team_id };
    const variables = { variableCollections: [{ action: 'DELETE' as const, id: 'collection1' }] };
    const createResources = { dev_resources: [{ name: 'Docs', url: 'https://example.com', ...file, node_id: '1:2' }] };
    const updateResources = { dev_resources: [{ id: 'res1', name: 'Renamed' }] };

    type RequestCase = [path: string, invoke: (api: Api) => Promise<unknown>, options?: Parameters<Api['request']>[1]];
    const cases: RequestCase[] = [
      ['/v1/projects/proj1/files?branch_data=false', api => api.getProjectFiles({ project_id: 'proj1' }, { branch_data: false })],
      ['/v1/teams/team1/components?page_size=10', api => api.getTeamComponents(team, { page_size: 10 })],
      ['/v1/files/file1/components', api => api.getFileComponents(file)],
      ['/v1/components/item1', api => api.getComponent(item)],
      ['/v1/teams/team1/component_sets?after=2', api => api.getTeamComponentSets(team, { after: 2 })],
      ['/v1/files/file1/component_sets', api => api.getFileComponentSets(file)],
      ['/v1/component_sets/item1', api => api.getComponentSet(item)],
      ['/v1/teams/team1/styles?before=3', api => api.getTeamStyles(team, { before: 3 })],
      ['/v1/files/file1/styles', api => api.getFileStyles(file)],
      ['/v1/styles/item1', api => api.getStyle(item)],

      ['/v2/webhooks/hook1', api => api.getWebhook(webhook)],
      ['/v2/webhooks', api => api.postWebhook(hookCreate), { method: 'POST', data: hookCreate }],
      ['/v2/webhooks/hook1', api => api.putWebhook(webhook, hookUpdate), { method: 'PUT', data: hookUpdate }],
      ['/v2/webhooks/hook1', api => api.deleteWebhook(webhook), { method: 'DELETE', data: '' }],
      ['/v2/teams/team1/webhooks', api => api.getTeamWebhooks(team)],
      ['/v2/webhooks/hook1/requests', api => api.getWebhookRequests(webhook)],

      ['/v1/files/file1/variables/local', api => api.getLocalVariables(file)],
      ['/v1/files/file1/variables/published', api => api.getPublishedVariables(file)],
      ['/v1/files/file1/variables', api => api.postVariables(file, variables), { method: 'POST', data: variables }],
      ['/v1/files/file1/dev_resources?node_ids=1%3A2%2C3%3A4', api => api.getDevResources(file, { node_ids: '1:2,3:4' })],
      ['/v1/files/file1/dev_resources', api => api.getDevResources(file)],
      ['/v1/dev_resources', api => api.postDevResources(createResources), { method: 'POST', data: createResources }],
      ['/v1/dev_resources', api => api.putDevResources(updateResources), { method: 'PUT', data: updateResources }],
      ['/v1/files/file1/dev_resources/res1', api => api.deleteDevResources({ ...file, dev_resource_id: 'res1' }), { method: 'DELETE', data: '' }],

      ['/v1/analytics/libraries/file1/component/actions?group_by=team', api => api.getLibraryAnalyticsComponentActions(file, { group_by: 'team' })],
      ['/v1/analytics/libraries/file1/component/usages?group_by=file', api => api.getLibraryAnalyticsComponentUsages(file, { group_by: 'file' })],
      ['/v1/analytics/libraries/file1/style/actions?group_by=style', api => api.getLibraryAnalyticsStyleActions(file, { group_by: 'style' })],
      ['/v1/analytics/libraries/file1/style/usages?group_by=file', api => api.getLibraryAnalyticsStyleUsages(file, { group_by: 'file' })],
      ['/v1/analytics/libraries/file1/variable/actions?group_by=variable', api => api.getLibraryAnalyticsVariableActions(file, { group_by: 'variable' })],
      ['/v1/analytics/libraries/file1/variable/usages?group_by=file', api => api.getLibraryAnalyticsVariableUsages(file, { group_by: 'file' })],
    ];

    for (const [path, invoke, options] of cases) {
      test(`${options?.method ?? 'GET'} ${path}`, async () => {
        const api = new Api({ personalAccessToken: 'test-token' });
        const response = {};
        const request = jest.spyOn(api, 'request').mockResolvedValue(response);

        await expect(invoke(api)).resolves.toBe(response);
        const url = `${API_DOMAIN}${path}`;
        expect(request.mock.calls).toEqual([options ? [url, options] : [url]]);
      });
    }
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

  describe('Folders endpoints', () => {
    test('getTeamFoldersApi should generate correct URL', () => {
      const pathParams = { team_id: 'team123' };

      apiEndpoints.getTeamFoldersApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER_FOLDERS}/teams/team123/folders`
      );
    });

    test('getFolderFoldersApi should generate correct URL', () => {
      const pathParams = { folder_id: 'folder123' };

      apiEndpoints.getFolderFoldersApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER_FOLDERS}/folders/folder123/folders`
      );
    });

    test('getFolderFilesApi should generate correct URL', () => {
      const pathParams = { folder_id: 'folder123' };
      const queryParams = { branch_data: true };

      apiEndpoints.getFolderFilesApi.call(mockApiClass, pathParams, queryParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER_FOLDERS}/folders/folder123/files?branch_data=true`
      );
    });

    test('getFolderMetaApi should generate correct URL', () => {
      const pathParams = { folder_id: 'folder123' };

      apiEndpoints.getFolderMetaApi.call(mockApiClass, pathParams);

      expect(mockApiClass.request).toHaveBeenCalledWith(
        `${API_DOMAIN}/${API_VER_FOLDERS}/folders/folder123/meta`
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
      expect(typeof apiEndpoints.getFileMetaApi).toBe('function');
      expect(typeof apiEndpoints.getCommentsApi).toBe('function');
      expect(typeof apiEndpoints.postCommentApi).toBe('function');
      expect(typeof apiEndpoints.deleteCommentApi).toBe('function');
      expect(typeof apiEndpoints.getUserMeApi).toBe('function');
      expect(typeof apiEndpoints.getFileVersionsApi).toBe('function');
      expect(typeof apiEndpoints.getTeamProjectsApi).toBe('function');
      expect(typeof apiEndpoints.getTeamFoldersApi).toBe('function');
      expect(typeof apiEndpoints.getFolderFoldersApi).toBe('function');
      expect(typeof apiEndpoints.getFolderFilesApi).toBe('function');
      expect(typeof apiEndpoints.getFolderMetaApi).toBe('function');
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
