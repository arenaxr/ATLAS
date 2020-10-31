const util = require('util');

module.exports = {

  friendlyName: 'Find records by geographic radius from point',

  description: 'Looks up records within a given distance from a starting latitude and longitude',

  inputs: {
    lat: {
      description: 'The starting point latitude to look up  (signed decimal)',
      type: 'number',
      required: true,
      min: -90,
      max: 90
    },
    long: {
      description: 'The starting point longitude to look up (signed decimal)',
      type: 'number',
      required: true,
      min: -180,
      max: 180
    },
    distance: {
      description: 'The distance to range',
      type: 'number',
      required: true,
      min: 0
    },
    units: {
      description: 'The distance unit [m|km|ft|mi] (default: m)',
      type: 'string',
      defaultsTo: 'm',
      isIn: ['m', 'km', 'ft', 'mi']
    },
    objectType: {
      description: 'Object Type to filter (optional)',
      type: 'string'
    }
  },

  fn: async function (inputs) {

    let key = sails.config.custom.redis.geokey;
    let results = [];
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      results = await (util.promisify(db.georadius).bind(db))(key, inputs.long, inputs.lat, inputs.distance, inputs.units, 'WITHDIST');
    });
    let filter = undefined;
    if (inputs.objectType) {
      filter = { objectType: inputs.objectType };
    }
    return await Record.mergeGeoResults(results, inputs.units, '', filter);
  }
};
