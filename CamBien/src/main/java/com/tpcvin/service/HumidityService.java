package com.tpcvin.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tpcvin.dao.HumidityDao;
import com.tpcvin.entity.Humidity;
import com.tpcvin.model.HumidityDTO;
import com.tpcvin.model.SearchHumidityDTO;

public interface HumidityService {
	
	void add(HumidityDTO nhietDoDTO);
	
	HumidityDTO get(int id);
	
	List<HumidityDTO> find(SearchHumidityDTO searchTemHumiDTO);
	
	Long count(SearchHumidityDTO searchTemHumiDTO);
	
	Long countTotal(SearchHumidityDTO searchTemHumiDTO);

}
@Service
@Transactional
class HumidityServiceImpl implements HumidityService {

	@Autowired
	private HumidityDao temHumiDao;

	@Override
	public void add(HumidityDTO temHumiDTO) {
		Humidity temHumi = new Humidity();
		temHumi.setHumidity(temHumiDTO.getHumidity());
		temHumiDao.add(temHumi);
	}

	@Override
	public HumidityDTO get(int id) {
		Humidity temHumi = temHumiDao.get(id);
		return convertToDTO(temHumi);
	}

	@Override
	public List<HumidityDTO> find(SearchHumidityDTO searchHumidityDTO) {
		List<Humidity> temHumis = temHumiDao.find(searchHumidityDTO);
		List<HumidityDTO> temHumiDTOs = new ArrayList<HumidityDTO>();
		temHumis.forEach(temHumi -> {
			temHumiDTOs.add(convertToDTO(temHumi));
		});
		return temHumiDTOs;
	}

	private HumidityDTO convertToDTO(Humidity humidity) {
		HumidityDTO temHumiDTO = new HumidityDTO();
		BeanUtils.copyProperties(humidity, temHumiDTO);
		return temHumiDTO;
	}

	@Override
	public Long count(SearchHumidityDTO searchHumidityDTO) {
		return temHumiDao.count(searchHumidityDTO);
	}

	@Override
	public Long countTotal(SearchHumidityDTO searchHumidityDTO) {
		return temHumiDao.countTotal(searchHumidityDTO);
	}

}
