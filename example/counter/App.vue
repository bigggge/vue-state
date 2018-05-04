<template>
  <div>
    Clicked: {{ count }} times
    <Child></Child>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
    <button @click="unknownMutation">unknown mutation</button>
    <button @click="setState">set state</button>
  </div>
</template>

<script>

  import store from './store';
  import Child from './Child';

  export default {
    components: {Child},
    computed: {
      count () {
        return this.$store.state.count;
      }
    },
    methods: Object.assign({
      setState () {
        this.$store.state = {};
      }
    }, store.actions)
  };
</script>
