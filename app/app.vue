<template>
  <div>
    <h1 class="text-5xl">My App</h1>
  </div>
</template>

<script>
import { score } from './fetchData';

export default {
  async mounted() {
    await score();
  }
}
</script>