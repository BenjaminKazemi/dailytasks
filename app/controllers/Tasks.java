package controllers;

import com.google.gson.GsonBuilder;
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
        Logger.info( "Listing tasks" );
        renderJSON(listJson());
    }

    public static void create() throws IOException {
        Task task = new GsonBuilder().setDateFormat("yyyy-MM-DD'T'HH:mm").create().fromJson(IOUtils.toString(request.body, "UTF-8"), Task.class);
        task.validateAndSave();

        String t = new GsonBuilder().setDateFormat("yyyy-MM-DD'T'HH:mm").create().toJson(task);
        Logger.info( "Creating new Task " + t );

        renderJSON(listJson());
    }

    public static void delete( Long id ) {
        if( Task.delete("id=?", id) > 0 ) {
            Logger.info( "Deleting task.id:" + id );
            renderJSON(listJson());
        }

        Logger.info( "Task not found for deletion task.id:" + id );
        renderJSON(listJson());
    }

    private static synchronized String listJson() {
        return new GsonBuilder().setDateFormat("yyyy-MM-DD'T'HH:mm").create().toJson(Task.find("FROM Task t ORDER BY t.deadline ASC").fetch(0,15));
    }
}