angular.module('App').controller('LoginCtrl', ['$location','$scope','UserService', function($location,$scope,UserService) {

	$scope.login = function(username, password) {

		if(!username || !password) return;

		UserService.login(username, password).success(function(data) {
			if(!data.bSuccess) return;

			$scope.$emit('login', data.user);
			$location.path('/account');
		});

	}

}]);
