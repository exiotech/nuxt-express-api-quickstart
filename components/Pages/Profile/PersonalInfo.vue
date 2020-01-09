<template lang="html">
  <div class="card-box">
    <form @submit.prevent="$emit('submit', formData)">
      <h5 class="mb-3 text-uppercase bg-light p-2">
        <i class="mdi mdi-account-circle mr-1"></i>
        Personal Info
      </h5>

      <div class="form-group row">
        <label for="firstname" class="col-sm-3 col-form-label">
          First Name
        </label>
        <div class="col-sm-9">
          <input
            id="firstname"
            v-model="formData.firstName"
            type="text"
            class="form-control"
            placeholder="Enter first name"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="lastname" class="col-sm-3 col-form-label">
          Last Name
        </label>
        <div class="col-sm-9">
          <input
            id="lastname"
            v-model="formData.lastName"
            type="text"
            class="form-control"
            placeholder="Enter last name"
            />
        </div>
      </div>
      <div class="form-group row">
        <label for="useremail" class="col-sm-3 col-form-label">
          Email Address
        </label>
        <div class="col-sm-9">
          <input
            id="useremail"
            v-model="formData.email"
            type="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="userphone" class="col-sm-3 col-form-label">
          Phone Number
        </label>
        <div class="col-sm-9">
          <input
            id="userphone"
            v-model="formData.phone"
            type="text"
            class="form-control"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div class="text-right">
        <button
          type="submit"
          class="btn btn-primary waves-effect waves-light mt-2">
          <i class="mdi mdi-content-save"></i>
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    };
  },
  mounted() {
    const { firstName, lastName, email, phone, } = this.$auth.user;
    this.formData = { firstName, lastName, email, phone };
  },
}
</script>
