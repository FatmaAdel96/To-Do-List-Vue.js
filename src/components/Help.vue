<template>
  <div>
    <h3>help</h3>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default defineComponent({
  setup() {},
  name: "Help",
  data: function () {
    return {
      firstname: "",
    };
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10),
    },
  },
});
</script>
