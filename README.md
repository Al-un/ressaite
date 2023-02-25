# Ressaite

## Repository structure:

- [`ressaite-api`](./ressaite-api/): the API back-end, ExpressJS
- [`ressaite-core`](./ressaite-core/): centralize common definitions and utilities
- [`ressaite-web`](./ressaite-web/): the web front-end, written in Vue 3 and SSR-rendered.

## Getting started

This project uses:
- NodeJS 18+
- `package-lock.json` v3, which requires NPM v7 or later ([NPM doc](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json?v=true#lockfileversion))

- Clone this repository 
  ```sh
  git clone https://github.com/Al-un/ressaite.git
  ```
- Setup PostgresSQL
- Update `pg_hba.conf`
    peer authentication
    127.0.0.1 authentication
- Move to repo root
  ```sh
  npm install
  ```