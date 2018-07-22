[![NPM Version](https://badge.fury.io/js/figma-api.svg?style=flat)](https://www.npmjs.com/package/figma-api)

# figma-api

Full implementation of [Figma API](https://www.figma.com/developers/docs).

Figma api's file fully typed with TypeScript.

Both browser & nodejs supported.

All api requests uses [go-result-js](https://github.com/Morglod/go-result-js) for smooth error solving (return tuple like [ error, result ]).

Promises & ES6.

## Install

`npm i figma-api`

## Usage

```ts
import * as Figma from 'figmajs';

export async function main() {
    const api = new Figma.Api({
        personalAccessToken: 'my token',
    });

    const [ err, file ] = await api.getFile('figma file key');
    if (file) {
        // ... access file data ...
    }
}
```

## Api

### `new Api ({ personalAccessToken, oAuthToken })`

Creates new Api object with specified `personal` or `oAuthToken`.  
[Documentation on how to get tokens](https://www.figma.com/developers/docs#auth)

<details>
<summary>
Api.getFile
</summary>

```ts
Api.getFile(fileKey, opts?: { version?, geometry? })
```
[Require file data](https://www.figma.com/developers/docs#files-endpoint) with specified version.  
Set `geometry='paths'` to export vector data.

Returns:  
```ts
[ Error?, {
    document: Node<'DOCUMENT'>,
    components: { [nodeId: string]: Component },
    schemaVersion: number,
    styles: { [styleName: string]: Style }
} ]
```
</details>

<details>
<summary>
Api.getImage
</summary>

```ts
Api.getImage(fileKey, opts?: {
    /** A comma separated list of node IDs to render */
    ids: string,
    /** A number between 0.01 and 4, the image scaling factor */
    scale: number,
    /** Image output format */
    format: 'jpg'|'png'|'svg',
    /** Whether to include id attributes for all SVG elements. `Default: false` */
    svg_include_id?: boolean,
    /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
    svg_simplify_stroke?: boolean,
    /** A specific version ID to get. Omitting this will get the current version of the file */
    version?: string,
})
```  
[Renders images](https://www.figma.com/developers/docs#images-endpoint) from a file.

Returns:
```ts
[ Error?, {
    err: string,
    images: { [nodeId: string]: string|null },
    status: number
} ]
```

</details>

<details>
<summary>
Api.getVersions
</summary>

```ts
Api.getVersions(fileKey)
```
A [list of the version](https://www.figma.com/developers/docs#get-file-versions-endpoint) history of a file. The version history consists of versions, manually-saved additions to the version history of a file.  
If the account is not on a paid team, version history is limited to the past 30 days. Note that version history will not include autosaved versions.

Returns:  
```ts
[ Error?, {
    versions: Version[]
} ]
```
</details>

<details>
<summary>
Api.getComments
</summary>

```ts
Api.getComments(fileKey)
```
[List of comments](https://www.figma.com/developers/docs#get-comments-endpoint) left on the file.

Returns:  
```ts
[ Error?, {
    comments: Comment[],
} ]
```
</details>

<details>
<summary>
Api.postComment
</summary>

```ts
Api.postComment(fileKey: string, message: string, client_meta: Vector|FrameOffset)
```
[Posts a new comment on the file](https://www.figma.com/developers/docs#post-comments-endpoint) with specified location.

Returns:  
```ts
[ Error?, Comment ]
```
</details>

<details>
<summary>
Api.getTeamProjects
</summary>

```ts
Api.getTeamProjects(team_id)
```
[Lists the projects](https://www.figma.com/developers/docs#get-team-projects-endpoint) for a specified team. Note that this will only return projects visible to the authenticated user or owner of the developer token.

Returns:  
```ts
[ Error?, {
    projects: { id: number, name: string }[],
} ]
```
</details>

<details>
<summary>
Api.getProjectFiles
</summary>

```ts
Api.getProjectFiles(project_id)
```
[List the files](https://www.figma.com/developers/docs#get-project-files-endpoint) in a given project.

Returns:  
```ts
[ Error?, {
    files: {
        key: string,
        name: string,
        thumbnail_url: string,
        last_modified: string,
    }[],
} ]
```

</details>

<details>
<summary>
Helpers
</summary>

`Api.appendHeaders(headers: {}): void`  
Populate headers with auth.

`Api.request<T>(url, opts): Promise<[ Error?, T]>`  
Make request with auth headers.  
</details>

### Auth helpers

[OAuth figma documentation](https://www.figma.com/developers/docs#auth-oauth).

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
): Promise<[ Error?, {
    access_token: string,
    expires_in: number,
} ]>
```
Returns `access token` info from oauth code (see `oAuthLink` method).

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