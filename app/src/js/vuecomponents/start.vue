<template><div><p>I'm Start</p><div><span>{{ sample }}</span><button v-on:click="addStr">addstr</button><button v-on:click="next">go next</button></div></div></template><script type="text/javascript">export default {
  props: ['id'],
  data: function(){
    return {

    };
  },
  computed: {
    sample(){
      return this.$store.getters.currentSample;
    }
  },
  methods: {
    next(){
      if(this.$router.currentRoute.name === "start2"){
        this.$router.push({path: "start"});
      }else{
        this.$router.push({path: "start2"});
      }
    },
    addStr(){
      const str = this.sample + "add";
      this.$store.dispatch("changeSample", { newsample: str });
    }
  },
  created(){

  }
}</script>