/**
 * TokenApiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  findAll: async function(req, res){

    var axios = require('axios');
    var retourApi;
    var maCollectionDeTickets = [];

    //cette requete permet  d'accéder  aux champs exposés tel des ids dans le flux renvoyé par cette url
    const retour = await axios.get('http://localhost:1337/tokentrue', {

    }).then(function (response) {
      console.log(response);
      retourApi = response.data;
      console.log(retourApi);
      for (let i = 0; i < retourApi.length; i++){

        var ticket = {};
        var idTicket = retourApi[i].id;
        ticket.id = idTicket;

        var user = {};
        var idUser = retourApi[i].tokenuser.id;
        user.id = idUser;
        var first_name = retourApi[i].tokenuser.first_name;
        user.first_name = first_name;
        var last_name = retourApi[i].tokenuser.last_name;
        user.last_name = last_name;
        var age = retourApi[i].tokenuser.age;
        user.age = age;

        ticket.user = user;

        var event = {};
        const label = retourApi[i].tokenevent.label;
        event.label = label;
        const start_date = retourApi[i].tokenevent.start_date;
        event.start_date = start_date;
        const end_date = retourApi[i].tokenevent.end_date;
        event.end_date = end_date;
        const address = retourApi[i].tokenevent.address;
        event.address = address;

        ticket.event = event;

        maCollectionDeTickets.push(ticket);




      }


    });
    //renvoie la collection attendu dans l'énonce sous forme de tableau
    //Le return seule n'existe pas
    return res.send(maCollectionDeTickets);

  },

  testAppel: async function(req, res){

    var retourAppelAdresse ;
    var axios = require('axios');
    retourAppelAdresse = await axios.get('http://localhost:1337/api/v1/token');

    const CollectionManipulable = retourAppelAdresse.data;

    return;

  },





};

