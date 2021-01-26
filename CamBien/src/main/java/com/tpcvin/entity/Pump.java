package com.tpcvin.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "pump")
@Data
public class Pump {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String led; // on off
	
	private int setup;// setup humidity

}
