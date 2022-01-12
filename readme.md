[![NPM Version](https://badge.fury.io/js/figma-api.svg?style=flat)](https://www.npmjs.com/package/figma-api)

# figma-api

Full implementation of [Figma API](https://www.figma.com/developers/docs).

Figma api's file fully typed with TypeScript.

Both browser & nodejs supported.

Promises & ES6.

## Install

`npm i figma-api`

or browser version:

`https://raw.githubusercontent.com/didoo/figma-api/master/lib/figma-api.js`
`https://raw.githubusercontent.com/didoo/figma-api/master/lib/figma-api.min.js`

All api in browser exported to global `Figma` object.

## Usage

```ts
import * as Figma from 'figma-api';

export async function main() {
    const api = new Figma.Api({
        personalAccessToken: 'my token',
    });

    const file = await api.getFile('my file key');
    // ... access file data ...
}
```

or in browser:

```js
const api = new Figma.Api({ personalAccessToken: 'my token' });

api.getFile('my file key').then((file) => {
    // access file data
});
```

Change API endpoint setting `Figma.API_DOMAIN` & `Figma.API_VER` variables.

## Api

We have followed the same organisation as the official [Figma API documentation](https://www.figma.com/developers/api) to describe our API methods, so it's easier to find the exact endpoint call you are looking for.

<details>
<summary>
Helpers
</summary>

`Api.appendHeaders(headers: {}): void`
Populate headers with auth.

`Api.request<T>(url, opts): Promise<T>`
Make request with auth headers.
</details>

### Authentication

#### `new Api ({ personalAccessToken, oAuthToken })`

Creates new Api object with specified `personal` or `oAuthToken`.
[Documentation on how to get tokens](https://www.figma.com/developers/api#authentication)

<details>
<summary>
Helpers
</summary>

```ts
function oAuthLink(
    client_id: string,
    redirect_uri: string,
    scope: 'file_read',
    state: string,
    response_type: 'code',
): string;
```
Returns link for OAuth auth flow.
User should open this link, allow access and he will be redirected to `redirect_uri?code=<code>`.
Then you should use `oAuthToken` method to get `access token`.

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
Returns `access token` info from oauth code (see `oAuthLink` method).
</details>


### Figma files

<details>
<summary>
Api.getFile
</summary>

```ts
Api.getFile(fileKey, opts?: { version?, ids?, depth?, geometry?, plugin_data?: string, branch_data?: boolean })
```
[Require file data](https://www.figma.com/developers/api#get-files-endpoint) with specified version.
</details>

<details>
<summary>
Api.getFileNodes
</summary>

```ts
Api.getFileNodes(fileKey, ids, opts?: { version?, depth?, geometry?, plugin_data? })
```
[Require file nodes data](https://www.figma.com/developers/api#get-file-nodes-endpoint) with specified version.
</details>

<details>
<summary>
Api.getImage
</summary>

```ts
Api.getImage(fileKey, opts?: { ids, scale, format, svg_include_id?, svg_simplify_stroke?, use_absolute_bounds?, version?: string })
```
[Renders images](https://www.figma.com/developers/api#get-images-endpoint) from a file.
</details>

<details>
<summary>
Api.getImageFills
</summary>

```ts
Api.getImageFills(fileKey)
```

[Returns download links for all images present in image fills in a document.](https://www.figma.com/developers/api#get-image-fills-endpoint)
</details>

### Comments

<details>
<summary>
Api.getComments
</summary>

```ts
Api.getComments(fileKey)
```
[List of comments](https://www.figma.com/developers/api#get-comments-endpoint) left on the file.
</details>

<details>
<summary>
Api.postComment
</summary>

```ts
Api.postComment(fileKey, message, client_meta, comment_id?)
```
[Posts a new comment on the file](https://www.figma.com/developers/api#post-comments-endpoint).
</details>

<details>
<summary>
Api.deleteComments
</summary>

```ts
Api.deleteComment(fileKey, comment_id)
```
[Deletes a specific comment](https://www.figma.com/developers/api#delete-comments-endpoint). Only the person who made the comment is allowed to delete it.
</details>

### Users

<details>
<summary>
Api.getMe
</summary>

```ts
Api.getMe()
```
[You can use the Users Endpoint](https://www.figma.com/developers/api#users-endpoints) to access information regarding the currently authenticated User. When using OAuth 2, the User in question must be authenticated through the Figma API to access their information.
</details>

### Version history

<details>
<summary>
Api.getVersions
</summary>

```ts
Api.getVersions(fileKey)
```
A [list of the version](https://www.figma.com/developers/api#get-file-versions-endpoint) history of a file. The version history consists of versions, manually-saved additions to the version history of a file.
If the account is not on a paid team, version history is limited to the past 30 days. Note that version history will not include autosaved versions.
</details>

### Projects

<details>
<summary>
Api.getTeamProjects
</summary>

```ts
Api.getTeamProjects(team_id)
```
[Lists the projects](https://www.figma.com/developers/api#get-team-projects-endpoint) for a specified team. Note that this will only return projects visible to the authenticated user or owner of the developer token. Note: it is not currently possible to programmatically obtain the team id of a user just from a token. To obtain a team id, navigate to a team page of a team you are a part of. The team id will be present in the URL after the word team and before your team name.
</details>

<details>
<summary>
Api.getProjectFiles
</summary>

```ts
Api.getProjectFiles(project_id, opts?: { branch_data?: boolean })
```
[List the files](https://www.figma.com/developers/api#get-project-files-endpoint) in a given project.
</details>

### Components and styles

<details>
<summary>
Api.getTeamComponents
</summary>

```ts
Api.getTeamComponents(team_id, opts?: { page_size?, after?, before? })
```

[Get a paginated list of published components](https://www.figma.com/developers/api#get-team-components-endpoint) within a team library.
</details>

<details>
<summary>
Api.getFileComponents
</summary>

```ts
Api.getFileComponents(fileKey)
```

[Get a list of published components](https://www.figma.com/developers/api#get-file-components-endpoint) within a file library.
</details>

<details>
<summary>
Api.getComponent
</summary>

```ts
Api.getComponent(key)
```

[Get metadata on a component by key.](https://www.figma.com/developers/api#get-component-endpoint)
</details>

<details>
<summary>
Api.getTeamComponentSets
</summary>

```ts
Api.getTeamComponentSets(team_id, opts?: { page_size?, after?, before? })
```

[Get a paginated list of published component_sets](https://www.figma.com/developers/api#get-team-component-sets-endpoint) within a team library.
</details>

<details>
<summary>
Api.getFileComponentSets
</summary>

```ts
Api.getFileComponentSets(file_key)
```

[Get a list of published component_sets](https://www.figma.com/developers/api#get-file-component-sets-endpoint) within a file library.
</details>

<details>
<summary>
Api.getComponentSet
</summary>

```ts
Api.getComponentSet(key)
```

[Get metadata on a component_set by key.](https://www.figma.com/developers/api#get-component-sets-endpoint)
</details>

<details>
<summary>
Api.getTeamStyles
</summary>

```ts
Api.getTeamStyles(team_id, opts?: { page_size?, after?, before? })
```

[Get a paginated list of published styles](https://www.figma.com/developers/api#get-team-styles-endpoint) within a team library.
</details>

<details>
<summary>
Api.getFileStyles
</summary>

```ts
Api.getFileStyles(file_key)
```

[Get a list of published styles](https://www.figma.com/developers/api#get-file-styles-endpoint) within a file library.
</details>

<details>
<summary>
Api.getStyle
</summary>

```ts
Api.getStyle(key)
```

[Get metadata on a style by key.](https://www.figma.com/developers/api#get-style-endpoint)

</details>

## File types

[All types with description](src/ast-types.ts)

<details>
<summary>
Helpers
</summary>

```ts
isEffectShadow(effect: Effect): effect is EffectShadow;
```
Check if effect is one of shadow effects.

```ts
isEffectBlur(effect: Effect): effect is EffectBlur;
```
Check if effect is one of blur effects.

```ts
isPaintSolid(paint: Paint): paint is PaintSolid;
isPaintGradient(paint: Paint): paint is PaintGradient;
isPaintImage(paint: Paint): paint is PaintImage;
```
Check if paint is one of pain types.

```ts
isNodeType<NodeType>(node: Node): node is type of NodeType;
```
Check if node is type of specified node.

</details>

## Development

```
git clone https://github.com/didoo/figma-api.git
cd figma-api
git checkout main
npm i
npm run build
```

## Release

```
npm version [<newversion> | major | minor | patch]
#if not yet logged in
npm login
npm publish
```
