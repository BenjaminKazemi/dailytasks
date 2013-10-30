package models.tasks;

import play.db.jpa.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "task")
public class Task extends Model {
    @Column(nullable = false)
    public Date deadline;

    @Column(nullable = false)
    public String description;
}
