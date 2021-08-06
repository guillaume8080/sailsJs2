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

    //Manage collection returned by querey
    const ArrayUsertst = await User.find({id:"610a55d60bcff4272488d178" });
    const userTest = ArrayUsertst[0];

    //create:
    const retourReqId = await TokenTrue.create({tokenuser: req.body.idUser , tokenevent:req.params.id}).fetch();

    //Query on join/via keys
    const myQuery = await User.find({id:"610a55d60bcff4272488d178" }).populate('tokentrue');

    return res.redirect('/event/list');
  }

};

