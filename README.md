Mao
=========

<img src="https://travis-ci.org/Wildhoney/Magento-on-Angular.png" />

Tired of Magento's lack of unit testing? Configuration over convention? Use of Prototype.js? Badly written JavaScript? Untested third-party modules? Likewise! Mao brings Magento into the 21st century.

**Demo Video:** https://vimeo.com/85305300 *(Build 0.1.1)*
Previous: <a href="https://vimeo.com/85201798">0.1.0</a>

<img src="http://i.imgur.com/PP6l6G9.jpg" alt="Angular, Magento, Laravel" />

Unit Testing
---------

All unit tests for both JavaScript and PHP can be run from the terminal: `grunt test`.

 * Run PHPUnit tests only: `grunt php-test`
 * Run Jasmine tests only: `grunt js-test`
 * PHP specific unit tests are available with the `phpunit` command from the `/api/` directory;
 * JavaScript specific unit tests are available via the URL `/store/tests/`;

Generating Products
---------

Since your product collection might be a little slow because of Magento's EAV database structure, Mao allows you to create a cache key via the terminal instead &ndash; however a cached copy will still be generated if you access it via your browser.

In order to generate a cache for the product collection, you can run `php artisan products` from the terminal. Once completed, the normal API method via the browser will use this cache key.

<img src="http://i.imgur.com/Ye2AO9J.png" alt="Redis" />

Please note that by default the cache is attempted to be created via Redis. If you don't want to use Redis, change the configuration on line 18 of `api/app/config/cache.php` from `redis` to `file`.

Directory Structure
---------

At first glance the directories may seem over-complicated. However there's method in all of the madness!

 * `api` contains the Laravel framework which interfaces with Magento;
 * `dist` contains production-ready minified JS/CSS files for Mao;
 * `magento` contains factory default Magento release;
 * `node` contains Node.js server for delivering products via <a href="https://github.com/Wildhoney/Snapshot.js">Snapshot</a>;
 * `store` contains the actual Angular.js Mao application;

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