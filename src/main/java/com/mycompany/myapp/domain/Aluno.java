package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_aluno")
    private Integer codigoAluno;

    @Column(name = "nome")
    private String nome;

    @OneToOne    @JoinColumn(unique = true)
    private Pessoa pessoa;

    @OneToOne(mappedBy = "aluno")
    @JsonIgnore
    private Nota nota;

    @OneToOne(mappedBy = "aluno")
    @JsonIgnore
    private Falta falta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigoAluno() {
        return codigoAluno;
    }

    public Aluno codigoAluno(Integer codigoAluno) {
        this.codigoAluno = codigoAluno;
        return this;
    }

    public void setCodigoAluno(Integer codigoAluno) {
        this.codigoAluno = codigoAluno;
    }

    public String getNome() {
        return nome;
    }

    public Aluno nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Aluno pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Nota getNota() {
        return nota;
    }

    public Aluno nota(Nota nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Nota nota) {
        this.nota = nota;
    }

    public Falta getFalta() {
        return falta;
    }

    public Aluno falta(Falta falta) {
        this.falta = falta;
        return this;
    }

    public void setFalta(Falta falta) {
        this.falta = falta;
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
        Aluno aluno = (Aluno) o;
        if (aluno.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), aluno.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", codigoAluno=" + getCodigoAluno() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
