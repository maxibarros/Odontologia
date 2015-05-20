package com.utn.tesis.data.daos;

import com.mysema.query.jpa.impl.JPAQuery;
import com.utn.tesis.model.GrupoPracticaOdontologica;
import com.utn.tesis.model.QGrupoPracticaOdontologica;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: enzo
 * Date: 10/05/15
 * Time: 18:18
 */
public class GrupoPracticaOdontologicaDao {

    @PersistenceContext(unitName = "primary")
    protected EntityManager em;

    public List<GrupoPracticaOdontologica> findAll() {
        QGrupoPracticaOdontologica practica = QGrupoPracticaOdontologica.grupoPracticaOdontologica;

        JPAQuery query = new JPAQuery(em).from(practica);

        return query.list(practica);
    }
}