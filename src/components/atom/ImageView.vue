<template>
  <v-img v-if="imageUrl !== ''" :height="imageHeight" :src="imageUrl"></v-img>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexManager',
  props: ['imageUrl', 'imageHeight'],
});
</script>
