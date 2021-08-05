/**
 * Evenement.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    label: { type: 'string'},
    start_date: { type: 'string' , columnType: 'time_stamp' },
    end_date : { type: 'string' , columnType: 'time_stamp' },
    address : {type: 'string'},

    //One to Many
    tokentrue:{

      collection:'tokentrue',
      via: 'tokenevent'

    },





  },

};

