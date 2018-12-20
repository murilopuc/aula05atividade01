package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Falta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Falta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FaltaRepository extends JpaRepository<Falta, Long> {

}
