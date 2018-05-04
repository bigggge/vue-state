<template>
  <div>
    child: Clicked: {{ count }} times
  </div>
</template>

<script>

  import store from './store';

  export default {
    computed: {
      count () {
        return this.$store.state.count;
      }
    }
  };
</script>
