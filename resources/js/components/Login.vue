<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-form @submit.prevent="login">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-spacer></v-spacer>
                        <v-card-text>
                                <v-text-field 
                                    prepend-icon="person" 
                                    name="email" 
                                    v-validate="'required|email'" 
                                    :error-messages="errors.collect('email')"
                                    data-vv-name="email" 
                                    v-model="email" 
                                    label="Login" 
                                    type="text">
                                </v-text-field>
                                <v-text-field 
                                    prepend-icon="lock" 
                                    v-validate="'required'" 
                                    :error-messages="errors.collect('password')"
                                    data-vv-password="password" 
                                    v-model="password" 
                                    name="password" 
                                    label="Password" 
                                    type="password">
                                </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            email: '',
            password: ''
        }),
        props: {
        },
        mounted() {
            console.log("Validator", this.$validator)
            console.log('Store', this.$store)
        },
        methods: {
            login() {
                this.$validator.validateAll().then(result => {
                    console.log('Login', result)
                    this.$store.dispatch("login", {
                        email: this.email,
                        password: this.password
                    }).then(resp => {
                        console.log('response', resp)
                    })
                })
            }
        }
    }
</script>
