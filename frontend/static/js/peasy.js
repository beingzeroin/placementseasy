var peMod = angular.module('peasy', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngTagsInput', 'textAngular']);
peMod.config(function ($routeProvider) {
    $routeProvider
        .when('/', { 
			templateUrl: '/partials/main.html' })
	
        .when('/login', { 
			templateUrl: '/partials/login.html' })
	
        .when('/register', { 
			templateUrl: '/partials/register.html' })
        
       	.when('/takeQuiz', { 
			templateUrl: '/partials/takeQuiz.html', 
			controller: 'takeQuizCtrl' })

      	.when('/takeQuizwithtimer', {
                       templateUrl: '/partials/timer.html', 
       	               controller: 'takeQuiztimerCtrl' })
        
	.when('/company', { 
		templateUrl: '/partials/company.html', 
		controller: 'compayWiseCtrl' })
	
	.when('/bzTemplateAdd', { 
		templateUrl: '/partials/bzTemplateAdd.html', 
		controller: 'bzAddTemplateCtrl' })

	.when('/bzTemplateList', { 
		templateUrl: '/partials/bzTemplateList.html', 
		controller: 'bzListTemplateCtrl' })

	.when('/quizSummary', { 
		templateUrl: '/partials/quizSummary.html', 
		controller: 'quizSummaryCtrl' })

	.when('/topicwise', { 
		templateUrl: '/partials/topicwise.html' })

	.when('/authortest', { 
		templateUrl: '/partials/authorTest.html',
		controller:'authorTestCtrl' })

	.when('/dashboard', { 
		templateUrl: '/partials/dashboard.html',
		controller: 'dashboardCtrl' })

	.when('/addInterviewExperience', { 
		templateUrl: '/partials/addInterviewExperience.html', 
		controller: 'addInterviewExpCtrl' })

	.when('/viewInterviewExperience', { 
		templateUrl: '/partials/viewInterviewExperience.html', 
		controller: 'viewInterviewExpCtrl' })

	.when('/questionAdd', { 
		templateUrl: '/partials/questionAdd.html', 
		controller: 'addQtnCtrl' })

	.when('/questionEditDelete', { 
		templateUrl: '/partials/questionEditDelete.html', 
		controller: 'editDeleteQtnCtrl' })

	.when('/questionEditDeletePreFilled', { 
		templateUrl: '/partials/questionEditDeletePreFilled.html', 
		controller: 'preFilledEditDeleteQtnCtrl' })
		
	.when('/questionsList', { 
		templateUrl: '/partials/questionsList.html', 
		controller: 'editDeleteQtnCtrl' })

	.when('/comdesc', { 
		templateUrl: '/partials/comdesc.html', 
		controller: 'companydescCtrl' })

	.when('/viewcomp', { 
		templateUrl: '/partials/viewcomp.html', 
		controller: 'viewcompCtrl' })

	.when('/notfound', { 
		templateUrl: '/partials/404.html' })

	.otherwise({ 
		redirectTo: '/notfound' })

        
});

peMod.controller('peasyCtrl', ['$scope', function ($scope) {
    $scope.message = 'Test Message';
}]);

peMod.controller('compayWiseCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/data/company-wise-test-data.json')
        .then(function (response) {
            $scope.info = response.data;
        }, function (error) {
            $scope.error = error;
        });
}]);

/* SATYA START*/

peMod.controller('companydescCtrl', ['$http', '$scope', function($http, $scope) {
	$scope.addCompanydescFn = function() {
		var c = $scope.c;


		$http({
			url: '/company/api',
			method: "POST",
			data: c
		    })
		    .then(function(response) {
			    console.log("SUCCESS" + JSON.stringify(c));
			},
			function(error) {
			    console.log("FAILURE" + JSON.stringify(c));
		});
	}	
    
}]);


peMod.controller('viewcompCtrl', function ($scope, $http) {

 $http({
            url: '/company/api',
            method: "GET",


        })
        .then(function (response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.data = response.data.items;
            },
            function (error) {
                console.log("FAILURE");
            });


});
/* SATYA END*/




/* AJAY START */
peMod.controller('quizSummaryCtrl', function ($scope, $http) {
 


    $http({
            url: '/quizSum/api',
            method: "GET",


        })
        .then(function (response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.sc = response.data.items;
            },
            function (error) {
                console.log("FAILURE");
            });
    
    $scope.showDetails = function (quesNo) {
        $scope.selectedQuestion = quesNo;
    }


});

/* AJAY END */


peMod.service('helperService', function () {
    this.hello = function () {
        return "Hello World";
    };
    this.toBool = function (val) {
        if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False')
            return false;
        else if (val == true || val == 'true' || val == 'True')
            return true;
        else
            return 'unidentified';
    };
    this.shuffle = function (array) {
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
    this.extend = function (out) {
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

peMod.controller('takeQuizCtrl', function ($scope, $http, helperService) {
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

    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function (question, option) {
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function (element, index, array) {
                if (element.Id != option.Id) {
                    element.Selected = false;
                    question.Answered = element.Id;
                }
            });
        }

        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
            $scope.currentPage++;
    }

    $scope.onSubmit = function () {
        
         var myobj ={};
         var answers=[];
        
        $scope.questions.forEach(function (q, index) {
            answers.push({
                'QuizId': $scope.quiz.Id,
                'QuestionId': q.Id,
                'Answered': q.Answered
            });
        });
        
        myobj.answers = answers;
        
        alert("submitted successfully");
        console.log($scope.questions);
        $scope.mode = 'result';
        console.log("SUCCESS" + JSON.stringify(myobj));
            
        $http({
                url: 'submitQuiz/api',
                method: "POST",
                data: myobj
            })
            .then(function (response) {
                    console.log("SUCCESS" + JSON.stringify(myobj));
                },
                function (error) {
                    console.log("FAILURE" + JSON.stringify(myobj));
                });
   
        
        
         }
    
        // Post your data to the server here. answers contains the questionId and the users' answer.
        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    alert(data);
        //});
    
        
    

    $scope.pageCount = function () {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function (file) {
        $http.get(file)
            .then(function (res) {
                $scope.quiz = res.data.quiz;
                $scope.config = helperService.extend({}, $scope.defaultConfig, res.data.config);
                $scope.questions = $scope.config.shuffleQuestions ? helperService.shuffle(res.data.questions) : res.data.questions;
                $scope.totalItems = $scope.questions.length;
                $scope.itemsPerPage = $scope.config.pageSize;
                $scope.currentPage = 1;
                $scope.mode = 'quiz';
                if ($scope.config.shuffleOptions)
                    $scope.shuffleOptions();

                $scope.$watch('currentPage + itemsPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;

                    $scope.filteredQuestions = $scope.questions.slice(begin, end);
                });
            });
    }

    $scope.shuffleOptions = function () {
        $scope.questions.forEach(function (question) {
            question.Options = helperService.shuffle(question.Options);
        });
    }

    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function (index) {
        
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function (element, index, array) {
            if (element.Selected == true) {
                answered = 'Answered';
                
                return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function (question) {
        var result = 'correct';
        question.Options.forEach(function (option, index, array) {
            if (helperService.toBool(option.Selected) != option.IsAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };
})



peMod.controller('takeQuiztimerCtrl', function ($scope, $http, helperService) {
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

    $scope.goTo = function (index) {
        if (index > 0 && index <= $scope.totalItems) {
            $scope.currentPage = index;
            $scope.mode = 'quiz';
        }
    }

    $scope.onSelect = function (question, option) {
        if (question.QuestionTypeId == 1) {
            question.Options.forEach(function (element, index, array) {
                if (element.Id != option.Id) {
                    element.Selected = false;
                    //question.Answered = element.Id;
                }
            });
        }

        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
            $scope.currentPage++;
    }

    $scope.onSubmit = function () {
        var answers = [];
        $scope.questions.forEach(function (q, index) {
            answers.push({
                'QuizId': $scope.quiz.Id,
                'QuestionId': q.Id,
                'Answered': q.Answered
            });
        });
        // Post your data to the server here. answers contains the questionId and the users' answer.
        //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
        //    alert(data);
        //});
        console.log($scope.questions);
        $scope.mode = 'result';
    }

    $scope.pageCount = function () {
        return Math.ceil($scope.questions.length / $scope.itemsPerPage);
    };

    //If you wish, you may create a separate factory or service to call loadQuiz. To keep things simple, i have kept it within controller.
    $scope.loadQuiz = function (file) {
        $http.get(file)
            .then(function (res) {
                $scope.quiz = res.data.quiz;
                $scope.config = helperService.extend({}, $scope.defaultConfig, res.data.config);
                $scope.questions = $scope.config.shuffleQuestions ? helperService.shuffle(res.data.questions) : res.data.questions;
                $scope.totalItems = $scope.questions.length;
                $scope.itemsPerPage = $scope.config.pageSize;
                $scope.currentPage = 1;
                $scope.mode = 'quiz';
                if ($scope.config.shuffleOptions)
                    $scope.shuffleOptions();

                $scope.$watch('currentPage + itemsPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;

                    $scope.filteredQuestions = $scope.questions.slice(begin, end);
                });
            });
    }

    $scope.shuffleOptions = function () {
        $scope.questions.forEach(function (question) {
            question.Options = helperService.shuffle(question.Options);
        });
    }

    $scope.loadQuiz($scope.quizName);

    $scope.isAnswered = function (index) {
        var answered = 'Not Answered';
        $scope.questions[index].Options.forEach(function (element, index, array) {
            if (element.Selected == true) {
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };

    $scope.isCorrect = function (question) {
        var result = 'correct';
        question.Options.forEach(function (option, index, array) {
            if (helperService.toBool(option.Selected) != option.IsAnswer) {
                result = 'wrong';
                return false;
            }
        });
        return result;
    };
})


peMod.controller("bzAddTemplateCtrl", function ($http, $window, $scope) {
    $scope.saveBZTemplateDetails = function () {
        $http.post("/bzTemplate/api/", $scope.bzTemplate)
            .then(function (response) {
                $window.location.href = '/bzTemplate/all';
            })
            .error(function () {
                alert('error occured');
            });
    }
});
peMod.controller("bzListTemplateCtrl", function ($http, $window, $scope) {
    $http.get("/bzTemplate/api")
        .then(function (response) {
            $scope.bzTemplates = response.data.items;
            console.log($scope.bzTemplates);
        }, function () {
            alert('failure');
        });
});

/* SAHITHI START */

peMod.controller("addInterviewExpCtrl", ['$http', '$scope', function ($http, $scope) {


    $scope.addInterviewExpFn = function () {
        
        var ie = $scope.ie;
    
        $http({
                url: '/interview/api',
                method: "POST",
                data: ie
            })
            .then(function (response) {
                    console.log("SUCCESS" + JSON.stringify(ie));
                },
                function (error) {
                    console.log("FAILURE" + JSON.stringify(ie));
                });
        alert("submitted successfully");
    }

}]);

peMod.controller("viewInterviewExpCtrl", ['$http', '$scope', function ($http, $scope) {

    
     $http({
            url: '/Interview/api',
            method: "GET",


        })
        .then(function (response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.data = response.data.items;
            },
            function (error) {
                console.log("FAILURE");
            });
    


}]);



/* SAHITHI END */



peMod.controller('authorTestCtrl', ['$http', '$scope', function($http, $scope) {


		$scope.authorTest = function() {
        var a = $scope.a;
        $http({
                url: '/authorTest/api',
                method: "POST",
                data: a
            })
            .then(function(response) {
                    console.log("SUCCESS" + JSON.stringify(a));
                },
                function(error) {
                    console.log("FAILURE" + JSON.stringify(a));
                });
    }
        
        $scope.add = function (questionId) {
        $scope.name=questionId;
        $http({
                url: '/question/api/'+questionId,
                method: "GET",
            })
            .then(function (response) {
					var qn=response.data;
                    console.log("SUCCESS IN GET" + JSON.stringify(qn));
					$scope.qn=qn;
             
                if (angular.isDefined($scope.name) && $scope.name != ''  ) 
                {
                    // ADD A NEW ELEMENT.
                    $scope.list.push({ name: $scope.name , title:$scope.qn.title});

                    // CLEAR THE FIELDS.
                    $scope.name = '';
                
                }
            
    
    $scope.Delete = function (index) {
            
            $scope.list.splice(index,1);
        }
        
                },
                function (error) {
                    console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
                });
        }
		
		/*var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
		for (var i=0;i<elems.length;i+=1){
			elems[i].style.display = 'inline';
		}*/
				
    
               
     }]
    );




peMod.controller('addQtnCtrl', ['$http', '$scope', function ($http, $scope) {

    $scope.addQuestionFn = function () {
        var qn = $scope.qn;
        $http({
                url: '/question/api',
                method: "POST",
                data: qn
            })
            .then(function (response) {
                    console.log("SUCCESS IN POST" + JSON.stringify(qn));
                },
                function (error) {
                    console.log("FAILURE IN POST" + JSON.stringify(qn));
                });
    }

}]);


//TO EDIT

peMod.controller('editDeleteQtnCtrl', ['$http', '$scope', function($http, $scope) {
	
    $scope.showQuestionFn = function (questionId) {
        $scope.qId=questionId;
        $http({
                url: '/question/api/'+questionId,
                method: "GET",
            })
            .then(function (response) {
					var qn=response.data;
                    console.log("SUCCESS IN GET" + JSON.stringify(qn));
					$scope.qn=qn;
                },
                function (error) {
                    console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
                });
		
		var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
		for (var i=0;i<elems.length;i+=1){
			elems[i].style.display = 'inline';
		}
				
    }	

    $scope.updateQuestionFn = function () {
        var questionId=$scope.qId;
		var qn = $scope.qn;
        $http({
                url: '/question/api/'+questionId,
                method: "PUT",
				data:qn
            })
           .then(function (response) {
                    console.log("SUCCESS IN PUT" + JSON.stringify(qn));
                },
                function (error) {
                    console.log("FAILURE IN PUT" + JSON.stringify(qn));
                });
    }

    $scope.deleteQuestionFn = function (questionId) {
        //var questionId=$scope.qId;
		//var qn = $scope.qn;
        $http({
                url: '/question/api/'+questionId,
                method: "DELETE",
            })
            .then(function (response) {
                    console.log("SUCCESS IN DELETE" + questionId);
                },
                function (error) {
                    console.log("FAILURE IN DELETE" + questionId);
                });
    }

	
    $scope.showAllQuestionsFn = function () {
        $http({
                url: '/question/api',
                method: "GET",
            })
            .then(function (response) {
					var allQuestions=response.data.items;
                    console.log("SUCCESS IN GETTING ALL" + JSON.stringify(allQuestions));
					$scope.allQuestions=allQuestions;
                },
                function (error) {
                    console.log("FAILURE IN GETTING ALL" + JSON.stringify(allQuestions));
                });
                    
		}
		$scope.showAllQuestionsFn();
    

    $scope.editQuestionFn = function (qn) {
        $scope.qn=qn;
        var url = "#!/questionEditDeletePreFilled";
        window.location.href=url;
    }

}]);


peMod.controller('preFilledEditDeleteQtnCtrl', ['$http', '$scope', function($http, $scope) {

    $scope.showQuestionPreFilledFn = function ($scope) {
        qn=$scope.qn;
        // $http({
        //         url: '/question/api/'+questionId,
        //         method: "GET",
        //     })
        //     .then(function (response) {
		// 			var qn=response.data;
        //             console.log("SUCCESS IN GET IN PREFILLED PAGE " + JSON.stringify(qn));
		// 			$scope.qn=qn;
        //         },
        //         function (error) {
        //             console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
        //         });
		
		var elems = document.getElementsByClassName('preFilledEditDelQnProperties');
		for (var i=0;i<elems.length;i+=1){
			elems[i].style.display = 'inline';
		}
				
    }
    $scope.showQuestionPreFilledFn($scope.qn_id);
}]);
/* VAMSHI END */
