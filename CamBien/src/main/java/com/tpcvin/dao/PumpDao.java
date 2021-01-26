package com.tpcvin.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.tpcvin.entity.Pump;

public interface PumpDao {

	void update(Pump pump);

	Pump get(int id);

}

@Repository
@Transactional
class PumpDaoImpl implements PumpDao {

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public void update(Pump pump) {
		entityManager.merge(pump);
	}

	@Override
	public Pump get(int id) {
		return entityManager.find(Pump.class, id);
	}


}
