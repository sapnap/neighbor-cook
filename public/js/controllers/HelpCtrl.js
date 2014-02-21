var HelpCtrl = function($scope, $sce) {
  $scope.infoList = [ 
    {'category' : 'General', 
     'questions': [ 
      {'id': 1, 'question': 'About NeighborCook', 'answer': 'Are you ever missing...'},
      {'id': 2, 'question': 'Setting up my inventory', 'answer': 'adsfljadsf'},
      {'id': 3, 'question': 'Setting up my bulletin', 'answer': '<ul><li>item 1</li><li>item 2</li><li>item 3</li></ul>'},
      ]
    },
    {'category' : 'Getting started', 
     'questions': [ 
      {'id': 4, 'question': 'Creating my profile', 'answer': 'This is how1'},
      {'id': 5, 'question': 'Setting up my inventory', 'answer': 'adsfljadsf'},
      {'id': 6, 'question': 'Setting up my bulletin', 'answer': 'aw yea'},
      ]
    },
    {'category' : 'Getting started', 
     'questions': [ 
      {'id': 7, 'question': 'Creating my profile', 'answer': 'This is how1'},
      {'id': 8, 'question': 'Setting up my inventory', 'answer': 'adsfljadsf'},
      {'id': 9, 'question': 'Setting up my bulletin', 'answer': 'aw yea'},
      ]
    },
    {'category' : 'Getting started', 
     'questions': [ 
      {'id': 10, 'question': 'Creating my profile', 'answer': 'This is how1'},
      {'id': 11, 'question': 'Setting up my inventory', 'answer': 'adsfljadsf'},
      {'id': 12, 'question': 'Setting up my bulletin', 'answer': 'aw yea'},
      ]
    }
  ];
  $scope.showAnswer = [];
  _.each($scope.infoList, function(elem) {
    _.each(elem.questions, function(e) {
      $scope.showAnswer.push(false);
      e.answer = $sce.trustAsHtml(e.answer);
    });
  });

  $scope.toggleInfo = function(id) {
    $scope.showAnswer[id] = !$scope.showAnswer[id];
    console.log('we are toggleInfo', id);
  };
};

HelpCtrl.$inject = ['$scope', '$sce'];
