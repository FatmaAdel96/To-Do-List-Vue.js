import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  pleasework: function () {
    console.log("pleasework fired");
  },
  getTasks: function () {
    return JSON.parse(localStorage.getItem("tasks"));
  },
});
