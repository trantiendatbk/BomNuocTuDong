package com.tpcvin.model;

import lombok.Data;

@Data
public class PumpDTO {
	private int id = 1;
	private String led; // on off
	private int setup;// setup humidity
}
