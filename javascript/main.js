var app = angular.module('newsapp', ['infinite-scroll','firebase']);

app.controller('MyController', function($scope, $firebaseObject)
{
  var max = new Firebase("https://hacker-news.firebaseio.com/v0/maxitem");
  max.on("value", function(snapshot) {
    console.log(snapshot.val());
    /*for (var i = snapshot.val(); i > 11298887; i--) {
      var url = new Firebase("https://hacker-news.firebaseio.com/v0/item/" + i);
      console.log(i);
      url.on("value",function(items) {
        $scope.items = items.val();
      });
    }*/
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});
