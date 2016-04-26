/**
 * Created by james on 25/04/16.
 */
var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function(){
    //noinspection UnnecessaryLocalVariableJS
    var o = {
        posts: []
    };
    return o;
}]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })

           .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }]);


app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){

        $scope.posts = posts.posts;

        $scope.posts = [
            {title: 'post 1', upvotes: 5},
            {title: 'post 2', upvotes: 2},
            {title: 'post 3', upvotes: 15},
            {title: 'post 4', upvotes: 9},
            {title: 'post 5', upvotes: 4}
        ];

        $scope.addPost = function(){
            if(!$scope.title || $scope.title === '') { return; }

            $scope.posts.push({
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                    {author: 'Joe', body: 'Cool post!', upvotes: 0},
                    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                ]
            });

            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post) {
            post.upvotes += 1;
        };

    }]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
    // Note this section does not work as $scope and posts are lost on arriving here.  $stateParams is OK.
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function () {
        if ($scope.body === '') {
            return;
        }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };
}]);