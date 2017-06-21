var peMod = angular.module('peasy', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html' })
        .when('/login', { templateUrl: '/partials/login.html' })
        .when('/register', { templateUrl: '/partials/register.html' })
        .when('/takeQuiz', { templateUrl: '/partials/takeQuiz.html', controller: 'takeQuizCtrl' })
        .when('/company', { templateUrl: '/partials/company.html', controller: 'compayWiseCtrl' })
        .when('/bzTemplateAdd', { templateUrl: '/partials/bzTemplateAdd.html', controller: 'bzAddTemplateCtrl' })
        .when('/bzTemplateList', { templateUrl: '/partials/bzTemplateList.html', controller: 'bzListTemplateCtrl' })
        .when('/quizSummary', { templateUrl: '/partials/quizSummary.html', controller: 'quizSummaryCtrl' })
        .when('/topicwise', { templateUrl: '/partials/topicwise.html' })
        .when('/authortest', { templateUrl: '/partials/authorTest.html' })
        .when('/dashboard', { templateUrl: '/partials/dashboard.html' })
        .when('/addInterviewExperience', { templateUrl: '/partials/addInterviewExperience.html' })
        .when('/viewInterviewExperience', { templateUrl: '/partials/viewInterviewExperience.html' })
        .when('/notfound', { templateUrl: '/partials/404.html' })
        .otherwise({ redirectTo: '/notfound' })
});
peMod.controller('peasyCtrl', ['$scope', function($scope) {
    $scope.message = 'Test Message';
}]);

peMod.controller('compayWiseCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/company-wise-test-data.json')
        .then(function(response) {
            $scope.info = response.data;
        }, function(error) {
            $scope.error = error;
        });
}]);

/* SATYA START*/
$(document).ready(function() { $("#input").cleditor(); });
/* SATYA END*/


peMod.controller('TimepickerDemoCtrl', function($scope, $log) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
});

peMod.controller('TimepickerDemo', function($scope, $log) {
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };
});

/* AJAY START */
peMod.controller('quizSummaryCtrl', function($scope, $http) {
    draw(120);
    $scope.score = 40;
    $scope.Attempted = 50;
    $scope.correct = 40;
    $scope.inCorrect = 10;
    $scope.NotAttempted = 50;

    $http.get('/data/quiz-summary-data.json')
        .then(function(response) {
            $scope.questions = response.data;
        }, function(error) {
            $scope.error = error;
        });

    function redraw() {
        draw(document.getElementById("myList").value);
    }

    function draw(speed) {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = canvas.height / 2 - 20;

        context.beginPath();
        context.arc(centerX, centerY, radius, Math.PI * 0.10, Math.PI * -1.1, true);

        var gradience = context.createRadialGradient(centerX, centerY, radius - radius / 2, centerX, centerY, radius - radius / 8);
        gradience.addColorStop(0, '#ff9000');
        gradience.addColorStop(1, '#000000');

        context.fillStyle = gradience;
        context.fill();
        context.closePath();
        context.restore();

        context.beginPath();
        context.strokeStyle = '#ffff00';
        context.translate(centerX, centerY);
        var increment = 5;
        context.font = "15px Helvetica";
        for (var i = -18; i <= 18; i++) {
            angle = Math.PI / 30 * i;
            sineAngle = Math.sin(angle);
            cosAngle = -Math.cos(angle);

            if (i % 5 == 0) {
                context.lineWidth = 8;
                iPointX = sineAngle * (radius - radius / 4);
                iPointY = cosAngle * (radius - radius / 4);
                oPointX = sineAngle * (radius - radius / 7);
                oPointY = cosAngle * (radius - radius / 7);

                wPointX = sineAngle * (radius - radius / 2.5);
                wPointY = cosAngle * (radius - radius / 2.5);
                context.fillText((i + 18) * increment, wPointX - 2, wPointY + 4);
            } else {
                context.lineWidth = 2;
                iPointX = sineAngle * (radius - radius / 5.5);
                iPointY = cosAngle * (radius - radius / 5.5);
                oPointX = sineAngle * (radius - radius / 7);
                oPointY = cosAngle * (radius - radius / 7);
            }
            context.beginPath();
            context.moveTo(iPointX, iPointY);
            context.lineTo(oPointX, oPointY);
            context.stroke();
            context.closePath();
        }
        var numOfSegments = speed / increment;
        numOfSegments = numOfSegments - 18;
        angle = Math.PI / 30 * numOfSegments;
        sineAngle = Math.sin(angle);
        cosAngle = -Math.cos(angle);
        pointX = sineAngle * (3 / 4 * radius);
        pointY = cosAngle * (3 / 4 * radius);

        context.beginPath();
        context.strokeStyle = '#000000';
        context.arc(0, 0, 19, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();

        context.beginPath();
        context.lineWidth = 6;
        context.moveTo(0, 0);
        context.lineTo(pointX, pointY);
        context.stroke();
        context.closePath();
        context.restore();
        context.translate(-centerX, -centerY);
    }


});

/* AJAY END */


peMod.service('helperService', function() {
    this.hello = function() {
        return "Hello World";
    };
    this.toBool = function(val) {
        if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
            return false;
        else if (val == true || val == 'true' || val == 'True')
            return true;
        else
            return 'unidentified';
    };
    this.shuffle = function(array) {
        var currentIndex = array.length,
            temp, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
    this.extend = function(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i])
                continue;

            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key))
                    out[key] = arguments[i][key];
            }
        }
        return out;
    };
});

peMod.controller('takeQuizCtrl', function($scope, $http, helperService) {
    $scope.quizName = '/data/csharp-quiz-data.json';

    //Note: Only those configs are functional which is documented at: http://www.codeproject.com/Articles/860024/Quiz-Application-in-AngularJs
    // Others are work in progress.
    $scope.defaultConfig = {
        'allowBack': true,
        'allowReview': true,
        'autoMove': false, // if true, it will move to next question automatically when answered.
        'duration': 0, // indicates the time in which quiz needs to be completed. post that, quiz will be automatically submitted. 0 means unlimited.
        'pageSize': 1,
        'requiredAll': false, // indicates if you must answer all the questions before submitting.
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': false,
        'showPager': true,
        'theme': 'none'
    }

    $scope.goTo = function(index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function(question, option) {
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function(element, index, array) {
                if (element.Id != option.Id) {
                    element.Selected = false;
                    //question.Answered = element.Id;
                }
            });
        }

        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
            $scope.currentPage++;
    }

    $scope.onSubmit = function() {
        var answers = [];
        $scope.questions.forEach(function(q, index) {
            answers.push({ 'QuizId': $scope.quiz.Id, 'QuestionId': q.Id, 'Answered': q.Answered });
        });
        // Post your data to the server here. answers contains the questionId and the users' answer.
        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    alert(data);
        //});
        console.log($scope.questions);
        $scope.mode = 'result';
    }

    $scope.pageCount = function() {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function(file) {
        $http.get(file)
            .then(function(res) {
                $scope.quiz = res.data.quiz;
                $scope.config = helperService.extend({}, $scope.defaultConfig, res.data.config);
                $scope.questions = $scope.config.shuffleQuestions ? helperService.shuffle(res.data.questions) : res.data.questions;
                $scope.totalItems = $scope.questions.length;
                $scope.itemsPerPage = $scope.config.pageSize;
                $scope.currentPage = 1;
                $scope.mode = 'quiz';
                if ($scope.config.shuffleOptions)
                    $scope.shuffleOptions();

                $scope.$watch('currentPage + itemsPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;

                    $scope.filteredQuestions = $scope.questions.slice(begin, end);
                });
            });
    }

    $scope.shuffleOptions = function() {
        $scope.questions.forEach(function(question) {
            question.Options = helperService.shuffle(question.Options);
        });
    }

    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function(index) {
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function(element, index, array) {
            if (element.Selected == true) {
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function(question) {
        var result = 'correct';
        question.Options.forEach(function(option, index, array) {
            if (helperService.toBool(option.Selected) != option.IsAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };
})


peMod.controller("bzAddTemplateCtrl", function($http, $window, $scope) {
    $scope.saveBZTemplateDetails = function() {
        $http.post("/bzTemplate/api/", $scope.bzTemplate)
            .then(function(response) {
                $window.location.href = '/bzTemplate/all';
            })
            .error(function() {
                alert('error occured');
            });
    }
});
peMod.controller("bzListTemplateCtrl", function($http, $window, $scope) {
    $http.get("/bzTemplate/api")
        .then(function(response) {
            $scope.bzTemplates = response.data.items;
            console.log($scope.bzTemplates);
        }, function() {
            alert('failure');
        });
});


/* VAMSHI START */
$(document).ready(function() {
			$("#txtEditor1").Editor();
			$("#txtEditor2").Editor();
		});

peMod.controller('addQtnCtrl',['$http','$scope',function($http,$scope){
		/*
		{
			"title" : string,
			"description" : string/HTML,
			'options{
				"a" : string,
				"b"  : string,
				"c" : string,
				"d" : string,
				}',
			"answer" : {'a' | 'b' |'c' | 'd'},
			"explanation" : string/HTML,
			"diffLevel" : {'easy' | 'medium' | 'hard'}
		}
		*/
	$scope.addQuestionFn = function(){
		var qn=$scope.qn;
		//$http.post(qn)
		alert(qn);
		console.log(qn);
	}
	
}]);

/* VAMSHI END */