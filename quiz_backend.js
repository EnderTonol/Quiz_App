const qst = [    //THE QUESTIONS OBJECT
    {
        question: "Which programming is scripting programming?",   //question
        answer:[     //Answers
            {text:"C", correct:false},
            {text:"Java", correct:false},
            {text:"Html", correct: false},
            {text:"Python", correct:true}
        ]
    },
    {
        question: "3 * 7 +(4-2) Answer is?",
        answer:[
            {text:"12", correct:false},
            {text:"65", correct:false},
            {text:"56", correct:false},
            {text:"23", correct:true}
        ]
    },
    {
        question: "What programming is best about hacking?",
        answer:[
            {text:"Back-End langs", correct:false},
            {text:"Front-End langs", correct:false},
            {text:"Scripting langs", correct: true},
            {text:"Mern-Stack langs", correct:false}
        ]
    },
    {
        question: "Web development Includes Which programming?",
        answer:[
            {text:"C++", correct:false},
            {text:"JavaScript", correct:true},
            {text:"Shell", correct: false},
            {text:"Swift", correct:false}
        ]
    },
    {
        question:"What is the popular programming",
        answer:[
            {text:"C++", correct: false},
            {text:"Python", correct: true},
            {text:"Bash", correct: false},
            {text:"Java", correct: false}
        ]
    }
];

const qstElem = document.getElementById("qst");   //question from document
const ansr = document.getElementById("answer-btns");   //answers button from document
const nxt_btns = document.getElementById("nxt");    //next button from document

let currentQuestionIndex = 0;  //For numbering the questions
let score = 0; //score 

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxt_btns.innerHTML = "Next"
    ShowQst();

};

function ShowQst(){
    resetState();
    let Current_qst = qst[currentQuestionIndex];
    let qstNo = currentQuestionIndex + 1;
    qstElem.innerHTML = `${qstNo}. ${Current_qst.question}`;

    Current_qst.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansr.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAns);
        
    })

};

function resetState(){    //Reset the Page to Start Quiz
    nxt_btns.style.display = "none";
    while(ansr.firstChild){
        ansr.removeChild(ansr.firstChild);
    }

} 

function selectAns(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("crt");
        score++;
    }
    else{
        selectedbtn.classList.add("inCrt")
    }
    Array.from(ansr.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("crt");
        }
        button.disabled = true;
    });
    nxt_btns.style.display = "block";
}

function showScore(){
    resetState();
    qstElem.innerHTML = `You scored ${score} out of ${qst.length}!`;
    nxt_btns.innerHTML = "Play again";
    nxt_btns.style.display = 'block'
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < qst.length){
        ShowQst();
    }else{
        showScore();
    }
}

nxt_btns.addEventListener('click',() => {
    if(currentQuestionIndex < qst.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();