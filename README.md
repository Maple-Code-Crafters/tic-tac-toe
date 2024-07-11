# tic-tac-toe

## Workflow

- `main` branch (Prod)

- `dev` branch (Development)

- Branching from `dev` and PR to `dev`

- `dev` to `main` for release to Prod

- [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Ionic

- [docs](https://ionicframework.com/docs)
- [components](https://ionicframework.com/docs/components)
- [cli](https://ionicframework.com/docs/cli)
- [native plugins](https://ionicframework.com/docs/native)

## Vite

- [vite](https://vitejs.dev/guide/)

## Setup

`npm i`

## Plugins

- After adding or updating any Capacitor plugin, run `ionic capacitor sync`

## Development

`npm start`

## Test

- [Vitest](https://vitest.dev/guide/#overview)

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

`npm run test.unit`

`npm run test.unit:debu <test file name>` to run only one test

- [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

- Cypress needs the app/server running to work

`npm run test.e2e`

## Build

`npm run build`

## Android

- To add android app: `ionic capacitor add android`

- Install Android Studio

- [Running for Android](https://capacitorjs.com/docs/android)

- To copy source code changes: `npm run build:android`

## iOS

- To add ios app: `ionic capacitor add ios`

- Install Xcode (only Mac)

- [Running for iOS](https://capacitorjs.com/docs/ios)

- To copy source code changes: `npm run build:ios`

## Generate icon and splash screemn

- Add `logo.png` files to `/resources`

- `npm run generate`

- <https://github.com/ionic-team/capacitor-assets>

## Upload iOS build (Xcode)

1. Update iOS app project version

2. Product > Archive

3. Archives > Validate App and Distribute App
