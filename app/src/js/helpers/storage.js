const storage = window.localStorage;

export default {
  set(key, val){
    val = JSON.stringify(val);
    storage.setItem(key, val);
  },
  get(key){
    return JSON.parse( storage.getItem(key) );
  },
  remove(key){
    storage.removeItem(key);
  }
};