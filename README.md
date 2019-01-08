# Decorasaurus Admin Dashboard

## Todos
- Setup a router guard with login auth page
  - Can be finicky on login
- Home orders page with a bit of reporting / graphs
- ~~Orders page with table of orders~~
  - ~~Setup sorting~~
  - Setup filtering
    - Just a dynamic call to the generic api endpoint with our filter options. Some simple stuff like by status, shipped, and maybe created (last day, week, etc)
  - ~~Search capability~~
  - Export to CSV
    - https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
- ~~Order item page~~
  - Ability to process fusions
    - ~~Maybe have its own section on the sidebar or at least an order items area to filter.~~
    - ~~A count on the homepage of the dashboard of the fusion order items not processed with a link to see them would be nice.~~
    - A specific page with ability to: 
      - ~~Turn on floyd server~~
      - Go one by one on the order items
      - ~~Turn off floyd server would be great.~~
    - Eventually an auto turn off or something of the floyd server would be nice and a nice big sign / notification on the dashboard that it's on would be cool. Maybe set a cron job even to auto turn off after 30 mins?

## Inspiration
  - Will need a role for our poster admin accounts that would have access to orders, but probably not the rest and then an admin dash which has orders, customers, sales, usage analytics, reports, and other good stuff
  - http://help.wanelo.com/customer/portal/articles/1790355-how-do-i-fulfill-an-order-
  - Shopify has solid responsive dash too
  - Moltin
  - Stripe is nice
  - Nice to export to csv
  - Filters of orders by date, fulfilled etc

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Updating Production

- Web app uses a service worked so we need to break the cache when we update. Change the cache version in service-worker.js to do this and prompt users to do the same.
- Run `$ ng build --prod` to run an AoT build
- Use SFTP (cyber duck) to replace the www folder in /var/www/packonmyback.com/html on the server