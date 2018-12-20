package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MyApp;

import com.mycompany.myapp.domain.Entrega;
import com.mycompany.myapp.repository.EntregaRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EntregaResource REST controller.
 *
 * @see EntregaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class EntregaResourceIntTest {

    private static final Float DEFAULT_QUANTIDADE = 1F;
    private static final Float UPDATED_QUANTIDADE = 2F;

    @Autowired
    private EntregaRepository entregaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restEntregaMockMvc;

    private Entrega entrega;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntregaResource entregaResource = new EntregaResource(entregaRepository);
        this.restEntregaMockMvc = MockMvcBuilders.standaloneSetup(entregaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entrega createEntity(EntityManager em) {
        Entrega entrega = new Entrega()
            .quantidade(DEFAULT_QUANTIDADE);
        return entrega;
    }

    @Before
    public void initTest() {
        entrega = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntrega() throws Exception {
        int databaseSizeBeforeCreate = entregaRepository.findAll().size();

        // Create the Entrega
        restEntregaMockMvc.perform(post("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrega)))
            .andExpect(status().isCreated());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeCreate + 1);
        Entrega testEntrega = entregaList.get(entregaList.size() - 1);
        assertThat(testEntrega.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
    }

    @Test
    @Transactional
    public void createEntregaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entregaRepository.findAll().size();

        // Create the Entrega with an existing ID
        entrega.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntregaMockMvc.perform(post("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrega)))
            .andExpect(status().isBadRequest());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEntregas() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        // Get all the entregaList
        restEntregaMockMvc.perform(get("/api/entregas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entrega.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        // Get the entrega
        restEntregaMockMvc.perform(get("/api/entregas/{id}", entrega.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entrega.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEntrega() throws Exception {
        // Get the entrega
        restEntregaMockMvc.perform(get("/api/entregas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        int databaseSizeBeforeUpdate = entregaRepository.findAll().size();

        // Update the entrega
        Entrega updatedEntrega = entregaRepository.findById(entrega.getId()).get();
        // Disconnect from session so that the updates on updatedEntrega are not directly saved in db
        em.detach(updatedEntrega);
        updatedEntrega
            .quantidade(UPDATED_QUANTIDADE);

        restEntregaMockMvc.perform(put("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntrega)))
            .andExpect(status().isOk());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeUpdate);
        Entrega testEntrega = entregaList.get(entregaList.size() - 1);
        assertThat(testEntrega.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
    }

    @Test
    @Transactional
    public void updateNonExistingEntrega() throws Exception {
        int databaseSizeBeforeUpdate = entregaRepository.findAll().size();

        // Create the Entrega

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntregaMockMvc.perform(put("/api/entregas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entrega)))
            .andExpect(status().isBadRequest());

        // Validate the Entrega in the database
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntrega() throws Exception {
        // Initialize the database
        entregaRepository.saveAndFlush(entrega);

        int databaseSizeBeforeDelete = entregaRepository.findAll().size();

        // Get the entrega
        restEntregaMockMvc.perform(delete("/api/entregas/{id}", entrega.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Entrega> entregaList = entregaRepository.findAll();
        assertThat(entregaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entrega.class);
        Entrega entrega1 = new Entrega();
        entrega1.setId(1L);
        Entrega entrega2 = new Entrega();
        entrega2.setId(entrega1.getId());
        assertThat(entrega1).isEqualTo(entrega2);
        entrega2.setId(2L);
        assertThat(entrega1).isNotEqualTo(entrega2);
        entrega1.setId(null);
        assertThat(entrega1).isNotEqualTo(entrega2);
    }
}
