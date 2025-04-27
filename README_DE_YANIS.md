🎮 Projet Final : Pokédex Capturés Fullstack (React + Express + MongoDB)

LIEN DE LA VIDEO YOUTUBE : https://youtu.be/UqUiD5QSmtA

🚀 Présentation rapide

Application complète qui permet :

-D'attraper des Pokémon 🎯
-De les soigner en les caressant 💐
-De les voir dans un vrai Pokédex capturés 💒
-De pouvoir supprimer ceux qu’on veut
-Stockage cloud via MongoDB Atlas

⚙️ Technologies utilisées

React.js ➔ Frontend dynamique

Express.js ➔ API backend

MongoDB Atlas ➔ Base de données cloud

Axios ➔ Communication frontend/backend

Morgan ➔ Logs HTTP sur le serveur

🛠️ Fonctionnalités principales

-Attraper Pokémon (tir de Pokéball)
-Soigner Pokémon (soin progressif au clic)
-Sauvegarde en cloud MongoDB
-Suppression de Pokémon
-Application totalement connectée Front/Back

🏗️ Architecture du projet

pokedex-starter-yanisb944/   (Frontend React)
pokedex-api-mongo/           (Backend Express + MongoDB Atlas)

⚡️ Installation rapide

1. Backend

cd pokedex-api-mongo
npm install
npm run dev

.env :
MONGO_URI=uri_mongodb
PORT=3000

2. Frontend

cd pokedex-starter-yanisb944
npm install
npm run dev

Accessible sur http://localhost:5173

📬 API REST

Méthode
Route
Action

GET
/capturedpokemons
Voir tous les Pokémon capturés

POST
/capturedpokemons
Capturer un nouveau Pokémon

PUT
/capturedpokemons/:id
Soigner un Pokémon

DELETE
/capturedpokemons/:id
Supprimer un Pokémon

🌟 Résumé

Projet complet

Fullstack MERN

Design personnalisé

Animations interactives

Connexion MongoDB cloud