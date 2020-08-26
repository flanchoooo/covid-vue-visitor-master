<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Question</th>
                        <th>Status</th>
                        <th>Complexity Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in Questions" :key="question._id">
                        <td>{{ question.questionText }}</td>
                        <td>{{ question.active }}</td>
                        <td>{{ question.difficultyLevel }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: question._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteQuestion(question._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            let apiURL = 'http://144.91.64.120:35600/api/questions?sort=unsorted,true,sorted,true,empty,false&offset=0&pageNumber=1&pageSize=10&paged=true&unpaged=true';
            axios.get(apiURL).then(res => {
                this.Questions = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteQuestion(id){
                let apiURL = 'http://144.91.64.120:35600/api/questions/${id}';
                let indexOfArrayItem = this.Questions.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Questions.splice(indexOfArrayItem, 1);
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
