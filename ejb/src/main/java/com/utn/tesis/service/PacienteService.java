package com.utn.tesis.service;

import com.google.common.collect.ImmutableMap;
import com.utn.tesis.data.daos.DaoBase;
import com.utn.tesis.data.daos.PacienteDao;
import com.utn.tesis.exception.SAPOException;
import com.utn.tesis.exception.SAPOValidationException;
import com.utn.tesis.mapping.dto.ArchivoDTO;
import com.utn.tesis.mapping.dto.HistoriaClinicaDTO;
import com.utn.tesis.mapping.dto.PacienteDTO;
import com.utn.tesis.mapping.mapper.ArchivoMapper;
import com.utn.tesis.mapping.mapper.HistoriaClinicaMapper;
import com.utn.tesis.mapping.mapper.PacienteMapper;
import com.utn.tesis.model.*;
import org.apache.commons.lang3.tuple.Pair;
import com.utn.tesis.model.odontograma.Odontograma;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Validator;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Stateless
public class PacienteService extends BaseService<Paciente> {
    @Inject
    private PacienteDao dao;
    @Inject
    private Validator validator;
    @Inject
    private PacienteMapper pacienteMapper;
    @Inject
    private HistoriaClinicaService historiaClinicaService;
    @Inject
    private ArchivoService archivoService;
    @Inject
    private ArchivoMapper archivoMapper;
    @Inject
    private PdfGenerator pdfGenerator;
    @Inject
    private HistoriaClinicaMapper historiaClinicaMapper;

    @Override
    DaoBase<Paciente> getDao() {
        return dao;
    }

    @Override
    Validator getValidator() {
        return validator;
    }

    public List<Paciente> findByFilters(String nombre, String apellido, Documento documento, Sexo sexo, boolean dadosBaja, Long page, Long pageSize) {
        return dao.findByFilters(nombre, apellido, documento, sexo, dadosBaja, page, pageSize);
    }

    public List<Paciente> findByNombreApellido(String nombApp, Long page, Long pageSize) {
        return dao.findByNombreApellido(nombApp, page, pageSize);
    }

    public PacienteDTO savePaciente(Paciente entity) throws SAPOException {
        HistoriaClinica historiaClinica = historiaClinicaService.save(HistoriaClinica.createDefault());
        entity.setHistoriaClinica(historiaClinica);
        return pacienteMapper.toDTO(save(entity));
    }

    @Override
    protected void bussinessValidation(Paciente entity) throws SAPOValidationException {
        List<Paciente> sameDocumentPersons = dao.validateByDocument(entity);
        if (!sameDocumentPersons.isEmpty()) {
            throw new SAPOValidationException(ImmutableMap.of("documento", "Número y tipo de documento ya registrado."));
        }
        List<Paciente> sameEmailPacientes = dao.validateByEmail(entity);
        if (!sameEmailPacientes.isEmpty()) {
            throw new SAPOValidationException(ImmutableMap.of("email", "Correo electrónico ya registrado."));
        }
        super.bussinessValidation(entity);
    }

    public PacienteDTO findPacienteConDiagnosticos(Long pacienteId) {
        Paciente paciente = this.findById(pacienteId);
        return pacienteMapper.toDTO(paciente);
    }

    public List<Long> updateCurrentDocsDescriptionAndSaveTempNewDocs(List<ArchivoDTO> archivoDTOs, Long idPaciente) throws SAPOException {
        Paciente paciente = this.findById(idPaciente);
        HistoriaClinica hc = paciente.getHistoriaClinica();
        hc.getDocumentacion().clear();
        List<Long> newFiles = new ArrayList<Long>();
        for (ArchivoDTO archivoDTO: archivoDTOs) {
            Archivo archivo;
            if (archivoDTO.getId() != null) {
                archivo = archivoService.findById(archivoDTO.getId());
                archivo.setDescripcion(archivoDTO.getDescripcion());
            } else {
                archivo = new Archivo();
                archivoMapper.updateFromDTO(archivoDTO, archivo);
                archivo.setRuta("temporalPath");
                archivo.setExtension(FileExtension.NONE);
                archivoService.save(archivo);
                newFiles.add(archivo.getId());
            }
            hc.getDocumentacion().add(archivo);
        }
        return newFiles;
    }

    public List<ArchivoDTO> findDocumentacionesByPaciente(Long pacienteId) {
        return archivoMapper.toDTOList(dao.findDocumentacionesByPaciente(pacienteId));
    }

    public Odontograma findOdontogramaById(Long historiaClinicaId){
        HistoriaClinica hc = historiaClinicaService.findById(historiaClinicaId);
        Odontograma o = hc.getOdontograma();
        return o;
    }


    public Pair<String, byte[]> generateHCPDF(Long idPaciente) throws IOException {
        Paciente paciente = this.findById(idPaciente);
        File hcPdf = pdfGenerator.createHCPDF(paciente);
        InputStream inputStream = new FileInputStream(hcPdf);
        byte[] buff = new byte[(int) hcPdf.length()];
        inputStream.read(buff, 0, (int) hcPdf.length());

        byte[] fileContent;
        ByteArrayInputStream buffer = new ByteArrayInputStream(buff);
        fileContent = new byte[buffer.available()];
        buffer.read(fileContent, 0, buffer.available());
        return Pair.of(hcPdf.getName(), fileContent);
    }

    public PacienteDTO savePacienteImage(ArchivoDTO archivo, Long pacienteId) throws SAPOException {
        Paciente paciente = findById(pacienteId);
        paciente.setImagen(archivoService.save(archivo));
        return pacienteMapper.toDTO(paciente);
    }

    public PacienteDTO findDTOById(Long pacienteId) {
        Paciente paciente = findById(pacienteId);
        if (paciente == null) {
            return null;
        }

        PacienteDTO pacienteDTO = pacienteMapper.toDTO(paciente);
        HistoriaClinicaDTO historiaClinicaDTO = historiaClinicaMapper.toDTO(paciente.getHistoriaClinica());
        pacienteDTO.setHistoriaClinicaDTO(historiaClinicaDTO);
        return pacienteDTO;
    }

    public PacienteDTO findLightDTOById(Long pacienteId) {
        Paciente paciente = findById(pacienteId);
        if (paciente == null) return null;
        return pacienteMapper.toDTO(paciente);
    }

    public String findOdontogramaUriById(Long id) {
        HistoriaClinica hc = historiaClinicaService.findById(id);
        return hc.getOdontogramaUri();
    }
}
