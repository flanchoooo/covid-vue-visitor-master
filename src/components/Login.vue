<template>
  <div class="d-flex align-items-center border-top border-top-2 border-primary">
    <div class="container">

      <div class="row justify-content-center">
        <img class="img-fluid mx-auto w-50" src="@/assets/full_logo.png" alt="logo">

        <div class="col-12 col-md-5 col-xl-4 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Sign in
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Free access to our dashboard.
          </p>

          <!-- Form -->
          <form @submit.prevent="userLogin">
            <div v-if="errorAlert" class="alert alert-danger" role="alert">
              {{ errorMessage }}
              <button
                type="button"
                class="close"
                @click="dismissErrorAlert"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <!-- Email address -->
            <div class="form-group">
              <!-- Label -->
              <label>Email Address</label>

              <!-- Input -->
              <input
                type="email"
                class="form-control"
                placeholder="name@address.com"
                v-model="user.email"
                required
              />
            </div>

            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">
                  <!-- Label -->
                  <label>Password</label>
                </div>
                <div class="col-auto">
                  <!-- Help text -->
                  <router-link
                    to="/forgot-password"
                    class="form-text small text-muted"
                    >Forgot password ?
                  </router-link>
                </div>
              </div>
              <!-- / .row -->

              <!-- Input group -->
              <div class="input-group input-group-merge">
                <!-- Input -->
                <input
                  type="password"
                  class="form-control form-control-appended"
                  placeholder="Enter your password"
                  v-model="user.password"
                  required
                />

                <!-- Icon -->
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fe fe-eye"></i>
                  </span>
                </div>
              </div>
              <br />
              <div class="form-group">
                <label>Company</label>
                <multiselect
                  v-model="company"
                  :options="companies"
                  :close-on-select="true"
                  :allow-empty="false"
                  track-by="id"
                  label="name"
                  required
                  placeholder="Pick your company"
                >
                </multiselect>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn btn-lg btn-block btn-primary mb-3"
              :disabled="isDisabled"
            >
              Sign in
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                Don't have an account yet?
                <router-link to="/signup"> Sign up</router-link>
                .
              </small>
            </div>
          </form>
        </div>
      </div>
      <!-- / .row -->
    </div>
    <!-- / .container -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

import axios from "axios";

export default {
  data() {
    return {
      errorAlert: false,
      user: {
        email: "",
        password: "",
        company_id: ""
      },
      isDisabled: false,
      errorMessage: "",
      companies: [],
      company: null
    };
  },

  methods: {
    ...mapActions({
      login: "auth/userLogin",
      setToken: "auth/userToken",
      setCompany: "auth/userCompany"
    }),
    reset() {
      Object.assign(this.$data, this.$options.data());
    },
    userLogin(e) {
      e.preventDefault();
      this.isDisabled = true;

      let LOGIN_URL = "visitors/login";

      if (this.company == null) {
        this.errorAlert = true;
        this.isDisabled = false;
        this.errorMessage = "Please select your company";
        return;
      }

      this.user.company_id = this.company.id;

      console.log(this.user);

      axios
        .post(LOGIN_URL, this.user)
        .then(response => {
          console.log(response);
          this.isDisabled = false;
          this.setCompany(this.company.id);
          this.setToken(response.data.model.token.access_token);
          this.login(response.data.model).then(() => {
            this.$router.replace("/home");
          });
          this.reset();
          //this.$router.push('/home')
        })
        .catch(error => {
            console.log(error);
          this.errorAlert = true;
          this.isDisabled = false;
          this.errorMessage = error.response.data.description;
        });
    },
    getCompanies() {
      axios
        .get("companies")
        .then(res => {
          this.companies = res.data.pageable.content;
        })
        .catch(error => {
          console.log(error);
        });
    },

    dismissErrorAlert() {
      this.errorAlert = false;
    }
  },
  created() {
    this.getCompanies();
    localStorage.clear();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
