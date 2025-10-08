[![NPM Version](https://badge.fury.io/js/figma-api.svg?style=flat)](https://www.npmjs.com/package/figma-api)

> [!IMPORTANT]
> **Version 2.0 Beta** - This version is a complete rewrite of the library, based on the [Figma REST API specifications](https://github.com/figma/rest-api-spec). Many endpoint methods have been renamed from version 1.x, and all the endpoint methods' arguments now match the [Figma REST API](https://www.figma.com/developers/api) documentation. If you were using the previous version, and intend to use the new one, **you will have to update your code accordingly**. The good news is that from now on they should always remain in sync, so no major disruptions in the future, with the benefit of a full alignment with the official Figma REST API documentation and specifications.

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
new Api ({ personalAccessToken, oAuthToken })
```

Creates new Api object with specified `personalAccessToken` or `oAuthToken`. For details about how to get these tokens, [see the documentation](https://www.figma.com/developers/api#authentication)

```ts
function oAuthLink(
    client_id: string,
    redirect_uri: string,
    scope: 'file_read',
    state: string,
    response_type: 'code',
): string;
```

Returns link for OAuth auth flow. Users should open this link, allow access and they will be redirected to `redirect_uri?code=<code>`. Then they should use `oAuthToken` method to get an access token.

```ts
function oAuthToken(
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code: string,
    grant_type: 'authorization_code',
): Promise<{
    access_token: string,
    refresh_token: string,
    expires_in: number,
}>
```
Returns the access token from oauth code (see `oAuthLink` method).

Other helpers:

- `Api.appendHeaders(headers)` - Populate headers with auth.
- `Api.request(url, opts)` - Make request with auth headers.

### Endpoints

All these endpoints methods receive objects like `pathParams`, `queryParams`, `requestBody`, as arguments, and return a Promise. For details about the shape of these objects refer to the official Figma REST API documentation (see links below).

> [!IMPORTANT]
> Version 2.x differs considerably from version 1.x in that the arguments of the API endpoint methods are _always_ contained in these objects, while before they were passed singularly as values directly to the function.

#### Files

See: https://www.figma.com/developers/api#files-endpoints

- `Api.getFile(pathParams,queryParams)`
- `Api.getFileNodes(pathParams,queryParams)`
- `Api.getImages(pathParams,queryParams)`
- `Api.getImageFills(pathParams)`

#### Comments

See: https://www.figma.com/developers/api#comments-endpoints

- `Api.getComments(pathParams)`
- `Api.postComment(pathParams,requestBody)`
- `Api.deleteComment(pathParams)`
- `Api.getCommentReactions(pathParams,queryParams)`
- `Api.postCommentReaction(pathParams,requestBody)`
- `Api.deleteCommentReactions(pathParams)`

#### Users

See: https://www.figma.com/developers/api#users-endpoints

- `Api.getUserMe()`

#### Version History (File Versions)

See: https://www.figma.com/developers/api#version-history-endpoints

- `Api.getFileVersions(pathParams)`

#### Projects

See: https://www.figma.com/developers/api#projects-endpoints

- `Api.getTeamProjects(pathParams)`
- `Api.getProjectFiles(pathParams,queryParams)`

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

See: https://www.figma.com/developers/api#webhooks_v2

- `Api.getWebhook(pathParams)`
- `Api.postWebhook(requestBody)`
- `Api.putWebhook(pathParams,requestBody)`
- `Api.deleteWebhook(pathParams)`
- `Api.getTeamWebhooks(pathParams)`
- `Api.getWebhookRequests(pathParams)`

#### Activity Logs

See: https://www.figma.com/developers/api#activity-logs-endpoints

> [!TIP]
> [TODO] Open to contributions if someone is needs to use these endpoints


#### Payments

See: https://www.figma.com/developers/api#payments-endpoints

> [!TIP]
> [TODO] Open to contributions if someone is needs to use these endpoints

#### Variables

> [!NOTE]
> These APIs are available only to full members of Enterprise orgs.

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

- `Api.getLibraryAnalyticsComponentActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsComponentUsages(pathParams,queryParams)`
- `Api.getLibraryAnalyticsStyleActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsStyleUsages(pathParams,queryParams)`
- `Api.getLibraryAnalyticsVariableActions(pathParams,queryParams)`
- `Api.getLibraryAnalyticsVariableUsages(pathParams,queryParams)`

## Types

The library is fully typed using the official [Figma REST API specifications](https://github.com/figma/rest-api-spec). You can see those types in the generated file here: https://github.com/figma/rest-api-spec/blob/main/dist/api_types.ts.

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
