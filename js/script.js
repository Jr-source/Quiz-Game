var questions = [ 
    {
        "question": "What’s the diameter of a basketball hoop in inches?",
        "answers": ["12 inches", "14 inches", "16 inches", "18 inches"],
        "correct": 3

    }, {
        "question": "The Olympics are held every how many years?",
        "answers": ["2 years", "4 years", "10 years", "6 years"],
        "correct": 1
        

    },{
        "question":"What do you call it when a player makes three back to back strikes in bowling?",
        "answers": ["Turkey!!!", "Rhino!!!", "Bingo!!!", "Yeppers!!!"],
        "correct": 0
        
    }, {
        "question": "How many players are on a baseball team?",
        "answers": ["3", "6", "9", "1 million"],
        "correct": 2

    },{
        "question": "What was Wilt Chamberlain’s record for most points in a single game?",
        "answers": ["70 points", "80 points", "100 points", "90 points"],
        "correct": 2
    }, {
        "question": "In 1971, this boxer gave Muhammad Ali his first ever loss in the realm of professional boxing. What was his name?",
        "answers": ["Mike Tyson", "Gabby Jay", "Joe Frazier", "Conor MacGregor"],
        "correct": 2
    }, {
        "question": "What country did the sport of curling originate?",
        "answers": ["Scotland", "England", "Canada", "Russia"],
        "correct": 0
    }, {
        "question": "In a conventional game of football, how many players are fielded at a time?",
        "answers": ["11", "44", "21", "22"],
        "correct":3

    }, {
        "question": "What is the only country to have won medals in the Winter Olympics but not the Summer Olympics?",
        "answers": ["Canada", "Estonia", "Norway", "Liechtenstein"],
        "correct":3

    }, {
        "question": " In golf, what do you call a score of 4 under par on any given hole?",
        "answers": ["A condor", "An eagle", "A birdie's birdie", "A salamander"],
        "correct":0

    }
]



var startPage = document.getElementById("quiz_intro");
var startButton = document.getElementById("start_button");
var timerEl = document.getElementById("timer");
var viewScores = document.getElementById("btn_scores");
var quiz_page = document.getElementById("list_questions");
var presentQuestions = document.getElementById("question");
var listOfAnswers = document.getElementById("answers");
var firstAnswer = document.getElementById("answer1");
var secondAnswer = document.getElementById("answer2");
var thirdAnswer = document.getElementById("answer3");
var fourthAnswer = document.getElementById("answer4");
var correctOrWrong = document.getElementById("assessment");
var namePage = document.getElementById("results");
var presentScores = document.getElementById("final_score");
var inputYourInitials = document.getElementById("initials");
var submitYourInitials = document.getElementById("btn_submit_initials");
var highscorePage = document.getElementById("show_scores");
var earnedScores = document.getElementById("earned_scores");
var homeButton = document.getElementById('home_btn')
var clearScores = document.getElementById('btn_clear_scores')


var subtractedTime = 10;
var intervalTimer;
var timeLeft=75; 
var quizOver = false
var nextQuestionIndex 
var question_number = 0
var score = 0
var finalScore = 0



function quizTime() {
  intervalTimer = setInterval(function() {
    timerEl.textContent = timeLeft;
    timeLeft--;
    console.log(timeLeft)

    if (timeLeft === 0) {
      timerEl.textContent = 0;
      clearInterval(intervalTimer);
      quizFinished()
    }
    else if (quizOver){
        clearInterval(intervalTimer);
    }

  }, 1000);
}

function startQuiz() {
    startPage.setAttribute(
        "style",
        "display: none");
    quizTime();  
}



function displayQuestionPage() {
    startQuiz()
    quiz_page.classList.remove("hidden");
    nextQuestionIndex = 0
    score = 0
    question_number = 0
    showQuestion(question_number)
}


function showQuestion(question_index){
    presentQuestions.textContent = questions[question_index].question;
    firstAnswer.textContent = questions[question_index].answers[0];
    secondAnswer.textContent = questions[question_index].answers[1];
    thirdAnswer.textContent = questions[question_index].answers[2];
    fourthAnswer.textContent = questions[question_index].answers[3];
}


function nextQuestion(event){
    if (event.target.matches("button")){
        if (question_number>=questions.length-1 || timeLeft<=0) {
            quizFinished()
            return
        }
        console.log(event.target.textContent)
        var answersArray = questions[question_number].answers
        var correctIndex = questions[question_number].correct
        if (event.target.textContent==answersArray[correctIndex]) {
            console.log("Correct!")
            score++
            correctOrWrong.textContent = "Correct!"
        }
        else {
            console.log("Incorrect!")
            correctOrWrong.textContent = "Incorrect!"
            timeLeft-=subtractedTime
        }
        question_number++
        showQuestion(question_number)
        setTimeout(function(){ correctOrWrong.textContent=""; }, 1100);

    }
    
}

function quizFinished(){
    console.log("Done")
    quiz_page.classList.add("hidden")
    namePage.classList.remove("hidden")
    quizOver=true
    if (score===0 || timeLeft<=0){
        finalScore=0
    }
    finalScore = score*timeLeft
    presentScores.textContent = finalScore

}


function renderScores(event){
    event.preventDefault();
    namePage.classList.add("hidden")
    highscorePage.classList.remove("hidden")

    var show_scores = {
        initials: inputYourInitials.value.trim(),
        score:finalScore
    };
    console.log(show_scores)

    localStorage.setItem("show_scores", JSON.stringify(show_scores));
    var lastSubmission = JSON.parse(localStorage.getItem("show_scores"));
    earnedScores.textContent = lastSubmission.initials + ", score: " +lastSubmission.score;
    localStorage.getItem(finalScore);
    
}


function goToStart(){
    highscorePage.classList.add("hidden")
    startPage.setAttribute(
        "style",
        "display: block");
    clearInterval(intervalTimer)
    timeLeft=75;
    timerEl.textContent = timeLeft
    quizOver = false;
    
}

// Clears the score
function clearYourScore(event){
    var clear = confirm("Would you like to clear your scores?")
    if (clear) {
        event.preventDefault()
        localStorage.setItem('show_scores', "[]")
        earnedScores.textContent = "Scores cleared";
    }
}

function clickHighScoreButton(event){
 
    startQuiz();
    renderScores(event);
}



startButton.addEventListener("click", displayQuestionPage);
listOfAnswers.addEventListener("click", nextQuestion);
submitYourInitials.addEventListener("click", renderScores);
homeButton.addEventListener("click", goToStart);
clearScores.addEventListener("click", clearYourScore);
viewScores.addEventListener("click", clickHighScoreButton);