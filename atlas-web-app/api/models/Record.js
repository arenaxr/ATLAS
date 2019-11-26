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

const util = require('util');

module.exports = {

  attributes: {
    /*
    uuid: {
      type: 'string',
      required: true,
      unique: true,
      isUUID: true,
      // sy: NOTE: 'isUUID' and other validation functions protect db from
      //           invalid data but do not cater to helping a user...
    },
    */
    lat: {
      type: 'number',
      required: false,
      // sy: TODO: add custom validation that checks if number isGeoCoord
    },

    lon: {
      type: 'number',
      required: false,
    },

    ele: {
      type: 'number',
      required: false,
    },

    url: {
      type: 'string',
      required: false,
      isURL: true,
    },

  },
  afterCreate: async (record, proceed) => {
    let key = sails.config.custom.redis.geokey;
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      await (util.promisify(db.geoadd).bind(db))(key, record.lat, record.long, record.id);
    });
    proceed();
  },
  afterUpdate: async (record, proceed) => {
    let key = sails.config.custom.redis.geokey;
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      await (util.promisify(db.geoadd).bind(db))(key, record.lat, record.long, record.id);
    });
    proceed();
  },
  beforeDestroy: async (record, proceed) => {
    let key = sails.config.custom.redis.geokey;
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      await (util.promisify(db.zrem).bind(db))(key, record.where.id);
    });
    proceed();
  }
};
