/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  toto: async function  (req , res) {

    //console.log(TheForm.getElementsByTagName("param"));
    //console.log(document.getElementById("parmToGet"));

    const toto = req.body;
    console.log(toto);
    var monPremierObjet = await User.create({mail: 'toto@mail.com' , first_name: 'toto'}).fetch();
    return res.view('pages/homepage' );
  },

  lister: async function  (req, res) {

    var listUsers = await User.find();
    console.log(listUsers.length);
    return res.view('pages/user/list', {maCollection: listUsers} );
  },

};

