<template>
  <div>
    <input v-model="name" />
  </div>
</template>
<script type="text/javascript">
  export default {
    props: ["item"],
    data: function() {
      return {};
    },
    computed: {
      name: {
        get() {
          return this.item.name;
        },
        set(value) {
          this.$store.commit("items/changeItem", {
            name: value,
            id: this.item.id
          });
        }
      }
    },
    methods: {},
    created() {
      console.log("created in itemedit component", this);
    },
    mounted() {
      console.log("mounted in itemedit component", this);
    }
  };
</script>