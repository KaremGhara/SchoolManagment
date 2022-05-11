package com.tsofen.users.beans;



import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
@Table(name ="programs")
public class Program {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "program_id")
	private int id;
	@Column(name = "name")
	@NotBlank(message = "Can't Enter Empty Program Name!")
	private String name;
	@NotNull
	@Min(value = 0)
	private int cost;
	@Column(name = "long_description")
	@NotBlank(message = "Can't Enter Empty Description!")
	private String longDescription;
	@Column(name = "short_description")
	@NotBlank(message = "Can't Enter Empty Description!")
	private String shortDescription;
	

	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnoreProperties(value = {"programs", "hibernateLazyInitializer"})
   @JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User programmanager;
	

	
	@OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
	//@JsonIgnore
	List<ProgramToSchoolProperties> properties=new ArrayList<>();
	
    @JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY,mappedBy="programs")
	private List<Student> students;
	
	
	
}

