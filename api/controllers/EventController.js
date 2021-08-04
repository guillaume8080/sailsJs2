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

};

