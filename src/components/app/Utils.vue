<script>
/* eslint-disable no-undef */
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {
  },
}
</script>

<style>
.toast {
  left: 6rem;
  bottom: 4rem;
  z-index: 10010;
  animation: shakeToast 0.7s;
}
@keyframes shakeToast {
  0% {
    transform: translateY(-30%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
