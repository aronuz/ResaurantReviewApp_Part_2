/**
 * ---Common database helper functions.
 */
 
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback){
    var restaurants = [];
	
	var dbPromise=idb.open('restraurant_db', 1, upgradeDb => {
		var restaurantStore=upgradeDb.createObjectStore('restraurant_store', { keyPath: 'id'});
		var reviewsStore = upgradeDb.createObjectStore('reviews_store', { keyPath: 'store_request'});
		reviewsStore.createIndex('store_request', 'store_request');
	})
        
    dbPromise.then(db => {//console.log(db);
      var tx_read=db.transaction('restraurant_store');
      var restraurantStore=tx_read.objectStore('restraurant_store');
      return restraurantStore.getAll() || restaurants;
    }).then(async function(restaurants){
       if (!restaurants || restaurants.length === 0) {
          var response = await fetch(DBHelper.DATABASE_URL);
          var restaurants = await response.json();
         
          dbPromise.then(db => {
              //console.log(db);
              var tx_write=db.transaction('restraurant_store', 'readwrite');
              var restraurantStore=tx_write.objectStore('restraurant_store');
              restaurants.forEach(restaurant => {restraurantStore.put(restaurant)});
         });
      }
	//console.log(restaurants);                                      
      return restaurants;
    }).then(function(response){
      //console.log(response);
      return response; //.json();
    }).then(restaurants => {      
      callback(null, restaurants);
    }).catch(e => {
      callback(e, null);
    })     
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    if (restaurant.photograph) {//console.log(restaurant.photograph);
      return (`images/${restaurant.photograph}`);//.jpg
    } else {//console.log(restaurant.id);
      //if photograph property missing
      return (`images/${restaurant.id}`);//.jpg
    }
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}

/*export default DBHelper;
export const fetchRestaurants = DBHelper.prototype.fetchRestaurants;
export const fetchRestaurantById = DBHelper.prototype.fetchRestaurantById;
export const fetchRestaurantByCuisine = DBHelper.prototype.fetchRestaurantByCuisine;
export const fetchRestaurantByNeighborhood = DBHelper.prototype.fetchRestaurantByNeighborhood;
export const fetchRestaurantByCuisineAndNeighborhood = DBHelper.prototype.fetchRestaurantByCuisineAndNeighborhood;
export const fetchNeighborhoods = DBHelper.prototype.fetchNeighborhoods;
export const fetchCuisines = DBHelper.prototype.fetchCuisines;
export const urlForRestaurant = DBHelper.prototype.urlForRestaurant;
export const imageUrlForRestaurant = DBHelper.prototype.imageUrlForRestaurant;
export const mapMarkerForRestaurant = DBHelper.prototype.mapMarkerForRestaurant;*/