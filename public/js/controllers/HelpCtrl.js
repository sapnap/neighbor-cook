var HelpCtrl = function($scope, $sce) {
  $scope.infoList = [ 
    {'category' : 'General', 
     'questions': [ 
      {'id': 1, 'question': 'About NeighborCook', 'answer': "Are you ever missing one crucial ingredient for a recipe? Neighbor-Cook connects you to other cooks in your community so you can exchange ingredients from your household kitchens.<br><br><strong>Here's how it works:</strong><ul><li>Within your profile, you keep a running inventory of foods you would be willing to share with neighbors.</li><li>You may either request items from your neighboring cooks or offer to share something from your kitchen.</li><li>Once you locate an item you would like or someone requests an item from you, Neighbor-Cook connects you through email to facilitate the exchange.</li></ul><strong>To get started:</strong><br>Create a profile on our homepage."},
      {'id': 2, 'question': 'Creating your profile', 'answer': 'Don’t worry if you’re new to Neighbor-Cook. It’s easy to get get started!<br><br><strong>To join Neighbor-Cook:</strong><ol><li>Create a profile using Facebook login on our homepage.</li><li>After your first login, we will create a profile for you using your Facebook name, profile picture, and location.</li><ol>'},
      {'id': 3, 'question': 'I just created my profile! Now what?', 'answer': 'Welcome to Neighbor-Cook! Now that you have your profile set up, you’re ready to request and offer food.  You can do so by creating a bulletin or searching on the homepage.'},
      ]
    },
    {'category' : 'My Profile', 
     'questions': [ 
      {'id': 4, 'question': 'Editing my profile', 'answer': '<ol><li>Select the profile tab (insert icon) at the top of the page</li><li>Click the (pencil icon) to the right of your profile name</li></ol>'},
      {'id': 5, 'question': 'Who can see my profile?', 'answer': 'Your profile and its contents will be visible to all other users of Neighbor-Cook.  This means that if you search for a specific user, you will be able to see their name, photo, zip code location, and their current inventory.  The information will allow you to find items in others’ inventories and inquire about them by sending a message.'},
      {'id': 6, 'question': 'How do I log out?', 'answer': 'Go to <strong>More > Logout</strong> in the top right corner of the page'},
      ]
    },
    {'category' : 'My Bulletins', 
     'questions': [ 
      {'id': 7, 'question': 'What is a bulletin?', 'answer': 'Bulletins allow you to post: <ol><li>What ingredients you have to offer your community </li><li>What ingredients you would like to acquire </li></ol>'},
      {'id': 8, 'question': 'How to create a bulletin', 'answer': '<ol><li>In the top right corner of the screen, select <strong>More > Create Bulletin</strong></li><li>Enter the <strong>Item</strong> name, a <strong>Message</strong>, a <strong>Type</strong> (either Offer or Request), and an <strong>Expiration</strong> date. The Item name is the only required field, but the more detail the better!</li><li>Once you have filled in the information, click the “<strong>Add Bulletin</strong>” button.</li></ol>'},
      {'id': 9, 'question': 'Why I try to create a bulletin, I get a message that "Item ___ does not exist"', 'answer': 'You attempted to create a bulletin for an ingredient which does not exist in our database.  We have over 950 foods to choose from, but since we can’t keep track of every food on the planet, it is possible that you will pick an ingredient we have not accounted for.<br><br>In these situations we unfortunately cannot accommodate your request and won’t be able to create a new bulletin for that specific item.  We suggest searching for something more general or more common.'},
      ]
    },
    {'category' : 'My Inventory', 
     'questions': [ 
      {'id': 10, 'question': 'What is my inventory?', 'answer': 'Your inventory keeps track of what foods you currently have available in your own kitchen, particularly ones which you would be willing to give to a neighboring cook.'},
      {'id': 11, 'question': 'Editing my inventory', 'answer': '<ol><li>If you’re on a page other than your profile, select the Profile tab (insert icon) at the top of the page.</li><li>Click the (pencil icon) to the right of “Available Foods in Inventory”</li></ol>'},
      {'id': 12, 'question': 'Who can see my inventory?', 'answer': 'Since your Profile is visible to all Neighbor-Cook users, and your inventory is just a part of that Profile, your inventory will be available to all other users as well.'},
      ]
    },
    {'category' : 'Search', 
     'questions': [ 
      {'id': 13, 'question': 'How to search for an ingredient', 'answer': '<ol><li>On the homepage, enter the name of the food that you’re looking for in the “<strong>Ingredient Search</strong>” bar.  Click “<strong>Search</strong>” when you’re done.</li><li>Below the search bar, once your request has been processed you will be shown a list of all users who are offering that item. </li><li>From this list of returned results, you can choose to contact one of your neighbors to request the desired ingredient.</li></ol>'},
      {'id': 14, 'question': 'Why do I get "0 results"?', 'answer': 'You attempted to search for an ingredient which does not exist in our database.  We have over 950 foods to choose from, but it is possible that you will pick an ingredient we have not accounted for.<br><br>In these situations we unfortunately cannot accommodate your request and won’t be able to help you locate that item.  We suggest searching for something more general or more common.'},
      ]
    },
    {'category' : 'Connect', 
     'questions': [ 
      {'id': 15, 'question': 'Reaching out to other cooks', 'answer': 'When you would either like to take up an offer or respond to another user’s request you will need to contact them to work out the details of the exchange.<br><br><strong>If you are following up to a bulletin offer or request</strong><br>You can Click the “Message ____” link next to the bulletin.  Doing so will open an email client so that you two can contact one another.'},
      {'id': 16, 'question': 'What is my communication log?', 'answer': 'The communication log (icon) keeps a record of messages you’ve previously exchanged with other users.<br><br>You will be able to see what messages you’ve sent and what you have received.  Having this information will help you easily tell which users you have exchanged with most often.'},
      {'id': 17, 'question': 'How can I see my communication log?', 'answer': 'Select the communication tab (insert icon) at the top of the page.'},
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
