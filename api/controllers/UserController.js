/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  lister: async function  (req, res) {

    var listUsers = await User.find();
    return res.view('pages/user/list', {maCollection: listUsers} );
  },
  create: async function  (req , res) {

    const body = req.body;
    console.log(body);
    var monPremierObjet = await User.create({mail: body.mail , first_name: body.first_name, last_name: body.last_name , age: body.age}).fetch();
    //La redirection s'effecture avec une url passé dans le template.
    //Toutefois, sans un return.redirect dans cette classe, la redirection ne s'effecture pas.
    return res.redirect('user/list' );

  },

  delete: async function  (req , res)  {

    console.log(req.params);
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const retour = await User.destroy({id: idToDelete}).fetch();

    return res.redirect('/user/list');

  }

};

