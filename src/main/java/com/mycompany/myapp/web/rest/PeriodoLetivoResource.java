package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.PeriodoLetivo;
import com.mycompany.myapp.repository.PeriodoLetivoRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PeriodoLetivo.
 */
@RestController
@RequestMapping("/api")
public class PeriodoLetivoResource {

    private final Logger log = LoggerFactory.getLogger(PeriodoLetivoResource.class);

    private static final String ENTITY_NAME = "periodoLetivo";

    private final PeriodoLetivoRepository periodoLetivoRepository;

    public PeriodoLetivoResource(PeriodoLetivoRepository periodoLetivoRepository) {
        this.periodoLetivoRepository = periodoLetivoRepository;
    }

    /**
     * POST  /periodo-letivos : Create a new periodoLetivo.
     *
     * @param periodoLetivo the periodoLetivo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new periodoLetivo, or with status 400 (Bad Request) if the periodoLetivo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/periodo-letivos")
    @Timed
    public ResponseEntity<PeriodoLetivo> createPeriodoLetivo(@RequestBody PeriodoLetivo periodoLetivo) throws URISyntaxException {
        log.debug("REST request to save PeriodoLetivo : {}", periodoLetivo);
        if (periodoLetivo.getId() != null) {
            throw new BadRequestAlertException("A new periodoLetivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PeriodoLetivo result = periodoLetivoRepository.save(periodoLetivo);
        return ResponseEntity.created(new URI("/api/periodo-letivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /periodo-letivos : Updates an existing periodoLetivo.
     *
     * @param periodoLetivo the periodoLetivo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated periodoLetivo,
     * or with status 400 (Bad Request) if the periodoLetivo is not valid,
     * or with status 500 (Internal Server Error) if the periodoLetivo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/periodo-letivos")
    @Timed
    public ResponseEntity<PeriodoLetivo> updatePeriodoLetivo(@RequestBody PeriodoLetivo periodoLetivo) throws URISyntaxException {
        log.debug("REST request to update PeriodoLetivo : {}", periodoLetivo);
        if (periodoLetivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PeriodoLetivo result = periodoLetivoRepository.save(periodoLetivo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, periodoLetivo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /periodo-letivos : get all the periodoLetivos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of periodoLetivos in body
     */
    @GetMapping("/periodo-letivos")
    @Timed
    public List<PeriodoLetivo> getAllPeriodoLetivos() {
        log.debug("REST request to get all PeriodoLetivos");
        return periodoLetivoRepository.findAll();
    }

    /**
     * GET  /periodo-letivos/:id : get the "id" periodoLetivo.
     *
     * @param id the id of the periodoLetivo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the periodoLetivo, or with status 404 (Not Found)
     */
    @GetMapping("/periodo-letivos/{id}")
    @Timed
    public ResponseEntity<PeriodoLetivo> getPeriodoLetivo(@PathVariable Long id) {
        log.debug("REST request to get PeriodoLetivo : {}", id);
        Optional<PeriodoLetivo> periodoLetivo = periodoLetivoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(periodoLetivo);
    }

    /**
     * DELETE  /periodo-letivos/:id : delete the "id" periodoLetivo.
     *
     * @param id the id of the periodoLetivo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/periodo-letivos/{id}")
    @Timed
    public ResponseEntity<Void> deletePeriodoLetivo(@PathVariable Long id) {
        log.debug("REST request to delete PeriodoLetivo : {}", id);

        periodoLetivoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
