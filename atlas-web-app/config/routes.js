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

  '/': { view: 'pages/landing-geo-loc-near' },
  '/home': { view: 'pages/homepage' },
  '/portal': { view: 'pages/portal' },
  '/about': { view: 'pages/about' },
  '/manage': { view: 'pages/manage' },
  '/create-record-form': { view: 'pages/create-record-form' },
  '/search-records-form': { view: 'pages/search-records-form' },
  '/update-record-form': { view: 'pages/update-record-form'},
  '/delete-record-form': { view: 'pages/delete-record-form' },
  '/landing-geo-loc-near': { view: 'pages/landing-geo-loc-near' },

  'GET /redirect/:id': { action: 'record/redirect-id' },
  'GET /lookup/geo': { action: 'record/geo-radius' },
  'GET /lookup/prox/:id': { action: 'record/id-radius' },

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
