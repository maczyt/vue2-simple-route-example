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
      this.$router.history.push(this.to);
    }
  },
  template: `<a
    :href="to"
    @click.stop.prevent="handleClick"
    >
      <slot></slot>
    </a>
  `
};
