#!/bin/sh

#Affichage des catégorie
echo '------------------------------------------------------------------------------'
echo "Affichage des catégories"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première catégorie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie/id/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie/id/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie n'ayant pas un nombre pour paramètre"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie/id/string
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation de la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://127.0.0.1:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation d'un double la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://127.0.0.1:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Mise à jour de la catégorie 100 : $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body http://127.0.0.1:3000/api/categorie/id/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie/id/100
echo
echo '------------------------------------------------------------------------------'
echo "Suppression de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://127.0.0.1:3000/api/categorie/id/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Suppression d'une catégorie inexistante 1234"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://127.0.0.1:3000/api/categorie/id/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100 qui a été précédemment supprimée"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://127.0.0.1:3000/api/categorie/id/100
echo
