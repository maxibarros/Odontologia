package com.utn.tesis.model;

import com.utn.tesis.exception.SAPOValidationException;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "materias")
public class Materia extends Bajeable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "Debe ingresar un nombre.")
    @Size(max = 50, message = "El nombre debe tener entre 0 y 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String nombre;

    @NotNull(message = "Debe ingresar el nivel.")
    @Enumerated(EnumType.STRING)
    private Nivel nivel;

    @Size(max = 400)
    @Column(length = 400)
    private String descripcion;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Nivel getNivel() {
        return nivel;
    }

    public void setNivel(Nivel nivel) {
        this.nivel = nivel;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public void validar() throws SAPOValidationException {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Materia)) return false;
        if (!super.equals(o)) return false;

        Materia materia = (Materia) o;

        if (nivel != materia.nivel) return false;
        if (nombre != null ? !nombre.equals(materia.nombre) : materia.nombre != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (nivel != null ? nivel.hashCode() : 0);
        return result;
    }
}
