package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Entrega;
import com.mycompany.myapp.repository.EntregaRepository;
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
 * REST controller for managing Entrega.
 */
@RestController
@RequestMapping("/api")
public class EntregaResource {

    private final Logger log = LoggerFactory.getLogger(EntregaResource.class);

    private static final String ENTITY_NAME = "entrega";

    private final EntregaRepository entregaRepository;

    public EntregaResource(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    /**
     * POST  /entregas : Create a new entrega.
     *
     * @param entrega the entrega to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entrega, or with status 400 (Bad Request) if the entrega has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entregas")
    @Timed
    public ResponseEntity<Entrega> createEntrega(@RequestBody Entrega entrega) throws URISyntaxException {
        log.debug("REST request to save Entrega : {}", entrega);
        if (entrega.getId() != null) {
            throw new BadRequestAlertException("A new entrega cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Entrega result = entregaRepository.save(entrega);
        return ResponseEntity.created(new URI("/api/entregas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entregas : Updates an existing entrega.
     *
     * @param entrega the entrega to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entrega,
     * or with status 400 (Bad Request) if the entrega is not valid,
     * or with status 500 (Internal Server Error) if the entrega couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entregas")
    @Timed
    public ResponseEntity<Entrega> updateEntrega(@RequestBody Entrega entrega) throws URISyntaxException {
        log.debug("REST request to update Entrega : {}", entrega);
        if (entrega.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Entrega result = entregaRepository.save(entrega);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entrega.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entregas : get all the entregas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of entregas in body
     */
    @GetMapping("/entregas")
    @Timed
    public List<Entrega> getAllEntregas(@RequestParam(required = false) String filter) {
        if ("atividade-is-null".equals(filter)) {
            log.debug("REST request to get all Entregas where atividade is null");
            return StreamSupport
                .stream(entregaRepository.findAll().spliterator(), false)
                .filter(entrega -> entrega.getAtividade() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Entregas");
        return entregaRepository.findAll();
    }

    /**
     * GET  /entregas/:id : get the "id" entrega.
     *
     * @param id the id of the entrega to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entrega, or with status 404 (Not Found)
     */
    @GetMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<Entrega> getEntrega(@PathVariable Long id) {
        log.debug("REST request to get Entrega : {}", id);
        Optional<Entrega> entrega = entregaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entrega);
    }

    /**
     * DELETE  /entregas/:id : delete the "id" entrega.
     *
     * @param id the id of the entrega to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entregas/{id}")
    @Timed
    public ResponseEntity<Void> deleteEntrega(@PathVariable Long id) {
        log.debug("REST request to delete Entrega : {}", id);

        entregaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
