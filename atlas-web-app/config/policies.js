/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

// Authentication module.
const auth = require('http-auth');
const basic = auth.basic({
    realm: "CONIX"
  }, (username, password, callback) => {
    // Custom authentication
    // Use callback(error) if you want to throw async error.
    callback(username === "conix" && password === "conix");
  }
);
const auth_connect = require('http-auth-connect');


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': auth_connect(basic),
  //'*': 'isLocal',

};
