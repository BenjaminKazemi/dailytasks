var taskGenerator = {
    baseUrl:'http://localhost:9000',
//    baseUrl: 'http://fierce-ridge-3179.herokuapp.com',
    tasksListUrl:'/tasks',
    createTaskUrl:'/tasks',
    deleteTaskUrl:'/tasks',

    requestTasks:function () {
        var req = new XMLHttpRequest();
        req.open("GET", this.baseUrl + this.tasksListUrl, true);
        req.onload = this.showTasks_.bind(this);
        req.send(null);
    },

    createTask:function (task) {
        var json = JSON.stringify(task);
        var req = new XMLHttpRequest();
        req.open("PUT", this.baseUrl + this.createTaskUrl, true);
        req.onload = this.showTasks_.bind(this);
        req.setRequestHeader("Content-length", json.length);
        req.setRequestHeader("Connection", "close");
        req.send(json);
    },

    deleteTask:function (taskId) {
        var req = new XMLHttpRequest();
        req.open("DELETE", this.baseUrl + this.deleteTaskUrl + "/" + taskId, true);
        req.onload = this.showTasks_.bind(this);
        req.send();
        return false;
    },

    showTasks_:function (e) {
        $("body").children("li").remove();
        $("body").children("a").remove();

        var tasks = JSON.parse(e.target.response);
        for (var i = 0; i < tasks.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = tasks[i].deadline + "  -->  " + tasks[i].description;
            var btn = document.createElement('button');
            btn.id = "deleteTask" + tasks[i].id;
            btn.innerHTML = " X";
            document.body.appendChild(li);
            li.appendChild(btn);

            $("#"+btn.id).on( "click", { id: tasks[i].id }, function( event ) {
                taskGenerator.deleteTask( event.data.id );
            });

        }

    }
};

$(document).ready(function () {
    taskGenerator.requestTasks();

    $("#saveTaskBtn").click(function () {
        var task = {};
        task.deadline = $("#deadline").val();
        task.description = $("#description").val();
        taskGenerator.createTask( task );
    });
});