# D4H API Bindings
This folder holds the release API bindings and tests.

## Folders

* `client/` - Actual API client components.
* `models/` - Models for returned objects, e.g. `Member`.
* `providers/` - Volatile data such as API environments and routing paths.
* `routes/` - Interfaces for route parameters and return values.
* `services/` - Object services, e.g. MemberService.

## Build

Run `ng build client` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build client`, go to the dist folder `cd dist/client` and run `npm publish`.

## Running unit tests

Run `ng test client` to execute the unit tests via [Karma](https://karma-runner.github.io).
