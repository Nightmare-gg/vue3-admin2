<script setup>
  import {useStore} from "vuex";
  const store = useStore();
  store.commit("addMenu");
</script>

<template>
  <router-view/>
</template>

<style >
#app {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
