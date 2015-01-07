<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/products', 'ProductsController@getProducts');

Route::get('/product/{id}', 'ProductController@getProduct');

Route::get('/categories', 'CategoriesController@getCategories');

Route::get('/attributes/{name}', 'AttributesController@getOptions');

Route::get('/basket', 'BasketController@getItems');
Route::get('/basket/add/{id}/{quantity}', 'BasketController@addItem');
Route::get('/basket/remove/{id}', 'BasketController@removeItem');

Route::get('/currencies', 'CurrenciesController@getCurrencies');

Route::get('/account', 'AccountController@getAccount');
Route::post('/account/login', 'AccountController@login');
Route::get('/account/logout', 'AccountController@logout');
Route::post('/account/register', 'AccountController@register');