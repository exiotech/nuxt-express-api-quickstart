<template lang="html">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <p class="text-muted mb-4 mt-3">
              Don't have an account? Create your own account, it takes less than a minute
            </p>
          </div>

          <b-alert v-model="isRegisterError" variant="danger" dismissible>
            {{ regError }}
          </b-alert>

          <b-form @submit.prevent="tryToRegisterIn">
            <b-form-group id="inputGroupFirstName" label="First Name" label-for="inputFirstName">
              <b-form-input
                id="inputFirstName"
                v-model="firstName"
                type="text"
                placeholder="Enter your first name"
              />
            </b-form-group>

            <b-form-group id="inputGroupLastname" label="Last Name" label-for="inputLastname">
              <b-form-input
                id="inputLastname"
                v-model="lastName"
                type="text"
                placeholder="Enter your last name"
              />
            </b-form-group>

            <b-form-group id="inputGroupEmail" label="Email" label-for="inputEmail">
              <b-form-input
                id="inputEmail"
                v-model="email"
                type="email"
                placeholder="Enter email"
              />
            </b-form-group>

            <b-form-group id="inputGroupPhoneNumber" label="Phone Number" label-for="inputPhoneNumber">
              <b-form-input
                id="inputPhoneNumber"
                v-model="phone"
                type="text"
                placeholder="Enter phone number"
              />
            </b-form-group>

            <b-form-group id="inputGroupPassword" label="Password" label-for="password">
              <b-form-input
                id="inputPassword"
                v-model="password"
                type="password"
                placeholder="Enter password"
              />
            </b-form-group>

            <b-form-group id="inputGroupEmailSignup" class="mt-4">
              <b-button type="submit" variant="primary" aria-label="Sign Up" class="btn-block">
                Sign Up
              </b-button>
            </b-form-group>
          </b-form>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p class="text-muted">
            Already have account?
            <nuxt-link
              tag="a"
              to="/auth/sign-in"
              class="text-primary font-weight-medium ml-1"
              title="Log In"
              aria-label="Log In"
            >
              Log In
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    auth: 'guest',
    layout: 'auth',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        regError: null,
        tryingToRegister: false,
        isRegisterError: false,
      }
    },
    methods: {
      // Try to register the user in with the email, fullname
      // and password they provided.
      async tryToRegisterIn() {
        this.isRegisterError = false;
        this.tryingToRegister = true;
        this.regError = null;

        try {
          await this.$axios.post('auth/register', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            password: this.password,
          });

          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })

          this.$router.push(this.$auth.options.redirect.user);
        } catch (e) {
          this.isRegisterError = true;
          this.regError = e.response.data.message;
        }
      },
    },
  }
</script>
