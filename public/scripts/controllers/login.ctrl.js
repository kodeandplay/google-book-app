angular.module('App').controller('LoginCtrl', ['$location','$scope','UserService', function($location,$scope,UserService) {

	$scope.login = function(username, password) {

		if(!username || !password) return;

		UserService.login(username, password).success(function(data) {
			$scope.$emit('login', data.user);
			$location.path('/account');
		});

	}

}]);
