<template>
  <div class="active-lists">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1 class="font-weight-bold">Recycle Bin Tasks</h1>
        </div>
      </div>
      <div class="row">
        <div
          class="accordion col-12"
          id="accordionExample"
          v-for="(task, index) in tasks"
          :key="task.id"
          :class="{ dNone: !task.isDeleted }"
        >
          <taskCardForShow
            @newData="getNewTasks"
            class="w-100"
            :name="task.name"
            :start="task.start"
            :end="task.end"
            :notes="task.notes"
            :status="task.status"
            :isDeleted="task.isDeleted"
            :index="index"
            :tasks="tasks"
            v-if="task.isDeleted"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import taskCardForShow from "@/components/taskCardForShow.vue";

export default defineComponent({
  setup() {},
  name: "ActiveLists",
  components: {
    taskCardForShow,
  },
  data: function () {
    return {
      name: "aaaaa",
      tasks: this.getTasks(),
    };
  },
  mounted() {},
  methods: {
    getTasks: function () {
      return JSON.parse(localStorage.getItem("tasks"));
    },
    getNewTasks: function () {
      this.tasks = this.getTasks();
    },
  },
});
</script>
<style lang="scss" scoped>
.dNone {
  display: none !important;
}
</style>
