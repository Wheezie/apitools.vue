<template>
  <div class="home">
    <Login :success="{path: ''}" :showForgot="true"></Login>
  </div>
</template>

<style lang="scss" scoped>
  #login-holder {
    width: 300px;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

import Login from '@/apitools/components/Login.vue';

export default defineComponent({
  components: {
    Login
  }
});
</script>
