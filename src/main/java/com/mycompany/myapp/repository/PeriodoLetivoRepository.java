package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PeriodoLetivo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PeriodoLetivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodoLetivoRepository extends JpaRepository<PeriodoLetivo, Long> {

}
