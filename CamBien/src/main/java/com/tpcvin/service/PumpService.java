package com.tpcvin.service;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tpcvin.dao.PumpDao;
import com.tpcvin.entity.Pump;
import com.tpcvin.model.PumpDTO;

public interface PumpService {

	void update(PumpDTO pumpDTO);

	PumpDTO get(int id);

}

@Service
@Transactional
class PumpServiceImpl implements PumpService {

	@Autowired
	private PumpDao pumpDao;

	@Override
	public void update(PumpDTO pumpDTO) {
		Pump pump = pumpDao.get(pumpDTO.getId());
		if (pump != null) {
			BeanUtils.copyProperties(pumpDTO, pump);
			pumpDao.update(pump);
		}
	}

	@Override
	public PumpDTO get(int id) {
		Pump pump = pumpDao.get(id);
		if (pump != null) {
			PumpDTO pumpDTO = new PumpDTO();
			BeanUtils.copyProperties(pump, pumpDTO);

			return pumpDTO;
		}
		return null;
	}

}
