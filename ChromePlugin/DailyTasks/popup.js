var taskGenerator = {
  tasksListUrl: 'http://fierce-ridge-3179.herokuapp.com/tasks',

  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.tasksListUrl, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  showPhotos_: function (e) {
    var tasks = JSON.parse( e.target.response );
      for (var i = 0; i < tasks.length; i++) {
          var li = document.createElement('li');
          li.innerHTML = tasks[i].deadline + "  -->  " + tasks[i].description;
          document.body.appendChild(li);
      }

/*
          for (var i = 0; i < kittens.length; i++) {
            var img = document.createElement('li');
            img.src = this.constructKittenURL_(kittens[i]);
            img.setAttribute('alt', kittens[i].getAttribute('title'));
            document.body.appendChild(img);
          }
      */
  }
};

document.addEventListener('DOMContentLoaded', function () {
    taskGenerator.requestKittens();
});
