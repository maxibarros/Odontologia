package com.utn.tesis.service;

import com.utn.tesis.data.daos.DaoBase;
import com.utn.tesis.data.daos.DiagnosticoDao;
import com.utn.tesis.exception.SAPOException;
import com.utn.tesis.mapping.dto.DiagnosticoDTO;
import com.utn.tesis.mapping.dto.MovimientoDiagnosticoDTO;
import com.utn.tesis.mapping.dto.UsuarioLogueadoDTO;
import com.utn.tesis.mapping.mapper.DiagnosticoMapper;
import com.utn.tesis.mapping.mapper.MovimientoDiagnosticoMapper;
import com.utn.tesis.model.*;
import com.utn.tesis.model.odontograma.HallazgoClinico;
import com.utn.tesis.model.odontograma.PiezaDental;
import com.utn.tesis.util.Collections;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Validator;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Stateless
public class DiagnosticoService extends BaseService<Diagnostico> {
    @Inject
    private DiagnosticoDao dao;
    @Inject
    private Validator validator;
    @Inject
    private DiagnosticoMapper diagnosticoMapper;
    @Inject
    private PacienteService pacienteService;
    @Inject
    private MovimientoDiagnosticoService movimientoDiagnosticoService;
    @Inject
    private UsuarioService usuarioService;
    @Inject
    private MovimientoDiagnosticoMapper movimientoDiagnosticoMapper;
    @Inject
    private PracticaOdontologicaService practicaOdontologicaService;

    @Override
    DaoBase<Diagnostico> getDao() {
        return dao;
    }

    @Override
    Validator getValidator() {
        return validator;
    }

    public List<DiagnosticoDTO> findByFilters(Long practicaId,
                                              EstadoDiagnostico estado,
                                              Date fechaCreacionDesde,
                                              Date fechaCreacionHasta,
                                              Long pacienteId,
                                              Long pageNumber,
                                              Long pageSize) {
        List<Diagnostico> diagnosticos = dao.findByFilters(practicaId, estado, fechaCreacionDesde, fechaCreacionHasta, pacienteId, pageNumber, pageSize);
        return diagnosticoMapper.toDTOList(diagnosticos);
    }

    public List<Diagnostico> findByFilters(Calendar fechaCreacion, MovimientoDiagnostico movimiento,
                                           PracticaOdontologica practicaOdontologica, Long page, Long pageSize) {
        return dao.findByFilters(fechaCreacion, movimiento, practicaOdontologica, page, pageSize);
    }

    public List<Diagnostico> findAllDiagnosticosByPaciente(Long pacienteId) {
        return dao.findAllByPaciente(pacienteId);
    }

    public List<DiagnosticoDTO> findOpenDiagnosticosByPaciente(Long pacienteId) {
        List<Diagnostico> openDiagnosticos = dao.findOpenByPaciente(pacienteId);
        return diagnosticoMapper.toDTOList(openDiagnosticos);
    }

    public List<Diagnostico> saveDiagnosticosByPaciente(List<DiagnosticoDTO> diagnosticos, Long pacienteId, UsuarioLogueadoDTO usuarioLogueado) throws SAPOException {
        List<Diagnostico> diagnosticosResponse = new ArrayList<Diagnostico>();
        Paciente paciente = pacienteService.findById(pacienteId);
        for (DiagnosticoDTO diagnosticoDTO : diagnosticos) {
            for (Diagnostico diagnostico : paciente.getHistoriaClinica().getDiagnostico()) {
                if (diagnostico.getId().equals(diagnosticoDTO.getId())) {
                    MovimientoDiagnosticoDTO newMovimiento = null;
                    for (MovimientoDiagnosticoDTO movimientoDiagnosticoDTO : diagnosticoDTO.getMovimientos()) {
                        if (movimientoDiagnosticoDTO.getId() == null) {
                            newMovimiento = movimientoDiagnosticoDTO;
                            break;
                        }
                    }
                    if (newMovimiento != null) {
                        updateDiagnostico(diagnostico, newMovimiento, usuarioLogueado);
                    }
                }
            }

            if (diagnosticoDTO.getId() == null) {
                Diagnostico diagnostico = save(createNewDiagnostico(diagnosticoDTO, usuarioLogueado));
                paciente.getHistoriaClinica().addDiagnostico(diagnostico);
                diagnosticosResponse.add(diagnostico);
            }
        }
        return diagnosticosResponse;
    }


    private Diagnostico createNewDiagnostico(DiagnosticoDTO diagnosticoDTO, UsuarioLogueadoDTO usuarioLogueado) throws SAPOException {
        Diagnostico diagnostico = diagnosticoMapper.fromDTO(diagnosticoDTO);
        diagnostico.setFechaCreacion(Calendar.getInstance());
        if (diagnostico.getPracticaOdontologica() != null) {
            diagnostico.setPracticaOdontologica(practicaOdontologicaService.findById(diagnostico.getPracticaOdontologica().getId()));
        }
        MovimientoDiagnostico ultimoMovimiento = new MovimientoDiagnostico();
        ultimoMovimiento.setEstado(EstadoDiagnostico.PENDIENTE);
        ultimoMovimiento.setFechaMovimiento(Calendar.getInstance());
        ultimoMovimiento.setGeneradoPor(usuarioService.findById(usuarioLogueado.getId()));
        movimientoDiagnosticoService.save(ultimoMovimiento);
        diagnostico.setUltimoMovimiento(ultimoMovimiento);
        diagnostico.addMovimiento(ultimoMovimiento);
        return diagnostico;
    }

    private void updateDiagnostico(Diagnostico diagnostico, MovimientoDiagnosticoDTO movimientoDiagnosticoDTO, UsuarioLogueadoDTO usuarioLogueado) throws SAPOException {
        MovimientoDiagnostico newMovimiento = movimientoDiagnosticoMapper.fromDTO(movimientoDiagnosticoDTO);
        newMovimiento.setFechaMovimiento(Calendar.getInstance());
        newMovimiento.setGeneradoPor(usuarioService.findById(usuarioLogueado.getId()));
        movimientoDiagnosticoService.save(newMovimiento);
        diagnostico.setUltimoMovimiento(newMovimiento);
        diagnostico.addMovimiento(newMovimiento);
    }

    public void registrarMovimiento(Long diagnosticoId, Long generadoPor, EstadoDiagnostico proximoEstado, String observaciones, Atencion atencion) throws SAPOException {
        Diagnostico diagnostico = this.findById(diagnosticoId);
        Usuario usuario = usuarioService.findById(generadoPor);
        MovimientoDiagnostico ultimoMovimiento = new MovimientoDiagnostico();
        ultimoMovimiento.setFechaMovimiento(Calendar.getInstance());
        ultimoMovimiento.setGeneradoPor(usuario);
        ultimoMovimiento.setEstado(proximoEstado);
        ultimoMovimiento.setObservaciones(observaciones);
        ultimoMovimiento.setAtencion(atencion);
        movimientoDiagnosticoService.save(ultimoMovimiento);
        diagnostico.setUltimoMovimiento(ultimoMovimiento);
        diagnostico.getMovimientos().add(ultimoMovimiento);
    }
}
