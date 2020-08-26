$(function() {
    let add = $("#add");
    let form = $("form");
    let submit = $('#submit');
    let sortableList = $('#sortable')
    let taskLable = $('#tasklabel');
    let taskDetail = $('#taskdetail');
    let dueDate = $('#duedate');
    let entry = $('li.entry');
    let trash = $('div.trashable');
    let checkIcon = $('i.fa-check');
    let checkBtn;
    let listIcon = $('#donelisticon');
    let doneTasksList = $('ul.list-group');

    add.on('click', function() {
        form.toggle();
    })

    listIcon.on('click', function () {
        doneTasksList.toggle();
    })

    $(function () {
        entry.draggable();
        trash.droppable({
            drop: function (event, ui) {
                ui.draggable.remove();
            }
        })
    })

    submit.on('click', function () {
        let rand = Math.round(Math.random() * 1000);
        let liId = taskLable.val().substring(0,2) + Math.round(Math.random() * 10000);
        let newEntry = '<li class="entry" id="' + liId + '">' + '<a data-toggle="collapse" href="#' + taskLable.val().substring(0,2) + rand
            + '" role="button" aria-expanded="false" aria-controls="'+ taskLable.val().substring(0,2) + rand +'">'
            + taskLable.val() + ' '+ '</a>' + '<br>' + 'Due date: ' + dueDate.val() + ' '
            + '<div class="collapse" id="' + taskLable.val().substring(0,2) + rand + '">'
            + '<div class="card card-body">'
            + taskDetail.val()
            + '</div> '
            + '</div>'
            + '<button class="btn btn-outline-dark done" id="btn' + taskLable.val().substring(0,2) + rand + '">Done</button>'
            + '</li>';

        if (taskHasNoTitle(taskLable)) {
            alert("You forgot to give your task a name");
            return;
        }

        sortableList.append(newEntry);

        setTaskBgColor($('#color').val(), $('#'+liId));

        clearFormFields(taskLable, taskDetail, dueDate);
        closeTask($('button.btn.done'), doneTasksList);
    })

    $(function() {
        sortableList.sortable();
        sortableList.disableSelection();
    })

})

var clearFormFields = function(field1, field2, field3) {
    $(field1).val("");
    $(field2).val("");
    $(field3).val("");
}

var closeTask = function (button, list) {
    button.bind('click', function () {
        let rand = Math.round(Math.random() * 1000)
        let taskLabels = $(this).closest('li').text();
        let taskTitle = taskLabels.split(' ');
        let today = new Date(Date.now()).toLocaleDateString();
        let listItem = '<li class="list-group-item">' + '<p>' + taskTitle[0] + '</p>'
            + '<p> Closed on : ' + today + '</p>' + '<button class="btn btn-outline-danger delete" id="btn'
            + taskTitle[0].substring(0,2) + rand + "del" + '">Delete</button>' + '</li>';
        list.append(listItem);
        $(this).closest('li').remove();
    })
}

var taskHasNoTitle = function (titlefield) {
    return titlefield.val().trim().length === 0;
}

var setTaskBgColor = function(color, element) {
    element.css('background-color', color);
}

$(document).on('click', 'button.delete', function(e) {
    $(this).closest('li').remove();
})


