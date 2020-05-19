<template>
  <div>
    <p>I'm Start</p>
    <div>
      <div>{{ sample }}</div>
      <button v-on:click="addStr">add string</button>
    </div>
    <div>
      <button v-on:click="changeSample({newsample: sample + 'direct'})">add string direct</button>
    </div>
    <div>
      <button v-on:click="nextStart">go next start</button>
    </div>
    <div>
      <button v-on:click="goItems">go items</button>
    </div>
    <div>
      <span>icon</span>
      <i class="fas fa-address-book"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    data: function() {
      return {
        name: "start component",
        ...mapState({
          get_my_sample(state) {
            return `${this.name} call ${state.sample.str} in DATA`;
          }
        }),
        ...mapGetters({
          currentSample: "sample/currentSample",
          currentItems: "items/currentItems"
        })
      };
    },
    computed: {
      sample() {
        return this.$store.getters["sample/currentSample"];
      },
      ...mapState({
        mysample(state) {
          console.log(state);
          return `${this.sample} call ${state.sample.str} in COMPUTED`;
        }
      })
    },
    methods: {
      nextStart() {
        if (this.$router.currentRoute.name === "start2") {
          this.$router.push({ path: "start" });
        } else {
          this.$router.push({ path: "start2" });
        }
      },
      goItems() {
        this.$router.push({ name: "items" });
      },
      addStr() {
        const str = this.sample + "add";
        this.changeSample({ newsample: str });
      },
      ...mapState({
        getMyName(state) {
          return `${this.name} call ${state.name} in METHOD`;
        }
      }),
      ...mapMutations({
        addCommit: "addItem"
      }),
      ...mapActions({
        addDispatch: "items/addItem",
        changeSample: "sample/changeSample"
      })
    },
    created() {
      window.start_component = this;
      console.log("created in start component", this);
    },
    mounted() {
      console.log("mounted in start component", this);
    }
  };
</script>