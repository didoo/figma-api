# Copilot Instructions for figma-api

## Project Overview

This is a TypeScript library that provides a thin, fully-typed wrapper around the [Figma REST API](https://www.figma.com/developers/api). The library supports both Node.js and browser environments.

## Key Architecture

- **Source**: TypeScript files in `src/` directory
- **Output**: Compiled JavaScript in `lib/` directory  
- **Types**: Uses official `@figma/rest-api-spec` for complete type safety
- **HTTP Client**: Axios v1.12.2 for making API requests
- **Build**: esbuild for fast compilation with multiple targets (Node.js, browser, minified)
- **Testing**: Jest with TypeScript support and comprehensive test coverage

## Core Files

- `src/api-class.ts` - Main API class with authentication and method bindings
- `src/api-endpoints.ts` - Individual endpoint implementations following Figma API structure
- `src/config.ts` - API domain and version constants
- `src/utils.ts` - Utility functions for query parameters and requests
- `src/index.ts` - Main entry point, exports public API
- `tests/` - Jest test suite for all source files
- `jest.config.js` - Jest configuration for TypeScript testing

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
6. Write comprehensive tests in `tests/api-endpoints.test.ts` for the new endpoint
7. Ensure the new endpoint follows the existing error handling patterns

### Authentication
- Support both Personal Access Tokens and OAuth tokens
- Use the existing authentication helper methods in `Api` class
- Headers are automatically populated by `appendHeaders()` method

### Building & Testing
- Run `npm run build` to compile for all targets (Node.js, browser, minified)
  - `npm run build:node` - Build for Node.js environment using esbuild
  - `npm run build:browser` - Build for browser as IIFE with global `Figma` object
  - `npm run build:browser:min` - Build minified browser version
- Run `npm test` to execute the Jest test suite
  - `npm run test:watch` - Run tests in watch mode for development
  - `npm run test:coverage` - Generate test coverage reports
- All builds use esbuild for fast compilation and bundling
- Tests are written in TypeScript and located in the `tests/` directory

### Development Workflow
- Use TypeScript strict mode for all development
- Run `npm test` during development to ensure changes don't break existing functionality
- Use `npm run test:watch` for real-time testing during development
- Run builds frequently to catch compilation issues early: `npm run build`
- Use the existing patterns consistently - don't create new patterns
- When in doubt, follow the Figma REST API documentation exactly
- Check `lib/` output after builds to ensure proper compilation
- Write tests for new functionality in the `tests/` directory following existing patterns

### Tool Configuration
- **esbuild** handles all compilation and bundling (replaced TypeScript + Browserify)
- **Jest** configuration in `jest.config.js` with ts-jest preset for TypeScript testing
- TypeScript config in `tsconfig.json` targets ES5 with CommonJS modules
- Test files should be placed in `tests/` directory with `.test.ts` extension
- Coverage reports generated in `coverage/` directory
- Use `@figma/rest-api-spec` types exclusively - never create custom API types

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

### Security & Dependencies
- Check for vulnerabilities before adding new dependencies: `npm audit`
- Keep dependencies minimal and focused on the library's core purpose
- When adding dependencies, verify they're well-maintained and trusted
- Address security vulnerabilities promptly but carefully to avoid breaking changes

### Error Handling
- API errors should be handled consistently using the existing error patterns
- Preserve error information from the Figma API in responses
- Use TypeScript's strict typing to catch errors at compile time
- Handle network errors gracefully in the request utility functions

### File Management
- Exclude build artifacts from version control (already configured in `.gitignore`)
- Keep the source in `src/` and compiled output in `lib/`
- Place all tests in `tests/` directory with `.test.ts` extension
- Don't commit `node_modules`, `playground`, `coverage/`, or temporary files
- Use `.npmignore` to control what gets published to npm
- Test coverage reports are generated in `coverage/` directory

## When Making Changes

1. Write or update tests first: `npm test` (Test-Driven Development approach)
2. Ensure TypeScript compilation succeeds: `npm run build`
3. Run the full test suite to ensure no regressions: `npm test`
4. Verify all build targets work correctly (Node.js, browser, minified)
5. Check test coverage is maintained: `npm run test:coverage`
6. Check that new endpoints follow the established patterns
7. Update documentation in README.md if adding major new functionality
8. Maintain backward compatibility within major version
9. Run `npm audit` to check for security vulnerabilities
10. Test both Node.js and browser environments when possible