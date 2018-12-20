package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PeriodoLetivo.
 */
@Entity
@Table(name = "periodo_letivo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PeriodoLetivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "d_ata_final")
    private String dAtaFinal;

    @Column(name = "data_inicial")
    private String dataInicial;

    @OneToOne    @JoinColumn(unique = true)
    private Falta falta;

    @OneToOne    @JoinColumn(unique = true)
    private Aula aula;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getdAtaFinal() {
        return dAtaFinal;
    }

    public PeriodoLetivo dAtaFinal(String dAtaFinal) {
        this.dAtaFinal = dAtaFinal;
        return this;
    }

    public void setdAtaFinal(String dAtaFinal) {
        this.dAtaFinal = dAtaFinal;
    }

    public String getDataInicial() {
        return dataInicial;
    }

    public PeriodoLetivo dataInicial(String dataInicial) {
        this.dataInicial = dataInicial;
        return this;
    }

    public void setDataInicial(String dataInicial) {
        this.dataInicial = dataInicial;
    }

    public Falta getFalta() {
        return falta;
    }

    public PeriodoLetivo falta(Falta falta) {
        this.falta = falta;
        return this;
    }

    public void setFalta(Falta falta) {
        this.falta = falta;
    }

    public Aula getAula() {
        return aula;
    }

    public PeriodoLetivo aula(Aula aula) {
        this.aula = aula;
        return this;
    }

    public void setAula(Aula aula) {
        this.aula = aula;
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
        PeriodoLetivo periodoLetivo = (PeriodoLetivo) o;
        if (periodoLetivo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), periodoLetivo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PeriodoLetivo{" +
            "id=" + getId() +
            ", dAtaFinal='" + getdAtaFinal() + "'" +
            ", dataInicial='" + getDataInicial() + "'" +
            "}";
    }
}
