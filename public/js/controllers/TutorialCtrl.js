var TutorialCtrl = function($scope, UserService) {
  UserService.getCurrentUser().success(function(user) {
    $scope.userID = user.id;
  });

  $scope.slides = [{
    src: 'tutorial/bulletins.png',
    title: 'View bulletins',
    bullets: ["See what people are looking for, and what people are giving away"]
  }, {
    src: 'tutorial/search.png',
    title: 'Search',
    bullets: ['Find ingredients you need']
  }, {
    src: 'tutorial/post-bulletins.png',
    title: 'Post bulletins',
    bullets: ["Can't find what you need? Post a bulletin to ask the Epulo community",
              "Or, if you have something to share, let everybody know!"]
  }, {
    src: 'tutorial/inventory.png',
    title: 'Inventory',
    bullets: ["List ingredients you're always willing to share",
              "Other people can find what you list by using search"]
  }]
};

TutorialCtrl.$inject = ['$scope', 'UserService'];