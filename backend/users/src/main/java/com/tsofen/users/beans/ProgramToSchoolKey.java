package com.tsofen.users.beans;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;

@SuppressWarnings("serial")
@Embeddable
@Data
public class ProgramToSchoolKey implements Serializable{
	
	                 
	@Column(name="program_id")
	private int programId;
	@Column(name="school_id")
	private int schoolId;
	
	/*
	private LocalDate startDate;
	private LocalDate endDate;
	private String timeDescription;
	*/

}
