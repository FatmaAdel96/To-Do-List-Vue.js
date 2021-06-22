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
                                    v-model="tasksFilteration"
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

export default defineComponent({
    name: "Home",
    components: {
        taskCard,
    },
    data: function () {
        return {
            name: "aaaaa",
            tasks: this.getTasks(),
            tasksFilteration: "",
        };
    },
    mounted() {
        // console.log(this.tasks);
        console.log(this.tasksFilteration);
    },
    computed() {
        console.log(this.tasksFilteration);
    },
    methods: {
        getTasks: function () {
            // console.log("111111");
            return JSON.parse(localStorage.getItem("tasks"));
        },
        getNewTasks: function () {
            // console.log("111111");
            this.tasks = this.getTasks();
        },
    },
    // props: ["tasks"],
});
</script>
