<template>
    <div class="app-header mb-4">
        <nav class="navbar navbar-expand-lg navbar-dark bg-header">
            <a class="navbar-brand" href="#">To Do List</a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <router-link to="/" tag="li" class="nav-item" exact>
                        <!-- <router-link
                        :to="{
                            path: '/',
                            name: 'Home',
                            params: { tasks: tasks },
                        }"
                        tag="li"
                        exact
                        class="nav-item"
                    > -->
                        <a class="nav-link"> Home </a>
                    </router-link>
                    <router-link to="/AddNew" tag="li" class="nav-item">
                        <!-- <router-link
                        :to="{
                            path: '/AddNew',
                            name: 'AddNew',
                            params: { tasks: tasks },
                        }"
                        tag="li"
                        class="nav-item"
                    > -->
                        <a class="nav-link"> Add New List </a>
                    </router-link>
                    <router-link to="/ActiveLists" tag="li" class="nav-\item">
                        <!-- <router-link
                        :to="{
                            path: '/ActiveLists',
                            name: 'ActiveLists',
                            params: { tasks: tasks },
                        }"
                        tag="li"
                        class="nav-\item"
                    > -->
                        <a class="nav-link"> Active Lists </a>
                    </router-link>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    setup() {},
    name: "AppHeader",
    data: function () {
        return {
            tasks: [
                {
                    name: "OOP Assignment",
                    start: "06-10-2021",
                    end: "06-20-2021",
                },
                {
                    name: "CPL Assignment",
                    start: "06-10-2021",
                    end: "06-13-2021",
                },
                {
                    name: "DS Assignment",
                    start: "06-20-2021",
                    end: "06-25-2021",
                },
                {
                    name: "Angular Course",
                    start: "06-20-2021",
                    end: "06-25-2021",
                },
                {
                    name: "React Course",
                    start: "06-20-2021",
                    end: "06-25-2021",
                },
            ],
        };
    },
    mounted() {
        // console.log(localStorage);
        // console.log("");
    },
    created() {
        // this.fillLocalStorage();
        if (!localStorage.getItem("tasks")) {
            this.fillLocalStorage();
        } else {
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    },
    destroyed() {},
    methods: {
        fillLocalStorage: function () {
            localStorage.setItem("tasks", JSON.stringify(this.tasks));

            // console.log("first set", JSON.parse(localStorage.getItem("tasks")));
        },
    },
});
</script>
<style lang="scss" scoped>
$base-color-1: #38908f;
$base-color-2: #b2ebe0;
$base-color-3: #5e96ae;
$base-color-4: #ffbfa3;
$base-color-5: #e08963;

.navbar-collapse {
    justify-content: flex-end;
}
.bg-header {
    background-color: $base-color-3;
}
.navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
}
.navbar-dark {
    .navbar-nav {
        font-size: 20px;
        .nav-link {
            color: rgb(255 255 255 / 75%);
        }
        .nav-link:focus {
            color: #ffffff;
        }
        .nav-link:hover {
            color: #ffffff;
        }
        .router-link-active {
            .nav-link {
                color: #ffffff;
            }
        }
    }
}
</style>
