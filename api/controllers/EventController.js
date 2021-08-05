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
  createToken: async function (req,res){

    /*const retourCreate = await Token.create().fetch();
    const idToken = retourCreate.id;
    //attention un find ramene des arrays mm à 1 element
    ;*/

    //syntaxe insert via references
   /* try{
      //await User.addToCollection("idToken", 'user', "610a55d60bcff4272488d178");
      const retour =  await Token.create({owner: "610a55d60bcff4272488d178"});
    }
    catch(error){
      console.log("l erreur produit est :" + error);
    }*/

    const ArrayUsertst = await User.find({id:"610a55d60bcff4272488d178" });
    const userTest = ArrayUsertst[0];

    //create:
    const retourReqId = await TokenTrue.create({tokenuser: "610a55d60bcff4272488d178" , tokenevent:"610a59ed6385e42c91ec5e32"}).fetch();

    //Query on join/via keys
    const myQuery = await User.find({id:"610a55d60bcff4272488d178" }).populate('tokentrue');

    return res.redirect('/event/list');
  }

};

