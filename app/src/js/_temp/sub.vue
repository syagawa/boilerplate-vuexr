<template><footer id="footer"><p>I'm sub</p><button v-on:click="alertSample">click me</button></footer></template><script type="text/javascript">export default {
  data: function(){
    return {

    };
  },
  computed: {
    sample(){
      return this.$store.getters["sample/currentSample"];
    }
  },
  methods: {
    next(){
      this.$router.push({path: "next"});
    },
    alertSample(){
      alert(this.sample + " sub");
    }
  },
  created(){
    console.log("created in sub component", this);
  },
  mounted(){
    console.log("mounted in sub component", this);
  }
}</script>