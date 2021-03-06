package com.utn.tesis.data.daos;

import com.mysema.query.jpa.impl.JPAQuery;
import com.utn.tesis.model.*;

import java.util.List;

public class MateriaDao extends DaoBase<Materia> {

    QMateria materia = QMateria.materia;

    public List<Materia> findByFilters(String nombre, Nivel nivel, boolean dadosBaja,
                                       Long page, Long pageSize) {

        JPAQuery query = new JPAQuery(em).from(materia);
        if (nombre != null)
            query.where(materia.nombre.startsWith(nombre));
        if (nivel != null)
            query.where(materia.nivel.eq(nivel));
        if (!dadosBaja)
            query.where(materia.fechaBaja.isNull());
        query = paginar(query, page, pageSize);
        return query.list(materia);
    }


    public Materia findByNombre(String nombre) {

        JPAQuery query = new JPAQuery(em).from(materia);
        query.where(materia.nombre.equalsIgnoreCase(nombre));

        List<Materia> result = query.list(materia);
        return result.isEmpty() ? null : result.get(0);
    }

    public boolean canDelete(Materia entity) {
        QCatedra catedra = QCatedra.catedra;
        JPAQuery query = new JPAQuery(em).from(catedra)
                .innerJoin(catedra.materia, materia)
                .where(materia.id.eq(entity.getId()).and(catedra.fechaBaja.isNull()));

        List<Catedra> catedras = query.list(catedra);
        return catedras.isEmpty();
    }
}
