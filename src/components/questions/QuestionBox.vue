<template>

    <div class="question-box-container" style="min-width: 60%">
        <br>
        <div class="card" v-if="!completed">
            <div class="card-header">

                <h4 class="card-header-title">
                    {{ currentQuestion.question_text }}
                </h4>

            </div>
        </div>

        <b-jumbotron v-if="!completed">
            <b-list-group>
                <br>
                Select your answer
                <b-list-group-item
                        v-for="(answer, index) in shuffledAnswers"
                        :key="index"
                        @click.prevent="selectAnswer(index)"
                        :class="answerClass(index)"
                >
                    {{ answer.question_choice_text }}
                </b-list-group-item>
                <br>
            </b-list-group>
            <b-button @click="restart"
                      variant="info">
                Restart
            </b-button>
            <b-button v-if="!(number === questions-1)" @click="next(); addAnswer();" :disabled="!answered"
                      variant="success">
                Next
            </b-button>

            <b-button @click="next(); submitAnswer();" v-if="number === questions-1" variant="success"
                      :disabled="loading">
                Finish
            </b-button>
        </b-jumbotron>

        <br>
        <div v-if="completed" class="card">
            <br>
            <div class="alert alert-success" style="max-width: 60%; margin: 0 auto">
                You have completed your questionnaire.
                Please find your QR code and your verification below.(We have also sent this to your email)

            </div>
            <br>
            <div class="align-content-center">
                <qrcode :value=answer_code :options="{ width: 200 }" style="margin: 0 auto"></qrcode>
                <h1 class="text-center">{{answer_code}}</h1>
                <button class="btn btn-primary btn-block mx-auto d-block" onclick="location.reload();"
                        style="max-width: 60%">Done
                </button>
            </div>

            <br>


        </div>
    </div>


</template>

<script>
    import moment from 'moment';
    import axios from "axios";


    export default {
        props  : {
            currentQuestion: Object,
            number         : Number,
            exam           : Number,
            questions      : Number,
            next           : Function,
            previous       : Function,
            increment      : Function
        },
        data   : function () {
            return {
                selectedIndex  : null,
                correctIndex   : null,
                shuffledAnswers: [],
                answered       : false,
                answerSheet    : [],
                completed      : false,
                answer_code    : 123,
                loading        : false
            }
        },
        watch  : {
            currentQuestion: {
                immediate: true,
                handler() {
                    this.selectedIndex = null;
                    this.answered = false;
                    this.shuffleAnswers()
                }
            }
        },
        methods: {
            selectAnswer(index) {
                this.selectedIndex = index;
                this.answered = true;
                if (this.selectedIndex === this.correctIndex) {
                    this.increment(true);
                }
            },
            addAnswer() {
                this.answerSheet.push({
                    question_id: this.currentQuestion.question_choices[this.selectedIndex].question_id,
                    option_ids : [this.currentQuestion.question_choices[this.selectedIndex].id]
                });
            },
            submitAnswer() {
                try {
                    this.loading = true;
                    this.addAnswer();
                    let user = JSON.parse(window.localStorage.getItem('user'));
                    let data = {
                        exam_id     : this.exam,
                        visitor_id  : user.id,
                        answer_sheet: this.answerSheet,
                        start_time  : moment().unix()
                    };
                    console.log(JSON.stringify(data));

                    let questionsURL = 'questionnaires';

                    axios.post(questionsURL, data).then(
                        res => {

                            if (res.data.code === '00') {
                                this.completed = true;
                                this.answer_code = res.data.model.qr_code;
                            }

                        }).catch(error => {
                        this.loading = false;
                        console.log(error.response.data.description);
                        alert(error.response.data.description);

                    });
                } catch (e) {
                    alert('Please select an answer')

                }

            },
            shuffleAnswers() {
                this.shuffledAnswers = this.currentQuestion.question_choices;
                this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.question_choices)
            },
            answerClass(index) {
                let answerClass = '';

                if (!this.answered && this.selectedIndex === index) {
                    answerClass = 'selected'
                } else if (this.answered && this.correctIndex === index) {
                    answerClass = 'correct'
                } else if (this.answered &&
                    this.selectedIndex === index &&
                    this.correctIndex !== index
                ) {
                    answerClass = 'incorrect'
                }

                return answerClass
            },
            restart() {
                location.reload()
            }
        },
        created() {
        }
    }
</script>

<style scoped>
    .list-group {
        margin-bottom: 15px;
    }

    .list-group-item:hover {
        background: white;
        cursor: pointer;
    }

    .btn {
        margin: 0 5px;
    }

    .selected {
        background-color: lightblue;
        color: white;
    }

    .correct {
        background-color: lightgreen;
    }

    .incorrect {
        background-color: lightblue;
        color: white;
    }

    canvas {
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: block;
        width: 320px;
        height: 480px;
    }
</style>
