<template>

<div class="d-flex align-items-center border-top border-top-2 border-primary">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-xl-4 my-5">

                <!-- Heading -->
                <h1 class="display-4 text-center mb-3">
                    Password reset
                </h1>

                <!-- Subheading -->
                <p class="text-muted text-center mb-5">
                    Enter your email to get a password reset link.
                </p>

                <!-- Form -->
                <form>

                    <!-- Email address -->
                    <div class="form-group">

                        <!-- Label -->
                        <label>Email Address</label>

                        <!-- Input -->
                        <input type="email" class="form-control" placeholder="name@address.com">

                    </div>

                    <!-- Submit -->
                    <button class="btn btn-lg btn-block btn-primary mb-3">
                        Reset Password
                    </button>

                    <!-- Link -->
                    <div class="text-center">
                        <small class="text-muted text-center">
                            Remember your password? <router-link to="/login"> Login</router-link>.
                        </small>
                    </div>

                </form>

            </div>
        </div> <!-- / .row -->
    </div>

</div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
