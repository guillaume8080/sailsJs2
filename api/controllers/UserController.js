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
    var monPremierObjet = await User.create({mail: body.mail , first_name: body.first_name, last_name: body.last_name , age: body.age}).fetch();
    //La redirection s'effecture avec une url passé dans le template.
    //Toutefois, sans un return.redirect dans cette classe, la redirection ne s'effecture pas.
    return res.redirect('user/list' );

  },

  delete: async function  (req , res)  {

    var axios = require('axios');
    const idToDelete = req.params.id;
    //tableau d ids de token destiné à la suppression
    var tableauDId = [];

    const retourAxios = await axios.get('http://localhost:1337/tokentrue', {

    }).then(function (response) {

      retourApi = response.data;
      for (let i = 0; i < retourApi.length; i++){

        if(retourApi[i].tokenuser.id === idToDelete){

          tableauDId.push(retourApi[i].id);

        }
      }
    });

    for (let j = 0; j < tableauDId.length; j++){

      var tokenToDelete = tableauDId[j];

      var retourDelete = await TokenTrue.destroy({id: tokenToDelete}).fetch();


    }

    //delete waterline(l ORM sailsJs) -- delete de l'utilisateur en question
    const retour = await User.destroy({id: idToDelete}).fetch();

    //une fois que le travail est terminé, on est redigiré vers la vue de listing utilisateur
    return res.redirect('/user/list');

  },

};

