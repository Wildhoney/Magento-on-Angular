<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get(
    '/', function () {
    return view('welcome');
}
);

/**
 * Products Controller
 */
Route::get('/products', 'ProductsController@getProducts');
Route::get('/product/{id}', 'ProductController@getProduct');

/**
 * Category(ies) Controller
 */
Route::get('/categories', 'CategoriesController@getCategories');

/**
 * Attributes Controller
 */
Route::get('/attributes/{name}', 'AttributesController@getOptions');

/**
 * Basket Controller
 */
Route::get('/basket', 'BasketController@getItems');
Route::get('/basket/add/{id}/{quantity}', 'BasketController@addItem');
Route::get('/basket/remove/{id}', 'BasketController@removeItem');

/**
 * Currency Controller
 */
Route::get('/currencies', 'CurrenciesController@getCurrencies');


/**
 * Account Controller
 */
Route::get('/account', 'AccountController@getAccount');
Route::post('/account/login', 'AccountController@login');
Route::get('/account/logout', 'AccountController@logout');
Route::post('/account/register', 'AccountController@register');