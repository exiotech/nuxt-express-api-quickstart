<template lang="html">
  <div class="card-box">
    <form @submit.prevent="emitFormSubmit">
      <h5 class="mb-3 text-uppercase bg-light p-2">
        <i class="remixicon-lock-password-fill mr-1"></i>
        Password
      </h5>

      <div class="form-group row">
        <label for="inputPassword" class="col-sm-3 col-form-label">
          New Password
        </label>
        <div class="col-sm-9">
          <input
            id="inputPassword"
            v-model="formData.password"
            type="password"
            class="form-control"
            placeholder="Enter new password"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="inputConfirmPassword" class="col-sm-3 col-form-label">
          Confirm Password
        </label>
        <div class="col-sm-9">
          <input
            id="inputConfirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            class="form-control"
            placeholder="Enter first name"
          />
        </div>
      </div>

      <div class="text-right">
        <button
          type="submit"
          class="btn btn-primary waves-effect waves-light mt-2">
          <i class="mdi mdi-content-save"></i>
          Change
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        confirmPassword: ``,
        password: ``,
      },
    };
  },
  methods: {
    emitFormSubmit() {
      this.$emit('submit', this.formData);
      this.$nextTick(() => this.resetFormData());
    },
    resetFormData() {
      this.formData = {
        confirmPassword: ``,
        password: ``,
      };
    },
  }
}
</script>
