import express from 'express';
const router = new express.Router()
import { getRestaurants, getBoroughs, getCuisine, getRestoByCuisineAndBorough} from '../database.js';


/**
 * Déclaration des routes de l'app
 */

/*  app.use((req, res, next) => {
	console.log(`URL: ${req.url}`);
	next();
}); */
router.get("/", getHome);
router.get("/restos", getRestos);
router.get("/search", getRestosByCity);
router.get("/explorer", getFilter);
router.get("/multisearch", recherche);

/**
 * Déclaration des controlleurs de l'app
 */

/**
 * GET /
 * Page d'accueil
 */
function getHome(req, res) {
  res.render('index');
}


/**
 * GET/
 * Page restos
 */

 function getRestos(req, res) {
  res.render('restos');
}

async function getRestosByCity(req, res) {
 if(req.query.city!==""){
 
  const resultats = await getRestaurants(req.query.city);
  res.render('restos',{resultats}); 
  
 }else
 {
  res.render('restos');
 }
}
async function recherche(req, res) {
  const boroughs = await getBoroughs() ;
  const cuisines = await getCuisine();
 if(req.query.city!=="" && req.query.cuis !==""){
 
  const resultats = await getRestoByCuisineAndBorough(req.query.city,req.query.cuis);
  /* console.log(resultats); */
  res.render('explorer',{resultats,boroughs,cuisines}); 
  
 }else
 {
  res.render('explorer');
 }
}
// select my filter option
async function getFilter(req, res) {
  const boroughs = await getBoroughs() ;
  const cuisines = await getCuisine();
  console.log(cuisines);
  res.render('explorer',{boroughs,cuisines});
}


// Exporte le routeur pour le fichier principal
/* module.exports = router; */
export default router;