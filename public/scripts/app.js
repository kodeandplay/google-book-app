angular.module('App', ['ngRoute','ngResource'])
.config(function($routeProvider) {
	
	$routeProvider
	.when('/login', {
		controller: 'LoginCtrl',
		templateUrl: 'templates/login.html'
	})
	.when('/register', {
		controller: 'RegisterCtrl',
		templateUrl: 'templates/register.html'
	})
	.when('/account', {
		controller: 'AccountCtrl',
		templateUrl: 'templates/account.html'
	})
	.otherwise({ redirectTo: '/login' });

})
.service('UserService', function($http) {

	var svc = this;

	svc.login = function(username, password) {
		
		return $http.post('/api/user/login', { username: username, password: password })
		.success(function( oData ) {
			window.localStorage.token = oData.token;
			$http.defaults.headers.common['X-Auth'] = oData.token;
		});

	};

});
