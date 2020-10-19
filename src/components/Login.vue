<template>
    <div id="login-holder">
        <form @submit.prevent="authenticate" >
            <div class="input-field">
                <i class="material-icons">account_circle</i>
                <label for="usernameInput">Username or email</label>
                <input id="usernameInput" type="text" v-model="inputs.username" placeholder="Username/Email" />
            </div>
            <div class="input-field">
                <i class="material-icons">fingerprint</i>
                <label for="passwordInput">Password</label>
                <input id="passwordInput" type="password" v-model="inputs.password" placeholder="Password" />
            </div>
            <div class="input-field">
                <input type="submit" value="Login" />
            </div>
            <router-link v-if="$props.showForgot" :to="{name: 'apiForgotPassword'}">Forgot password</router-link>
        </form>
        <ul id="errors">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    .input-field {
        position: relative;
        margin: .6em 0;

        i {
            position: absolute;
            padding:calc(.4em - 1px);
            font-size:1.4em;
            left:0;
        }
        label {
            display:none;
        }

        input {
            display: block;
            padding: .8em;
            border-radius:.2em;

            &[type=text], &[type=password] {
                padding-left: 2.8em;
                width: calc(100% - 3.6em - 2px);
                border: 1px solid #888;
            }

            &[type=submit] {
                width: 100%;
                border:0;
            }
        }
    }

    a {
        text-decoration: none;
        color: #00a8ff;

        &:hover {
            color:#006ba0;
        }
    }

    #errors {
        list-style:none;
    }
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { AuthenticationStatus } from '@/enums/AuthenticationStatus';
import ApiService from '@/services/ApiService';
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { Subscription } from 'rxjs';

export default defineComponent({
    props: {
        success: Object,
        showForgot: Boolean,
    },

    data(props) {
        return {
            inputs: {
                username: '',
                password: ''
            },
            errors: Array<String>()
        }
    },

    methods: {
        authenticate() {
            ApiService.login(this.inputs.username, this.inputs.password)
                .subscribe(status => {
                    switch (status) {
                        case AuthenticationStatus.Unauthenticated:
                            this.errors.length = 0;
                            this.errors.push("Incorrect username/password");
                            break;
                        case AuthenticationStatus.Authenticated:
                            this.$router.push(this.$props.success!);
                            break;
                        default:
                            return;
                    }
                });
        }
    }
});
</script>