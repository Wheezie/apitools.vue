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
import { Options, Vue } from 'vue-class-component';
import Login from '@/components/Login.vue'; // @ is an alias to /src

@Options({
  components: {
    Login,
  },
})
export default class Home extends Vue {}
</script>
