angular.module('App').controller('AccountCtrl', ['$location','$resource','$scope','$http',function($location,$resource,$scope,$http) {

	if(!$scope.currentUser) {
		if(!window.localStorage.token) { $location.path('/login'); }	
		else {
			$http.post('/api/user/valid', { token: window.localStorage.token })
			.then(function(oData) {
				if(!oData.data.bSuccess) return $location.path('/login');
				
				$scope.$emit('login', oData.data.user);
				$http.defaults.headers.common['X-Auth'] = window.localStorage.token;
			});
		}
  }	

	$scope.myBooks = [];

	$scope.myLists = []

	var populateList = function() {
		
		$http.get('/api/account/list')
		.success(function(oData) { $scope.myLists = oData.result; })
		.error(function(oData) { console.log('Fail:', oData); });
	
	}

	$scope.addBookToList = function(index, listSelection) {

		if(typeof(index) === 'undefined' || typeof(listSelection) === 'undefined') return; 

		var book = $scope.myBooks[index];

		$http.post('/api/account/book', { book: book, list_id: listSelection }).success(function(oData) {
			console.log('addBookToList:', oData);
		});

	};

	$scope.addList = function(listName) {

		$http.post('/api/account/list',{ listName: listName }).success(function(oData) {
			$scope.myLists.push(oData.listItem);
			//$scope.$apply();
		});
	};

	$scope.query = function(searchQuery) {

		if(!searchQuery) return;

		populateList();	
	
		var bookAPI = $resource('https://www.googleapis.com/books/v1/volumes', { callback: 'JSON_CALLBACK' }, { get: { method: 'JSONP' } } );
		
		bookAPI.get({ q: searchQuery }).$promise.then(function(oData) {
			var length = oData.items.length;

				$scope.searchQuery = null;
				$scope.myBooks.length = 0;

			while(length--) {

				var info = oData.items[length].volumeInfo;

				// Some books do not have authors?
				var author = Array.isArray(info.authors) ? info.authors.join(', ') : info.authors; 
				
				$scope.myBooks.push({
					title: info.title,
					author: author,
					publishedDate: info.publishedDate
				});

			}


		});

	};

}]);
