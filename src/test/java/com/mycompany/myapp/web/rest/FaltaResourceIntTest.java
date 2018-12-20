package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MyApp;

import com.mycompany.myapp.domain.Falta;
import com.mycompany.myapp.repository.FaltaRepository;
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
 * Test class for the FaltaResource REST controller.
 *
 * @see FaltaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MyApp.class)
public class FaltaResourceIntTest {

    private static final Float DEFAULT_QUANTIDADE = 1F;
    private static final Float UPDATED_QUANTIDADE = 2F;

    private static final String DEFAULT_DATA = "AAAAAAAAAA";
    private static final String UPDATED_DATA = "BBBBBBBBBB";

    @Autowired
    private FaltaRepository faltaRepository;

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

    private MockMvc restFaltaMockMvc;

    private Falta falta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FaltaResource faltaResource = new FaltaResource(faltaRepository);
        this.restFaltaMockMvc = MockMvcBuilders.standaloneSetup(faltaResource)
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
    public static Falta createEntity(EntityManager em) {
        Falta falta = new Falta()
            .quantidade(DEFAULT_QUANTIDADE)
            .data(DEFAULT_DATA);
        return falta;
    }

    @Before
    public void initTest() {
        falta = createEntity(em);
    }

    @Test
    @Transactional
    public void createFalta() throws Exception {
        int databaseSizeBeforeCreate = faltaRepository.findAll().size();

        // Create the Falta
        restFaltaMockMvc.perform(post("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isCreated());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeCreate + 1);
        Falta testFalta = faltaList.get(faltaList.size() - 1);
        assertThat(testFalta.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testFalta.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createFaltaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faltaRepository.findAll().size();

        // Create the Falta with an existing ID
        falta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaltaMockMvc.perform(post("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isBadRequest());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFaltas() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        // Get all the faltaList
        restFaltaMockMvc.perform(get("/api/faltas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(falta.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE.doubleValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        // Get the falta
        restFaltaMockMvc.perform(get("/api/faltas/{id}", falta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(falta.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE.doubleValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFalta() throws Exception {
        // Get the falta
        restFaltaMockMvc.perform(get("/api/faltas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        int databaseSizeBeforeUpdate = faltaRepository.findAll().size();

        // Update the falta
        Falta updatedFalta = faltaRepository.findById(falta.getId()).get();
        // Disconnect from session so that the updates on updatedFalta are not directly saved in db
        em.detach(updatedFalta);
        updatedFalta
            .quantidade(UPDATED_QUANTIDADE)
            .data(UPDATED_DATA);

        restFaltaMockMvc.perform(put("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFalta)))
            .andExpect(status().isOk());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeUpdate);
        Falta testFalta = faltaList.get(faltaList.size() - 1);
        assertThat(testFalta.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testFalta.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingFalta() throws Exception {
        int databaseSizeBeforeUpdate = faltaRepository.findAll().size();

        // Create the Falta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFaltaMockMvc.perform(put("/api/faltas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(falta)))
            .andExpect(status().isBadRequest());

        // Validate the Falta in the database
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFalta() throws Exception {
        // Initialize the database
        faltaRepository.saveAndFlush(falta);

        int databaseSizeBeforeDelete = faltaRepository.findAll().size();

        // Get the falta
        restFaltaMockMvc.perform(delete("/api/faltas/{id}", falta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Falta> faltaList = faltaRepository.findAll();
        assertThat(faltaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Falta.class);
        Falta falta1 = new Falta();
        falta1.setId(1L);
        Falta falta2 = new Falta();
        falta2.setId(falta1.getId());
        assertThat(falta1).isEqualTo(falta2);
        falta2.setId(2L);
        assertThat(falta1).isNotEqualTo(falta2);
        falta1.setId(null);
        assertThat(falta1).isNotEqualTo(falta2);
    }
}
