<template>

    <div class="d-flex align-items-center border-top border-top-2 border-primary">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-5 col-xl-4 my-5">

                    <h1 class="display-4 text-center mb-3">
                        Sign up
                    </h1>

                    <p class="text-muted text-center mb-5">
                        Free access to our dashboard.
                    </p>

                    <form @submit.prevent="userRegistration">
                        <div v-if="errorAlert" class="alert alert-danger" role="alert">
                            {{errorMessage}}
                            <button type="button" class="close" @click="dismissErrorAlert" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="form-group">

                            <label>First Name</label>

                            <input type="text" class="form-control" placeholder="Your first name"
                                   v-model="user.first_name" required>

                        </div>
                        <div class="form-group">

                            <div class="row">
                                <div class="col">

                                    <label>Middle Name(s)</label>

                                </div>
                                <div class="col-auto">

                                    <p class="form-text small text-muted">Optional</p>

                                </div>
                            </div>

                            <input type="text" class="form-control" placeholder="Your middle name(s)"
                                   v-model="user.middle_names">

                        </div>
                        <div class="form-group">

                            <label>Last Name</label>

                            <input type="text" class="form-control" placeholder="Your last name"
                                   v-model="user.last_name" required>

                        </div>
                        <div class="form-group">

                            <label>Email Address</label>

                            <input type="email" class="form-control" placeholder="name@address.com" v-model="user.email"
                                   required>

                        </div>

                        <div class="form-group">

                            <div class="row">
                                <div class="col">

                                    <label>Password</label>

                                </div>

                            </div>

                            <div class="input-group input-group-merge">

                                <input type="password" class="form-control form-control-appended"
                                       placeholder="Enter your password" v-model="user.password" required>

                                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fe fe-eye"></i>
                  </span>
                                </div>

                            </div>
                        </div>
                        <div class="form-group">

                            <div class="row">
                                <div class="col">

                                    <label>Confirm Password</label>

                                </div>

                            </div>

                            <div class="input-group input-group-merge">

                                <input type="password" class="form-control form-control-appended"
                                       placeholder="Confirm your password" v-model="user.confirm_password" required>

                                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fe fe-eye"></i>
                  </span>
                                </div>

                            </div>
                        </div>

                        <button class="btn btn-lg btn-block btn-primary mb-3">
                            Sign in
                        </button>

                        <div class="text-center">
                            <small class="text-muted text-center">
                                Already have an account?
                                <router-link to="/login"> Login</router-link>
                                .
                            </small>
                        </div>

                    </form>

                </div>
            </div> <!-- / .row -->
        </div> <!-- / .container -->
    </div>

</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                errorAlert:false,
                errorMessage:'',
                user: {
                    first_name      : '',
                    middle_names    : '',
                    last_name       : '',
                    email           : '',
                    password        : '',
                    confirm_password: '',
                    company_id      : ''
                }
            };
        },

        methods: {
            reset() {
                Object.assign(this.$data, this.$options.data());
            },
            userRegistration() {

                let apiURL = 'visitors';

                if(this.user.password !== this.user.confirm_password){
                    this.errorAlert = true;
                    this.errorMessage = 'Password Confirmation does not match';
                    return;
                }

                axios.post(apiURL, this.user)
                    .then(response => {
                        console.log(response);
                        this.$router.replace("/login");
                        this.reset();
                    }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
</script>
