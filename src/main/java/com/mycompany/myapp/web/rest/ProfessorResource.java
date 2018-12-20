package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Professor;
import com.mycompany.myapp.repository.ProfessorRepository;
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
 * REST controller for managing Professor.
 */
@RestController
@RequestMapping("/api")
public class ProfessorResource {

    private final Logger log = LoggerFactory.getLogger(ProfessorResource.class);

    private static final String ENTITY_NAME = "professor";

    private final ProfessorRepository professorRepository;

    public ProfessorResource(ProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    /**
     * POST  /professors : Create a new professor.
     *
     * @param professor the professor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new professor, or with status 400 (Bad Request) if the professor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/professors")
    @Timed
    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) throws URISyntaxException {
        log.debug("REST request to save Professor : {}", professor);
        if (professor.getId() != null) {
            throw new BadRequestAlertException("A new professor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Professor result = professorRepository.save(professor);
        return ResponseEntity.created(new URI("/api/professors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /professors : Updates an existing professor.
     *
     * @param professor the professor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated professor,
     * or with status 400 (Bad Request) if the professor is not valid,
     * or with status 500 (Internal Server Error) if the professor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/professors")
    @Timed
    public ResponseEntity<Professor> updateProfessor(@RequestBody Professor professor) throws URISyntaxException {
        log.debug("REST request to update Professor : {}", professor);
        if (professor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Professor result = professorRepository.save(professor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, professor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /professors : get all the professors.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of professors in body
     */
    @GetMapping("/professors")
    @Timed
    public List<Professor> getAllProfessors(@RequestParam(required = false) String filter) {
        if ("disciplina-is-null".equals(filter)) {
            log.debug("REST request to get all Professors where disciplina is null");
            return StreamSupport
                .stream(professorRepository.findAll().spliterator(), false)
                .filter(professor -> professor.getDisciplina() == null)
                .collect(Collectors.toList());
        }
        if ("turma-is-null".equals(filter)) {
            log.debug("REST request to get all Professors where turma is null");
            return StreamSupport
                .stream(professorRepository.findAll().spliterator(), false)
                .filter(professor -> professor.getTurma() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Professors");
        return professorRepository.findAll();
    }

    /**
     * GET  /professors/:id : get the "id" professor.
     *
     * @param id the id of the professor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the professor, or with status 404 (Not Found)
     */
    @GetMapping("/professors/{id}")
    @Timed
    public ResponseEntity<Professor> getProfessor(@PathVariable Long id) {
        log.debug("REST request to get Professor : {}", id);
        Optional<Professor> professor = professorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(professor);
    }

    /**
     * DELETE  /professors/:id : delete the "id" professor.
     *
     * @param id the id of the professor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/professors/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        log.debug("REST request to delete Professor : {}", id);

        professorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
