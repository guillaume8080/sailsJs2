# ynov-eventsV2

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sun Jul 18 2021 11:05:40 GMT+0200 (heure d’été d’Europe centrale) using Sails v1.4.3.

<!-- Internally, Sails used [`sails-generate@2.0.3`](https://github.com/balderdashy/sails-generate/tree/v2.0.3/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

# La note du développeur:

	Les attentes pour ce projet étaient diverses. Avoir connaissance du design pattern MVC et l’appliquer dans un framework donné : SailsJs. Être capable d’associer une couche base de données à son programme et l’exploiter via un ORM : WaterLine.
	Il fallait aussi des compétences rudimentaires du langage JavaScript (inclu HTML). Les tenants et aboutissants de SailsJs étaient offerts via une documentation sur le web, il a fallu la posséder. Le projet devait être versionner sur une plateforme Git.
	Un cahier des charges était rédigé. 
	
	Personnellement je connaissais les concepts demandés pour la réalisation de ce projet. Les difficultés qui m’ont été posées étaient la découverte de JavaScript et de SailsJS, globalement des syntaxes.La problématique étaient la suivante :

	Exploiter un framework inconnu afin de mettre en place une application web classique.

	Cette note détaillera les solutions choisies et imposées pour réaliser ce projet. Les difficultés qui ont survenues, mon avis sur les technologies(positif et négatif) et enfin,
	le nécessaire pour faire tourner l’application sur un système d’exploitation Linux. 
	

	La première solution a été de choisir le bon outil pour développer cette application. Étant donné la disponibilité d’une licence jetBrains, il ne fallait pas se priver. J’ai donc travaillé avec webStorm. 
	Cette outil propose un terminal pour configurer le projet, l’auto-complétion, mais surtout un débogueur . 
	
	Le frameWork SailsJs repose sur le principe du modèle vue contrôleur et celui du mapping d’une base de données grâce à l’ORM Waterine. Le moteur de base de données exigé était mongoDB.
	
	En ce qui concerne la réalisation du design pattern, j’ai créé les contrôleurs via des lignes de commandes. En revanche les fonctions imbriqués dans ces derniers(appelées actions en SailsJS) ont été rédigées manuellement.
	J’ai essayé de faire du vue à vue. Cela a été peu concluant. J’ai généralisé le comportement de l’appli avec des servlets.
	Les modèles (ou classes métiers) ont elles aussi été générées par lignes de commandes.
	En ce qui concerne les vues(rendus graphiques), le framework impose EJS. En revanche j’ai pris la liberté de styliser ces dernières via BOOTSTRAP.
	L’application a eu besoin de classes clientes HTTP pour différents besoins. Pour la soumission de formulaires vers un contrôleurs j’ai utilisé XMLHTTPREQUEST. Pour consommer des APIS REST , j’ai utilisé AXIOS.
	Le Token dans le cahier des charges devaient être une classe implémentant des relations entre une classe utilisateur et une autre.
	La classe utilisée pour convertir les dates issus des inputs vers le format time-stamp est unix-timestamp.
	Le versionnage du projet a été réalisé grâce à la plateforme gitHub.

	La première difficulté a été l’appréhension du langage javascript. C’était une nouveauté pour moi. Appréhension rapidement dissipée après l’étude du framework SailsJs qui est comparable en de nombreux points au frameWork Symfony,
	que je connais bien. 
	J’ai suivi l’installation du service Mongo pour le client.Lors du lancement du client mongo, impossible de se connecter au serveur installé avec les commandes dédiés à Ubuntu. 
	J’ai réussi à installer le serveur en passant par le gestionnaire de paquet Debian.
	Pour ce que j’appelle les includes, j’ai perdu beaucoup de temps à trouver comment instancier des classes.  Impossible de faire des require globaux.

	
	Voici ce que j’ai apprécié en développant cette application. En premier lieu le client AXIOS.  Il suffit d’envoyer une requête pour récupérer des objets manipulables facilement. 
	
	response.data.feattures.monObjet.propriétée

	Autre classe très appréciable :la classe document. Cette classe déborde de propriétés et de méthodes vraiment pratiques. Elle facilite la gestion des formulaires (.value, ...)

	La classe windows permet de gérer le urls. Très pratique pour appeler une servlet ou encore faire des redirections vers des vues.	
	JavaScript est un langage permissif. Il permet de déclarer des objets sans restrictions. Je m’explique par un exemple :

	var newObjet = {} ;
		newObjet.propritéInexsistante = « toto » ;
 
	Waterline : un ORM intuitif. Les requêtes passées via waterLine sont claires et précises. Pour effectuer un delete :

		monObjet.destroy({id:001})

	Toujours en ce qui concerne waterLine : la gestion des classe métiers (ici appellées models). Encore une fois que ce soit la définition d’objets ou les relations entre eux , les syntaxes sont épurées.
	Les templates EJS sont très puissant eaux aussi. Ils permettent de déclarer des balises HTML grâce à des boucles et des conditions.
	Pour finir parlons des classes REQ et RES : le centre de SAILSJS. Ils permettent la transition de la donnée entre deux vues que ce soit à partir d’URL, de submit/client ,...

	Voici ce que je n’ai pas apprécié en développant l’application. Une première remarque directement induite à JAVASCRIPT : ce que j’appelle de l’asynchronisme implicite : on ne maîtrise pas l’affectation  à un thread de telle ou telle tâche. 
	Toujours dans le rayon  implicite, JavaScript envoie des requêtes sans nous le demander. C’est ce qui se passe souvent « onSubmit ». 
	Autre difficulté : l’obligation de faire de l’asynchrone . Notamment dans ce qui relève des requêtes. Si on ne place pas le mot clé « await » , la requête n’est pas effectuée.
	Un problème vrai en général pour le web, on ne peut déboguer les vues . Impossible de déboguer une balise script,...
	Dernière remarque : impossible d’appeler une action en objet traditionnel :

	var retour =  this.maFonction() ;

	
	Voici la procédure afin de faire tourner l’application sur votre poste. Je précise que l’application a été développée sous UBUNTU.
	En premier lieu : installer le service de base de données MONGO :

	sudo dpkg -i mongodb-org-server_5.0.0_amd64.deb
 
	Sur ma machine le serveur est actif dès le démarrage toutefois vérifier le statut dus service :
	
	sudo systemctl status mongod

	Si le service n’est pas actif :

	sudo systemctl start mongod

	
	Installer le runTime NodeJS : 

	sudo npm install -g npm
	Installer désormais les dépendances du framework SailsJs :

	npm install sails-mongo


	Voici maintenant la gestion de la couche de base de données :

	Si vous n’avez pas le client Mongo, il faudra l’installer.

	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

	Il vous faut créer une base :

	use laBase (dont le nom est « ynovTest » dans le projet)

	Renseigner un utilisateur :


	db.createUser(
  	{
    	user: "votreUser",
    	pwd: "votreMotdePasse",  // or cleartext password
    	roles: [
      
       	{ role: "readWrite", db: "la base" }
    	]
  	}
	)

	Vérfier la création de l’utilisateur :

	db.getUsers() 
	rendez vous dans le fichier de conf de l’appli pour renseigner l’accès à la base de donnée

	url: 'mongodb://user:password@localhost/ynovTest',


	Installer les bibilothèques non incluses dès la création du projet

	npm install axios

	npm install unix-timestamp
	
	Vous pouvez maintenant faire tourner l’appli :

	node app.js
	
	Accéder à l’appli depuis votre navigateur :

	http://localhost:1337/