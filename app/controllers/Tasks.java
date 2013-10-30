package controllers;

import com.google.gson.Gson;
import models.tasks.Task;
import org.apache.commons.io.IOUtils;
import play.Logger;
import play.mvc.Controller;

import java.io.IOException;
import java.util.List;

public class Tasks extends Controller {

    public static void index() {
        List<Task> taskList = Task.findAll();
        render( taskList );
    }

    public static void list() {
        String taskList = new Gson().toJson(Task.findAll());
        Logger.info( "Listing tasks" );
        renderJSON(taskList);
    }

    public static void create() throws IOException {
        Task task = new Gson().fromJson(IOUtils.toString(request.body, "UTF-8"), Task.class);
        task.validateAndSave();

        String t = new Gson().toJson(task);
        Logger.info( "Creating new Task " + t );

        renderJSON(t);
    }

    public static void delete( Long id ) {
        if( Task.delete("id=?", id) > 0 ) {
            Logger.info( "Deleting task.id:" + id );
            ok();
        } else {
            Logger.info( "Task not found for deletion task.id:" + id );
            notFound( "Task[id:" + id + "] not found." );
        }
    }

}