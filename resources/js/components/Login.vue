<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-spacer></v-spacer>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="email" v-validate="'required|email'" :email="email" label="Login" type="text"></v-text-field>
                            <span :style="`color: ${$vuetify.theme.error}`">{{ errors.first('email') }}</span>
                            <v-text-field prepend-icon="lock" v-validate="'required'" :password="password" name="password" label="Password" type="password"></v-text-field>
                            <span :style="`color: ${$vuetify.theme.error}`">{{ errors.first('password') }}</span>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="login" color="primary">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            email: '',
            password: ''
        }),
        props: {
        },
        mounted() {
            console.log("Validator", this.$validator)
        },
        methods: {
            login() {
                this.$validator.validate().then(result => {
                    console.log('Login', result)
                })
            }
        }
    }
</script>
