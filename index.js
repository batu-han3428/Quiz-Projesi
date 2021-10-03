//Kendi yaptığım
// const sorular = [
//     {
//         id:1,
//         soruTarihi:1/1/2021,
//         soru:'Hangi programlama dili ilk piyasaya sürülmüştür?',
//         siklar:['Php','C#','Fortran','Javascript'],
//         dogruCevap:'Fortran'
//     },
//     {
//         id:1,
//         soruTarihi:1/1/2021,
//         soru:'En çok kullanılan programlama dili hangisidir?',
//         siklar:['C','Java','Python','C++'],
//         dogruCevap:'C'
//     },
//     {
//         id:1,
//         soruTarihi:1/1/2021,
//         soru:'Türkiyede geliştiriciler arasında en popüler programlama dili hangisidir?',
//         siklar:['Java','C#','Html5','Javascript'],
//         dogruCevap:'Javascript'
//     }
// ];

// let soruConstructor = function(soru, siklar, cevap){
//     if(!(this instanceof soruConstructor)){
//         return new question(soru, siklar, cevap);
//     }
//     this.soru = soru;
//     this.siklar = siklar;
//     this.cevap = cevap;
// };

// soruConstructor.prototype.cevapKontrol = soruConstructor.prototype.cevapKontrol || function(cevap){
//     return this.cevap === cevap;
// };

// var dizi = [];
// for (let index = 0; index < sorular.length; index++) {
//    dizi.push(new soruConstructor(sorular[index].soru, sorular[index].siklar, sorular[index].dogruCevap));
// }

// document.getElementById('soruSayisi').textContent=dizi.length;

// console.log(dizi);

// var soruSirasi=0;
// var dogruSayisi=0;

// sorulariYayinla();

// function sorulariYayinla(){
//     document.getElementById('kacinciSoru').textContent=soruSirasi+1;
//     document.getElementById('soru').innerText=dizi[soruSirasi].soru;
//     let siklar = document.querySelectorAll('.siklar');
//     for (let index = 0; index < dizi[soruSirasi].siklar.length; index++) {
//         siklar[index].innerText=dizi[soruSirasi].siklar[index];
//     }
// };

// function sonucYayinla(){
//     var h1 = document.createElement("h1");
//     h1.innerText='Sonuç';
//     document.getElementById('soru').replaceWith(h1);
//     document.querySelectorAll('.siklar').forEach(element=>{
//         element.remove();
//     });
//     let span = document.createElement('span');
//     span.textContent='Doğru cevap sayısı: '+dogruSayisi;
//     document.querySelector('.card-body').appendChild(span);
// };

// document.querySelector('.card').addEventListener('click',function(e){
//     if(e.target.getAttribute('class')){
//         if(e.target.getAttribute('class').includes("siklar")){
//             if(dizi[soruSirasi].cevapKontrol(e.target.innerText)){
//                 dogruSayisi++;
//             }
//             if(soruSirasi < 2){
//                 soruSirasi++;
//                 sorulariYayinla();
//             }else{
//                 sonucYayinla();
//             }
//         } 
//     }
// });


//----------------------------------------


//Hocanın Yaptığı

function Question(soru, siklar, answer){
    this.soru = soru;
    this.siklar = siklar;
    this.answer = answer;
};

//question prototype

Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}

//Quiz Constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

//Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}


//quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}


//quiz guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}



var q1 = new Question("What's the best programming language?",["C#","Javascript","Pyhton","Asp.Net"],"Javascript");

var q2 = new Question("What's the most popular programming language?",["C#","Visual Basic","Nodejs","Javascript"],"Javascript");

var q3 = new Question("What's the best modern programming language?",["C#","Javascript","Pyhton","Asp.Net"],"Javascript");

var questions = [q1,q2,q3];



//Start Quiz
var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
       showScore(); 
    }else{
        var question = quiz.getQuestion();
        document.querySelector('#soru').textContent = question.soru;

        var choices = question.siklar;
        for (let index = 0; index < choices.length; index++) {
           var element = document.querySelectorAll('.siklar');
           element[index].innerHTML=choices[index];

           guess(element[index],choices[index]);
        }

        showProgress();
    }
}

function guess(id, guess){
    id.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector('.card-body').innerHTML=html;
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector('.card-footer').innerHTML='Question '+questionNumber+' of '+totalQuestion;
}