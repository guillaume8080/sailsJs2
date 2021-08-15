/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



//const axios = require('axios');


module.exports = {

  create: async function (req, res) {


    const body = req.body;
    console.log(body);
    var retourInsertTest = await Evenement.create({
      label: body.libelle,
      start_date: body.debut,
      end_date: body.fin,
      address: body.adresse
    }).fetch();
    console.log('insert done');
    return res.redirect('event/list');

  },


  lister: async function (req, res) {

    var listEvents = await Evenement.find();

    //select evenement.champs from Evenement inner join tokentrue on evenement.idevenement = tokentrue.idEvenement where tokentrue is not null
    //J'explique pourquoi cette requête
    //Je ramène les évènements ayant au mins 1 ticket
    //Dans le template j'accède au nombre de tickets en lien avec l'èvenement
    //Or 1 ticket = 1 user
    //verouiller saisie d un ticket avec le même user
    const myQueryEvent = await Evenement.find().populate('tokentrue');

    //test native query
    var nativeQuery = "select FROM Evenement";
    `

    var rawResult = await db.sendNativeQuery(nativeQuery);
               `


    return res.view('pages/event/list', {maCollection: myQueryEvent});
  },

  delete: async function (req, res) {

    console.log(req.params);
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const retour = await Evenement.destroy({id: idToDelete}).fetch();

    return res.redirect('/event/list');

  },

  interView: async function (req, res) {

    const idEvenement = req.params.id;
    const lEvent = await Evenement.find({id: idEvenement});
    const libelleEvenement = lEvent[0].label;
    var listUsers = await User.find();
    return res.view('pages/event/token/createTokenForm', {idEvent: idEvenement, collectionUser: listUsers , libelle: libelleEvenement });


  },

  createToken: async function (req, res) {

    const variable = req.params;
    const idEvenement = variable.id;
    //create:
    const retourReqId = await TokenTrue.create({tokenuser: req.body.idUser, tokenevent: req.params.id}).fetch();

    //Query on join/via keys --> To delete
    //const myQuery = await User.find({id: "610a55d60bcff4272488d178"}).populate('tokentrue');

    return res.redirect('/event/list');
  },

  createManageAddress: async function(req, res){

    //console.log(req.params);
    var axios = require('axios');
    var labelsReturned = [];
    var wholeParams = req.params;
    const address = wholeParams.address;
    const libelle = wholeParams.libelle;
    const debut = wholeParams.debut;
    const fin = wholeParams.fin;





    const retour = await axios.get('https://api-adresse.data.gouv.fr/search', {
      params: {
        q: address,
        //q: body,
      }
    }).then(function (response) {
      console.log(response);
      for (let i = 0; i < response.data.features.length; i++) {
        labelsReturned.push(response.data.features[i].properties.label);


      }

    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function (response) {
      });

    if (labelsReturned.length < 1){

      return res.view('pages/event/create');

    }
    return  res.view('pages/event/createAddress' , {leDebut: debut, leLibelle:libelle , laFin:fin , collectionAdresses:labelsReturned });

  },
  createTrue: async function(req, res){

    const body = req.body;
    console.log(body);
    var retourInsertTest = await Evenement.create({
      label: body.libelle,
      start_date: body.debut,
      end_date: body.fin,
      address: body.lAdresse
    }).fetch();
    console.log('insert done');
    return res.redirect('event/list');

    return;
  }





}

