<template lang="html">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <p class="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
          </div>

          <b-alert v-model="isAuthError" variant="danger" dismissible>
            {{ authError }}
          </b-alert>

          <b-form @submit.prevent="tryToLogIn">
            <b-form-group id="inputGroupEmail" label="Email" label-for="input-1">
              <b-form-input
                id="inputEmail"
                v-model="email"
                type="text"
                placeholder="Enter email address"
              />
            </b-form-group>

            <b-form-group id="inputGroupPassword" label="Password" label-for="input-2">
              <b-form-input
                id="inputPassword"
                v-model="password"
                type="password"
                placeholder="Enter password"
              />
            </b-form-group>

            <b-form-group id="buttonGroupLogin" class="mt-4">
              <b-button type="submit" aria-label="Log in" variant="primary" class="btn-block">
                Log in
              </b-button>
            </b-form-group>
          </b-form>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p>
            <nuxt-link
              tag="a"
              to="/forget-password"
              class="ml-1"
              title="Forgot your password"
              aria-label="Forgot your password"
            >
              Forgot your password?
            </nuxt-link>
          </p>
          <p class="text-muted">
            Don't have an account?
            <nuxt-link
              tag="a"
              to="/auth/sign-up"
              class="text-primary font-weight-medium ml-1"
              title="Sign Up"
              aria-label="Sign Up"
            >
              Sign Up
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
        email: '',
        password: '',
        authError: null,
        tryingToLogIn: false,
        isAuthError: false,
      }
    },
    methods: {
      async tryToLogIn() {
        this.isAuthError = false;
        this.tryingToLogIn = true;
        this.authError = null;

        try {
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          this.$router.push(this.$auth.options.redirect.user);
        } catch (e) {
          this.isAuthError = true;
          this.authError = e.response.data.message;
        }
      },
    },
  }
</script>
