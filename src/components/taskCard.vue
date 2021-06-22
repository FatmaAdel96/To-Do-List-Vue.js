<template>
    <div>
        <div class="card">
            <div class="card-header" :id="'heading' + index">
                <div class="row align-items-center">
                    <div class="col-md-9">
                        <span
                            class="task-name position-relative"
                            :id="'taskData' + index"
                        >
                            {{ name }}
                        </span>
                        <div
                            class="input-group d-none"
                            :id="'taskInputGroup' + index"
                        >
                            <input
                                type="text"
                                class="form-control"
                                :id="'taskInput' + index"
                                v-model="name"
                            />
                            <div class="input-group-append">
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    @click="updateTaskData(index)"
                                >
                                    save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="controlOptions">
                            <span
                                class="active-task"
                                v-if="checkActive(start, end) === 'active'"
                            >
                                Active
                            </span>
                            <span
                                class="finished-task"
                                v-else-if="
                                    checkActive(start, end) === 'finished'
                                "
                            >
                                Finished
                            </span>
                            <span
                                class="start-soon-task"
                                v-else-if="
                                    checkActive(start, end) === 'startSoon'
                                "
                            >
                                Soon
                            </span>
                            <span class="editIcon" @click="editTaskData(index)">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                            <div class="remove-task">
                                <button
                                    class="close"
                                    @click="removeTask(index)"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
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
                                        class="
                                            task-start-date
                                            position-relative
                                        "
                                        :id="'taskStart' + index"
                                    >
                                        {{ start }}
                                        <span
                                            class="editIcon"
                                            v-if="start.length"
                                            @click="editTaskStart(index)"
                                        >
                                            <i class="fas fa-pencil-alt"></i>
                                        </span>
                                    </span>
                                    <div
                                        class="input-group d-none"
                                        :id="'taskInputGroupStart' + index"
                                        v-if="start.length"
                                    >
                                        <input
                                            type="date"
                                            class="form-control"
                                            :id="'taskInputStart' + index"
                                            v-model="start"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="
                                                    btn btn-outline-secondary
                                                "
                                                type="button"
                                                @click="updateTaskStart(index)"
                                            >
                                                save
                                            </button>
                                        </div>
                                    </div>
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
                                        {{ end }}
                                        <span
                                            class="editIcon"
                                            v-if="end.length"
                                            @click="editTaskEnd(index)"
                                        >
                                            <i class="fas fa-pencil-alt"></i>
                                        </span>
                                    </span>
                                    <div
                                        class="input-group d-none"
                                        :id="'taskInputGroupEnd' + index"
                                        v-if="end.length"
                                    >
                                        <input
                                            type="date"
                                            class="form-control"
                                            :id="'taskInputEnd' + index"
                                            v-model="end"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="
                                                    btn btn-outline-secondary
                                                "
                                                type="button"
                                                @click="updateTaskEnd(index)"
                                            >
                                                save
                                            </button>
                                        </div>
                                    </div>
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div class="row justify-content-flex-end">
                        <i class="notes">
                            number of notes:
                            <span class="">5</span>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";

export default defineComponent({
    setup() {},
    name: "taskCard",
    components: {},
    mounted() {},

    props: ["name", "start", "end", "index"],
    data: () => {
        return {
            taskObjName: ["name", "start", "end"],
        };
    },
    methods: {
        checkActive: function (start, end) {
            var startDate = moment(start, "YYYY-MM-DD", true);
            if (startDate.isValid()) {
                start = moment(start, "YYYY-MM-DD").format("MM-DD-YYYY");
            }

            var endDate = moment(end, "YYYY-MM-DD", true);
            if (endDate.isValid()) {
                end = moment(end, "YYYY-MM-DD").format("MM-DD-YYYY");
            }

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
            const istaskFinished = moment(end, "MM-DD-YYYY").isBefore(
                moment(moment(), "MM-DD-YYYY")
            );
            const istaskSoon = moment(start, "MM-DD-YYYY").isAfter(
                moment(moment(), "MM-DD-YYYY")
            );

            if (isTaskActive) {
                return "active";
            }
            if (istaskFinished) {
                return "finished";
            }
            if (istaskSoon) {
                return "startSoon";
            }
        },
        removeTask: function (index) {
            // console.log(index);
            // this.tasks.splice(index, 1);

            let newTasks = JSON.parse(localStorage.getItem("tasks"));
            newTasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            this.$emit("newData");
        },
        updateTaskData: function (index) {
            let newTasks = JSON.parse(localStorage.getItem("tasks"));

            // this.tasks[index].name = document.getElementById(
            //     `taskInput${index}`
            // ).value;

            newTasks[index].name = document.getElementById(
                `taskInput${index}`
            ).value;
            localStorage.setItem("tasks", JSON.stringify(newTasks));

            document
                .getElementById(`taskInputGroup${index}`)
                .classList.remove("d-flex");
            document
                .getElementById(`taskInputGroup${index}`)
                .classList.add("d-none");
            document
                .getElementById(`taskData${index}`)
                .classList.remove("d-none");
            document
                .getElementById(`taskData${index}`)
                .classList.add("d-block");
        },
        editTaskData: function (index) {
            document
                .getElementById(`taskData${index}`)
                .classList.remove("d-block");
            document.getElementById(`taskData${index}`).classList.add("d-none");
            document
                .getElementById(`taskInputGroup${index}`)
                .classList.remove("d-none");
            document
                .getElementById(`taskInputGroup${index}`)
                .classList.add("d-flex");
        },

        updateTaskStart: function (index) {
            let newTasks = JSON.parse(localStorage.getItem("tasks"));

            // this.tasks[index].start = document.getElementById(
            //     `taskInputStart${index}`
            // ).value;

            let newStartDate = document.getElementById(
                `taskInputStart${index}`
            ).value;

            newStartDate = moment(newStartDate, "YYYY-MM-DD").format(
                "MM-DD-YYYY"
            );

            this.start = newStartDate;
            newTasks[index].start = newStartDate;

            localStorage.setItem("tasks", JSON.stringify(newTasks));

            document
                .getElementById(`taskInputGroupStart${index}`)
                .classList.remove("d-flex");
            document
                .getElementById(`taskInputGroupStart${index}`)
                .classList.add("d-none");
            document
                .getElementById(`taskStart${index}`)
                .classList.remove("d-none");
            document
                .getElementById(`taskStart${index}`)
                .classList.add("d-block");
        },
        editTaskStart: function (index) {
            document
                .getElementById(`taskStart${index}`)
                .classList.remove("d-block");
            document
                .getElementById(`taskStart${index}`)
                .classList.add("d-none");
            document
                .getElementById(`taskInputGroupStart${index}`)
                .classList.remove("d-none");
            document
                .getElementById(`taskInputGroupStart${index}`)
                .classList.add("d-flex");
        },

        updateTaskEnd: function (index) {
            let newTasks = JSON.parse(localStorage.getItem("tasks"));

            // this.tasks[index].end = document.getElementById(
            //     `taskInputEnd${index}`
            // ).value;

            let newEndDate = document.getElementById(
                `taskInputEnd${index}`
            ).value;

            newEndDate = moment(newEndDate, "YYYY-MM-DD").format("MM-DD-YYYY");

            this.end = newEndDate;
            newTasks[index].end = newEndDate;

            localStorage.setItem("tasks", JSON.stringify(newTasks));

            document
                .getElementById(`taskInputGroupEnd${index}`)
                .classList.remove("d-flex");
            document
                .getElementById(`taskInputGroupEnd${index}`)
                .classList.add("d-none");
            document
                .getElementById(`taskEnd${index}`)
                .classList.remove("d-none");
            document.getElementById(`taskEnd${index}`).classList.add("d-block");
        },
        editTaskEnd: function (index) {
            document
                .getElementById(`taskEnd${index}`)
                .classList.remove("d-block");
            document.getElementById(`taskEnd${index}`).classList.add("d-none");
            document
                .getElementById(`taskInputGroupEnd${index}`)
                .classList.remove("d-none");
            document
                .getElementById(`taskInputGroupEnd${index}`)
                .classList.add("d-flex");
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
</style>
