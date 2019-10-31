<template><div><p>I'm item</p><div><div>{{ item.id }}</div><div>{{ item.name }}</div></div><div><button v-on:click="goEdit">edit</button><button v-on:click="goPrivate">private</button></div><transition v-bind:name="transitionName"><router-view class="child-view" name="nestchild" :item="item"></router-view></transition></div></template><script type="text/javascript">export default {
  props: ["id"],
  data: function(){
    return {
      transitionName: "slide-left"
    };
  },
  computed: {
    item(){
      const items = this.$store.getters["items/currentItems"];
      const id = Number(this.id);
      const res = items.filter(function(elm){
        console.info(elm);
        return elm.id === id;
      });
      return res[0];
    }
  },
  methods: {
    goEdit(){
      this.$router.push({name: "itemedit", params: { id: this.item.id }});
    },
    goPrivate(){
      this.$router.push({name: "itemprivate", params: { id: this.item.id }});
    }
  },
  created(){
    console.log("created in item component", this);
  },
  mounted(){
    console.log("mounted in item component", this);
  },
  watch:{
    "$route" (to, from) {
      const toDepth = to.path.split("/").length
      const fromDepth = from.path.split("/").length
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left"
    }
  }
};</script>