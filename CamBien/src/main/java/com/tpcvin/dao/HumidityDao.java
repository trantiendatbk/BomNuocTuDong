package com.tpcvin.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.tpcvin.entity.Humidity;
import com.tpcvin.model.SearchHumidityDTO;

public interface HumidityDao {

	void add(Humidity humidity);

	Humidity get(int id);

	List<Humidity> find(SearchHumidityDTO searchHumidityDTO);

	Long count(SearchHumidityDTO searchHumidityDTO);

	Long countTotal(SearchHumidityDTO searchHumidityDTO);

}

@Repository
@Transactional
class HumidityDaoImpl implements HumidityDao {

	@PersistenceContext
	EntityManager entityManager;

	@Override
	public void add(Humidity nhietDo) {
		entityManager.persist(nhietDo);

	}

	@Override
	public Humidity get(int id) {
		return entityManager.find(Humidity.class, id);
	}

	@Override
	public Long count(SearchHumidityDTO searchHumidityDTO) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
		Root<Humidity> root = criteriaQuery.from(Humidity.class);

		List<Predicate> predicates = new ArrayList<Predicate>();

		criteriaQuery.where(predicates.toArray(new Predicate[] {}));

		TypedQuery<Long> typedQuery = entityManager.createQuery(criteriaQuery.select(criteriaBuilder.count(root)));
		return typedQuery.getSingleResult();
	}

	@Override
	public Long countTotal(SearchHumidityDTO searchHumidityDTO) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
		Root<Humidity> root = criteriaQuery.from(Humidity.class);

		List<Predicate> predicates = new ArrayList<Predicate>();

		criteriaQuery.where(predicates.toArray(new Predicate[] {}));

		TypedQuery<Long> typedQuery = entityManager.createQuery(criteriaQuery.select(criteriaBuilder.count(root)));
		return typedQuery.getSingleResult();
	}

	@Override
	public List<Humidity> find(SearchHumidityDTO searchTemHumiDTO) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Humidity> criteriaQuery = criteriaBuilder.createQuery(Humidity.class);
		Root<Humidity> root = criteriaQuery.from(Humidity.class);

		List<Predicate> predicates = new ArrayList<Predicate>();

		criteriaQuery.where(predicates.toArray(new Predicate[] {}));

		// order
		criteriaQuery.orderBy(criteriaBuilder.desc(root.get("id")));

		TypedQuery<Humidity> typedQuery = entityManager.createQuery(criteriaQuery.select(root));
		if (searchTemHumiDTO.getStart() != null) {
			typedQuery.setFirstResult((searchTemHumiDTO.getStart()));
			typedQuery.setMaxResults(searchTemHumiDTO.getLength());
		}
		return typedQuery.getResultList();
	}

}
