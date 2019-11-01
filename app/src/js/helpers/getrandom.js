export default {
  getData(){
    return new Promise(function(resolve, reject){
      const time = Math.random() * 3000;
      setTimeout(function(){
        const result = Math.random() > 0.5 ? true : false;
        if(result){
          return resolve();
        }else{
          return reject();
        }
      }, time);
    });
  }
};