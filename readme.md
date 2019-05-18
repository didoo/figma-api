[![NPM Version](https://badge.fury.io/js/figma-api.svg?style=flat)](https://www.npmjs.com/package/figma-api)

# figma-api

Full implementation of [Figma API](https://www.figma.com/developers/docs).

Figma api's file fully typed with TypeScript.

Both browser & nodejs supported.

Promises & ES6.

## Install

`npm i figma-api`

or browser version:

`https://raw.githubusercontent.com/Morglod/figma-api/master/lib/figma-api.js`  
`https://raw.githubusercontent.com/Morglod/figma-api/master/lib/figma-api.min.js`

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

### `new Api ({ personalAccessToken, oAuthToken })`

Creates new Api object with specified `personal` or `oAuthToken`.  
[Documentation on how to get tokens](https://www.figma.com/developers/docs#authentication)

<details>
<summary>
Api.getFile
</summary>

```ts
Api.getFile(fileKey, opts?: { version?, geometry? })
```
[Require file data](https://www.figma.com/developers/docs#get-files-endpoint) with specified version.  
Set `geometry='paths'` to export vector data.

Returns:  
```ts
{
    name: string,
    lastModified: string,
    thumbnailURL: string,
    version: string,
    document: Node<'DOCUMENT'>,
    components: { [nodeId: string]: Component },
    schemaVersion: 0,
    styles: { [styleName: string]: Style }
}
```
</details>

<details>
<summary>
Api.getFileNodes
</summary>

```ts
Api.getFileNodes(fileKey, ids, opts?: { version?, geometry? })
```
[Require file nodes data](https://www.figma.com/developers/docs#get-file-nodes-endpoint) with specified version.  
Set `geometry='paths'` to export vector data.

Returns:  
```ts
{
    name: string,
    lastModified: string,
    thumbnailURL: string,
    err: string,
    nodes: {
        id: {
            document: Node<'DOCUMENT'>,
            components: { [nodeId: string]: Component },
            schemaVersion: 0,
            styles: { [styleName: string]: Style }
        }
    }
}
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
[Renders images](https://www.figma.com/developers/docs#get-images-endpoint) from a file.

Returns:
```ts
{
    err: string,
    images: { [nodeId: string]: string|null },
    status: number
}
```
</details>

<details>
<summary>
Api.getImageFills
</summary>

```ts
Api.getImageFills(fileKey)
```  

[Returns download links for all images present in image fills in a document.](https://www.figma.com/developers/docs#get-image-fills-endpoint)

Returns:  
```ts
{
    images?: {
        [imageRef: string]: imageUrl,
    },
}
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
{
    comments: Comment[],
}
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
Comment
```
</details>

<details>
<summary>
Api.getMe
</summary>

```ts
Api.getMe()
```
[You can use the Users Endpoint](https://www.figma.com/developers/docs#users-endpoints) to access information regarding the currently authenticated User. When using OAuth 2, the User in question must be authenticated through the Figma API to access their information.

Returns:  
```ts
User
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
{
    versions: Version[]
}
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
{
    projects: { id: number, name: string }[],
}
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
{
    files: {
        key: string,
        name: string,
        thumbnail_url: string,
        last_modified: string,
    }[],
}
```

</details>

<details>
<summary>
Api.getTeamComponents
</summary>

```ts
Api.getTeamComponents(team_id, opts?: { page_size?, cursor? })
```

[Get a paginated list](https://www.figma.com/developers/docs#get-team-components-endpoint) of published components within a team library.

Returns:  
```ts
{
    components: [
        /* ComponentMetadata */ {
            key: string,
            file_key: string,
            node_id: string,
            thumbnail_url: string,
            name: string,
            description: string,
            updated_at: string,
            created_at: string,
            user: User, 
            containing_frame: FrameInfo, 
        },
    ],
    cursor: { 
        before: number,
        after: number,
    },
}
```

</details>

<details>
<summary>
Api.getComponent
</summary>

```ts
Api.getComponent(componentKey)
```

[Get metadata on a component by key.](https://www.figma.com/developers/docs#get-component-endpoint)

Returns:  
```ts
/* ComponentMetadata */ {
    key: string,
    file_key: string,
    node_id: string,
    thumbnail_url: string,
    name: string,
    description: string,
    updated_at: string,
    created_at: string,
    user: User, 
    containing_frame: FrameInfo, 
},
```

</details>

<details>
<summary>
Api.getTeamStyles
</summary>

```ts
Api.getTeamStyles(team_id, opts?: { page_size?, cursor? })
```

[Get a paginated list](https://www.figma.com/developers/docs#get-team-styles-endpoint) of published styles within a team library.

Returns:  
```ts
{
    styles: [
        {
            key: string,
            file_key: string,
            node_id: string,
            style_type: StyleType,
            thumbnail_url: string,
            name: string,
            description: string,
            updated_at: string,
            created_at: string,
            sort_position: string,
            user: User, 
        },
    ],
        cursor: { 
        before: number,
        after: number,
    }, 
}
```

</details>

<details>
<summary>
Api.getStyle
</summary>

```ts
Api.getStyle(styleKey)
```

[Get metadata on a style by key.](https://www.figma.com/developers/docs#get-style-endpoint)

Returns:  
```ts
{
    key: string,
    file_key: string,
    node_id: string,
    style_type: StyleType,
    thumbnail_url: string,
    name: string,
    description: string,
    updated_at: string,
    created_at: string,
    sort_position: string,
    user: User, 
}
```

</details>

<details>
<summary>
Helpers
</summary>

`Api.appendHeaders(headers: {}): void`  
Populate headers with auth.

`Api.request<T>(url, opts): Promise<T>`  
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
): Promise<{
    access_token: string,
    expires_in: number,
}>
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
git clone https://github.com/Morglod/figma-api.git
cd figma-api
git checkout dev
npm i
npm run build
```
