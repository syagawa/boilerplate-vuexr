<template><footer id="footer"><p>I'm footer</p><button v-on:click="alertSample">click me</button></footer></template><script type="text/javascript">export default {
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
      this.$router.push({path: "next"});
    },
    alertSample(){
      alert(this.sample + "footer");
    }
  },
  created(){

  }
}</script>