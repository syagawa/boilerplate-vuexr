//helpers
import storage from "../../helpers/storage.js";

export default function(store){
  const save = function(state){
    storage.set(
      "state",
      {
        sample: state.sample
      }
    )
  };
  store.subscribe(function(mutation, state){
    if(mutation.type === "setSample"){
      save(state);
    }
  });
}