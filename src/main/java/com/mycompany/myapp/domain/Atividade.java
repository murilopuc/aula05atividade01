package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Atividade.
 */
@Entity
@Table(name = "atividade")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_atividade")
    private Integer codigoAtividade;

    @Column(name = "nome")
    private String nome;

    @OneToOne    @JoinColumn(unique = true)
    private Entrega entrega;

    @OneToOne(mappedBy = "atividade")
    @JsonIgnore
    private Nota nota;

    @OneToOne(mappedBy = "atividade")
    @JsonIgnore
    private Disciplina disciplina;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigoAtividade() {
        return codigoAtividade;
    }

    public Atividade codigoAtividade(Integer codigoAtividade) {
        this.codigoAtividade = codigoAtividade;
        return this;
    }

    public void setCodigoAtividade(Integer codigoAtividade) {
        this.codigoAtividade = codigoAtividade;
    }

    public String getNome() {
        return nome;
    }

    public Atividade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Entrega getEntrega() {
        return entrega;
    }

    public Atividade entrega(Entrega entrega) {
        this.entrega = entrega;
        return this;
    }

    public void setEntrega(Entrega entrega) {
        this.entrega = entrega;
    }

    public Nota getNota() {
        return nota;
    }

    public Atividade nota(Nota nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Nota nota) {
        this.nota = nota;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public Atividade disciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
        return this;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Atividade atividade = (Atividade) o;
        if (atividade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), atividade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Atividade{" +
            "id=" + getId() +
            ", codigoAtividade=" + getCodigoAtividade() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
