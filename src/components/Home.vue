<template>
    <div>
        <nav class="navbar bg-white justify-content-between flex-nowrap flex-row fixed-top">
            <div class="container">
                <router-link to="/home" class="nav-link pr-3">Hi {{currentUser.first_name}}! </router-link>
                <ul class="nav navbar-nav flex-row float-right">

                    <li class="nav-item">
                        <router-link to="/login" class="btn btn-outline-primary"> Sign Out</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <br><br><br>

        <div class="row justify-content-center">
            <Header
                    :numCorrect="numCorrect"
                    :numTotal="questions.length"
            />
            <QuestionBox
                    v-if="questions.length"
                    :questions="questions.length"
                    :number="index"
                    :exam="exam.id"
                    :currentQuestion="questions[index]"
                    :next="next"
                    :previous="previous"
                    :increment="increment"
            />
        </div>
    </div>


</template>

<script>
    import axios from "axios";
    import Header from "./questions/Header";
    import QuestionBox from "./questions/QuestionBox";
    import { mapGetters } from 'vuex'


    export default {
        data() {
            return {
                questions : [],
                index     : 0,
                numCorrect: 0,
                numTotal  : 0,
                exam      : null
            }
        },
        created() {

            let company = window.localStorage.getItem('company');
            let questionsURL = 'exams/company/'+company;

            axios.get(questionsURL).then(res => {
                console.log(res.data);
                this.questions = res.data.pageable.content[0].questions;
                this.exam = res.data.pageable.content[0];
                console.log(this.questions);
            }).catch(error => {
                console.log(error)
            });
        },
        methods   : {
            next() {
                if(this.index < this.questions.length - 1){
                    this.index++;
                }
                if(this.numCorrect === this.questions.length) return;
                this.numCorrect++
            },
            previous() {
                this.index--
            },
            increment(isCorrect) {
                if (isCorrect) {
                    this.numCorrect++
                }
                this.numTotal++
            },
        },
        computed:{
        ...mapGetters({currentUser: 'auth/user'})
        },
        components: {
            Header,
            QuestionBox
        },
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
