/**
 * TokenTrue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //Selon l'énoncé, le model Token contient des "clés étrangères" vers User et Event
    //Donc 1 ticket = 1 instance de Token = 1 user & 1 Event

    tokenuser:{
            model:'user'
          },

    tokenevent:{
      model:'evenement'
    },


},

};

