<template>
    <div class="home">
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
            <div class="row justify-content-flex-end">
                <div class="col-md-4">
                    <form>
                        <div class="form-group row">
                            <label for="" class="col-sm-2 col-form-label"
                                >Filter:</label
                            >
                            <div class="col-sm-10">
                                <select
                                    class="form-control rounded"
                                    id=""
                                    v-model="filterValue"
                                    @change="tasksFilteration()"
                                >
                                    <option value="">
                                        Make your choice ...
                                    </option>
                                    <option value="all">All</option>
                                    <option value="active">Active Tasks</option>
                                    <option value="finished">
                                        Finished Tasks
                                    </option>
                                    <option value="soon">
                                        Tasks That Will Start Soon
                                    </option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="accordion col-12" id="accordionExample">
                    <taskCard
                        @newData="getNewTasks"
                        class="w-100"
                        v-for="(task, index) in tasks"
                        :key="task.id"
                        :name="task.name"
                        :start="task.start"
                        :end="task.end"
                        :index="index"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import taskCard from "@/components/taskCard.vue";
import moment from "moment";

export default defineComponent({
    name: "Home",
    components: {
        taskCard,
    },
    data: function () {
        return {
            name: "aaaaa",
            tasks: this.getTasks(),
            filterValue: "",
        };
    },
    mounted() {
        // console.log(this.tasks);
    },
    computed: {},
    methods: {
        getTasks: function () {
            return JSON.parse(localStorage.getItem("tasks"));
        },
        getNewTasks: function () {
            this.tasks = this.getTasks();
        },
        tasksFilteration: function () {
            this.tasks = this.getTasks();

            if (this.filterValue === "all") {
                return true;
            }

            var finishedTasks = [];
            var activeTasks = [];
            var soonTasks = [];

            for (let i = 0; i < this.tasks.length; i++) {
                const isTaskActive =
                    moment(this.tasks[i].end, "MM-DD-YYYY").isSame(
                        moment(moment(), "MM-DD-YYYY")
                    ) ||
                    moment(this.tasks[i].start, "MM-DD-YYYY").isSame(
                        moment(moment(), "MM-DD-YYYY")
                    ) ||
                    (moment(this.tasks[i].start, "MM-DD-YYYY").isBefore(
                        moment(moment(), "MM-DD-YYYY")
                    ) &&
                        moment(this.tasks[i].end, "MM-DD-YYYY").isAfter(
                            moment(moment(), "MM-DD-YYYY")
                        ));
                const istaskFinished = moment(
                    this.tasks[i].end,
                    "MM-DD-YYYY"
                ).isBefore(moment(moment(), "MM-DD-YYYY"));
                const istaskSoon = moment(
                    this.tasks[i].start,
                    "MM-DD-YYYY"
                ).isAfter(moment(moment(), "MM-DD-YYYY"));

                if (isTaskActive) {
                    activeTasks.push(this.tasks[i]);
                }
                if (istaskFinished) {
                    finishedTasks.push(this.tasks[i]);
                }
                if (istaskSoon) {
                    soonTasks.push(this.tasks[i]);
                }
            }

            if (this.filterValue === "active") {
                this.tasks = activeTasks;
            } else if (this.filterValue === "finished") {
                this.tasks = finishedTasks;
            } else if (this.filterValue === "soon") {
                this.tasks = soonTasks;
            }
        },
    },
    // props: ["tasks"],
});
</script>
