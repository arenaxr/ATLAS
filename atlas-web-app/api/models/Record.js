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
      min: -90,
      max: 90
    },

    long: {
      type: 'number',
      required: false,
      min: -180,
      max: 180
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
  },

  mergeGeoResults: async (geoArr, units, ignore) => {
    let ids = [];
    let distances = {};
    for (let i = 0, len = geoArr.length; i < len; i++) {
      if (geoArr[i][0] === ignore) { continue; }
      ids.push(geoArr[i][0]);
      distances[geoArr[i][0]] = geoArr[i][1];
    }
    let mongoRecords = await Record.find({
      id: ids
    });
    for (let i = 0, len = mongoRecords.length; i < len; i++) {
      mongoRecords[i].distance = distances[mongoRecords[i].id] + ' ' + units;
    }
    return mongoRecords;
  }
};
