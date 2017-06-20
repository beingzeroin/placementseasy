var peMod = angular.module('peasy', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
peMod.config(function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/partials/main.html' })
        .when('/login', { templateUrl: '/partials/login.html' })
        .when('/register', { templateUrl: '/partials/register.html' })
        .when('/company', { templateUrl: '/partials/company.html', controller: 'compayWiseCtrl' })
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
peMod.controller('quizSummaryCtrl', function($scope) {
	draw(120);
    $scope.score=40;
    $scope.Attempted=50;
    $scope.correct=40;
    $scope.inCorrect= 10;
    $scope.NotAttempted= 50;
    $scope.questions= [
  {
    "No": "1",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is : read only"
  },
  {
    "No": "2",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
     
  {
    "No": "3",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
             
  {
    "No": "4",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
  {
    "No": "5",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
  {
    "No": "6",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
  {
    "No": "7",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
  {
    "No": "8",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },           
  {
    "No": "9",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
 {
    "No": "10",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  }, 
      {
    "No": "11",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
  {
    "No": "12",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
         {
    "No": "13",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
         {
    "No": "14",
    "title": "work and energy",
    "description": "this is my first question",
    "options": [
      "read only",
      "skip now",
      "do now",
      "take rest"
    ],
    "Explanation": "Correct Answer is :    skip only"
  },
];
        
   
    function redraw()
    {
        draw(document.getElementById("myList").value);
    }
    function draw(speed)
    {
          var  canvas = document.getElementById("myCanvas");
          var  context = canvas.getContext("2d");
          context.clearRect(0,0,canvas.width, canvas.height);
          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;
          var radius = canvas.height / 2 - 20;

          context.beginPath();
          context.arc(centerX, centerY, radius, Math.PI*0.10, Math.PI*-1.1, true);

          var gradience = context.createRadialGradient(centerX, centerY, radius-radius/2, centerX, centerY, radius-radius/8);
           gradience.addColorStop(0, '#ff9000');
           gradience.addColorStop(1, '#000000');

           context.fillStyle = gradience;
           context.fill();
           context.closePath();
           context.restore();

        context.beginPath();
        context.strokeStyle = '#ffff00';
        context.translate(centerX,centerY);
        var increment = 5;
        context.font="15px Helvetica";
        for (var i=-18; i<=18; i++)
        {
            angle = Math.PI/30*i;
            sineAngle = Math.sin(angle);
            cosAngle = -Math.cos(angle);

            if (i % 5 == 0) {
            context.lineWidth = 8;
            iPointX = sineAngle *(radius -radius/4);
            iPointY = cosAngle *(radius -radius/4);
            oPointX = sineAngle *(radius -radius/7);
            oPointY = cosAngle *(radius -radius/7);

            wPointX = sineAngle *(radius -radius/2.5);
            wPointY = cosAngle *(radius -radius/2.5);
            context.fillText((i+18)*increment,wPointX-2,wPointY+4);
            }
            else
            {
            context.lineWidth = 2; 			
            iPointX = sineAngle *(radius -radius/5.5);
            iPointY = cosAngle *(radius -radius/5.5);
            oPointX = sineAngle *(radius -radius/7);
            oPointY = cosAngle *(radius -radius/7);
            }
            context.beginPath();
            context.moveTo(iPointX,iPointY);
            context.lineTo(oPointX,oPointY);
            context.stroke();
            context.closePath();
        }
        var numOfSegments = speed/increment;
        numOfSegments = numOfSegments -18;
        angle = Math.PI/30*numOfSegments;
        sineAngle = Math.sin(angle);
        cosAngle = -Math.cos(angle);
        pointX = sineAngle *(3/4*radius);
        pointY = cosAngle *(3/4*radius);

        context.beginPath();
        context.strokeStyle = '#000000';
        context.arc(0, 0, 19, 0, 2*Math.PI, true);
        context.fill();
            context.closePath();

        context.beginPath();    	
        context.lineWidth=6;
        context.moveTo(0,0);
            context.lineTo(pointX,pointY);
            context.stroke();
            context.closePath();
            context.restore();
            context.translate(-centerX,-centerY);
    }
              
   
});

/* AJAY END */