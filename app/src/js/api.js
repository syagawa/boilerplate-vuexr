export default {
  getData(){
    return new Promise(function(resolve, reject){
      const time = Math.random() * 3000;
      setTimeout(function(){
        const result = Math.random() > 0.5 ? true : false;
        if(result){
          return resolve("Success ! You got Data.");
        }else{
          return reject("Could not get Data");
        }
      }, time);
    });
  }
};