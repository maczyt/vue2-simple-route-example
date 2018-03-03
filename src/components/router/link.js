import Vue from "vue";
import history from "./history";

Vue.component("router-link", {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(e) {
      if (history.location.pathname === this.to) return;
      history.push(this.to);
    }
  },
  template: `<a 
    :href="to"
    @click.stop.prevent="handleClick"
    ><slot></slot></a>`
});
