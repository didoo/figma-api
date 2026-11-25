[![NPM Version](https://badge.fury.io/js/figma-api.svg?style=flat)](https://www.npmjs.com/package/figma-api)

# figma-api

JavaScript client-side implementation of the [Figma REST API](https://www.figma.com/developers/api#intro).

Thin layer on top of the official [Figma REST API specifications](https://github.com/figma/rest-api-spec), fully typed with TypeScript, uses Promises (via [Axios](https://github.com/axios/axios)) & ES6.

Supports both browser & Node.js implementations.

## Install

`npm i figma-api`

or browser version:

`https://raw.githubusercontent.com/didoo/figma-api/master/lib/figma-api.js`
`https://raw.githubusercontent.com/didoo/figma-api/master/lib/figma-api.min.js`

If you have CORS limitation, import the `figma-api[.min].js` file in your codebase via the npm package.

## Usage

In a Node.js script:

```ts
import * as Figma from 'figma-api';

export async function main() {
    const api = new Figma.Api({
        personalAccessToken: 'my-token',
    });

    const file = await api.getFile({ file_key: 'my-file-key'});
    // ... access file data ...
}
```

In a browser script:

```js
const api = new Figma.Api({ personalAccessToken: 'my-personal-access-token' });

api.getFile({ file_key: 'my-file-key'}).then((file) => {
    // access file data
});
```

In this case, the `Figma` object is gloabl and all the API methods are associated with it.

## Api

We have followed the same organisation as the official [Figma API documentation](https://www.figma.com/developers/api) to describe our API methods, so it's easier to find the exact endpoint call you are looking for.

### Authentication

```ts
new Api({ personalAccessToken })
// or
new Api({ oAuthToken })
```

Creates an `Api` object with either a personal access token or an OAuth token. See Figma's [authentication documentation](https://developers.figma.com/docs/rest-api/authentication/) for how to get a token and the [scope reference](https://developers.figma.com/docs/rest-api/scopes/) for the permissions each method requires.

```ts
function oAuthLink(
    client_id: string,
    redirect_uri: string,
    scope: string | string[],
    state: string,
    response_type: 'code',
): string;
```

Returns a link for the OAuth flow. `scope` can be a single scope string (for example `file_content:read`) or an array of scopes. Generate a random `state` and keep it for the callback. After the user allows access, Figma redirects them to `redirect_uri` with `code` and `state`. Check that `state` matches the value you saved before exchanging the code.

```ts
const { access_token, refresh_token, expires_in } = await oAuthToken(
    client_id, client_secret, redirect_uri, code, 'authorization_code',
);
```
Use `oAuthToken` on the server so your client secret stays private. If the exchange fails with an HTTP or network error, the promise rejects with an `ApiError`; its `error` property contains the original Axios error.

Other helpers:

- `Api.appendHeaders(headers)` - Populate headers with auth.
- `Api.request(url, opts)` - Make request with auth headers.

### Endpoints

Call the methods below on your `Api` instance. They take `pathParams`, `queryParams` or `requestBody` objects (where needed) and return a Promise. You can leave out `queryParams` unless Figma requires a value, as noted below.

> [!IMPORTANT]
> **Upgrading from 1.x?** Version 2.x is a rewrite based on the [Figma REST API specifications](https://github.com/figma/rest-api-spec). Many endpoint methods have new names and now take objects instead of individual values. Use the signatures below to update your calls.

#### Files

See: https://www.figma.com/developers/api#files-endpoints

- `Api.getFile(pathParams,queryParams)`
- `Api.getFileNodes(pathParams,queryParams)`
- `Api.getFileMeta(pathParams)`
- `Api.getImages(pathParams,queryParams)`
- `Api.getImageFills(pathParams)`

#### Comments

See: https://www.figma.com/developers/api#comments-endpoints

You can only delete your own comments and reactions.

- `Api.getComments(pathParams)` — the `as_md` query parameter is not supported by this library yet.
- `Api.postComment(pathParams,requestBody)`
- `Api.deleteComment(pathParams)`
- `Api.getCommentReactions(pathParams,queryParams)`
- `Api.postCommentReaction(pathParams,requestBody)`
- `Api.deleteCommentReactions(pathParams, { emoji })` — specify which reaction to remove, for example `{ emoji: ':+1:' }`.

#### Users

See: https://www.figma.com/developers/api#users-endpoints

- `Api.getUserMe()`

#### Version History (File Versions)

See: https://www.figma.com/developers/api#version-history-endpoints

- `Api.getFileVersions(pathParams)`

#### Projects

See: https://developers.figma.com/docs/rest-api/projects-endpoints/

> [!WARNING]
> Figma has deprecated these endpoints in favour of the [folders endpoints](#folders). The legacy endpoints require the `projects:read` scope and are not available to public OAuth apps.

- `Api.getTeamProjects(pathParams)` — deprecated, use `Api.getTeamFolders(pathParams)`
- `Api.getProjectFiles(pathParams,queryParams)` — deprecated, use `Api.getFolderFiles(pathParams,queryParams)`

#### Folders

See: https://developers.figma.com/docs/rest-api/folders-endpoints/

> [!NOTE]
> Listing folders or files requires `folders:read`, which public OAuth apps cannot request. `getFolderMeta` uses `folder_metadata:read` instead and accepts OAuth tokens (including from public apps) or plan access tokens, but not personal access tokens.

- `Api.getTeamFolders(pathParams)`
- `Api.getFolderFolders(pathParams)`
- `Api.getFolderFiles(pathParams,queryParams)`
- `Api.getFolderMeta(pathParams)`

#### Components and Styles (Library Items)

See: https://www.figma.com/developers/api#library-items-endpoints

- `Api.getTeamComponents(pathParams,queryParams)`
- `Api.getFileComponents(pathParams)`
- `Api.getComponent(pathParams)`
- `Api.getTeamComponentSets(pathParams,queryParams)`
- `Api.getFileComponentSets(pathParams)`
- `Api.getComponentSet(pathParams)`
- `Api.getTeamStyles(pathParams,queryParams)`
- `Api.getFileStyles(pathParams)`
- `Api.getStyle(pathParams)`

#### Webhooks

See: https://developers.figma.com/docs/rest-api/webhooks-endpoints/

> [!NOTE]
> Creating a webhook requires `webhooks:write`. You must be a team admin to create a team webhook, or have **Can edit** access to the folder or file to create a webhook there.

- `Api.getWebhooks(queryParams)`
- `Api.getWebhook(pathParams)`
- `Api.postWebhook(requestBody)`
- `Api.putWebhook(pathParams,requestBody)`
- `Api.deleteWebhook(pathParams)`
- `Api.getWebhookRequests(pathParams)`

#### Variables

> [!NOTE]
> These APIs are available only to full members of Enterprise orgs. To write variables with `postVariables`, you also need an Editor seat.

See: https://www.figma.com/developers/api#variables-endpoints

- `Api.getLocalVariables(pathParams)`
- `Api.getPublishedVariables(pathParams)`
- `Api.postVariables(pathParams,requestBody)`

#### Dev Resources

See: https://www.figma.com/developers/api#dev-resources-endpoints

- `Api.getDevResources(pathParams,queryParams)`
- `Api.postDevResources(requestBody)`
- `Api.putDevResources(requestBody)`
- `Api.deleteDevResources(pathParams)`

#### Analytics

See: https://www.figma.com/developers/api#library-analytics-endpoints

> [!NOTE]
> Library analytics is available only on the Enterprise plan. Anyone with a seat on that plan can use these methods if their token has the `library_analytics:read` scope.

All six methods require `group_by` in `queryParams`. For example, pass `{ group_by: 'component' }` to `getLibraryAnalyticsComponentActions`.

- `Api.getLibraryAnalyticsComponentActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsComponentUsages(pathParams,queryParams)`
- `Api.getLibraryAnalyticsStyleActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsStyleUsages(pathParams,queryParams)`
- `Api.getLibraryAnalyticsVariableActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsVariableUsages(pathParams,queryParams)`

#### oEmbed

See: https://developers.figma.com/docs/rest-api/oembed-endpoints/

- `Api.getOEmbed(queryParams)`

#### Other endpoints (not exposed yet)

The `0.42.0` spec also includes activity logs, developer logs, daily AI usage and payments. This library does not have methods for those endpoints yet. Contributions are welcome if you need one of them.

## Types

The library uses the types from the official `@figma/rest-api-spec` package. See the [generated types for `0.42.0`](https://github.com/figma/rest-api-spec/blob/v0.42.0/dist/api_types.ts), the minimum supported version. The [latest spec](https://github.com/figma/rest-api-spec) may include endpoints that this library does not wrap yet.

Alternatively, you can refer to the official Figma REST API documentation (see links above).

---

## Development

```
git clone https://github.com/didoo/figma-api.git
cd figma-api
git checkout main
npm install
npm run build
```

The build regenerates the TypeScript declarations and JavaScript bundles in `lib/`. To regenerate only the declarations, run `npm run build:types`.

## Testing

```
npm run test
```

## Release

```
npm version [<newversion> | major | minor | patch]
#if not yet logged in
npm login
npm publish
```

(notice: tags are created automatically after a few minutes from the publishing)
