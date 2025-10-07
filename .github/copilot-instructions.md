# Copilot Instructions for figma-api

## Project Overview

This is a TypeScript library that provides a thin, fully-typed wrapper around the [Figma REST API](https://www.figma.com/developers/api). The library supports both Node.js and browser environments.

## Key Architecture

- **Source**: TypeScript files in `src/` directory
- **Output**: Compiled JavaScript in `lib/` directory  
- **Types**: Uses official `@figma/rest-api-spec` for complete type safety
- **HTTP Client**: Axios for making API requests
- **Build**: TypeScript compilation + Browserify for browser builds

## Core Files

- `src/api-class.ts` - Main API class with authentication and method bindings
- `src/api-endpoints.ts` - Individual endpoint implementations following Figma API structure
- `src/config.ts` - API domain and version constants
- `src/utils.ts` - Utility functions for query parameters and requests
- `src/index.ts` - Main entry point, exports public API

## Development Guidelines

### Code Style
- Use TypeScript strict mode (already configured)
- Follow existing naming conventions (camelCase for methods, PascalCase for types)
- Import types from `@figma/rest-api-spec` - do NOT create custom types for API responses
- Use arrow functions for endpoint method bindings in `Api` class
- Keep endpoint implementations pure functions that return `this.request()` calls

### API Endpoint Pattern
```typescript
export function getExampleApi(
    this: ApiClass,
    pathParams: FigmaRestAPI.GetExamplePathParams,
    queryParams?: FigmaRestAPI.GetExampleQueryParams
): Promise<FigmaRestAPI.GetExampleResponse> {
    const encodedQueryParams = toQueryParams(queryParams);
    return this.request(`${API_DOMAIN}/${API_VER}/endpoint/${pathParams.id}?${encodedQueryParams}`);
}
```

### Adding New Endpoints
1. Add the endpoint function to `src/api-endpoints.ts` following the pattern above
2. Export the function at the top of the file
3. Add method binding in `src/api-class.ts` using arrow function syntax
4. Group by API category with comments (Files, Comments, Users, etc.)
5. Include the official Figma API documentation link in comments

### Authentication
- Support both Personal Access Tokens and OAuth tokens
- Use the existing authentication helper methods in `Api` class
- Headers are automatically populated by `appendHeaders()` method

### Building & Testing
- Run `npm run build` to compile TypeScript and create browser builds
- Browser builds use Browserify with UMD format
- No test framework currently - focus on type safety from `@figma/rest-api-spec`

### Version Alignment
- This library stays in sync with official Figma REST API specifications
- Types come from `@figma/rest-api-spec` package - update that package for new API features
- Endpoint URLs and parameters must match official Figma documentation exactly

## Important Notes

- This is version 2.x which is a complete rewrite from 1.x for API alignment
- All endpoint methods use object parameters (pathParams, queryParams, requestBody)
- The library is designed to be a thin wrapper - avoid adding business logic
- Browser and Node.js compatibility is maintained through build process
- Keep the public API surface minimal and focused on REST API exposure

## When Making Changes

1. Ensure TypeScript compilation succeeds: `npm run build`
2. Verify both CommonJS and browser builds are generated
3. Check that new endpoints follow the established patterns
4. Update documentation in README.md if adding major new functionality
5. Maintain backward compatibility within major version