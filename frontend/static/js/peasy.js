var peMod = angular.module('peasy', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngTagsInput', 'textAngular', 'ngMaterial', 'ngAria', 'ngMessages', 'ngStorage', 'md.time.picker']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main.html'
        })

    .when('/login', {
            templateUrl: '/partials/login.html',
            controller: 'peasyCtrl'
        }) 
        .when('/movies', {
            templateUrl: '/partials/movies.html',
            controller: 'moviesCtrl'
        })
        .when('/movies/:id/view', {
            templateUrl: '/partials/movies-view.html',
            controller: 'moviesViewController'
        })
        .when('/movies/:id/edit', {
            templateUrl: '/partials/movies-edit.html',
            controller: 'moviesEditController'
        })
        .when('/movies/create', {
            templateUrl: '/partials/movies-add.html',
            controller: 'moviesCreateController'
        })
        .when('/register', {
            templateUrl: '/partials/register.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })
        .when('/afterlogin', {
            templateUrl: '/partials/after login.html',
            controller: 'afloginCtrl'
        })
        .when('/quiz/:id/attempt', {
            templateUrl: '/partials/takeQuiz.html',
            controller: 'attemptQuizCtrl'
        })
        .when('/takeQuiz', {
            templateUrl: '/partials/takeQuiz.html',
            controller: 'takeQuizCtrl'
        })

    .when('/takeQuizwithtimer', {
        templateUrl: '/partials/timer.html',
        controller: 'takeQuiztimerCtrl'
    })

    .when('/company', {
        templateUrl: '/partials/company.html',
        controller: 'compayWiseCtrl'
    })

    .when('/bzTemplateAdd', {
        templateUrl: '/partials/bzTemplateAdd.html',
        controller: 'bzAddTemplateCtrl'
    })

    .when('/bzTemplateList', {
        templateUrl: '/partials/bzTemplateList.html',
        controller: 'bzListTemplateCtrl'
    })

    .when('/quizSummary', {
        templateUrl: '/partials/quizSummary.html',
        controller: 'quizSummaryCtrl'
    })

    .when('/topicwise', {
        templateUrl: '/partials/topicwise.html'
    })

    .when('/authortest', {
        templateUrl: '/partials/authorTest.html',
        controller: 'authorTestCtrl'
    })

    .when('/dashboard', {
        templateUrl: '/partials/dashboard.html',
        controller: 'dashboardCtrl'
    })

    .when('/ieAdd', {
            templateUrl: '/partials/ieAdd.html',
            controller: 'ieAddCtrl'
        })
    .when('/ieEdit/:id', {
            templateUrl: '/partials/ieEdit.html',
            controller: 'ieEditCtrl'
        })
    .when('/ieView', {
            templateUrl: '/partials/ieView.html',
            controller: 'ieViewCtrl'
        })
    .when('/ieViewFull/:id', {
            templateUrl: '/partials/ieViewFull.html',
            controller: 'ieViewFullCtrl'
        })
    .when('/ieList', {
                templateUrl: '/partials/ieList.html',
                controller: 'ieListCtrl'
        })
    .when('/demo/:id', {
            templateUrl: '/partials/demoQuiz.html',
        })

    .when('/questionAdd', {
        templateUrl: '/partials/questionAdd.html',
        controller: 'addQtnCtrl'
    })


    .when('/questionEditDelete', {
        templateUrl: '/partials/questionEditDelete.html',
        controller: 'editDeleteQtnCtrl'
    })

    .when('/questionEditDeletePreFilled/:id', {
        templateUrl: '/partials/questionEditDeletePreFilled.html',
        controller: 'preFilledEditDeleteQtnCtrl'
    })

    .when('/questionsList', {
        templateUrl: '/partials/questionsList.html',
        controller: 'editDeleteQtnCtrl'
    })

    .when('/comdesc', {
        templateUrl: '/partials/comdesc.html',
        controller: 'companydescCtrl'
    })

    .when('/viewcomp', {
            controller: 'viewcompCtrl'
        })
        .when('/addhistory', {
            templateUrl: '/partials/addhistory.html',
            controller: 'addhistoryCtrl'
        })
        .when('/viewhistory', {
            templateUrl: '/partials/viewhistory.html',
            controller: 'viewhistoryCtrl'
        })
        .when('/viewallhistory', {
            templateUrl: '/partials/viewallhistory.html',
            controller: 'viewhistoryCtrl'
        })
        .when('/viewContest', {
            templateUrl: '/partials/viewContest.html',
            controller: 'viewContestCtrl'
        })
        .when('/contestEditPreFilled/:id', {
            templateUrl: '/partials/contestEditPreFilled.html',
            controller: 'editContestCtrl'
        })
        .when('/leaderboard', {
            templateUrl: '/partials/leaderboard.html',
            controller: 'leaderCtrl'
        })

    .when('/notfound', {
        templateUrl: '/partials/404.html'
    })

    .otherwise({
        redirectTo: '/notfound'
    })

});

peMod.controller('peasyCtrl', ['$scope', 'AuthenticationService', '$location', '$localStorage', function($scope, AuthenticationService, $location, $localStorage) {
    $scope.login = {};
    $scope.logoutFn = function() {
        AuthenticationService.logout(function() {
            $location.path('/login');
        });
    }
    $scope.loginFn = function() {
        $scope.login.loading = true;
        AuthenticationService.login($scope.login.username, $scope.login.password, function(result) {
            if (result === true) {
                $scope.user = $localStorage.currentUser.username;
                $location.path('/dashboard');
            } else {
                $scope.login.error = 'Username or password is incorrect';
                $scope.login.loading = false;
            }
        });
    }
}]);



peMod.controller('afloginCtrl', function() {

});

peMod.controller('compayWiseCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('/data/company-wise-test-data.json')
        .then(function(response) {
            $scope.info = response.data;
        }, function(error) {
            $scope.error = error;
        });
}]);

peMod.controller('leaderCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('/leaderboard/api')
        .then(function(response) {
            $scope.details = response.data;
        }, function(err) {
            $scope.error = err
        })

}])

peMod.controller('regCtrl', function($http, $location, $timeout) {
    var app = this;
    this.regUser = function(regData) {
        app.loading = true;
        app.errorMsg = false;
        // console.log(this.regData);
        $http({
            url: '/register/api',
            method: "POST",
            data: this.regData
        }).then(function(data) {
            console.log(data.data.success);
            console.log(data.data.message);

            if (data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + '....Redirecting';
                $timeout(function() {
                    $location.path('/');
                }, 2000);
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        })
    }
});
peMod.controller('mainCtrl', function($http, $location, $timeout, $scope, AuthenticationService) {

});

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


peMod.controller('viewcompCtrl', function($scope, $http) {

    $http({
            url: '/company/api',
            method: "GET",


        })
        .then(function(response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.data = response.data.items;
            },
            function(error) {
                console.log("FAILURE");
            });


});
peMod.controller('addhistoryCtrl', ['$http', '$scope', function($http, $scope) {

    $scope.addhistoryFn = function() {
        var h = $scope.h;

        $http({
                url: '/historyofTests/api',
                method: "POST",
                data: h
            })
            .then(function(response) {
                    console.log("SUCCESS IN POST" + JSON.stringify(h));
                    document.getElementById('qnAddSuccess').style.display = "block";
                    window.scrollTo(0, 0);

                },
                function(error) {
                    console.log("FAILURE IN POST" + JSON.stringify(h));
                    document.getElementById('qnAddFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }

}]);

peMod.controller('viewhistoryCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.list = [];
    $scope.enter = function(questionId) {
        $scope.name = questionId;
        if (questionId != null) {
            $http({
                    url: '/historyofTests/api/' + questionId,
                    method: "GET",
                })
                .then(function(response) {
                        var h = response.data;
                        console.log("SUCCESS IN GET" + JSON.stringify(h));
                        $scope.h = h;

                        if (angular.isDefined($scope.name) && $scope.name != '') {

                            if (h._id) {

                                // ADD A NEW ELEMENT.
                                $scope.list.push({
                                    userid: $scope.h.userid,
                                    quizid: $scope.h.quizid,
                                    score: $scope.h.score
                                });

                            } else {

                                document.getElementById('qnAddFailed').style.display = "block";
                            }
                        }
                    },
                    function(error) {
                        console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(h));
                    });

        }
    }
    $scope.showTotalHistoryFn = function() {
        $http({
                url: '/historyofTests/api',
                method: "GET",
            })
            .then(function(response) {
                    var allHistory = response.data.items;
                    console.log("SUCCESS IN GETTING ALL" + JSON.stringify(allHistory));
                    $scope.allHistory = allHistory;
                },
                function(error) {
                    console.log("FAILURE IN GETTING ALL" + JSON.stringify(allQuestions));
                });
    }
    $scope.showTotalHistoryFn();

}]);
/* SATYA END*/

peMod.controller('dashboardCtrl', function($scope, $location, $http, $localStorage, myService)
{
    
   $scope.quiz_details = {};
    if ($localStorage.currentUser)
        $scope.user = $localStorage.currentUser.username;

    $http({
            url: '/authorTest/api',
            method: "GET",


        })
        .then(function(response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.data = response.data.items;
            },
            function(error) {
                console.log("FAILURE");
            });
    $scope.fun = function(id)
    {
        //console.log("\n\nid:\n\n"+id);
        myService.set(id);
        $location.path('/takeQuiz');

    }   
  
});

/* AJAY START */
peMod.controller('quizSummaryCtrl', function($scope, $http) {



    $http({
            url: '/quizSum/api',
            method: "GET",


        })
        .then(function(response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.sc = response.data.items;
            },
            function(error) {
                console.log("FAILURE");
            });

    $scope.showDetails = function(quesNo) {
        $scope.selectedQuestion = quesNo;
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

peMod.controller('attemptQuizCtrl', function($scope, $http) {

});

peMod.controller('takeQuizCtrl', function($scope, $http, helperService,myService) {
    $scope.quizName = '/data/csharp-quiz-data.json';
    var id = myService.get();
    console.log("\n\nid in takeQuizCtrl id:"+id);
     $scope.lleader={}
       // console.log("hello from init")
        $http(
                {
                    url:'/submitQuiz/abc/'+id,
                    method:'GET'


                }).then(function(response){

                    
                    $scope.lleader = response.data
                    console.log(JSON.stringify($scope.lleader))
                })
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
                    question.Answered = element.Id;
                }  
            });
        }

        if ($scope.config.autoMove == true && $scope.currentPage < $scope.totalItems)
            $scope.currentPage++;
    } 

  
    


     $scope.onSubmit = function() {

        var myobj = {};
        var answers = [];  
       

        $scope.questions.forEach(function(q, index) {
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
            .then(function(response) {
                    console.log("SUCCESS" + JSON.stringify(myobj));
                },
                function(error) {
                    console.log("FAILURE" + JSON.stringify(myobj));
                });



    }

    // Post your data to the server here. answers contains the questionId and the users' answer.
    //$http.post('api/Quiz/Submit', answers).success(function (data, status) {
    //    alert(data);
    //});




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



peMod.controller('takeQuiztimerCtrl', function($scope, $http, helperService) {
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

/* SAHITHI / VAMSHI START */

peMod.controller("ieAddCtrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
    $scope.ie = {
        company: '',
        date: '',
        college: '',
        gotSelected: '',
        overallExperience: '',
        topicsFocusedOn: [],
        generalDescription: '',
        questionsArray: [{
            ieQuestion: '',
            ieQnTags: [],
            ieQnDesc: ''
        }]
    };

    var ieQnNo = 0;
    $scope.add_ieQnFields = function() {
        ieQnNo++;
        var objTo = document.getElementById('question_fields')
        var newQnDiv = document.createElement("div");
        newQnDiv.innerHTML = '<div id="question_field' + ieQnNo + '"><br><br><div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Question ' + (ieQnNo + 1) + ': </label> </div> <div class="col-md-10"> <input type="text" class="form-control" placeholder="Question" ng-model="ie.questionsArray[' + ieQnNo + '].ieQuestion"> </div> </div> <div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Tag topics for this question:</label> </div> <div class="col-md-10"> <div class="input-group"> <span class="input-group-addon tagsBackground"><tags-input class="tagsFullWidth" placeholder="Eg: Linked Lists, Graphs, General Knowledge, etc" ng-model="ie.questionsArray[' + ieQnNo + '].ieQnTags" use-strings="true"></tags-input> </span> </div> </div> </div> <div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Description/Approach:</label> </div> <div class="col-md-10"> <text-angular ng-model="ie.questionsArray[' + ieQnNo + '].ieQnDesc" placeholder="Write answer here. Use links and format text if necessary." ></text-angular> </div> </div></div>';
        objTo.appendChild(newQnDiv);
        $compile(document.getElementById('question_field' + ieQnNo))($scope);
    }

    $scope.addInterviewExpFn = function() {
        var ie = $scope.ie;
        $http({
                url: '/ie/api',
                method: "POST",
                data: ie
            })
            .then(function(response) {
                    console.log("SUCCESS" + JSON.stringify(ie));
                    document.getElementById('ieQnAddSuccess').style.display = "block";
                    $scope.ie = undefined;
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE" + JSON.stringify(ie));
                    document.getElementById('ieQnAddSuccess').style.display = "none";
                    document.getElementById('ieQnAddFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
        alert("submitted successfully");
    }

}]);

peMod.controller("ieViewCtrl", ['$http', '$scope', function($http, $scope) {

    $http({
            url: '/ie/api',
            method: "GET",

        })
        .then(function(response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                data = response.data.items;
                for (i = 0; i < data.length; i++) {
                    if (data[i].gotSelected != undefined) {
                        if (data[i].gotSelected == true) { data[i].hiredOrNot = "HIRED"; } else data[i].hiredOrNot = "NOT HIRED";
                    }
                    if (data[i].date) {
                        d = new Date(data[i].date);
                        data[i].year = d.getFullYear();
                    }
                }
                $scope.data = data;
            },
            function(error) {
                console.log("FAILURE");
            });



}]);

peMod.controller("ieListCtrl", ['$http', '$scope', function($http, $scope) {

    $scope.ieShowFn = function(ieId) {
        $scope.ieId = ieId;
        if (ieId != null) {
            $http({
                    url: '/ie/api/' + ieId,
                    method: "GET",
                })
                .then(function(response) {
                        var ie = response.data;
                        console.log("SUCCESS IN GET" + JSON.stringify(ie));
                        $scope.ie = ie;
                    },
                    function(error) {
                        console.log("FAILURE IN GET in finding the Interview Experience with id:" + ieId + JSON.stringify(ie));
                    });

        }
    }

    

    $scope.ieShowAllFn = function() {
        $http({
                url: '/ie/api',
                method: "GET",
            })
            .then(function(response) {
                    var allIEs = response.data.items;
                    console.log("SUCCESS IN GETTING ALL" + JSON.stringify(allIEs));
                    $scope.allIEs = allIEs;
                },
                function(error) {
                    console.log("FAILURE IN GETTING ALL" + JSON.stringify(allIEs));
                });

    }
    $scope.ieShowAllFn();

    $scope.ieDeleteFn = function(ieId) {
        $http({
                url: '/ie/api/' + ieId,
                method: "DELETE",
            })
            .then(function(response) {
                    console.log("SUCCESS IN DELETE" + ieId);
                    // var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
                    // for (var i = 0; i < elems.length; i += 1) {
                    //     elems[i].style.display = 'none';
                    // }
                    $scope.ieShowAllFn();
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN DELETE" + ieId);
                    $scope.ieShowAllFn();
                    window.scrollTo(0, 0);
                });
    }

    $scope.ieEnableFn = function(ieId) {
        var data = {
            "deleted": false
        }
        $http({
                url: '/ie/api/' + ieId,
                method: "PUT",
                data: data
            })
            .then(function(response) {
                    console.log("SUCCESS IN PUT DELETE-FALSE");
                    //$scope.ieShowAllFn();
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN STORING THE DELETE PARAM AS FALSE IN ");
                   // $scope.ieShowAllFn();
                    window.scrollTo(0, 0);
                });
    }
}]);

peMod.controller('ieViewFullCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
    
    console.log("Entered IE VIEW FULL CTRL");
    var ieId = $routeParams.id;
    console.log("Able to fetch ID : " + ieId);
    $http({
            url: '/ie/api/' + ieId,
            method: "GET",
        })
        .then(function(response) {
                var ie = response.data;
                console.log("SUCCESS IN GETTING IE TO VIEW FULL" + JSON.stringify(ie));
                $scope.ie = ie;
            },
            function(error) {
                console.log("FAILURE IN GET in finding the IE with id:" + ieId + JSON.stringify(ie));
            });
}]);

peMod.controller('ieEditCtrl', ['$http', '$scope', '$routeParams','$compile', function($http, $scope, $routeParams, $compile) {
    
    console.log("Entered IE EDIT CTRL");
    var ieId = $routeParams.id;
    var ieQns;
    console.log("Able to fetch ID : " + ieId);
    $http({
            url: '/ie/api/' + ieId,
            method: "GET",
        })
        .then(function(response) {
                var ie = response.data;
                console.log("SUCCESS IN GETTING IE TO EDIT" + JSON.stringify(ie));
                $scope.ie = ie;

            },
            function(error) {
                console.log("FAILURE IN GET in finding the IE with id:" + ieId + JSON.stringify(ie));
            });

    var ieQnNo = 0;
    $scope.add_ieQnFields = function() {
        ieQnNo++;
        var objTo = document.getElementById('question_fields')
        var newQnDiv = document.createElement("div");
        newQnDiv.innerHTML = '<div id="question_field' + ieQnNo + '"><br><br><div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Question ' + (ieQnNo + 1) + ': </label> </div> <div class="col-md-10"> <input type="text" class="form-control" placeholder="Question" ng-model="ie.questionsArray[' + ieQnNo + '].ieQuestion"> </div> </div> <div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Tag topics for this question:</label> </div> <div class="col-md-10"> <div class="input-group"> <span class="input-group-addon tagsBackground"><tags-input class="tagsFullWidth" placeholder="Eg: Linked Lists, Graphs, General Knowledge, etc" ng-model="ie.questionsArray[' + ieQnNo + '].ieQnTags" use-strings="true"></tags-input> </span> </div> </div> </div> <div class="row question-property"> <div class="col-md-2"> <label class="question-property-label">Description/Approach:</label> </div> <div class="col-md-10"> <text-angular ng-model="ie.questionsArray[' + ieQnNo + '].ieQnDesc" placeholder="Write answer here. Use links and format text if necessary." ></text-angular> </div> </div></div>';
        objTo.appendChild(newQnDiv);
        $compile(document.getElementById('question_field' + ieQnNo))($scope);
    }

    $scope.ieUpdateFn = function() {
        var ie = $scope.ie;
        $http({
                url: '/ie/api/'+$routeParams.id,
                method: "PUT",
                data: ie
            })
            .then(function(response) {
                    console.log("SUCCESS in PUT" + JSON.stringify(ie));
                    document.getElementById('ieQnAddSuccess').style.display = "block";
                    $scope.ie = undefined;
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE" + JSON.stringify(ie));
                    document.getElementById('ieQnAddSuccess').style.display = "none";
                    document.getElementById('ieQnAddFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }
}]);

/* SAHITHI / VAMSHI END */
/*sahithi start*/

peMod.directive('quiz', function(quizFactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: '/partials/demo.html',
        link: function(scope, elem, attrs) {
            scope.start = function() {
                scope.id = 0;
                scope.quizOver = false;
                scope.inProgress = true;
                scope.getQuestion();
            };

            scope.reset = function() {
                scope.inProgress = false;
                scope.score = 0;
            }

            scope.getQuestion = function() {
                var q = quizFactory.getQuestion(scope.id);
                console.log("getQuestion    : " + q);
                if (q) {
                    scope.question = q.description;
                    scope.options = q.options;
                    scope.answer = q.answer;
                    scope.explanation = q.explanation;
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true;
                }
            };

            scope.checkAnswer = function() {
                if (!$('input[name=answer]:checked').length) return;


                var ans = $('input[name=answer]:checked').val();
                var ca = 0;
                if (scope.answer == "a") {
                    ca = 0;
                } else if (scope.answer == "b") {
                    ca = 1;
                } else if (scope.answer == "c") {
                    ca = 2;
                } else if (scope.answer == "d") {
                    ca = 3;
                }
                if (ans == scope.options[ca])
                //ca=scope.answer
                {
                    scope.score++;
                    scope.correctAns = true;
                } else {
                    scope.correctAns = false;
                }


                scope.answerMode = false;
            };

            scope.nextQuestion = function() {
                scope.id++;
                scope.getQuestion();
            }

            scope.reset();
        }
    }
});



peMod.factory('quizFactory', ['$http', '$routeParams', function($http, $routeParams) {
    var quizId = $routeParams.id;
    var questions = [];

    $http({
            url: '/authorTest/api/' + quizId,
            method: "GET",
        })
        .then(
            function(response) {
                questions = response.data.questions;
                console.log("SUCCESS IN GETTING ALL" + JSON.stringify(questions));
            },
            function(error) {
                console.log("FAILURE IN GETTING ALL" + JSON.stringify(questions));
            }
        );

    return {
        getQuestion: function(id) {
            console.log(id + " " + questions.length)
            if (id < questions.length) {
                return questions[id];
            } else {
                return false;
            }
        }
    };

}]);

/*sahithi end*/



/* SUPRIYA START */

peMod.controller('authorTestCtrl', ['$http', '$scope', function($http, $scope) {
    $scope.time1 = new Date();
    $scope.list = [];
    $scope.listDb = [];


    $scope.authorTest = function() 
    {
     $scope.a.questions = $scope.listDb;
        var a = $scope.a;


        $http({
                url: '/authorTest/api',
                method: "POST",
                data: $scope.a
            })
            .then(function(response) {
                    console.log("SUCCESS" + JSON.stringify(a));
                },
                function(error) {
                    console.log("FAILURE" +error);
                });
    }
    
    $scope.Delete = function(index) {
        $scope.list.splice(index, 1);
        $scope.listDb.splice(index, 1);

    }

    //$scope.list=["Divya","Abc","fgh"];

    $scope.complete = function(ques) 
    {
       //  var out=[];
       /*  angular.forEach($scope.list, function(name)
         {
            out.push(name);
         })
         $scope.final = out;
*/
        $http({
                url: '/question/search/'+ques, 
                method: "GET"
            }).then(function(response) {
               $scope.hidethis = false;
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.final = response.data.items;
            },
            function(error) {
                console.log("FAILURE");
            });
    }
    $scope.fillTextbox = function(string1,string2)
    {
        $scope.name = string1;
        $scope.id=string2;
        $scope.hidethis = true;
    }
    $scope.add = function(name,id) 
    {
        $scope.name = id;
        $http({
                url: '/question/api/' + id,
                method: "GET",
            })
            .then(function(response) {
                    var qn = response.data;
                    console.log("SUCCESS IN GET" + JSON.stringify(qn));
                    $scope.qn = qn;

                    if (angular.isDefined($scope.name) && $scope.name != '') {

                        if (qn._id) {

                            // ADD A NEW ELEMENT.
                            $scope.list.push({
                                name: $scope.name,
                                title: $scope.qn.title
                            });

                            $scope.listDb.push($scope.name);


                            // CLEAR THE FIELDS.
                            $scope.name = '';

                        }
                    }
                },
                function(error) {
                    console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
                });


    }









}]);

/* SUPRIYA END */


peMod.controller('viewContestCtrl', function($scope, $http) {

    $http({
            url: '/authorTest/api',
            method: "GET",


        })
        .then(function(response) {
                console.log("SUCCESS" + JSON.stringify(response.data));
                $scope.data = response.data.items;
            },
            function(error) {
                console.log("FAILURE");
            });


});

peMod.controller('editContestCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

    var contestId = $routeParams.id;
    console.log("Able to fetch ID : " + contestId);
    $http({
            url: '/authorTest/api/' + contestId,
            method: "GET",
        })
        .then(function(response) {
                var a = response.data;
                console.log("SUCCESS IN GETTING TEST TO EDIT" + JSON.stringify(a));
                $scope.a = a;
            },
            function(error) {
                console.log("FAILURE IN GET in finding the contest with id:" + contestId + JSON.stringify(a));
            });

    var elems = document.getElementsByClassName('preFilledEditContest');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'inline';
    }

    $scope.updateContestFn = function(contestId) {

        var a = $scope.a;
        //console.log("Able to fetch ID : " + questionId);

        $http({
                url: '/authorTest/api/' + contestId,
                method: "PUT",
                data: a
            })
            .then(function(response) {
                    console.log("SUCCESS IN PUT" + JSON.stringify(a));
                    // document.getElementById('qnPreFilledUpdateSuccess').style.display = "block";
                    $scope.a = undefined;
                    var elems = document.getElementsByClassName('preFilledEditContest');
                    for (var i = 0; i < elems.length; i += 1) {
                        elems[i].style.display = 'none';
                    }
                    window.scrollTo(0, 0);
                },
                function(error) {

                    console.log("FAILURE IN PUT" + JSON.stringify(qn));
                    //document.getElementById('qnPreFilledUpdateSuccess').style.display = "none";
                    //    document.getElementById('qnPreFilledUpdateFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }
}]);


/* VAMSHI START */


peMod.controller('addQtnCtrl', ['$http', '$scope', function($http, $scope) {

    $scope.addQuestionFn = function() {
        var qn = $scope.qn;

        qn.options = [];
        qn.options.push($scope.optionA);
        qn.options.push($scope.optionB);
        qn.options.push($scope.optionC);
        qn.options.push($scope.optionD);

        $http({
                url: '/question/api',
                method: "POST",
                data: qn
            })
            .then(function(response) {
                    console.log("SUCCESS IN POST" + JSON.stringify(qn));
                    document.getElementById('qnAddSuccess').style.display = "block";
                    $scope.qn = undefined;
                    window.scrollTo(0, 0);

                },
                function(error) {
                    console.log("FAILURE IN POST" + JSON.stringify(qn));
                    document.getElementById('qnAddFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }

}]);

peMod.controller('editDeleteQtnCtrl', ['$http', '$scope', function($http, $scope) {

    $scope.showQuestionFn = function(questionId) {
        $scope.qId = questionId;
        if (questionId != null) {
            $http({
                    url: '/question/api/' + questionId,
                    method: "GET",
                })
                .then(function(response) {
                        var qn = response.data;
                        console.log("SUCCESS IN GET" + JSON.stringify(qn));
                        $scope.qn = qn;
                    },
                    function(error) {
                        console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
                    });


            var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
            for (var i = 0; i < elems.length; i += 1) {
                elems[i].style.display = 'inline';
            }
        }
    }

    $scope.updateQuestionFn = function() {
        var questionId = $scope.qId;
        var qn = $scope.qn;
        $http({
                url: '/question/api/' + questionId,
                method: "PUT",
                data: qn
            })
            .then(function(response) {
                    console.log("SUCCESS IN PUT" + JSON.stringify(qn));
                    document.getElementById('qnEditSuccess').style.display = "block";
                    $scope.qn = undefined;
                    var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
                    for (var i = 0; i < elems.length; i += 1) {
                        elems[i].style.display = 'none';
                    }
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN PUT" + JSON.stringify(qn));
                    document.getElementById('qnEditSuccess').style.display = "none";
                    document.getElementById('qnEditFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }

    $scope.showAllQuestionsFn = function() {
        $http({
                url: '/question/api',
                method: "GET",
            })
            .then(function(response) {
                    var allQuestions = response.data.items;
                    console.log("SUCCESS IN GETTING ALL" + JSON.stringify(allQuestions));
                    $scope.allQuestions = allQuestions;
                },
                function(error) {
                    console.log("FAILURE IN GETTING ALL" + JSON.stringify(allQuestions));
                });

    }
    $scope.showAllQuestionsFn();

    $scope.deleteQuestionFn = function(questionId) {
        $http({
                url: '/question/api/' + questionId,
                method: "DELETE",
            })
            .then(function(response) {
                    console.log("SUCCESS IN DELETE" + questionId);
                    var elems = document.getElementsByClassName('hiddenEditDelQnProperties');
                    for (var i = 0; i < elems.length; i += 1) {
                        elems[i].style.display = 'none';
                    }
                    $scope.showAllQuestionsFn();
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN DELETE" + questionId);
                    $scope.showAllQuestionsFn();
                    window.scrollTo(0, 0);
                });
    }

    $scope.enableQuestionFn = function(questionId) {
        var data = {
            "deleted": false
        }
        $http({
                url: '/question/api/' + questionId,
                method: "PUT",
                data: data
            })
            .then(function(response) {
                    console.log("SUCCESS IN PUT DELETE-FALSE");
                    $scope.showAllQuestionsFn();
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN STORING THE DELETE PARAM AS FALSE IN ");
                    $scope.showAllQuestionsFn();
                    window.scrollTo(0, 0);
                });
    }
}]);


peMod.controller('preFilledEditDeleteQtnCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

    var questionId = $routeParams.id;
    console.log("Able to fetch ID : " + questionId);
    $http({
            url: '/question/api/' + questionId,
            method: "GET",
        })
        .then(function(response) {
                var qn = response.data;
                console.log("SUCCESS IN GETTING QN TO EDIT" + JSON.stringify(qn));
                $scope.qn = qn;
            },
            function(error) {
                console.log("FAILURE IN GET in finding the question with id:" + questionId + JSON.stringify(qn));
            });


    var elems = document.getElementsByClassName('preFilledEditDelQnProperties');
    for (var i = 0; i < elems.length; i += 1) {
        elems[i].style.display = 'inline';
    }

    $scope.updateQuestionFn = function(questionId) {
        var qn = $scope.qn;
        $http({
                url: '/question/api/' + questionId,
                method: "PUT",
                data: qn
            })
            .then(function(response) {
                    console.log("SUCCESS IN PUT" + JSON.stringify(qn));
                    document.getElementById('qnPreFilledUpdateSuccess').style.display = "block";
                    $scope.qn = undefined;
                    var elems = document.getElementsByClassName('preFilledEditDelQnProperties');
                    for (var i = 0; i < elems.length; i += 1) {
                        elems[i].style.display = 'none';
                    }
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN PUT" + JSON.stringify(qn));
                    document.getElementById('qnPreFilledUpdateSuccess').style.display = "none";
                    document.getElementById('qnPreFilledUpdateFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }

    $scope.deleteQuestionFn = function(questionId) {
        $http({
                url: '/question/api/' + questionId,
                method: "DELETE",
            })
            .then(function(response) {
                    console.log("SUCCESS IN DELETE" + questionId);
                    document.getElementById('qnPreFilledUpdateSuccess').style.display = "block";
                    $scope.qn = undefined;
                    var elems = document.getElementsByClassName('preFilledEditDelQnProperties');
                    for (var i = 0; i < elems.length; i += 1) {
                        elems[i].style.display = 'none';
                    }
                    var qnIdInput = document.getElementById('qnIdPreFilledInput');
                    qnIdInput.style.display = "block";
                    window.scrollTo(0, 0);
                },
                function(error) {
                    console.log("FAILURE IN DELETE" + questionId);
                    document.getElementById('qnPreFilledUpdateFailed').style.display = "block";
                    window.scrollTo(0, 0);
                });
    }

}]);
/* VAMSHI END */