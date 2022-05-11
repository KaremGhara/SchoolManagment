package com.tsofen.users.beans;

import javax.persistence.Id;	
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ResultCheckStyle;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;



@Data
@Entity
@Table(name="students")
@SQLDelete(sql = "UPDATE students SET is_Active = false WHERE student_id = ?")
@Where(clause = "is_Active = true")
public class Student {
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name = "student_id")
	private int id;
	@Column(name = "first_name") 
	@NotBlank(message = "Can't Enter Empty First Name!")
	private String firstName;
	@Column(name = "last_name")
	@NotBlank(message = "Can't Enter Empty Family Name!")
	private String lastName;
	@Size(min = 9, max = 9)
	@NotBlank(message = "Can't Enter Empty Social ID Number!")
	private String socialId;
	private boolean status=true;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
	@JsonIgnoreProperties(value = {"students", "hibernateLazyInitializer"})
	private User parent;
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.ALL})
	@JoinColumn(name = "classroom_id", referencedColumnName = "classroom_id")
	@JsonIgnoreProperties(value = {"students", "hibernateLazyInitializer"})
	private Classroom classroom;
	@Column(name = "is_Active")
	private boolean isActive=Boolean.TRUE;
   	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
            name="students_programs",
            joinColumns = @JoinColumn( name="student_id", referencedColumnName = "student_id"),
            inverseJoinColumns = @JoinColumn( name="program_id", referencedColumnName = "program_id")
        )
   	@JsonBackReference
   	private List<Program> programs;
}