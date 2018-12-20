package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Falta;
import com.mycompany.myapp.repository.FaltaRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Falta.
 */
@RestController
@RequestMapping("/api")
public class FaltaResource {

    private final Logger log = LoggerFactory.getLogger(FaltaResource.class);

    private static final String ENTITY_NAME = "falta";

    private final FaltaRepository faltaRepository;

    public FaltaResource(FaltaRepository faltaRepository) {
        this.faltaRepository = faltaRepository;
    }

    /**
     * POST  /faltas : Create a new falta.
     *
     * @param falta the falta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new falta, or with status 400 (Bad Request) if the falta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/faltas")
    @Timed
    public ResponseEntity<Falta> createFalta(@RequestBody Falta falta) throws URISyntaxException {
        log.debug("REST request to save Falta : {}", falta);
        if (falta.getId() != null) {
            throw new BadRequestAlertException("A new falta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Falta result = faltaRepository.save(falta);
        return ResponseEntity.created(new URI("/api/faltas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /faltas : Updates an existing falta.
     *
     * @param falta the falta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated falta,
     * or with status 400 (Bad Request) if the falta is not valid,
     * or with status 500 (Internal Server Error) if the falta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/faltas")
    @Timed
    public ResponseEntity<Falta> updateFalta(@RequestBody Falta falta) throws URISyntaxException {
        log.debug("REST request to update Falta : {}", falta);
        if (falta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Falta result = faltaRepository.save(falta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, falta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /faltas : get all the faltas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of faltas in body
     */
    @GetMapping("/faltas")
    @Timed
    public List<Falta> getAllFaltas(@RequestParam(required = false) String filter) {
        if ("periodoletivo-is-null".equals(filter)) {
            log.debug("REST request to get all Faltas where periodoLetivo is null");
            return StreamSupport
                .stream(faltaRepository.findAll().spliterator(), false)
                .filter(falta -> falta.getPeriodoLetivo() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Faltas");
        return faltaRepository.findAll();
    }

    /**
     * GET  /faltas/:id : get the "id" falta.
     *
     * @param id the id of the falta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the falta, or with status 404 (Not Found)
     */
    @GetMapping("/faltas/{id}")
    @Timed
    public ResponseEntity<Falta> getFalta(@PathVariable Long id) {
        log.debug("REST request to get Falta : {}", id);
        Optional<Falta> falta = faltaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(falta);
    }

    /**
     * DELETE  /faltas/:id : delete the "id" falta.
     *
     * @param id the id of the falta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/faltas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFalta(@PathVariable Long id) {
        log.debug("REST request to delete Falta : {}", id);

        faltaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
