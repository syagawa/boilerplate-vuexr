<template>
  <div id="app">
    <div v-if="isError">
      <p :class="$style.err">loading error</p>
      <button v-on:click="retry">retry</button>
    </div>
    <div v-if="isLoading">
      <p>loading</p>
    </div>
    <div v-if="isLoadedWithNoError">
      <router-view class="view header" name="header"></router-view>
      <router-view class="view main" name="main"></router-view>
      <router-view class="view sub" name="sub"></router-view>
      <router-view class="view footer" name="footer"></router-view>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
  import getrandom from "../helpers/getrandom.js";
  export default {
    data: function() {
      return {
        loading: true,
        errormessage: null
      };
    },
    computed: {
      isError() {
        if (this.errormessage) {
          return true;
        }
      },
      isLoading() {
        if (this.loading) {
          return true;
        }
      },
      isLoadedWithNoError() {
        return !this.isLoading && !this.isError;
      },
      ...mapGetters({
        isAlreadyGotData: "user/isAlreadyGotData"
      })
    },
    methods: {
      getData() {
        const self = this;
        getrandom
          .getData()
          .then(function(data) {
            self.setData({data});
            self.loading = false;
            self.errormessage = null;
          })
          .catch(function(err) {
            console.log(err);
            self.loading = false;
            self.errormessage = err;
          });
      },
      retry() {
        this.getData();
      },
      ...mapActions({
        setData: "user/setData"
      })
    },
    created() {
      console.log("created in container component", this);

      if (!this.isAlreadyGotData) {
        this.getData();
      }
    },
    mounted() {
      console.log("mounted in container component", this);
    }
  };
</script>
<style module="" lang="scss">
  .err {
    color: $color_sub;
    &::after {
      content: ": in container";
    }
  }
</style>