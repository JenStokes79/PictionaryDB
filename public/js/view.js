$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
  var $newItemInput = $("input.new-item");
  // Our new todos will go inside the todoContainer
  var $userContainer = $(".user-container");
  // Adding event listeners for deleting, editing, and adding todos
  $(document).on("click", "button.delete", deleteUser);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".user-item", editUser);
  $(document).on("keyup", ".user-item", finishEdit);
  $(document).on("blur", ".user-item", cancelEdit);
  $(document).on("submit", "#user-form", insertUser);

  // Our initial todos array
  var users = [];

  // Getting todos from database when page loads
  getUsers();

  // This function resets the todos displayed with new todos from the database
  function initializeRows() {
    $userContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < users.length; i++) {
      rowsToAdd.push(createNewRow(users[i]));
    }
    $userContainer.prepend(rowsToAdd);
  }

  // This function grabs todos from the database and updates the view
  function getUsers() {
    $.get("/api/users", function(data) {
      users = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteUser(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    }).then(getUsers);
  }

  // This function handles showing the input box for a user to edit a todo
  function editUser() {
    var currentUser = $(this).data("user");
    $(this).children().hide();
    $(this).children("input.edit").val(currentUser.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var user = $(this).parent().data("user");
    user.complete = !user.complete;
    updateUser(user);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit() {
    var updatedUser = $(this).data("user");
    if (event.which === 13) {
      updatedUser.text = $(this).children("input").val().trim();
      $(this).blur();
      updateUser(updatedUser);
    }
  }

  // This function updates a todo in our database
  function updateUser(user) {
    $.ajax({
      method: "PUT",
      url: "/api/users",
      data: user
    }).then(getUsers);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentUser = $(this).data("user");
    if (currentUser) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentUser.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(user) {
    var $newInputRow = $(
      [
        "<li class='list-group-item user-item'>",
        "<span>",
        user.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>x</button>",
        "<button class='complete btn btn-default'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", user.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("user", user);
    if (user.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertUser(event) {
    event.preventDefault();
    var user = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/users", user, getUsers);
    $newItemInput.val("");
  }
});
