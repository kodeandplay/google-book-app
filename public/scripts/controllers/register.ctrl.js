angular.module('App').controller('RegisterCtrl', ['$location','UserService','$scope','$http', 
function($location,UserService,$scope,$http) {

	$scope.register = function(username, password) {
		
		$http.post('/api/user/register', { username: username, password: password })
		.success(function(user) {
			UserService.login(username, password).success(function(data) {
				$scope.$emit('login', data.user);
				$location.path('/account');
			});
		});

	};

}]);
