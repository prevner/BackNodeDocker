// Connexion persistente à la base MongoDB
import { MongoClient } from "mongodb";

export const DB_NAME = 'ny';
export const DB_COLLECTION = 'restaurants';

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
const client = new MongoClient(CONNECTION_STRING);

export function openDatabase() {
    return client.connect().then(() => {
      let db = client.db(DB_NAME);
      return db;
    });
  };

  export async function getRestaurants(city) {
    const db = await client.db(DB_NAME);
    const restaurants = await db.collection(DB_COLLECTION);
     const boroughs = await  restaurants.find({"name":city},{_id:0, grades : 0, adress : 1,name:1,cuisine:1 })
                                        .toArray();   
    return boroughs;
}

//récupération des quartiers
export async function getBoroughs() {
    const db = await client.db(DB_NAME);
    const restaurants = await db.collection(DB_COLLECTION);
    const boroughs = await restaurants.distinct("borough");
    return boroughs;
}

//récupération des type de cuisine
export async function getCuisine() {
    const db = await client.db(DB_NAME);
    const restaurants = await db.collection(DB_COLLECTION);
    const cuisines = await restaurants.distinct("cuisine");
    return cuisines;
}
//récupération des type de cuisine
export async function getRestoByCuisineAndBorough(borough,cuisine) {
    const db = await client.db(DB_NAME);
    const restaurants = await db.collection(DB_COLLECTION);
    const resultats = await restaurants.find({"borough" : borough, "cuisine":cuisine},{_id:0, grades : 0, adress : 1,name:1,cuisine:1})
                                       .toArray();  
    return resultats;
}