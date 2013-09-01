Tired of Magento's lack of unit testing? Configuration over convention? Use of Prototype.js? Badly written JavaScript? Untested third-party modules? Us too!

<img src="http://i.imgur.com/PP6l6G9.jpg" alt="Angular, Magento, Laravel" />
<img src="https://travis-ci.org/Wildhoney/Magento-on-Angular.png?branch=master" />

Unit Testing
---------

All unit tests for both JavaScript and PHP can be run from the terminal: `grunt test`.

PHP specific unit tests are available with the `phpunit` command from the `/api/` directory.

Laravel API
---------

If you prefer to use another JS framework such as Ember or Meteor, then you're more than welcome to use the API in isolation. Below we've documented the URLs and their purposes:

 * `/products` &ndash; fetch all the products;
 * `/product/5` &ndash; fetch a product with the ID of 5;
 * `/categories` &ndash; fetch all the categories and their sub-categories;

Specification
---------

 * Angular.js front-end for one-page functionality;
 * Laravel API for interacting with Magento;
 * Simplified PHP back-end REST API;
 * Implement Spreedly as the payment gateway;
 * Front-end and back-end tests with >90% unit-test code coverage;
 * Abides by the rules to make it Google crawlable;
 * Socket.io (WebSockets) for instant product availability;
 * Standardised modules: Facebook Connect, Gift Wrapping, et cetera...;
 * GZipped data packages from back-end API;
 * Real-time currency converter using Google Calculator API;
 * Crossfilter for super-fast filtering across all models;
 * (Future) Fallback to lazy-loading models for mobiles/tablets;