/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    mail: { type: 'string'},
    first_name: {type: 'string'},
    last_name: {type: 'string'},
    age: {type: 'number'},
  },

};

