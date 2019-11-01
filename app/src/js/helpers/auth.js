export default {
  isLoggined(id){
    return new Promise(function(resolve, reject){
      if(id === 42){
        resolve({ isLoggined: true });
      }
      const rand = Math.random();
      if(rand > 0.5){
        resolve({ isLoggined: true });
      }else{
        reject({ isLoggined: false });
      }
    });
  }
};