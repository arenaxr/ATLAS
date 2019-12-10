module.exports = {


  friendlyName: 'Redirect by ID',


  description: 'Looks up an ATLAS record by ID and HTTP redirects to its URL',


  inputs: {
    id: {
      description: 'The ID to look up',
      type: 'string',
      required: true
    }
  },


  exits: {
    notFound: {
      description: 'No ATLAS record with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function ({id}, exits) {
    let record = await Record.findOne({ id: id });
    if (!record) {
      return exits.notFound({
        error: 'No ATLAS record with the specified ID was found in the database.'
      });
    }
    this.res.redirect(record.url);
  }


};
