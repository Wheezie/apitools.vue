<template>
    <div class="floating-parent">
        <div class="center-bar">
            <Header title="Login" banner="img/icons/msapplication-icon-144x144.png" bannerAlt="Logo alternative" />
            <Login :success="{path: ''}" :showForgot="true" :showRegister="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Header from '@/apitools/components/Header.vue';
import Login from '@/apitools/components/Login.vue';

export default defineComponent({
    components: {
        Header,
        Login,
    }
});
</script>