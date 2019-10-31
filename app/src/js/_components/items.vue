<template><div><p>I'm items</p><ul><li v-for="item in items"><span>{{ item.id }}</span><button v-on:click="goItem(item)">go</button></li></ul><button v-on:click="addItem">add item</button></div></template><script type="text/javascript">export default {
  data: function(){
    return {

    };
  },
  computed: {
    items(){
      return this.$store.getters["items/currentItems"];
    }
  },
  methods: {
    goItem(item){
      this.$router.push({name: "item", params: { id: item.id } });
    },
    addItem(){
      const item = {
        id: 100,
        name: "aaaaaaaaaaaaaaaaaaaaaaa"
      };
      this.$store.dispatch("items/addItem", { item: item });
    }
  },
  created(){
    console.log("created in items component", this);
  },
  mounted(){
    console.log("mounted in items component", this);
  }

}</script>