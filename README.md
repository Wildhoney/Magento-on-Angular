Moa
=========

<img src="https://travis-ci.org/Wildhoney/Magento-on-Angular.png" />

Tired of Magento's lack of unit testing? Configuration over convention? Use of Prototype.js? Badly written JavaScript? Untested third-party modules? Likewise! Moa brings Magento into the 21st century.

 * **0.2.8 (Latest)**: https://vimeo.com/86465770
 * 0.1.1: https://vimeo.com/85305300
 * 0.1.0: https://vimeo.com/85201798

<img src="http://i.imgur.com/PP6l6G9.jpg" alt="Angular, Magento, Laravel" />

Heapshots: Moa uses <a href="https://github.com/bnoordhuis/node-heapdump">HeapDump</a> to take memory snapshots. Send a `kill -USR2 <pid>` where `<pid>` is your Node.js process ID.

Getting Started
---------

 * Install all dependencies: `npm install`, `bower install`;
 * Install Laravel dependencies: `composer install` from `api/`;
 * Configure your Magento `local.xml`: `cp magento/app/etc/local.xml.template magento/app/etc/local.xml`;
 * Update `node/server.js` line 11 to your own host and path;
 * Update `store/js/services/Socket.js` line 18 to your Node.js instance;
 * (Optionally): Cache products using `php artisan products` from `api/`;
 * Initialise the Node.js instance: `node node/server.js`;
 * Open `example.com/Magento-on-Angular/store/` in your browser;
 * You may need to update the `base_url` in `Magento Admin > Configuration > Web`

If things are not working correctly, take a look at `api/public/attributes/color` for any Laravel/Magento issues. Please don't spend too much time debugging &ndash; <a href="https://github.com/Wildhoney/Magento-on-Angular/issues">file a bug</a>!

Unit Testing
---------

All unit tests for both JavaScript and PHP can be run from the terminal: `grunt test`.

 * Run PHPUnit tests only: `grunt php-test`
 * Run Jasmine tests only: `grunt js-test`
 * PHP specific unit tests are available with the `phpunit` command from the `/api/` directory;
 * JavaScript specific unit tests are available via the URL `/store/tests/`;

Generating Products
---------

Since your product collection might be a little slow because of Magento's EAV database structure, Moa allows you to create a cache key via the terminal instead &ndash; however a cached copy will still be generated if you access it via your browser.

In order to generate a cache for the product collection, you can run `php artisan products` from the terminal. Once completed, the normal API method via the browser will use this cache key.

<img src="http://i.imgur.com/Ye2AO9J.png" alt="Redis" />

Please note that by default the cache is using plain old file cache. If you want to use Redis, change the configuration on line 18 of `api/app/config/cache.php` from `file` to `redis`. More information on the cache configuration is available on http://laravel.com/docs/cache#configuration.

Directory Structure
---------

At first glance the directories may seem over-complicated. However there's method in all of the madness!

 * `api` contains the Laravel framework which interfaces with Magento;
 * `dist` contains production-ready minified JS/CSS files for Moa;
 * `magento` contains factory default Magento release;
 * `node` contains Node.js server for delivering products via <a href="https://github.com/Wildhoney/Snapshot.js">Snapshot</a>;
 * `store` contains the actual Angular.js Moa application;

Laravel API
---------

If you prefer to use another JS framework such as Ember or Meteor, then you're more than welcome to use the API in isolation. Below we've documented the URLs and their purposes:

 * `/products` &ndash; fetch all the products;
 * `/product/5` &ndash; fetch a product with the ID of 5;
 * `/categories` &ndash; fetch all the categories and their sub-categories;
 * `/basket` &ndash; fetch all of the items in the basket;
 * `/basket/add/2` &ndash; add an item to the basket with product ID 2;

Specification
---------

 * Angular.js front-end for one-page functionality;
 * Laravel API for interacting with Magento;
 * Separation of concerns with API being separate from Magento installation;
 * Lazy-loaded product collection with <a href="https://github.com/Wildhoney/Snapshot.js">Snapshot.js</a>;
 * Simplified PHP back-end REST API;
 * Implement Spreedly as the payment gateway;
 * Front-end and back-end tests with >90% unit-test code coverage;
 * Abides by the rules to make it Google crawlable;
 * Socket.io (WebSockets) for instant product availability;
 * Standardised modules: Facebook Connect, Gift Wrapping, et cetera...;
 * GZipped data packages from back-end API;
 * Real-time currency converter using Google Calculator API;
 * Crossfilter for super-fast filtering across all models;
