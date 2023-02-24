<template>
  <div class="about">
    <Repl :store="store" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: calc(100vh - 24px);
    display: flex;
    align-items: center;
    overflow: hidden;
  }
}
.vue-repl {
  width: 100vw;
  height: calc(100vh - 24px);
}
</style>

<script setup lang="ts">
import { Repl, ReplStore } from "@vue/repl";
import "@vue/repl/style.css";

const store = new ReplStore({
  showOutput: true,
  outputMode: "preview",
});

// store.setVueVersion("3.2.8");
</script>
