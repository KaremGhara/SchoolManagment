package com.tsofen.users.beans;


import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name="schools")
public class School {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="school_id")
	private int id;
	@NotBlank(message = "School Name Can't be empty")
	private String name;
	@NotBlank (message = "Address Can't be empty")
	private String address;	

	
	@JsonIgnore
	@OneToMany(mappedBy = "school",cascade = CascadeType.ALL)
	List<ProgramToSchoolProperties> properties =new ArrayList<>();

	@OneToMany( cascade = CascadeType.ALL,orphanRemoval = true,  mappedBy="school")
	@JsonIgnore
	private List<User> teachers;
	
	@OneToMany( cascade = CascadeType.ALL,orphanRemoval = true,  mappedBy="school")
	@JsonIgnore
	private List<Classroom> classes;
	
		
	
	@OneToMany( cascade = CascadeType.ALL,orphanRemoval = true,  mappedBy="school")
	@JsonIgnore
	private List<Classroom> classrooms;
	
	
}
