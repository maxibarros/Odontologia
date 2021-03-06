package com.utn.tesis.model;

import com.utn.tesis.exception.SAPOValidationException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "obras_sociales")
public class ObraSocial extends EntityBase {
    private static final long serialVersionUID = 8939343733653761443L;

    @NotNull(message = "El nombre de la obra social no puede ser nulo.")
    @Size(max = 50, message = "El nombre de la obra social no puede superar los 50 caracteres")
    @Column(nullable = false, length = 50)
    private String nombre;

    public ObraSocial() {
    }

    public ObraSocial(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ObraSocial)) return false;
        if (!super.equals(o)) return false;

        ObraSocial that = (ObraSocial) o;

        if (nombre != null ? !nombre.equals(that.nombre) : that.nombre != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        return result;
    }

    @Override
    public void validar() throws SAPOValidationException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return nombre;
    }
}
