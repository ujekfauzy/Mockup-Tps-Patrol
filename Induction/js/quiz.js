(function () {
    var img1 = '../Content/Gambar/ImgMockup/1.png';
    var img2 = '../Content/Gambar/ImgMockup/2.png';
    var img3 = '../Content/Gambar/ImgMockup/3.png';
    var img4 = '../Content/Gambar/ImgMockup/4.jpg';
    var img5 = '../Content/Gambar/ImgMockup/5.png';
    var img6 = '../Content/Gambar/ImgMockup/6.png';
    var img7 = '../Content/Gambar/ImgMockup/7.png';
    var img8 = '../Content/Gambar/ImgMockup/8.png';
    var questions = [{
        question: "What is this picture?",
        isQuestionImg : true,
        imgQuestion : img1,
        isChoiceImg : false,
        choices: ["This is a", "This is b", "This is c", "This is d", "This is e"],
        correctAnswer: 2
    }, {
        question: "What is representation about k3?",
        isQuestionImg : false,
        imgQuestion : "",
        isChoiceImg : true,
        choices: [img2, img3, img4],
        correctAnswer: 4
    }, {
        question: "This Picture same as ?",
        isQuestionImg : true,
        imgQuestion : img7,
        isChoiceImg : true,
        choices: [img2, img3, img4, img5, img6],
        correctAnswer: 4
    }, {
        question: "What is 1*7?",
        choices: [4, 5, 6, 7, 8],
        correctAnswer: 3
    }, {
        question: "What is 8*8?",
        choices: [20, 30, 40, 50, 64],
        correctAnswer: 4
    }];

    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object

    // Display initial question
    displayNext();

    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      
        e.preventDefault();
        debugger
        // Suspend click listener during fade animation
        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        selectionValue = selections[questionCounter];
        // If no user selection, progress is stopped
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
        
    });

    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Pertanyaan ' + (index + 1) + ':</h2>');
        qElement.append(header);
        var question = $('<p>').append(questions[index].question);
        qElement.append(question);
        if (questions[index].isQuestionImg)
        {
            let imgsrc = `<img  width='125' height='150' src="${questions[index].imgQuestion}">`;
            qElement.append(imgsrc);
        }
        
        

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
        var radioList = $('<ul style="list-style-type: none;padding: 0;margin: 0;">');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input class="radioquiz" type="radio" name="answer" value=' + i + ' />';
            if(questions[index].isChoiceImg)
            {
                input += `<img  width='125' height='150' src="${questions[index].choices[i]}">`;
            }
            else{
                input += questions[index].choices[i];
            }    
            
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Reads the user selection and pushes the value to an array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Displays next requested element
    function displayNext() {
        debugger
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
        var score = $('<p>', { id: 'question' });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();