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


  //True routes to User actions and views
  '/user/list': {controller: 'UserController', action:'lister'},
  'GET /user/create': {view : 'pages/user/create'},
  'POST /user/create' : {controller: 'UserController', action:'create'},
  '/user/delete/:id' :{controller: 'UserController', action:'delete'},

  //Routes to Events
  '/event/list': {controller: 'EventController', action: 'lister'},
  'GET /event/create' : {view: 'pages/event/create'},
  'POST /event/create' : {controller: 'EventController' , action: 'create'},
  '/event/createAddress/:libelle/:debut/:fin/:address' : {controller: 'EventController' , action:'createManageAddress'},
  '/event/delete/:id' :{controller: 'EventController', action:'delete'},
  //Routes events/Token
  //route to mock , to delete
  '/event/token' : {controller: 'EventController' , action:'createToken'},
  //route creation token true
  //1 get peut ramener vers un controller
  'GET /event/:id/token' : {controller: 'EventController' , action:'interView'},
  'POST /event/:id/token' : {controller: 'EventController' , action:'createToken'},

  //Utilisation de bluePrint
  'GET /api/v1/token' : {controller: 'TokenApiController' , action:'findAll'},

  //to Delete
  '/testUltime' : {controller: 'TokenApiController' , action:'testAppel'},






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
