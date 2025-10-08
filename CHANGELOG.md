# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.1.0-beta] - 2025-10-08

### Added
- Comprehensive Jest testing suite for TypeScript source files
- Copilot instructions for repository development guidance
- Enhanced error handling with custom `ApiError` class

### Changed
- Migrated build system from browserify to esbuild for modern bundling
- Upgraded Axios from v0.27.2 to v1.12.2
- Split build commands into meaningful sub-commands (`build:node`, `build:browser`, `build:browser:min`)
- Updated TypeScript configuration to explicitly include `src` folder

### Fixed
- Package.json dependencies structure - moved `axios` and `@figma/rest-api-spec` to `dependencies`
- Fixed failing tests to work with enhanced ApiError implementation

## [v2.0.2-beta] - 2025-04-16

### Changed
- Dependencies maintenance and security updates
- Bumped `@figma/rest-api-spec` to v0.27.0
- Bumped `@types/node` to v22.14.1
- Bumped `typescript` to v5.8.3
- Bumped `uglifyify` to v5.0.2

### Fixed
- Fixed wrong path for `getPublishedVariablesApi` endpoint
- TypeScript compilation issues resolved

### Security
- Updated multiple dependency versions to address security vulnerabilities
- Bumped elliptic from 6.6.0 to 6.6.1
- Updated sha.js, pbkdf2, cipher-base, and form-data

## [v2.0.1-beta] - 2024-11-06

### Added
- Updated exported endpoints in main library
- Enhanced README documentation

### Changed
- Updated comment documentation
- Renamed readme.md to README.md for consistency

## [v2.0.0-beta] - 2024-11-05

### Added
- **BREAKING CHANGE**: Complete refactoring to align with official Figma REST API specifications
- Integration with `@figma/rest-api-spec` for type safety and API alignment
- All missing endpoints from the official Figma API added
- OAuth authentication improvements following new Figma specifications
- Analytics endpoints support
- Variables endpoints support
- Dev Resources endpoints support
- Enhanced webhooks support (v2 API)

### Changed
- **BREAKING CHANGE**: All endpoint methods now use object parameters (`pathParams`, `queryParams`, `requestBody`)
- **BREAKING CHANGE**: Method signatures completely restructured to match official API
- Library now acts as a thin wrapper around the official Figma REST API
- Package metadata updated to reflect v2.0 changes
- Types now sourced directly from `@figma/rest-api-spec`

### Security
- Updated OAuth token exchange method according to new Figma specifications

---

## Migration Guide: v1.x to v2.x

Version 2.0 represents a complete rewrite of the library to align with the official Figma REST API specifications. Here are the key breaking changes:

### Method Signatures
**Before (v1.x):**
```javascript
api.getFile(fileKey, { version, ids, depth, geometry, plugin_data, branch_data })
```

**After (v2.x):**
```javascript
api.getFile(
  { file_key: fileKey }, // pathParams
  { version, ids, depth, geometry, plugin_data, branch_data } // queryParams
)
```

### Authentication
OAuth authentication has been updated to follow the new Figma specifications. The `oAuthToken` method signature has changed.

### Benefits of v2.x
- Full type safety with official Figma API types
- Complete API coverage with all endpoints
- Future-proof alignment with Figma's specifications
- Better error handling and debugging

For detailed migration instructions, please refer to the [README.md](README.md) file.

---

## [v1.12.0] - 2024-11-05

### Added
- Missing properties in API response types
- Section type support
- New types from Figma REST API documentation
- Component sets support in API responses

### Changed
- Updated dependencies including axios to v0.28.0
- Made `getImageApi` scale parameter optional

### Fixed
- Missing fields in `GetFileResult` type
- Scale and format parameters now properly optional in image API

### Security
- Updated browserify-sign from 4.0.4 to 4.2.3
- Updated elliptic from 6.5.4 to 6.6.0
- Updated follow-redirects from 1.14.8 to 1.15.9
- Updated minimatch from 3.0.4 to 3.1.2

## [v1.11.0] - 2022-10-29

### Added
- Autolayout v4 properties support
- Improved `getFileNodesApi` response type
- Enhanced type definitions for various API responses

### Fixed
- Minor type issues in API definitions
- Updated `file.components` type definition

### Security
- Bumped shell-quote from 1.6.1 to 1.7.3
- Bumped minimist and mkdirp dependencies for security

