<template>
  <div class="vue-tempalte">
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
   <div class="container">
       <router-link to="/home" class="nav-link pr-3">Home</router-link>
     <ul class="nav navbar-nav flex-row float-right">
       <li class="nav-item">
         <router-link to="/login" class="nav-link pr-3"> Answer Choices </router-link>
       </li>
       <li class="nav-item">
         <router-link to="/login" class="nav-link pr-3"> Questions </router-link>
       </li>
       <li class="nav-item">
         <router-link to="/login" class="nav-link pr-3"> Exams </router-link>
       </li>
       <li class="nav-item">
         <router-link to="/login" class="nav-link pr-3"> Visitors </router-link>
       </li>
       <li class="nav-item">
         <router-link to="/viewcompany" class="nav-link pr-3"> Companies </router-link>
       </li>
       <li class="nav-item">
          <router-link  to="/logout" class="btn btn-outline-primary"> Sign Out </router-link>
       </li>
     </ul>
   </div>
 </nav>


 <div class="row justify-content-center">
     <div class="col-xl-8">
         <div class="card o-hidden border-0 shadow-lg my-5">
             <div class="card-body p-0">
                 <!-- Nested Row within Card Body -->
                 <div class="row">
                     <div class="col-lg-12">
                         <div class="p-5">


                                <hr>
<div class="center">
                               <div class="col-md-6">
                             <h3 class="text-center">Create Company</h3>
                             <form @submit.prevent="handleSubmitForm">
                                 <div class="form-group">
                                     <label>Name</label>
                                     <input type="text" class="form-control" v-model="company.name" required>
                                 </div>

                                 <div class="form-group">
                                     <label>Longitude</label>
                                     <input type="text" class="form-control" v-model="company.longitute" required>
                                 </div>

                                 <div class="form-group">
                                     <label>Latitude</label>
                                     <input type="text" class="form-control" v-model="company.latitute" required>
                                 </div>

                                 <div class="form-group">
                                     <button class="btn btn-danger btn-block">Create</button>
                                 </div>
                             </form>
                           </div>
                           </div>
                           </div>
                        </div>
                     </div>
                </div>
            </div>
      </div>
</div>
</div>

</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {

              company: {
                name: '',
                latitute: '',
                longitute: ''
              }
            };
        },
        methods: {
              handleSubmitForm(){

                let LOGIN_URL = 'http://144.91.64.120:35600/api/company-admins/login';


                axios.post(LOGIN_URL, this.company)
                .then(response => {
                  console.log(response)
                   this.$router.push('/viewcompany')
                })
                .catch((error) => {
                 alert(error.message);
                   });
                 }

      }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
