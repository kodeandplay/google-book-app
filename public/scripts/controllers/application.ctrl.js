angular.module('App').controller('ApplicationCtrl', ['$http','$location','$scope', function($http,$location, $scope) {

	$scope.$on('login', function(_, user) {
		$scope.currentUser = user;
	});

	$scope.logout = function() {
		delete window.localStorage.token;
		delete $http.defaults.headers.common['X-Auth'];
		$scope.currentUser = null;
		$location.path('/login');
	};


}]);
