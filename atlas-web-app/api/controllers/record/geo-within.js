const util = require('util');

module.exports = {

  friendlyName: 'Find scenes that a geographic point is in',

  description: 'Given a lat/long, find scenes that overlap that position',

  inputs: {
    lat: {
      description: 'The starting point latitude to look up  (signed decimal)',
      type: 'number',
      required: true,
      //TODO: Consider reducing to ~-85 <-> ~85 per this documentation: https://redis.io/commands/geoadd
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
  },

  fn: async function (inputs) {

    console.log("geo-within API call START")

    let key = sails.config.custom.redis.geokey;
    let georecords = [];
    let results = [];

    //[Get all records with geo coords using ridiculous radius of 1 lightyear ]
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      georecords = await (util.promisify(db.georadius).bind(db))(key, inputs.long, inputs.lat, sails.config.custom.geo.ly, 'm', 'WITHDIST', 'ASC');
    });

    console.log(georecords);

    // [ Get all ATLAS records ]


    //DEBUG
    console.log(results);
    console.log("geo-within API call END")

    return results;
  }
};
