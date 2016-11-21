$(document).ready(function(){
  getTasks();

  $('#task-submit').on('click', '#task-submit', postTask);
  $('#task-list').on('click', '.delete', deleteTask);
  //$('#task-list').on('click', '.update', updateTask);
  $('#task-list').on('click', '#complete', markComplete);

  function markComplete(event){
    event.preventDefault();
    $(this).parent().css("background-color", "green");
  };
});

  function getTasks() {

    $.ajax({
      type: 'GET',
      url: '/tasks',
      success: function(tasks) {
        appendTasks(tasks);
      },
      error: function() {
        console.log('Database error');
      }

    })
  }

  function postTask() {
    event.preventDefault();

    var task = {};

    $.each($('.form-control').serializeArray(), function (i, field) {
      task[field.name] = field.value;
    });

    console.log('task: ', task);
    console.log(task.finish_by);

    $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: function(response) {
      getTasks();
    },
    error: function() {
      console.log('could not post a new task');
    }
  })

}

function deleteTask() {
  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + id,
    success: function(result) {
      getTasks();
    },
    error: function(result) {
      console.log('could not delete task.');
    }
  });
}

function updateTask() {

  var id = $(this).parent().data('id');
  console.log(id);

  // make task object
  var task = {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function(field) {
    task[field.name] = field.value;
  });
  console.log(task);

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + id,
    data: task,
    success: function(result) {
      console.log('updated!!!!');
      getTasks();
    },
    error: function(result) {
      console.log('could not update task!');
    }
  });

}

function appendTasks(tasks) {

  $("#task-list").empty();

  for (var i = 0; i < tasks.length; i++) {
    $("#task-list").append('<div class="row task"></div>');
    $el = $('#task-list').children().last();
    var task = tasks[i];
    $el.data('id', task.id);

    var convertedDate = task.finish_by.substr(0, 10);

    $el.append('<input type="text" name="new_task" value="' + task.new_task + '" />');
    //$el.append('<input type="text" name="finish_by" value="' + task.finish_by + '" />');
    var newDate = $('<input type="text" name="finish_by" />');
    newDate.val(convertedDate)
    $el.append(newDate);

    $el.append('<button id="complete" class="update">Complete</button>');
    $el.append('<button class="delete">Delete</button>');
  }
}
