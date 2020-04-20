(function () {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}" required>
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class= "image">${currentQuestion.image}</div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        if (numCorrect === 10) {
            container.innerHTML = `${numCorrect} out of ${myQuestions.length}.<br><img src="https://media.giphy.com/media/mzTKsByk8Xl6g/giphy.gif"><br><p>Perfect score! The guys are so proud of you!</p><br><br><button id="retake" onclick="window.location.reload(false)">Retake quiz</button>`;
        } else if (numCorrect === 0) {
            container.innerHTML = `${numCorrect} out of ${myQuestions.length}.<br><br><img src="./images/oh_no.gif"><br><br><p>Phoebe's "Oh no"</p><br><button id="retake" onclick="window.location.reload(false)">Retake quiz</button>`;
        } else if (numCorrect <= 4) {
            container.innerHTML = `${numCorrect} out of ${myQuestions.length}. It's not that bad...is it?<br><br><img src="./images/oh_boy.gif"><br>Keep trying!<br><button id="retake" onclick="window.location.reload(false)">Retake quiz</button>`;
        } else if (numCorrect <= 9) {
            container.innerHTML = `${numCorrect} out of ${myQuestions.length}. Yay! <br><br><img src="./images/yay.gif"><br><button id="retake" onclick="window.location.reload(false)">Retake quiz</button>`;
        }
    }


    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "What location does the first episode start in?",
            image: '<img src="./images/1.gif">',
            answers: {
                a: "The Central Perk Cafe",
                b: "Monica and Phoebe's apartment",
                c: "Chandler and Joey's apartment",
                d: "Ross's apartment"
            },
            correctAnswer: "a"
        },
        {
            question: "Rachel left her fiancé at the altar. What was his name?",
            image: '<img src="./images/2.gif">',
            answers: {
                a: "Gary",
                b: "Larry",
                c: "Barry",
                d: "Steve"
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the first person that Rachel calls?",
            image: '<img src="./images/3.gif">',
            answers: {
                a: "The guy she left at the altar",
                b: "Her mom",
                c: "Her sister",
                d: "Her dad"
            },
            correctAnswer: "d"
        },
        {
            question: "What is the gang watching on TV?",
            image: '<img src="./images/4.png">',
            answers: {
                a: "A sports game",
                b: "A telenovela",
                c: "The news",
                d: "A movie"
            },
            correctAnswer: "b"
        },
        {
            question: "Who buzzes into the apartment?",
            image: '<img src="./images/5.png">',
            answers: {
                a: "Joey's love interest",
                b: "Rachel's mom",
                c: "Monica's love interest",
                d: "Ross's ex-wife"
            },
            correctAnswer: "c"
        },
        {
            question: "How does the gang refer to Monica's love interest?",
            image: '<img src="./images/6.png">',
            answers: {
                a: "Paul, the restaurant guy",
                b: "Paul, the sausage guy",
                c: "Paul, the wine guy",
                d: "Paul, the coffee guy"
            },
            correctAnswer: "c"
        },
        {
            question: "Why are Joey and Chandler in Ross's apartment?",
            image: '<img src="./images/7.gif">',
            answers: {
                a: "They are helping Ross throw away things that remind him of Carol (his ex-wife)",
                b: "They are helping Ross come up with a plan to ask out Rachel",
                c: "They are helping Ross clean out his apartment",
                d: "They are helping Ross put together his furniture"
            },
            correctAnswer: "d"
        },
        {
            question: "What metaphor does Joey make about the abundance of women in the world?",
            image: '<img src="./images/8.gif">',
            answers: {
                a: "There are many flavors of ice cream",
                b: "There are many fish in the sea",
                c: "There are many types of sandwiches",
                d: "There are more cookies in the cookie jar"
            },
            correctAnswer: "a"
        },
        {
            question: "What does Rachel come back with after her day filled with job interviews?",
            image: '<img src="./images/9.png">',
            answers: {
                a: "A new pair of boots",
                b: "A new job",
                c: "A new credit card",
                d: "A new handbag"
            },
            correctAnswer: "a"
        },
        {
            question: "How does Monica retaliate against Paul for lying to her?",
            image: '<img src="./images/10.png">',
            answers: {
                a: "She stomps on his expensive sunglasses",
                b: "She gets him fired",
                c: "She steals a bottle of his wine",
                d: "She stomps on his watch"
            },
            correctAnswer: "d"
        }
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    const container = document.getElementById("container");
    let currentSlide = 0;


    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
