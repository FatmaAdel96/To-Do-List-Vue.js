<template>
  <div>
    <div class="card">
      <div class="card-header" :id="'heading' + index">
        <div class="row align-items-center">
          <div class="col-md-9">
            <span class="task-name position-relative" :id="'taskData' + index">
              {{ cardName }}
            </span>
          </div>
          <div class="col-md-3">
            <div class="controlOptions">
              <span class="active-task" v-if="cardStatus === 'active'">
                Active
              </span>
              <span class="finished-task" v-else-if="cardStatus === 'finished'">
                Finished
              </span>
              <span class="start-soon-task" v-else-if="cardStatus === 'soon'">
                Soon
              </span>

              <div class="remove-task">
                <button
                  class="close"
                  type="button"
                  data-toggle="modal"
                  :data-target="'#removeTaskModal' + index"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
                <div
                  class="modal fade"
                  :id="'removeTaskModal' + index"
                  tabindex="-1"
                  :aria-labelledby="'removeTaskModalLabel' + index"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h5 class="font-weight-bold mb-0">
                          Are you sure you want to delete this task?
                        </h5>

                        <span
                          class="text-dark font-weight-normal"
                          style="font-size: 16px"
                        >
                          <span class="text-danger font-italic">Note:</span>
                          This operation is permanent and cannot be undone.
                        </span>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-dark px-3 py-1 ml-2"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger px-3 py-1 ml-2"
                          data-dismiss="modal"
                          @click="removeTask(index)"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          class="btn btn-info px-3 py-1 ml-2"
                          data-dismiss="modal"
                          @click="moveTaskFromTrash(index)"
                        >
                          Move from trash
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                :data-target="'#collapse' + index"
                aria-expanded="true"
                :aria-controls="'collapse' + index"
              >
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        :id="'collapse' + index"
        class="collapse"
        :aria-labelledby="'heading' + index"
        data-parent="#accordionExample"
      >
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 border-right-solid">
              <h5 class="mb-0">
                Start Date:
                <span class="float-right dateSection">
                  <span
                    class="task-start-date position-relative"
                    :id="'taskStart' + index"
                  >
                    {{ cardStartDate }}
                  </span>
                </span>
              </h5>
            </div>

            <div class="col-md-6">
              <h5 class="mb-0">
                End Date:
                <span class="float-right dateSection">
                  <span
                    class="task-end-date position-relative"
                    :id="'taskEnd' + index"
                  >
                    {{ cardEndDate }}
                  </span>
                </span>
              </h5>
            </div>
          </div>
          <div class="row justify-content-flex-end">
            <i
              class="notes cursor-pointer"
              type="button"
              data-toggle="modal"
              :data-target="'#notesModal' + index"
            >
              number of notes:
              <span class="text-decoration-underline">
                {{ cardNotes.length }}
              </span>
            </i>

            <div
              class="modal fade"
              :id="'notesModal' + index"
              tabindex="-1"
              :aria-labelledby="'notesModalLabel' + index"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="'notesModalLabel' + index">
                      {{ cardName }} Task Notes
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div v-if="cardNotes.length === 0">
                      <p>there wasn't Notes For this task</p>
                    </div>
                    <div v-else>
                      <ul class="ul-notes">
                        <li
                          v-for="(note, noteIndex) in cardNotes"
                          :key="note.id"
                        >
                          <textarea
                            name=""
                            cols="30"
                            rows="5"
                            class="form-control input-note"
                            v-model="cardNotes[noteIndex]"
                            :id="'taskCardNoteData' + index + noteIndex"
                            disabled
                          >
                          </textarea>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
  name: "taskCard",
  components: {},
  mounted() {},

  props: ["name", "start", "end", "notes", "status", "index", "isDeleted"],
  data: () => {
    return {
      taskObjName: ["name", "start", "end"],
      testingDate: "2020-06-13",
      cardName: "",
      cardStartDate: "",
      cardEndDate: "",
      cardNotes: [],
      cardStatus: "",
      cardDeleted: false,
      taskCardNote: "",
    };
  },

  created() {
    this.assignNewValues();
  },
  updated() {},
  model: {
    prop: "name",
    event: "listchange",
  },
  computed: {},
  methods: {
    moveTaskFromTrash: function (index) {
      console.log("moveToTrash");
      let newTasks = JSON.parse(localStorage.getItem("tasks"));

      newTasks[index].isDeleted = false;
      this.cardDeleted = false;

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      this.$emit("newData");
    },
    removeTask: function (index) {
      console.log(index);
      let newTasks = JSON.parse(localStorage.getItem("tasks"));

      newTasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      this.$emit("newData");
    },
    assignNewValues: function () {
      this.cardName = this.name;
      this.cardStartDate = this.start;
      this.cardEndDate = this.end;
      this.cardNotes = this.notes;
      this.cardStatus = this.status;
      this.cardDeleted = this.isDeleted;
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
$base-color-6: #2184af;
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  margin: 10px 0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.card {
  border: 1px solid #5e96ae;
  border-radius: 2rem;
  margin-bottom: 1rem;
  .card-top {
    background-color: $base-color-5;
    color: #ffffff;
    padding: 0.25rem 1rem;
  }
  .remove-task {
    .close {
      .fas {
        color: red;
      }
    }
  }
  .card-body {
    padding: 1rem;
    .task-name {
      position: relative;
    }
    .dateSection {
      .editIcon {
        cursor: pointer;
        opacity: 0.5;
        font-size: 1rem;
        color: #e83e8c;
        // visibility: hidden;
      }
      .editIcon:hover {
        opacity: 1;
      }
    }
    // .dateSection:hover {
    //     .editIcon {
    //         visibility: visible;
    //     }
    // }
    .notes {
      margin: 15px 15px 0 0;
      background-color: #b2ebe0;
      border-radius: 8px;
      padding: 4px 22px;
      font-size: 1.3rem;
    }
  }
  .card-header {
    background-color: #fff;
    color: #5e96ae;
    font-size: 1.57rem;
    font-weight: bold;
    .controlOptions {
      display: flex;
      align-items: center;
      float: right;
      .active-task,
      .finished-task,
      .start-soon-task {
        color: #fff;
        border-radius: 8px;
        font-size: 1rem;
        margin: 0 2rem 0 0;
        padding: 4px 8px;
      }
      .active-task {
        background-color: #28a745;
      }
      .finished-task {
        background-color: #dc3545;
      }
      .start-soon-task {
        background-color: #e08963;
      }
      .editIcon {
        color: #e83e8c;
        font-size: 1.6rem;
        margin: 0 0 0 1rem;
        cursor: pointer;
        opacity: 0.5;
      }
      .editIcon:hover {
        opacity: 1;
      }
      .remove-task {
        margin: 0 0 0 1rem;
      }
      .btn {
        padding: 0;
        margin: 0 0 0 1rem;
      }
    }
  }
  .card-header:first-child {
    border-radius: 2rem;
  }
  .card-body {
    h5 {
      color: #212529d9;
    }
  }
}
.bg-base-color-5 {
  background-color: $base-color-5;
}
.ul-notes {
  list-style: none;
  padding: 4px 0px;
  max-height: 280px;
  overflow: auto;
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;
  li {
    position: relative;
    margin-bottom: 1.5rem;
    flex: 0 0 50%;
    padding: 0 12px;
    .form-control {
      border-width: 0 0 0px 0;
      border-radius: 16px;
      border-color: #5e96ae;
      padding: 12px 20px 12px 12px;
      background-color: #ffa3a387;
      resize: none;
    }
    .form-control:focus {
      color: #495057;
      background-color: #fff;
      border-color: transparent !important;
      outline: 0;
      box-shadow: 0 0 0 0.2rem #5e96ae;
    }
    .remove-task {
      position: absolute;
      right: 21px;
      top: 10px;
      display: none;
      .close {
        font-size: 18px;
      }
    }
  }
  li:hover {
    .remove-task {
      display: block;
    }
  }
  .plus-note {
    border-radius: 16px;
    background-color: #ffa3a387;
    height: 149px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .fas {
      font-size: 5rem;
      color: #38908f;
    }
  }
}
</style>
