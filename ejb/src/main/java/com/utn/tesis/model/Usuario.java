package com.utn.tesis.model;

import com.utn.tesis.annotation.JsonMap;
import com.utn.tesis.exception.SAPOValidationException;
import com.utn.tesis.util.RegexUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Calendar;
import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: enzo
 * Date: 02/06/15
 * Time: 22:50
 */
@Entity
public class Usuario extends Bajeable {

    @NotNull(message = "El nombre de usuario no puede ser nulo.")
    @Size(max = 50, message = "El nombre de usuario debe tener entre 1 y 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String nombreUsuario;

    @NotNull(message = "La contraseña de usuario no puede ser nula.")
    @Size(max = 50, message = "La contraseña de usuario debe tener entre 1 y 50 caracteres.")
    @Column(nullable = false, length = 50)
    private String contrasenia;

    @NotNull(message = "El email del usuario no puede ser nulo.")
    @Size(max = 70, message = "El email del usuario debe tener entre 1 y 70 caracteres.")
    @Column(nullable = false, length = 70)
    private String email;

    @ManyToOne
    @JoinColumn(name = "rolId")
    @NotNull(message = "El rol de usuario no puede ser nulo.")
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "archivoId")
    private Archivo imagen;

    @Temporal(TemporalType.DATE)
    private Calendar ultimaConexion;

    // UUID que se genera cdo un usuario inicia sesión
    private String authToken;

    @Override
    public void validar() throws SAPOValidationException {
        HashMap<String, String> e = new HashMap<String, String>();

        if (!RegexUtils.validateEmail(email)) {
            e.put("E-mail inválido", "Ingrese un e-mail válido.");
        }

        if (rol == null) {
            e.put("Rol Null", "El rol no puede ser nulo.");
        }

        if (!e.isEmpty()) {
            throw new SAPOValidationException(e);
        }
    }

    @JsonMap(view = JsonMap.Public.class)
    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    @JsonMap(view = JsonMap.Internal.class)
    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    @JsonMap(view = JsonMap.Public.class)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonMap(view = JsonMap.Public.class)
    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol r) {
        this.rol = r;
    }

    @JsonMap(view = JsonMap.Internal.class)
    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public Archivo getImagen() {
        return imagen;
    }

    public void setImagen(Archivo imagen) {
        this.imagen = imagen;
    }

    public Calendar getUltimaConexion() {
        return ultimaConexion;
    }

    public void setUltimaConexion(Calendar ultimaConexion) {
        this.ultimaConexion = ultimaConexion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        if (!super.equals(o)) return false;

        Usuario usuario = (Usuario) o;

        if (contrasenia != null ? !contrasenia.equals(usuario.contrasenia) : usuario.contrasenia != null) return false;
        if (email != null ? !email.equals(usuario.email) : usuario.email != null) return false;
        if (nombreUsuario != null ? !nombreUsuario.equals(usuario.nombreUsuario) : usuario.nombreUsuario != null)
            return false;
        if (rol != null ? !rol.equals(usuario.rol) : usuario.rol != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (nombreUsuario != null ? nombreUsuario.hashCode() : 0);
        result = 31 * result + (contrasenia != null ? contrasenia.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        return result;
    }
}
