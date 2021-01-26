package com.tpcvin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tpcvin.model.HumidityDTO;
import com.tpcvin.model.ResponseDTO;
import com.tpcvin.model.SearchHumidityDTO;
import com.tpcvin.service.HumidityService;

@RestController
@RequestMapping("/api/humidity")
@CrossOrigin(origins = "*", maxAge = -1)
public class HumidityAPIController {

	@Autowired
	private HumidityService humidityService;

	@PostMapping(value = "/add")
	public HumidityDTO addHumidity(@RequestParam(value = "humidity", required = false) String huminity) {
		HumidityDTO temHumiDTO = new HumidityDTO();
		temHumiDTO.setHumidity(Double.parseDouble(huminity));

		humidityService.add(temHumiDTO);
		return temHumiDTO;
	}

	@PostMapping(value = "/search")
	public ResponseDTO<HumidityDTO> find(@RequestBody SearchHumidityDTO searchHumidityDTO) {
		ResponseDTO<HumidityDTO> responseDTO = new ResponseDTO<>();
		responseDTO.setData(humidityService.find(searchHumidityDTO));
		responseDTO.setRecordsFiltered(humidityService.count(searchHumidityDTO));
		responseDTO.setRecordsTotal(humidityService.countTotal(searchHumidityDTO));
		return responseDTO;
	}
}
