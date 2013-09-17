Mao
=========

Tired of Magento's lack of unit testing? Configuration over convention? Use of Prototype.js? Badly written JavaScript? Untested third-party modules? Likewise! Mao brings Magento into the 21st century.

<img src="http://i.imgur.com/PP6l6G9.jpg" alt="Angular, Magento, Laravel" />
<img src="https://travis-ci.org/Wildhoney/Magento-on-Angular.png?branch=master" />

Unit Testing
---------

All unit tests for both JavaScript and PHP can be run from the terminal: `grunt test`.

 * Run PHPUnit tests only: `grunt php-test`
 * Run Jasmine tests only: `grunt js-test`
 * PHP specific unit tests are available with the `phpunit` command from the `/api/` directory;
 * JavaScript specific unit tests are available via the URL `/store/tests/`;

Mao's Events (Hooks)
---------

I've attempted to standardise the events that are fired within the application.

 * ***Basket***
 * `mao/basket/updated`: Basket has been updated;
 * `mao/basket/loaded`: Basket has been retrieved;
 * `mao/basket/add -> {id}`: Instruction to add a product;
 * ***Product***
 * `mao/product/loaded`: Product has been loaded;
 * `mao/product/unloaded` Product has been unloaded;
 * `mao/product/unload`: Instruction to unload a product;
 * ***Products***
 * `mao/products/updated`: Products collection has been updated;
 * ``
 * ***Product Attributes***
 * `mao/attribute/updated`: Filter attribute has been updated;


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