<template>
    <div class="add-new">
        <div class="container">
            <form action="@/Home" method="post" @submit.prevent="addTaskData">
                <div class="row align-items-center flex-flow-column">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="taskNAme">Task Name</label>
                            <input
                                type="text"
                                class="form-control rounded"
                                name="taskName"
                                placeholder="Waht do you need to do?"
                                v-model.trim="$v.taskName.$model"
                                id="taskName"
                                :class="{
                                    'is-invalid': $v.taskName.$error,
                                    'is-valid': !$v.taskName.$invalid,
                                }"
                            />
                            <div class="valid-feedback">
                                first name is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.taskName.required">
                                    Name is required
                                </span>
                                <span v-if="!$v.taskName.minLength">
                                    Name must have at least
                                    {{ $v.taskName.$params.minLength.min }}
                                    letters.
                                </span>
                                <span v-if="!$v.taskName.maxLength">
                                    Name must have at most
                                    {{ $v.taskName.$params.maxLength.max }}
                                    letters.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="startDate">Start Date</label>
                            <input
                                type="date"
                                class="form-control rounded"
                                name="startDate"
                                placeholder=""
                                v-model.trim="$v.startDate.$model"
                                id="startDate"
                                :class="{
                                    'is-invalid': $v.startDate.$error,
                                    'is-valid': !$v.startDate.$invalid,
                                }"
                            />
                            <div class="valid-feedback">
                                startDate is valid!
                            </div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.startDate.required">
                                    Start Date is required
                                </span>
                                <span v-if="!$v.startDate.EndtDateTime">
                                    End Date can't be before start date
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label for="endDate">End Date</label>
                            <input
                                type="date"
                                class="form-control rounded"
                                name="endDate"
                                placeholder=""
                                v-model.trim="$v.endDate.$model"
                                id="endDate"
                                :class="{
                                    'is-invalid': $v.endDate.$error,
                                    'is-valid': !$v.endDate.$invalid,
                                }"
                            />
                            <div class="valid-feedback">endDate is valid!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.endDate.required">
                                    Start Date is required
                                </span>
                                <span v-if="!$v.endDate.StartDateTime">
                                    End Date can't be before start date
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <input
                            type="submit"
                            value="Add"
                            class="btn btn-primary rounded"
                        />
                        <!-- <button
                            class="btn btn-outline-secondary"
                            type="button"
                            @click="addTaskData()"
                        >
                            save
                        </button> -->
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import moment from "moment";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default defineComponent({
    setup() {},
    name: "AddNew",
    data: function () {
        return {
            taskName: "",
            startDate: "",
            endDate: "",
        };
    },
    props: ["tasks"],
    mounted() {
        // console.log(this.tasks);
    },
    validations: {
        taskName: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(10),
        },
        startDate: {
            required,
            EndtDateTime() {
                // this.startDate = moment(this.startDate, "YYYY-MM-DD").format(
                //     "MM-DD-YYYY"
                // );
                // this.endDate = moment(this.endDate, "YYYY-MM-DD").format(
                //     "MM-DD-YYYY"
                // );
                if (this.endDate === "") {
                    // console.log("free");

                    // console.log(this.startDate);

                    return true;
                } else if (
                    moment(this.startDate, "YYYY-MM-DD").isBefore(
                        moment(this.endDate, "YYYY-MM-DD")
                    )
                ) {
                    // console.log(this.startDate);
                    return true;
                } else if (
                    moment(this.startDate, "YYYY-MM-DD").isAfter(
                        moment(this.endDate, "YYYY-MM-DD")
                    )
                ) {
                    // console.log("after");
                    return false;
                }
            },
        },
        endDate: {
            required,
            StartDateTime() {
                if (this.endDate === "") {
                    return true;
                }
                if (
                    moment(this.startDate, "YYYY-MM-DD").isBefore(
                        moment(this.endDate, "YYYY-MM-DD")
                    )
                ) {
                    return true;
                } else if (
                    moment(this.startDate, "YYYY-MM-DD").isAfter(
                        moment(this.endDate, "YYYY-MM-DD")
                    )
                ) {
                    return "End Date can't be before start date";
                }
            },
        },
    },
    methods: {
        addTaskData: function () {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = "ERROR";
            } else {
                const name = document.getElementById("taskName").value;

                let start = document.getElementById("startDate").value;
                start = moment(start, "YYYY-MM-DD").format("MM-DD-YYYY");

                let end = document.getElementById("endDate").value;
                end = moment(end, "YYYY-MM-DD").format("MM-DD-YYYY");

                // this.tasks.push({ name, start, end });

                let newTasks = JSON.parse(localStorage.getItem("tasks"));

                // console.log("old newTasks" , newTasks);

                newTasks.push({ name, start, end });

                localStorage.setItem("tasks", JSON.stringify(newTasks));

                // console.log(
                //     "new newTasks",
                //     JSON.parse(localStorage.getItem("tasks"))
                // );

                alert("Task Is Added successfully");

                // location.reload();

                this.$router.push({ name: "Home" });

                // this.taskName = "";
                // this.startDate = "";
                // this.endDate = "";
                // e.target.reset();
            }
        },
    },
});
</script>

<style lang="scss" scoped></style>
