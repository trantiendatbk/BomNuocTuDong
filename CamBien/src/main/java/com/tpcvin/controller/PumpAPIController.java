package com.tpcvin.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tpcvin.model.PumpDTO;
import com.tpcvin.service.PumpService;

@RestController
@RequestMapping("/api/pump")
@CrossOrigin(origins = "*", maxAge = -1)
public class PumpAPIController {
	@Autowired
	private PumpService pumpService;

	@GetMapping(value = "/setup")
	public List<PumpDTO> setup() {
		return Arrays.asList(pumpService.get(1));
	}

	@PostMapping(value = "/setup")
	public PumpDTO setup(@RequestBody PumpDTO pumpDTO) {
		pumpService.update(pumpDTO);
		return pumpDTO;
	}
}
