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

    let key = sails.config.custom.redis.geokey;
    console.log('sails redis geo key: ' + key);
    let georecords = [];
    let results = [];



    //[Remove temporary member UserLoc]
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      await (util.promisify(db.zrem).bind(db))(key, 'UserLoc');
    });

    //[Get all geographic entities before adding temporary "UserLoc" entry]
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      georecords = await (util.promisify(db.zrange).bind(db))(key, 0, -1);
    });

    let rval_ga = "";
    //[Add temporary member to sails geo key to easily use GEODIST]
    await sails.getDatastore('redis').leaseConnection(async (db) => {
      rval_ga = await (util.promisify(db.geoadd).bind(db))(key, inputs.long, inputs.lat, 'UserLoc');
    });
    console.log("geoadd UserLoc rval: " + rval_ga);

    //[Iterate over georecords, storing scenes that overlap lat,long]
    georecords.forEach(checkContainment);

    async function checkContainment(value, index, array) {
      console.log("here (checkContainment (for " + value + ") )");

      let delta = "";

      //[Get ATLAS record of georecord]
      let record = await Record.findOne({
        id: value
      });
      console.log("Radius for record: " + record.radius);

      //[Find distance between UserLoc and this geographic scene]
      await sails.getDatastore('redis').leaseConnection(async (db) => {
        delta = await (util.promisify(db.geodist).bind(db))(key, value, 'UserLoc');
      });
      console.log("str delta: " + delta);
      delta = parseFloat(delta);
      console.log("num delta: " + delta);

      //[Add Record to results if UserLoc within it]
      if( delta <= record.radius ){
        record.distance = delta;
        results.push(record);
        console.log("Record added to results!");
      }
    }


    return results;
  }
};
