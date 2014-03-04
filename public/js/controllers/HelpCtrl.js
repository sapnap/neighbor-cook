var HelpCtrl = function($scope, $sce) {
  $scope.infoList = [ 
    {'category' : 'General', 
     'questions': [ 
      {'id': 1, 'question': 'About Epulo', 'answer': "Are you ever missing one crucial ingredient for a recipe? Epulo connects you to other cooks in your community so you can exchange ingredients from your household kitchens.<br><br><strong>Here's how it works:</strong><ul><li>Within your profile, you keep a running inventory of foods you would be willing to share with neighbors.</li><li>You may either request items from your neighboring cooks or offer to share something from your kitchen.</li><li>Once you locate an item you would like or someone requests an item from you, Epulo connects you through email to facilitate the exchange.</li></ul>"},
      {'id': 2, 'question': 'Creating your profile', 'answer': 'Don’t worry if you’re new to Epulo. It’s easy to get get started!<br><br><strong>To join Epulo:</strong><ol><li>Create a profile using Facebook login on our homepage.</li><li>After your first login, we will create a profile for you using your Facebook name, profile picture, and location.</li><ol>'},
      {'id': 3, 'question': 'I just created my profile! Now what?', 'answer': 'Welcome to Epulo! Now that you have your profile set up, you’re ready to request and offer food.  You can do so by creating a bulletin or searching on the homepage.'},
      ]
    },
    {'category' : 'My Profile', 
     'questions': [ 
      {'id': 4, 'question': 'Editing my profile', 'answer': '<ol><li>Select the profile tab at the top of the page</li><li>Click the pencil icon to the right of your profile name</li></ol>'},
      {'id': 5, 'question': 'Who can see my profile?', 'answer': 'Your profile and its contents will be visible to all other users of Epulo. The information will allow you to find items in others’ inventories and inquire about them by sending a message.'},
      {'id': 6, 'question': 'How do I log out?', 'answer': 'Click on your profile picture in the top right corner of the page to click the Logout button.'},
      ]
    },
    {'category' : 'My Bulletins', 
     'questions': [ 
      {'id': 7, 'question': 'What is a bulletin?', 'answer': 'Bulletins allow you to post: <ol><li>What ingredients you have to offer your community </li><li>What ingredients you would like to acquire </li></ol>'},
      {'id': 8, 'question': 'How to create a bulletin', 'answer': '<ol><li>Click the <strong>Post Bulletin</strong> button on the home page.</li><li>Enter the <strong>Item</strong> name, a <strong>Message</strong>, a <strong>Type</strong> (either Offer or Request), and an <strong>Expiration</strong> date. The more detail the better!</li><li>Once you have filled in the information, click the “<strong>Add Bulletin</strong>” button.</li></ol>'},
      {'id': 9, 'question': 'When I try to create a bulletin, I get a message that "Item ___ does not exist"', 'answer': 'You attempted to create a bulletin for an ingredient which does not exist in our database.  We have over 1000 foods to choose from, but since we can’t keep track of every food on the planet, it is possible that you will pick an ingredient we have not accounted for.<br><br>In these situations we unfortunately cannot accommodate your request and won’t be able to create a new bulletin for that specific item.  We suggest searching for something more general or more common. If you think the item you searched for should be in our inventory, please <a href="mailto:epulo.us@gmail.com" target="_blank">email</a> us.'},
      ]
    },
    {'category' : 'My Inventory', 
     'questions': [ 
      {'id': 10, 'question': 'What is my inventory?', 'answer': 'Your inventory keeps track of what foods you currently have available in your own kitchen, particularly ones which you would be willing to give to a neighboring cook.'},
      {'id': 11, 'question': 'Editing my inventory', 'answer': '<ol><li>If you’re on a page other than your profile, select the Profile tab at the top of the page.</li><li>Click the pencil icon to the right of “Available Foods in Inventory”</li></ol>'},
      {'id': 12, 'question': 'Who can see my inventory?', 'answer': 'Since your Profile is visible to all Epulo users, and your inventory is just a part of that Profile, your inventory will be available to all other users as well.'},
      ]
    },
    {'category' : 'Search', 
     'questions': [ 
      {'id': 13, 'question': 'How to search for an ingredient', 'answer': '<ol><li>On the homepage, enter the name of the food that you’re looking for in the “<strong>Ingredient Search</strong>” bar.  Click “<strong>Search</strong>” when you’re done.</li><li>Below the search bar, you will be shown a list of all users who are offering that item. </li><li>From this list of returned results, you can choose to contact one of your neighbors to request the desired ingredient.</li></ol>'},
      {'id': 14, 'question': 'Why do I get "0 results"?', 'answer': 'It is possible that no users on Epulo have the ingredient listed in their inventory, or your food does not exist in our inventory. We suggest searching for something more general or more common. If you think the item you searched for should be in our inventory, please <a href="mailto:epulo.us@gmail.com" target="_blank">email</a> us.'},
      ]
    },
    {'category' : 'Connect', 
     'questions': [ 
      {'id': 15, 'question': 'Reaching out to other cooks', 'answer': 'When you would either like to take up an offer or respond to another user’s request you will need to contact them to work out the details of the exchange.<br><br><strong>If you are following up to a bulletin offer or request</strong><br>You can send an email through the app by cliking the "Email" button.'},
      {'id': 16, 'question': 'What is my history?', 'answer': 'The history tab records your activity on Epulo: including messages with other users and bulletins you have posted.<br><br> Having this information will help you easily tell which users you have exchanged with most often.'},
      {'id': 17, 'question': 'How can I see who I have interacted with on Epulo?', 'answer': 'Select the calendar icon at the top of the page.'},
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
  };
};

HelpCtrl.$inject = ['$scope', '$sce'];
