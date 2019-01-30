<template>
    <login />
</template>

<script>
    import login from '@/js/components/login.vue';

    export default {
        components: {
            'login' : login,
        },
        data: () => ({
            drawer: null
        }),
        props: {
            source: String
        },
    }
</script>
