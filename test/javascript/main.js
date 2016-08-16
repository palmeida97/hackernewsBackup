var app = angular.module('newsapp', ['ngRoute','firebase']);
app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'templates/flat.html',
    controller: 'MyController'
  }).
  when('/list', {
    templateUrl: 'templates/list.html',
    controller: 'MyController'
  }).
  when('/about', {
    templateUrl: 'templates/about.html',
    controller: 'MyController'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
app.service('newsService', function($http, $q)
{
  var deferred = $q.defer();
  var def2 = $q.defer();
  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(function (data)
  {
    var posts = data;
    var l = data.data.length;
    var posts = [];
    for( var i= 0; i<data.data.length; i++)
    {
      $http.get(' https://hacker-news.firebaseio.com/v0/item/'+data.data[i]+'.json').then(function (post)
      {

        posts.push(post.data);
      });
    }
    if(i===data.data.length)
    {
      def2.resolve(posts);
    }
  });

  this.getposts = function ()
  {
    return deferred.promise;
  }
  this.getpost = function ()
  {
    return def2.promise;
  }
})

.controller('MyController', function($scope, newsService)
{
  $scope.busy = true;
  $scope.allData = [];
  var page = 0;
  var step = 4;
  var promise = newsService.getposts();
  promise.then(function (data)
  {
    $scope.posts = data ;
  })
  var pro2 = newsService.getpost();
  pro2.then(function(data)
  {
    $scope.post = data;
  })
  function incrementScopeLimit(){
    $scope.$apply(function(){
      $scope.limit = $scope.limit + 20;
    });
  }
  var limitStep = 20;
  var notLoading = true;
  var scrollDiference = 200;
  $scope.limit = limitStep;
  $(document).on("scroll", function(){
    if ($(window).scrollTop() >= $(document).height() - ($(window).height() + 100) && notLoading) {
      incrementScopeLimit();
      notLoading = false;
      setTimeout(function(){
        notLoading = true;
      }, 1000);
    }
  });
})
