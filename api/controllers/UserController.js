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
  create: async function  (req , res) {

    const body = req.body;
    console.log(body);
    var monPremierObjet = await User.create({mail: body.mail , first_name: body.first_name, last_name: body.last_name , age: body.age}).fetch();
    return res.view('pages/homepage' );
  },

};

