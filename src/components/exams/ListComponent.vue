<template>
  <div class="vue-tempalte">
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
   <div class="container">
       <router-link to="/home" class="nav-link pr-3">Home</router-link>
     <ul class="nav navbar-nav flex-row float-right">
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
     <div class="col-xl-11">
         <div class="card o-hidden border-0 shadow-lg my-5">
             <div class="card-body p-0">
                 <!-- Nested Row within Card Body -->
                 <div class="row">
                     <div class="col-lg-12">
                         <div class="p-5">
                             <div class="text-lg-left">
                                 <h1 class="h4 text-gray-900 mb-4">Create Company</h1>
                                 Create New
                                 <hr>
                                 <h5>Registered Companies</h5>

                             </div>

                             <div class="box-body">

            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Question</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in Questions" :key="question.id">
                        <td>{{ question.company_name }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: question.questions.id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteQuestion(question.questions.id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
    import axios from "axios";

    export default {
        data() {
            return {
                Questions: []
            }
        },
        created() {
            let questionsURL = 'http://144.91.64.120:35600/api/exams';
            axios.get(questionsURL).then(res => {
                this.Questions = res.data.pageable.content;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteQuestion(id){
                let apiURL = 'http://144.91.64.120:35600/api/questions/${id}';
                let indexOfArrayItem = this.Exams.findIndex(i => i.id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Exams.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
