<script>
import GlButton from '../../base/BaseButton.vue';

export default {
  name: 'CloseButton',
  components: {
    GlButton,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: 'Close',
    },
  },
};
</script>

<template>
  <gl-button
    type="tertiary"
    size="small"
    icon="times"
    :aria-label="label"
    :label="label"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
