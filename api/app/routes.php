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

Route::get('/product/{id}', 'ProductController@getProduct');
Route::get('/products', 'ProductsController@getProducts');
Route::get('/categories', 'CategoriesController@getCategories');
Route::get('/attributes/{name}', 'AttributesController@getOptions');