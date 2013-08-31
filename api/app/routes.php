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

//Route::get('/', 'HomeController@showWelcome');
Route::get('/product/{id}', 'ProductController@getProduct');
Route::get('/products', 'ProductsController@getProducts');
//Route::get('/', function()
//{
////	return View::make('hello');
//    return Route::get('/', 'HomeController@showWelcome');
//});