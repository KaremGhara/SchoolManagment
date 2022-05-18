package com.tsofen.users.beans;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class ProgramToSchoolProperties {

	@EmbeddedId
	ProgramToSchoolKey id = new ProgramToSchoolKey();
	
	@ManyToOne
    @MapsId("programId")
    @JoinColumn(name = "program_id")
	@JsonIgnore
	Program program;
	
	@ManyToOne
	@JsonIgnoreProperties(value = {"program_to_school_properties", "hibernateLazyInitializer"})

    @MapsId("schoolId")
	
    @JoinColumn(name = "school_id")
	School school;	
	private LocalDate startDate;
	private LocalDate endDate;
	private LocalTime  timeDescription;
	//
}
