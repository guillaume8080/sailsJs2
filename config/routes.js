/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  //'Post /User/Toto': { controller: 'UserController', action:'toto' },
  //' /user/create?param=toto' : {controller: 'UserController', action:'toto'},
  '/creationUser': {view : 'pages/create'},
  //'GET /user/create' : {view : 'pages/create'},
  'Get /user/createaAction' : {view : 'pages/createaction'},
  //'user/create/:param?' : {controller: 'UserController', action:'toto'},
  '/user/toto' : {controller: 'UserController', action:'toto'},
  /*
  * 'GET /user/create' : {view : 'pages/create'},
  * */
  //True routes
  '/user/list': {controller: 'UserController', action:'lister'},
  'GET /user/create': {view : 'pages/user/create'},
  'POST /user/create' : {controller: 'UserController', action:'create'},


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
