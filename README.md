# Wingbuff

v0.5

## Built with Node, Express, Postgres, and Knex

## Installation / Usage:

1. Fork/Clone
1. Install dependencies - `npm install`
1. Create .env file and add `NODE_ENV=development` and `SECRET_KEY=[yourkey]`
1. Create two local Postgres databases - `wbuff` and `wbuff_test`
1. Migrate - `knex migrate:latest --env development`
1. Seed - `knex seed:run --env development`
1. Run the development server - `npm start`
1. Test - `npm test`