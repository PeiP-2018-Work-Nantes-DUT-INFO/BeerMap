<span style="display:block;text-align:center"><img width="250" alt="Logo" src="../logo.png"></span>


# Fonctionnalités

Beer Map est une application web contenant une carte intéractive. Elle permet de rechercher les brasseries et les bières en entrant le nom d’une ville, d’une brasserie, d’une bière, d’une catégorie ou tout simplement en cliquant sur une brasserie sur la carte.

L’application affiche également la météo une fois qu’une ville est sélectionnée. 

# Points d’entrée

Pour utiliser notre application, vous pouvez commencer par :
- Faire une recherche d’une ville, d’une bière, d’une brasserie, ou d’une catégorie de bière. 
- Cliquer sur une icône de bière qui s’affiche sur la carte.

Des boîtes s’ouvriront sur l’écran, avec les informations relatives à votre recherche.

Au vu des données qui ne sont pas tout le temps bien remplies nous vous conseillons de faire la recherche des éléments suivants :

- Ville : *London, England* ou *San Francisco, California*
- Bière : *Hardcore IPA* ou *Dragonhead Stout*
- Brasserie : *BrewDog Ltd* ou *Orkney Brewery*
- Catégorie : *North American Ale* ou *British Ale*

Lors d’une recherche de catégorie ou d’une bière, vous ne serez pas amené sur la position géographique de la bière. Cependant vous pouvez cliquer, dans les informations de la bière, sur le nom de la brasserie pour vous déplacer automatiquement sur la carte.

# Architecture de l’application

L’application se décompose en deux parties différentes : le serveur et le client. La partie serveur a été développée pour être utilisée en M4105C, elle contient donc un service REST et un websocket.

A la racine du dossier, nous avons ainsi le serveur. Dans le dossier static, nous retrouvons l’application en React JS. Les différents composants de l’interface se trouvent dans le dossier components. Nous y retrouvons :

- BeerCard : Modale utilisée pour afficher les informations d’une bière.
- BreweryBar : Panel affiché à droite de l’écran pour afficher les informations d’une brasserie (nom, adresse, téléphone, site web s’il existe, bières...).
- CategoryBar : Panel affiché à droite pour présenter toutes les bières appartenant à une catégorie.
- CityBar : Panel affiché à gauche pour afficher toutes les informations d’une ville (nom, météo, brasseries).
- SearchBar : Barre de recherche qui s’affiche au-dessus. Dans le dossier Result, se trouvent 4 composants qui permettent l’affichage des résultats de la barre de recherche.


# Choix de développement

Pour réaliser cette application, nous avons utilisé le framework de Facebook nommé React.js. Pour la carte, nous avons utilisé MapBox qui est un service de cartographie.<br>
Nous avons utilisé git pour sauvegarder les fichiers, et nous avons utilisé Vs Code avec LiveShare pour pouvoir développer en temps réel.

# APIs utilisées 
- Nous avons utilisé notre serveur REST développé pour le cour M4105C.
- Nous avons utilisé OpenWeatherMap pour récupérer la météo des villes.
- Coté serveur, nous avons utilisé ArcGIS pour récupérer la position des villes recherchées.

# WebSocket
Nous avons utilisé des websocket pour la partie recherche de l’application. C’est à dire que l’échange lors d’une recherche entre le serveur et le client se fait en websocket et pour tous les autres appels, il s’agit d’un fetch à l’API REST.