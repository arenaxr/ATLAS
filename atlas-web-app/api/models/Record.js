/**
 * Record.js
 *
 * @description :: An ATLAS record which contains info to connect to ARENA things
 * @docs        :: https://docs.google.com/presentation/d/1dc1RdlGROBYj1zIoPR8HX_RBIKn8-KRmNZscXVrdIs0/edit#slide=id.g60b507f38e_11_80
 */

module.exports = {

  attributes: {
    //ltj: I'm referencing docs on models rn:
    //    https://sailsjs.com/documentation/concepts/models-and-orm/models

    //ltj: uuid is defined by RFC 4122. We don't expect to check, enforce
    //    or generate uuids, ATLAS just stores them, thus 'string' type
    uuid: { type: 'string', required: true, unique: true },
    //ltj: TODO: tighten up position naming a bit, would prefer:
    //    pos.lat, pos.lon, pos.elev, with possible x,y,z aliases
    //   : Abstractly, spatial coords are meatspace location...
    lat: { type: 'number', required: false },
    lon: { type: 'number', required: false },
    elev: { type: 'number', required: false },
    //    ... and url is cyberspace location
    url: { type: 'string', required: false },

  },

};

