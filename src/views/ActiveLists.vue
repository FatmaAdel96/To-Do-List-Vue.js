<template>
    <div class="active-lists">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h2>Welcome To Your To Do Lists</h2>
                    <h3>you can manage your active work, add new work</h3>
                    <p>
                        all you need is adding some of your work to see what you
                        can do with that simple website
                    </p>
                </div>
            </div>
            <div class="row">
                <div
                    class="accordion col-12"
                    id="accordionExample"
                    v-for="(task, index) in tasks"
                    :key="task.id"
                    :class="{ dNone: !checkActiveTasks(task.start, task.end) }"
                >
                    <taskCard
                        @newData="getNewTasks"
                        class="w-100"
                        :name="task.name"
                        :start="task.start"
                        :end="task.end"
                        :index="index"
                        :tasks="tasks"
                        v-if="checkActiveTasks(task.start, task.end)"
                    />
                    <!-- :id="'taskCardId' + index" -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import taskCard from "@/components/taskCard.vue";
import moment from "moment";
// import Home from "@/views/Home.vue";

export default defineComponent({
    setup() {},
    name: "ActiveLists",
    components: {
        taskCard,
    },
    data: function () {
        return {
            name: "aaaaa",
            tasks: this.getTasks(),
        };
    },
    mounted() {
        // this.tasks.forEach((task) => {
        //     console.log(task.activeTasking);
        // });
        // console.log("Component has been mounted!");
        // if (this.$route.params.tasks) {
        //     this.$route.params.tasks.forEach((element) => {
        //         if (element) console.log(element);
        //     });
        // }
    },
    // props: ["tasks"],
    methods: {
        getTasks: function () {
            // console.log("111111");
            return JSON.parse(localStorage.getItem("tasks"));
        },
        getNewTasks: function () {
            // console.log("111111");
            this.tasks = this.getTasks();
        },
        checkActiveTasks: function (start, end) {
            const isTaskActive =
                moment(end, "MM-DD-YYYY").isSame(
                    moment(moment(), "MM-DD-YYYY")
                ) ||
                moment(start, "MM-DD-YYYY").isSame(
                    moment(moment(), "MM-DD-YYYY")
                ) ||
                (moment(start, "MM-DD-YYYY").isBefore(
                    moment(moment(), "MM-DD-YYYY")
                ) &&
                    moment(end, "MM-DD-YYYY").isAfter(
                        moment(moment(), "MM-DD-YYYY")
                    ));

            if (isTaskActive) {
                // console.log("active", 1);
                return true;
            } else {
                // console.log("not active");
                return false;
            }
        },
    },
});
</script>
<style lang="scss" scoped>
.dNone {
    display: none !important;
}
</style>
