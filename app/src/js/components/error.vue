<template lang="pug">
  div
    p Error! 
    p Page not found
</template>
<script type="text/javascript">
  export default {
    data: function() {
      return {};
    },
    computed: {},
    methods: {},
    created() {
      console.log("created in error component", this);
    },
    mounted() {
      console.log("mounted in error component", this);
    }
  };
</script>