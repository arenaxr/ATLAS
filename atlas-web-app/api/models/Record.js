// TODO : Periodically revisit validation for this model, per this:
// todo   https://github.com/conix-center/ATLAS/issues/1 --ltj

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

    name: {
      type: 'string',
      required: true,
    },

    url: {
      type: 'string',
      required: true,
      isURL: true,
    },

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

    pose: {
      type: 'json',
      required: false,
    },

    objectType: {
      type: 'string',
      required: false
    }
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

  mergeGeoResults: async (geoArr, units, ignore, filter) => {
    let ids = [];
    let distances = {};
    for (let i = 0, len = geoArr.length; i < len; i++) {
      if (geoArr[i][0] === ignore) { continue; }
      ids.push(geoArr[i][0]);
      distances[geoArr[i][0]] = geoArr[i][1];
    }
    let query = { id: ids };
    if (filter) {
      Object.assign(query, filter);
    }
    let mongoRecords = await Record.find(query);
    for (let i = 0, len = mongoRecords.length; i < len; i++) {
      mongoRecords[i].distance = distances[mongoRecords[i].id] + ' ' + units;
    }
    return mongoRecords;
  }
};
