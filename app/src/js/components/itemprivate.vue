<template>
  <div>
    <p>{{ secret }} is Answer to the Ultimate Question of Life, the Universe, and Everything</p>
  </div>
</template>
<script type="text/javascript">
  import auth from "../helpers/auth.js";
  export default {
    props: ["item"],
    data: function() {
      return {
        secret: "42"
      };
    },
    computed: {},
    methods: {},
    created() {
      console.log("created in itemeprivate component", this);
    },
    mounted() {
      console.log("mounted in itemeprivate component", this);
    },
    beforeRouteEnter(to, from, next) {
      console.log("in item private to", to);
      console.log("in item private from", from);

      // write check code
      // check in component
      auth
        .isLoggined(to.params.id)
        .catch(function(err) {
          console.log("error in p");
          next({ name: "error" });
        })
        .then(function(res) {
          next();
        });
    }
  };
</script>