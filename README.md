# k6-load-tests-template

A simple template project with load tests written in TypeScript with Grafana k6.

## Prerequisites

1. Visual Studio Code
2. k6 - <https://grafana.com/docs/k6/latest/set-up/install-k6/>
3. NodeJS 20 - <https://nodejs.org/en>
4. api-authenticator - <https://github.com/lrydzkowski/api-authenticator>

## How to run it

1. Create `./config/ad-b2c-config.json` based on `./config/ad-b2c-config.json_sample`.
2. Create `./config/tests-config.json` based on `./config/tests-config.json_sample`.
3. Create `./config/tokens.json` based on `./config/tokens.json_sample`.
4. Run the following commands:

   ```powershell
   npm install
   npm run test1
   ```
