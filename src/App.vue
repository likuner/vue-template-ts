<template>
  <my-hover-tip :visible="showHoverTip" @change="handleChangeHoverTip">
    <span slot="btn">I Know</span>
  </my-hover-tip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './components/HoverTipWebComponent/raw.js';

export default defineComponent({
    data() {
      return {
        showHoverTip: 'visible',
      }
    },
    methods: {
      handleChangeHoverTip(e: any) {
        console.log("🚀 ~ file: App.vue:13 ~ handleChangeHoverTip ~ e:", e);
        this.showHoverTip = 'hidden';
      }
    }
})
</script>

<style scoped>
</style>
