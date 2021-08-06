/**
 * EventController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function  (req , res) {


    const body = req.body;
    console.log(body);
    var retourInsertTest = await Evenement.create({label: body.libelle , start_date : body.debut , end_date: body.fin , address: body.adresse }).fetch();
    console.log('insert done');
    return res.redirect('event/list' );
  },
  lister: async function  (req, res) {

    var listEvents = await Evenement.find();
    const myQueryUser = await User.find({id:"610d2b0ebadf441feab1dd3d" }).populate('tokentrue');


    const myQueryEvent = await Evenement.find({id:"610d2a9cbadf441feab1dd3b" }).populate('tokentrue');
    return res.view('pages/event/list', {maCollection: listEvents} );
  },

  delete: async function  (req , res)  {

    console.log(req.params);
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const retour = await Evenement.destroy({id: idToDelete}).fetch();

    return res.redirect('/event/list');

  },

  interView: async function(req,res){

    const idEvenement = req.params.id;
    var listUsers = await User.find();

    return res.view('pages/event/token/createTokenForm', {idEvent: idEvenement , collectionUser: listUsers } );


  },

  createToken: async function (req,res){

    const variable = req.params;
    const idEvenement = variable.id;
    //create:
    const retourReqId = await TokenTrue.create({tokenuser: req.body.idUser , tokenevent: req.params.id}).fetch();

    //Query on join/via keys --> To delete
    const myQuery = await User.find({id:"610a55d60bcff4272488d178" }).populate('tokentrue');

    return res.redirect('/event/list');
  }

};

