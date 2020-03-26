#!/bin/sh

# ---------------------------------------   Les catégories  -------------------------------------------- 
echo
echo "Affichage des catégories"
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des catégories"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première catégorie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/id/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie n'ayant pas un nombre pour paramètre"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/id/string
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation de la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation d'un double la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Mise à jour de la catégorie 100 : $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body http://localhost:3000/api/categorie/id/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/id/100
echo
echo '------------------------------------------------------------------------------'
echo "Suppression de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/id/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Suppression d'une catégorie inexistante 1234"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/id/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100 qui a été précédemment supprimée"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/id/100
echo


# ---------------------------------------   Les bières  -------------------------------------------- 
echo
echo
echo "Affichage des bières"
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première bière"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/id/12340
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière avec un id en string (test erreur Integer required)"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/id/string
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières avec un degré d'alcool supérieur ou égal à 35"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/min-volume/35
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières avec un degré d'alcool inférieur ou égal à 3"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/max-volume/3
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières venant d'Espagne"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/country/Spain
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des bières venant d'Aix les Bains"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/city/Aix%20les%20Bains
echo
echo '------------------------------------------------------------------------------'
echo "Creation d'une bière"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST http://localhost:3000/api/beer/ -d '{"id":9999, "name":"Nouvelle biere","international_bitterness_units":2, "standard_reference_method":25, "universal_product_code":54, "alcohol_by_volume": 5, "brewery_id":"1", "style_id":"1", "cat_id":"1", "last_mod":"1"}'
echo
echo '------------------------------------------------------------------------------'
echo "Mise à jour de la bière 9999"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT http://localhost:3000/api/beer/id/9999 -d '{"id":9999, "name":"Nouvelle NOM DE LA biere MAJ", "international_bitterness_units":2, "standard_reference_method":25, "universal_product_code":54, "alcohol_by_volume": 5, "brewery_id":"1", "style_id":"1", "cat_id":"1", "last_mod":"1"}'
echo
echo '------------------------------------------------------------------------------'
echo "Supprimer une bière"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/beer/id/9999
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la bière 9999 qui a été supprimée"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/id/9999
echo

# ---------------------------------------   Les brasseries  -------------------------------------------- 
echo
echo
echo "Affichage des brasseries"
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première brasserie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des brasseries de Dublin"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/city/Dublin
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la brasserie ayant pour nom Abbaye de Leffe"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/name/Abbaye%20de%20Leffe
echo
echo '------------------------------------------------------------------------------'
echo "Creation d'une brasserie 22222 : "
curl --noproxy "*" -H "Content-Type: application/json"  -X POST http://localhost:3000/api/brewery/ -d '{ "id":22222, "breweries":"La brasserie des potos", "address1": "5 rue de la dab", "address2": "", "city": "DabCity", "state": "", "code": 46521, "country": "France", "phone": "+33.06.42.12.45.02", "website": "", "filepath": "", "descript": "Meilleur brasserie ever", "last_mod": "aujourdhui eheh", "coordinates": "" }'
echo
echo '------------------------------------------------------------------------------'
echo "Mise à jour de la brasserie 22222:"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT http://localhost:3000/api/brewery/id/22222 -d '{ "id":22222, "breweries":"NOUVEAU NOM DE La brasserie des potos", "address1": "5 rue de la dab", "address2": "", "city": "DabCity", "state": "", "code": 46521, "country": "France", "phone": "+33.06.42.12.45.02", "website": "", "filepath": "", "descript": "Meilleur brasserie ever", "last_mod": "aujourdhui eheh", "coordinates": "" }'
echo
echo '------------------------------------------------------------------------------'
echo "Supprimer une brasserie"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/brewery/id/22222
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la brasserie 22222 qui a été supprimée"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery/id/22222
echo

# ---------------------------------------   Les géocodes  -------------------------------------------- 
echo
echo
echo "Affichage des géocodes"
echo
echo '------------------------------------------------------------------------------'
echo "Affichage du premier géocode"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/geocode/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage du géocode de la 1ère brasserie par son id"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/geocode/brewery-id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage du géocode de la 1ère brasserie par son nom"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/geocode/brewery-name/Abbaye%20de%20Leffe
echo
echo '------------------------------------------------------------------------------'
echo "Affichage des coordonnées des villes correspondantes au nom recherché"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/geocode/city/Dublin
echo