export default {
  isLoggiend(id){
    if(id === 42){
      return true;
    }
    const rand = Math.random();
    if(rand > 0.5){
      return true;
    }else{
      return false;
    }
  }
};