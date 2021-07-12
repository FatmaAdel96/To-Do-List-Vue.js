<template>
  <div class="card">
    <h3 class="card-header">Register Area</h3>
    <div class="card-body">
      <form action="">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="">First Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.firstname.$model"
              :class="{
                'is-invalid': $v.firstname.$error,
                'is-valid': !$v.firstname.$invalid,
              }"
            />
            <div class="valid-feedback">first name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">first name is required</span>
              <span v-if="!$v.firstname.minLength"
                >must have at least
                {{ $v.firstname.$params.minLength.min }}
                letters</span
              >
              <span v-if="!$v.firstname.maxLength"
                >must have at most
                {{ $v.firstname.$params.maxLength.max }}
                letters
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default defineComponent({
  setup() {},
  name: "FormValidation",
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
<style lang="scss" scoped></style>
