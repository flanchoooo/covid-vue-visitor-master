<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
          <router-link to="/home" class="nav-link pr-3">Home</router-link>
        <ul class="nav navbar-nav flex-row float-right">

          <li class="nav-item">
            <router-link to="/login" class="nav-link pr-3"> Sign in </router-link>
          </li>
          <li class="nav-item">
             <router-link  to="/signup" class="btn btn-outline-primary"> Sign up </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
   export default{

   }
</script>
