module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const toto = "toto";
    console.log(toto);
    var monPremierObjet = await User.create({mail: 'toto@mail.com' , first_name: 'toto'}).fetch();


    return this.res.view('pages/homepage' );
  }


};
