/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.utn.tesis.mail;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 *
 * @author Enzo
 */
public class Main {
    
    public static void main(String [ ] args)
    {

        ExecutorService executor = Executors.newFixedThreadPool(10);


        Alumno alumno = new Alumno();

        RegisterMail mail = new RegisterMail(alumno);
        mail.buildMail();




        // for (int i = 0; i < 2; i++) {
            MailService newMail = new MailService(mail);
            executor.execute(newMail);

         //   System.out.println("Mail " + i + " disparado.");
        System.out.println("Mail disparado.");
        //}


        System.out.println("Lalalalala");
    }
    
}
