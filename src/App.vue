<template>
    <div id="app">
        <AppHeader />
        <!-- <div style="width: 500px; margin: auto">
            <FormValidation />
        </div> -->

        <router-view />
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import AppHeader from "@/components/AppHeader.vue";
// import FormValidation from "@/components/FormValidation.vue";

export default defineComponent({
    setup() {},
    name: "App",
    components: {
        AppHeader,
        // FormValidation,
    },
    mounted() {},
});
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
}
</style>
