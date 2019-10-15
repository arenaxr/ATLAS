module.exports = {


  friendlyName: 'Redirect by UUID',


  description: 'Looks up an ATLAS record by UUID and HTTP redirects to its URL',


  inputs: {
    uuid: {
      description: 'The UUID to look up',
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


  fn: async function ({uuid}) {
    let record = await Record.findOne({ uuid: uuid });
    if (!record) { throw 'notFound'; }
    this.res.redirect(record.url);
  }


};
