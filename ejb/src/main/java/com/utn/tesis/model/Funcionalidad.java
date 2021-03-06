package com.utn.tesis.model;

import com.utn.tesis.exception.SAPOValidationException;

import javax.persistence.*;

@Entity
@Table(name = "funcionalidades")
public class Funcionalidad extends EntityBase {
    private static final long serialVersionUID = 4356415656347544709L;

    @Column(length = 255)
    private String nombre;

    // El estado asociado es el nombre del state de angular.
    @Column(length = 255, name = "estado_asociado")
    private String estadoAsociado;

    @ManyToOne
    @JoinColumn(name = "grupo_funcionalidad_id")
    private GrupoFuncionalidad grupoFuncionalidad;

    @Column(name = "es_item_menu")
    private boolean esItemMenu;

    public Funcionalidad() {
    }

    public Funcionalidad(String nombre, String estadoAsociado, GrupoFuncionalidad grupoFuncionalidad) {
        this.nombre = nombre;
        this.estadoAsociado = estadoAsociado;
        this.grupoFuncionalidad = grupoFuncionalidad;
    }

    @Override
    public void validar() throws SAPOValidationException {

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEstadoAsociado() {
        return estadoAsociado;
    }

    public void setEstadoAsociado(String estadoAsociado) {
        this.estadoAsociado = estadoAsociado;
    }

    public GrupoFuncionalidad getGrupoFuncionalidad() {
        return grupoFuncionalidad;
    }

    public void setGrupoFuncionalidad(GrupoFuncionalidad grupoFuncionalidad) {
        this.grupoFuncionalidad = grupoFuncionalidad;
    }

    public boolean isEsItemMenu() {
        return esItemMenu;
    }

    public void setEsItemMenu(boolean esItemMenu) {
        this.esItemMenu = esItemMenu;
    }
}
