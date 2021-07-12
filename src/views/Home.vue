<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="font-weight-bold">Task Manager</h1>
        </div>
      </div>
      <div class="row justify-content-flex-end">
        <div class="col-md-4">
          <form>
            <div class="form-group row">
              <label for="" class="col-sm-2 col-form-label">Filter:</label>
              <div class="col-sm-10">
                <select
                  class="form-control rounded"
                  id=""
                  v-model="filterValue"
                  @change="tasksFilteration()"
                >
                  <option value="all">All</option>
                  <option value="active">Active Tasks</option>
                  <option value="finished">Finished Tasks</option>
                  <option value="soon">Tasks That Will Start Soon</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div
          class="accordion col-12"
          id="accordionExample"
          v-if="renderComponent"
        >
          <taskCard
            @newData="getNewTasks"
            @newDataForNotes="getNewTasksForNotes"
            class="w-100"
            v-for="(task, index) in tasks"
            :key="task.id"
            :name="task.name"
            :start="task.start"
            :end="task.end"
            :notes="task.notes"
            :status="task.status"
            :isDeleted="task.isDeleted"
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
import local_file from "@/assets/js/taskFunctions.js";

export default defineComponent({
  name: "Home",
  components: {
    taskCard,
  },
  data: function () {
    return {
      name: "aaaaa",
      tasks: local_file.getTasks(),
      filterValue: "all",
      renderComponent: true,
    };
  },

  mounted() {},
  updated() {},
  created() {},
  computed: {},
  methods: {
    forceRerender() {
      // remove the my-component component from the DOM
      this.renderComponent = false;

      this.$nextTick(() => {
        // add my-component component in DOM
        this.renderComponent = true;
      });
    },

    getNewTasks: function () {
      this.tasks = local_file.getTasks();
      this.forceRerender();
    },
    getNewTasksForNotes: function () {
      this.tasks = local_file.getTasks();
    },
    tasksFilteration: function () {
      this.tasks = local_file.getTasks();

      if (this.filterValue === "all") {
        this.forceRerender();
        return;
      }

      let finishedTasks = [];
      let activeTasks = [];
      let soonTasks = [];

      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].status === "active") {
          activeTasks.push(this.tasks[i]);
        } else if (this.tasks[i].status === "finished") {
          finishedTasks.push(this.tasks[i]);
        } else if (this.tasks[i].status === "soon") {
          soonTasks.push(this.tasks[i]);
        }
      }

      if (this.filterValue === "active") {
        this.tasks = activeTasks;
        this.forceRerender();
      } else if (this.filterValue === "finished") {
        this.tasks = finishedTasks;
        this.forceRerender();
      } else if (this.filterValue === "soon") {
        this.tasks = soonTasks;
        this.forceRerender();
      }
    },
  },
});
</script>
