// Periodically revisit validation for this model, per this:
// https://github.com/conix-center/ATLAS/issues/1

/**
 * Record.js
 *
 * @description :: An ATLAS record which contains info to connect to ARENA
                   things
 * @docs        :: https://docs.google.com/presentation/d/1dc1RdlGROBYj1zIoPR8HX_RBIKn8-KRmNZscXVrdIs0/edit#slide=id.g60b507f38e_11_80
 *                 https://sailsjs.com/documentation/concepts/models-and-orm/models
 *                 RFC 4122 defines UUID
 */

module.exports = {

  attributes: {

    uuid: {
      type: 'string',
      required: true,
      unique: true, 
    },

    lat: { 
      type: 'number',
      required: false,
    },

    lon: {
      type: 'number', 
      required: false,
    },

    elev: {
      type: 'number',
      required: false,
    },

    url: {
      type: 'string',
      required: false,
    },

  },

};

