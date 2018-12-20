package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Aula.
 */
@Entity
@Table(name = "aula")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantidade")
    private Float quantidade;

    @Column(name = "data")
    private String data;

    @OneToOne    @JoinColumn(unique = true)
    private Turma turma;

    @OneToOne(mappedBy = "aula")
    @JsonIgnore
    private Falta falta;

    @OneToOne(mappedBy = "aula")
    @JsonIgnore
    private PeriodoLetivo periodoLetivo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getQuantidade() {
        return quantidade;
    }

    public Aula quantidade(Float quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Float quantidade) {
        this.quantidade = quantidade;
    }

    public String getData() {
        return data;
    }

    public Aula data(String data) {
        this.data = data;
        return this;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Turma getTurma() {
        return turma;
    }

    public Aula turma(Turma turma) {
        this.turma = turma;
        return this;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Falta getFalta() {
        return falta;
    }

    public Aula falta(Falta falta) {
        this.falta = falta;
        return this;
    }

    public void setFalta(Falta falta) {
        this.falta = falta;
    }

    public PeriodoLetivo getPeriodoLetivo() {
        return periodoLetivo;
    }

    public Aula periodoLetivo(PeriodoLetivo periodoLetivo) {
        this.periodoLetivo = periodoLetivo;
        return this;
    }

    public void setPeriodoLetivo(PeriodoLetivo periodoLetivo) {
        this.periodoLetivo = periodoLetivo;
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
        Aula aula = (Aula) o;
        if (aula.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aula.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aula{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            ", data='" + getData() + "'" +
            "}";
    }
}
