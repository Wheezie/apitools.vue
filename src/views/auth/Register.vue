<template>
    <div class="floating-parent">
        <div class="center-bar">
            <Header title="Register" banner="img/icons/msapplication-icon-144x144.png" bannerAlt="Logo alternative" />
            <Register :success="{path: ''}" :showLogin="true" :config="config" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Header from '@/apitools/components/Header.vue';
import Register from '@/apitools/components/Register.vue';
import RegistrationOptions from '@/apitools/models/options/RegistrationOptions';

export default defineComponent({
    components: {
        Header,
        Register,
    },
    data() {
        return {
            config: new RegistrationOptions()
        }
    }
});
</script>