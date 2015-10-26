var app = angular.module('myapp', []);

app.controller('aController', function ($scope, $filter, todosService, usersService) {
    $scope.todos = [];
    $scope.users = [];
    $scope.q = {
        title: '',
        userId: ''
    };
    var getErrorLabel = '';

    todosService.getTodos()
        .then(function (data) {
            $scope.todos = data;
        }, function (error) {
            getErrorLabel = error;
        });

    usersService.getUsers()
        .then(function (data) {
            $scope.users = data;
        }, function (error) {
            getErrorLabel = error;
        });

    $scope.$watch('vm.username', function () {
        if ($scope.vm && $scope.vm.username) {
            var found = $filter('getByUserName')($scope.users, $scope.vm.username);
            console.log(found);
            $scope.q.userId = found.id;
        } else {
            $scope.q.userId = '';
        }
    });
});

app.filter('getByUserName', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            console.log(input[i].username.indexOf(id));
            if (input[i].username.indexOf(id) === 0) {
                return input[i];
            }
        }
        return null;
    }
});