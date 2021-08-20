/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */




module.exports = {

  create: async function (req, res) {

    const body = req.body;

    var timestamp = require('unix-timestamp');
    const laDate = body.debut;
    var retour = timestamp.fromDate(laDate);

    var retourInsertTest = await Evenement.create({
      label: body.libelle,
      start_date: body.debut,
      end_date: body.fin,
      address: body.lAdresse
    }).fetch();
    console.log('insert done');
    return res.redirect('event/list');

  },


  lister: async function (req, res) {

    var listEvents = await Evenement.find();

    //select evenement.champs from Evenement inner join tokentrue on evenement.idevenement = tokentrue.idEvenement where tokentrue is not null
    //J'explique pourquoi cette requête dans la page EJS
    //Grosso modo , populate  = innser join en SQL classique
    const myQueryEvent = await Evenement.find().populate('tokentrue');

    return res.view('pages/event/list', {maCollection: myQueryEvent});

    /* Voici la requete native
    /Je n'ai pas réussi à trouver comment l'exécuter ...
    // db.tokentrue.find(  {"tokenevent": ObjectId("61102613e0d5ce3d8248d99f")}  ).count()*/
  },

  delete: async function (req, res) {

    var axios = require('axios');
    const idToDelete = req.params.id;
    //tableau d ids de token destiné à la suppression
    var tableauDId = [];

    //suppression des tokens associés à l'evenement
    const retourAxios = await axios.get('http://localhost:1337/tokentrue', {

    }).then(function (response) {

      retourApi = response.data;
      for (let i = 0; i < retourApi.length; i++){

        if(retourApi[i].tokenevent.id === idToDelete){

          tableauDId.push(retourApi[i].id);

        }
      }
    });

    for (let j = 0; j < tableauDId.length; j++){

      var tokenToDelete = tableauDId[j];

      var retourDelete = await TokenTrue.destroy({id: tokenToDelete}).fetch();


    }

    //suppression de l'evenement lui-meme
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

    //recuperation de l'id de l evenement passé dans l url
    const variable = req.params;
    const idEvenement = variable.id;
    //create:
    const retourReqId = await TokenTrue.create({tokenuser: req.body.idUser, tokenevent: req.params.id}).fetch();


    return res.redirect('/event/list');
  },

  createManageAddress: async function(req, res){


    var axios = require('axios');
    var labelsReturned = [];
    var wholeParams = req.params;
    const address = wholeParams.address;
    const libelle = wholeParams.libelle;
    const debut = wholeParams.debut;
    const fin = wholeParams.fin;

    //requete via classe client axios
    //Ramene un jeu de 5 adresses selon la saisie dns la précédente vue
    const retour = await axios.get('https://api-adresse.data.gouv.fr/search', {
      params: {
        q: address,

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

    //Retour vers saisie si adresse saisie erronnée
    if (labelsReturned.length < 1){

      return res.view('pages/event/create');

    }
    //Si tout se passe bien l'utilisateur est redirigée vers une vue lui proposant une liste déroulante d'adresses
    return  res.view('pages/event/createAddress' , {leDebut: debut, leLibelle:libelle , laFin:fin , collectionAdresses:labelsReturned });

  },




}

