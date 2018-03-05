export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(e) {
      this.$router.push(this.to, null);
    }
  },
  template: `
    <a :href="to" @click.stop.prevent="handleClick">
      <slot></slot>
    </a>
  `
};
