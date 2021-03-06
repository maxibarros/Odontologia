package com.utn.tesis.mapping.dto;

import java.util.Calendar;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Usuario
 * Date: 20/02/16
 * Time: 15:03
 * To change this template use File | Settings | File Templates.
 */
public class PacienteDTO extends BaseDTO {
    //Datos Personales
    private String apellido;
    private String nombre;
    private EnumDTO estadoCivil;
    private EnumDTO nacionalidad;
    private EnumDTO sexo;
    private CiudadDTO lugarDeNacimiento;
    private DocumentoDTO documento;
    private DomicilioDTO domicilio;
    private Calendar fechaNacimiento;
    private Long historiaClinicaId;

    //Domicilio y contacto
    private String celular;
    private String email;
    private String telefono;

    //Datos médicos
    private String medicoCabecera;
    private ObraSocialDTO obraSocial;
    private String servicioEmergencia;
    private String telefonoMedicoCabecera;
    //Trabajo
    private TrabajoDTO trabajo;
    private EnumDTO  nivelEstudio;
    //Otros datos
    private String religion;
    private boolean privadoLibertad;
    private String privadoLibertadDonde;
    //fechaCarga
    private Calendar fechaCarga;
    //Baja
    private String motivoBaja;
    private Calendar fechaBaja;
    //Historia clínica
    private HistoriaClinicaDTO historiaClinicaDTO;

    private Long imagenId;
    //CONSTRUCTOR

    public PacienteDTO() {
    }

    //GETTERS AND SETTERS
    public HistoriaClinicaDTO getHistoriaClinicaDTO() {
        return historiaClinicaDTO;
    }

    public void setHistoriaClinicaDTO(HistoriaClinicaDTO historiaClinicaDTO) {
        this.historiaClinicaDTO = historiaClinicaDTO;
    }

    public Calendar getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Calendar fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getMotivoBaja() {
        return motivoBaja;
    }

    public void setMotivoBaja(String motivoBaja) {
        this.motivoBaja = motivoBaja;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getMedicoCabecera() {
        return medicoCabecera;
    }

    public void setMedicoCabecera(String medicoCabecera) {
        this.medicoCabecera = medicoCabecera;
    }

    public String getServicioEmergencia() {
        return servicioEmergencia;
    }

    public void setServicioEmergencia(String servicioEmergencia) {
        this.servicioEmergencia = servicioEmergencia;
    }

    public String getTelefonoMedicoCabecera() {
        return telefonoMedicoCabecera;
    }

    public void setTelefonoMedicoCabecera(String telefonoMedicoCabecera) {
        this.telefonoMedicoCabecera = telefonoMedicoCabecera;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public EnumDTO getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(EnumDTO estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public EnumDTO getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(EnumDTO nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public ObraSocialDTO getObraSocial() {
        return obraSocial;
    }

    public void setObraSocial(ObraSocialDTO obraSocial) {
        this.obraSocial = obraSocial;
    }

    public TrabajoDTO getTrabajo() {
        return trabajo;
    }

    public void setTrabajo(TrabajoDTO trabajo) {
        this.trabajo = trabajo;
    }

    public CiudadDTO getLugarDeNacimiento() {
        return lugarDeNacimiento;
    }

    public void setLugarDeNacimiento(CiudadDTO lugarDeNacimiento) {
        this.lugarDeNacimiento = lugarDeNacimiento;
    }

    public EnumDTO getNivelEstudio() {
        return nivelEstudio;
    }

    public void setNivelEstudio(EnumDTO nivelEstudio) {
        this.nivelEstudio = nivelEstudio;
    }

    public DocumentoDTO getDocumento() {
        return documento;
    }

    public void setDocumento(DocumentoDTO documento) {
        this.documento = documento;
    }

    public DomicilioDTO getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(DomicilioDTO domicilio) {
        this.domicilio = domicilio;
    }

    public EnumDTO getSexo() {
        return sexo;
    }

    public void setSexo(EnumDTO sexo) {
        this.sexo = sexo;
    }

    public Calendar getFechaCarga() {
        return fechaCarga;
    }

    public void setFechaCarga(Calendar fechaCarga) {
        this.fechaCarga = fechaCarga;
    }

    public Long getHistoriaClinicaId() {
        return historiaClinicaId;
    }

    public void setHistoriaClinicaId(Long historiaClinicaId) {
        this.historiaClinicaId = historiaClinicaId;
    }

    public boolean isPrivadoLibertad() {
        return privadoLibertad;
    }

    public void setPrivadoLibertad(boolean privadoLibertad) {
        this.privadoLibertad = privadoLibertad;
    }

    public String getPrivadoLibertadDonde() {
        return privadoLibertadDonde;
    }

    public void setPrivadoLibertadDonde(String privadoLibertadDonde) {
        this.privadoLibertadDonde = privadoLibertadDonde;
    }

    public Calendar getFechaBaja() {
        return fechaBaja;
    }

    public void setFechaBaja(Calendar fechaBaja) {
        this.fechaBaja = fechaBaja;
    }

    public Long getImagenId() {
        return imagenId;
    }

    public void setImagenId(Long imagenId) {
        this.imagenId = imagenId;
    }
}
