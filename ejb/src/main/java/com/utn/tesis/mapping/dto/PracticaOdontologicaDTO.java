package com.utn.tesis.mapping.dto;

import java.util.Calendar;

public class PracticaOdontologicaDTO extends BaseDTO {
    private static final long serialVersionUID = -6183462980771041808L;

    private Calendar fechaBaja;
    private String motivoBaja;
    private String denominacion;
    private String observaciones;
    private GrupoPracticaOdontologicaDTO grupo;

    public Calendar getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Calendar fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public String getMotivoBaja() {
        return motivoBaja;
    }

    public void setMotivoBaja(String motivoBaja) {
        this.motivoBaja = motivoBaja;
    }

    public String getDenominacion() {
        return denominacion;
    }

    public void setDenominacion(String denominacion) {
        this.denominacion = denominacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public GrupoPracticaOdontologicaDTO getGrupo() {
        return grupo;
    }

    public void setGrupo(GrupoPracticaOdontologicaDTO grupo) {
        this.grupo = grupo;
    }
}
