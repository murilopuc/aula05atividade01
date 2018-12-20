package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Permissao.
 */
@Entity
@Table(name = "permissao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Permissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigop_ermissao")
    private Integer codigopERMISSAO;

    @OneToOne    @JoinColumn(unique = true)
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodigopERMISSAO() {
        return codigopERMISSAO;
    }

    public Permissao codigopERMISSAO(Integer codigopERMISSAO) {
        this.codigopERMISSAO = codigopERMISSAO;
        return this;
    }

    public void setCodigopERMISSAO(Integer codigopERMISSAO) {
        this.codigopERMISSAO = codigopERMISSAO;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Permissao usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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
        Permissao permissao = (Permissao) o;
        if (permissao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), permissao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Permissao{" +
            "id=" + getId() +
            ", codigopERMISSAO=" + getCodigopERMISSAO() +
            "}";
    }
}
