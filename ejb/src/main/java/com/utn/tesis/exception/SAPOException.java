package com.utn.tesis.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.ejb.ApplicationException;
import java.io.Serializable;

/**
 * User: Enzo
 * Date: 15/02/15
 * Time: 18:01
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApplicationException(rollback = true)
public class SAPOException extends Exception implements Serializable {
    private static final long serialVersionUID = 796770993296843510L;

    private Exception exception;

}
