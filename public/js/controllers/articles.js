function ArticlesController($scope, $routeParams, $location, Global, Articles) {
	$scope.global = Global;

	$scope.create = function () {
		var article = new Articles({ title: this.title, side1: this.side1, side2:  this.side2 });
		article.$save(function (response) {
			$location.path("articles/" + response._id);
		});

		this.title = "";
		this.side1 = "";
		this.side2 = "";
	};

	$scope.remove = function (article) {
		article.$remove();

		for (var i in $scope.articles) {
			if ($scope.articles[i] == article) {
				$scope.articles.splice(i, 1)
			}
		}
	};

	$scope.update = function () {
		var article = $scope.article;
		if (!article.updated) {
			article.updated = [];
		}
		article.updated.push(new Date().getTime());

		article.$update(function () {
			$location.path('articles/' + article._id);
		});
	};

	$scope.find = function (query) {
		Articles.query(query, function (articles) {
			$scope.articles = articles;
		});
	};

	$scope.findOne = function () {
		Articles.get({ articleId: $routeParams.articleId }, function (article) {
			$scope.article = article;
		});
	};
 
	$scope.flip = function () {
		console.log($scope.article);
		var side1 = $('.side1'),
			side2 = $('.side2');

		if ($(side1).hasClass('hidden')) {
			side2.addClass('hidden');
			side1.removeClass('hidden');
		} else {
			side1.addClass('hidden');
			side2.removeClass('hidden');
		}
	};
}