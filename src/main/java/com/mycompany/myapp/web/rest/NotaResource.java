package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Nota;
import com.mycompany.myapp.repository.NotaRepository;
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
 * REST controller for managing Nota.
 */
@RestController
@RequestMapping("/api")
public class NotaResource {

    private final Logger log = LoggerFactory.getLogger(NotaResource.class);

    private static final String ENTITY_NAME = "nota";

    private final NotaRepository notaRepository;

    public NotaResource(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    /**
     * POST  /notas : Create a new nota.
     *
     * @param nota the nota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nota, or with status 400 (Bad Request) if the nota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notas")
    @Timed
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to save Nota : {}", nota);
        if (nota.getId() != null) {
            throw new BadRequestAlertException("A new nota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.created(new URI("/api/notas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notas : Updates an existing nota.
     *
     * @param nota the nota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nota,
     * or with status 400 (Bad Request) if the nota is not valid,
     * or with status 500 (Internal Server Error) if the nota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notas")
    @Timed
    public ResponseEntity<Nota> updateNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to update Nota : {}", nota);
        if (nota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notas : get all the notas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notas in body
     */
    @GetMapping("/notas")
    @Timed
    public List<Nota> getAllNotas() {
        log.debug("REST request to get all Notas");
        return notaRepository.findAll();
    }

    /**
     * GET  /notas/:id : get the "id" nota.
     *
     * @param id the id of the nota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nota, or with status 404 (Not Found)
     */
    @GetMapping("/notas/{id}")
    @Timed
    public ResponseEntity<Nota> getNota(@PathVariable Long id) {
        log.debug("REST request to get Nota : {}", id);
        Optional<Nota> nota = notaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nota);
    }

    /**
     * DELETE  /notas/:id : delete the "id" nota.
     *
     * @param id the id of the nota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notas/{id}")
    @Timed
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        log.debug("REST request to delete Nota : {}", id);

        notaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
