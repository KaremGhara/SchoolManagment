package com.tsofen.users.beans;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode.Exclude;

@Data
@Entity
@Table(name = "classes")
public class Classroom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="classroom_id")
	private int id; 
	@NotBlank(message = "Can't Enter Empty Grade!")
	private String grade;
	@NotBlank(message = "Can't Enter Empty Ordinal Number!")
	private String ordinalNumber;
	private boolean status=true; 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id", referencedColumnName = "school_id")
    @JsonIgnoreProperties(value = {"classes", "hibernateLazyInitializer"})
	private School school;
	@JsonIgnore
    @OneToMany(cascade=CascadeType.REMOVE, mappedBy="classroom")
	private List<Student> students;
}