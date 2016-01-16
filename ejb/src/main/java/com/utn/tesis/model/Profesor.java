package com.utn.tesis.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: enzo
 * Date: 20/05/15
 * Time: 00:05
 */
@Entity
public class Profesor extends Persona {

    @OneToMany
    @NotNull(message = "La lista de catedras del profesor no puede ser nula.")
    private List<Catedra> catedras;

    private int legajo;

    @Size(max = 25, message = "La matricula no puede tener mas de 25 caracteres")
    @Column(length = 25)
    private String matricula;

    @Size(max = 75, message = "La profesion no puede tener mas de 75 caracteres.")
    @Column(length = 75)
    private String profesion;

    public Profesor() {
        this.catedras = new ArrayList<Catedra>();
    }

    public List<Catedra> getCatedras() {
        return catedras;
    }

    public void setCatedras(List<Catedra> catedras) {
        this.catedras = catedras;
    }

    public boolean addCatedra(Catedra c) {
        if (catedras == null) return false;
        return catedras.add(c);
    }

    public boolean removeCatedra(Catedra c) {
        if (catedras == null) return false;
        return catedras.remove(c);
    }

    public int getLegajo() {
        return legajo;
    }

    public void setLegajo(int legajo) {
        this.legajo = legajo;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getProfesion() {
        return profesion;
    }

    public void setProfesion(String profesion) {
        this.profesion = profesion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Profesor)) return false;
        if (!super.equals(o)) return false;

        Profesor profesor = (Profesor) o;

        if (catedras != null ? !catedras.equals(profesor.catedras) : profesor.catedras != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (catedras != null ? catedras.hashCode() : 0);
        return result;
    }
}
