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
            <a class="nav-link"> Home </a>
          </router-link>
          <router-link to="/AddNew" tag="li" class="nav-item">
            <a class="nav-link"> Add New List </a>
          </router-link>
          <router-link to="/ActiveLists" tag="li" class="nav-\item">
            <a class="nav-link"> Active Lists </a>
          </router-link>
          <router-link to="/TrashLists" tag="li" class="nav-\item">
            <a class="nav-link" title="Recycle Bin">
              <i class="fas fa-trash-restore"></i>
            </a>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
  setup() {},
  name: "AppHeader",
  data: function () {
    return {
      tasks: [
        {
          name: "Task 1",
          start: "06-10-2021",
          end: "06-20-2021",
          notes: ["finished part 1", "finished part 2"],
          status: "",
          isDeleted: false,
        },
        {
          name: "Task 2",
          start: "06-25-2021",
          end: "07-30-2021",
          notes: ["finished part 1"],
          status: "",
          isDeleted: false,
        },
        {
          name: "Task 3",
          start: "07-30-2021",
          end: "08-30-2021",
          notes: [],
          status: "",
          isDeleted: false,
        },
      ],
    };
  },
  mounted() {},
  created() {
    // this.fillLocalStorage();
    if (!localStorage.getItem("tasks")) {
      this.fillLocalStorage();
    } else {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    this.tasksStatus();
  },
  updated() {
    console.log("updated");
  },
  destroyed() {},
  methods: {
    fillLocalStorage: function () {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    tasksStatus: function () {
      let newTasks = JSON.parse(localStorage.getItem("tasks"));

      for (let i = 0; i < newTasks.length; i++) {
        const isTaskActive =
          moment(newTasks[i].end, "MM-DD-YYYY").isSame(
            moment(moment(), "MM-DD-YYYY")
          ) ||
          moment(newTasks[i].start, "MM-DD-YYYY").isSame(
            moment(moment(), "MM-DD-YYYY")
          ) ||
          (moment(newTasks[i].start, "MM-DD-YYYY").isBefore(
            moment(moment(), "MM-DD-YYYY")
          ) &&
            moment(newTasks[i].end, "MM-DD-YYYY").isAfter(
              moment(moment(), "MM-DD-YYYY")
            ));
        const istaskFinished = moment(newTasks[i].end, "MM-DD-YYYY").isBefore(
          moment(moment(), "MM-DD-YYYY")
        );
        const istaskSoon = moment(newTasks[i].start, "MM-DD-YYYY").isAfter(
          moment(moment(), "MM-DD-YYYY")
        );

        if (isTaskActive) {
          newTasks[i].status = "active";
        }
        if (istaskFinished) {
          newTasks[i].status = "finished";
        }
        if (istaskSoon) {
          newTasks[i].status = "soon";
        }
      }
      localStorage.setItem("tasks", JSON.stringify(newTasks));
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
