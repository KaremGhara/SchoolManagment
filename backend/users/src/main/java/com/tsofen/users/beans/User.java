package com.tsofen.users.beans;

import com.fasterxml.jackson.annotation.JsonBackReference; 
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column( name="user_id")
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
	@Email(message = "Invalid Email!")
	@NotBlank(message = "Can't Enter Empty Email!")
	private String email;
	@NotBlank(message = "Can't Enter Empty Phone!")
	@Size(min = 10, max = 10, message = "Invalid Phone Number!")
	@Digits(integer = 10, fraction = 0)
	private String phone;
	@NotBlank(message = "Can't Enter Empty Password!")
	@Size(min = 6, max = 10, message = "Invalid Password!")
	private String password;
	@NotBlank(message = "Can't Enter Empty Role!")
	private String role;
	private boolean status = true;
	
	private boolean attachTechar=false;
	
	@Lob
	@Column(name="user_image")
	private String userImg;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "parent")
	@JsonIgnore
	@EqualsAndHashCode.Exclude
	private Set<Student> students;


	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "programmanager")
	private Set<Program> program;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinTable(
			name = "TeacherstoSchool",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "school_id")
	)
	@JsonBackReference
	private School school;
	
}






