
-- GRUPOS FUNCIONALIDAD (SERÁN ITEMS DEL MENÚ CON SUS CORRESPONDIENTES SUBITEMS)
-- insert into GrupoFuncionalidad(id, version, nombre) values (1, 0, 'Soporte');

insert into Funcionalidad(id, version, nombre, estadoAsociado, grupoFuncionalidadId) values (1, 0, 'Materia', 'materia.index', 1);
insert into Funcionalidad(id, version, nombre, estadoAsociado, grupoFuncionalidadId) values (2, 0, 'Practica odontologica', 'practicaOdontologica.index', 1);
insert into Funcionalidad(id, version, nombre, estadoAsociado, grupoFuncionalidadId) values (3, 0, 'Trabajo practico', 'trabajoPractico.index', 1);
insert into Funcionalidad(id, version, nombre, estadoAsociado, grupoFuncionalidadId) values (4, 0, 'Catedra', 'catedra.index', 1);
insert into Funcionalidad(id, version, nombre, estadoAsociado, grupoFuncionalidadId) values (5, 0, 'Usuario', 'usuario.index', 1);

#  ROLES
insert into Rol(id, version, nombre, descripcion) values (1, 0, 'ADMINISTRADOR', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (2, 0, 'ALUMNO', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (3, 0, 'PROFESOR', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (4, 0, 'RESPONSABLE DE RECEPCION DE PACIENTES', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (5, 0, 'ADMINISTRADOR ACADEMICO', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (6, 0, 'PACIENTE', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Rol(id, version, nombre, descripcion) values (7, 0, 'AUTORIDAD', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua');
insert into Usuario(id, version, nombreUsuario, contrasenia, email, estadoAlta,fechaBaja,motivoBaja, rolId) values (1, 0, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@admin.com', 1, null, null, 1);
insert into Usuario(id, version, nombreUsuario, contrasenia, email, estadoAlta,fechaBaja,motivoBaja, rolId) values (2, 0, 'enzo', '202cb962ac59075b964b07152d234b70', 'enzo@enzo.com', 1, null, null, 1);
insert into Privilegio(id, version, funcionalidadId, esItemMenu, rol_id) values (1, 0, 1, 1, 1);
insert into Privilegio(id, version, funcionalidadId, esItemMenu, rol_id) values (2, 0, 2, 1, 1);
insert into Privilegio(id, version, funcionalidadId, esItemMenu, rol_id) values (3, 0, 3, 1, 1);
insert into Privilegio(id, version, funcionalidadId, esItemMenu, rol_id) values (4, 0, 4, 1, 1);
insert into Privilegio(id, version, funcionalidadId, esItemMenu, rol_id) values (5, 0, 5, 1, 1);

-- Provincias
insert into Provincia(id, version, nombre) values (1, 0, 'Cordoba');
insert into Provincia(id, version, nombre) values (2, 0, 'Buenos Aires');
insert into Provincia(id, version, nombre) values (3, 0, 'Santa Fe');
insert into Provincia(id, version, nombre) values (4, 0, 'San Luis');

-- Ciudades
insert into Ciudad(id, version, nombre,provincia_id) values (1, 0, 'Cordoba',1);
insert into Ciudad(id, version, nombre,provincia_id) values (2, 0, 'Carlos Paz',1);
insert into Ciudad(id, version, nombre,provincia_id) values (3, 0, 'CABA',2);
insert into Ciudad(id, version, nombre,provincia_id) values (4, 0, 'La Plata',2);

-- Barrios
insert into Barrio(id, version, nombre,ciudad_id) values (1, 0, 'Capital Sur',1);
insert into Barrio(id, version, nombre,ciudad_id) values (2, 0, 'Centro',1);
insert into Barrio(id, version, nombre,ciudad_id) values (3, 0, 'CPaz1',2);
insert into Barrio(id, version, nombre,ciudad_id) values (4, 0, 'CPaz2',2);
insert into Barrio(id, version, nombre,ciudad_id) values (5, 0, 'Alta Cordoba',1);
insert into Barrio(id, version, nombre,ciudad_id) values (6, 0, 'Ferrer',1);
insert into Barrio(id, version, nombre,ciudad_id) values (7, 0, 'CPaz3',2);
insert into Barrio(id, version, nombre,ciudad_id) values (8, 0, 'CPaz4',2);
insert into Barrio(id, version, nombre,ciudad_id) values (9, 0, 'Veron Residential',4);
insert into Barrio(id, version, nombre,ciudad_id) values (10, 0, 'LP2',4);
insert into Barrio(id, version, nombre,ciudad_id) values (11, 0, 'Recoleta',3);
insert into Barrio(id, version, nombre,ciudad_id) values (12, 0, 'Palermo',3);
insert into Barrio(id, version, nombre,ciudad_id) values (13, 0, 'LP3',4);
insert into Barrio(id, version, nombre,ciudad_id) values (14, 0, 'LP4',4);
insert into Barrio(id, version, nombre,ciudad_id) values (15, 0, 'Monserrat',3);
insert into Barrio(id, version, nombre,ciudad_id) values (16, 0, 'San Telmo',3);

-- Obras sociales
insert into ObraSocial(id, version, nombre) values (1, 0, 'DASPO');
insert into ObraSocial(id, version, nombre) values (2, 0, 'OSDIP');
insert into ObraSocial(id, version, nombre) values (3, 0, 'OSDE');
insert into ObraSocial(id, version, nombre) values (4, 0, 'Otra');

# Trabajos
insert into Trabajo(id, version, nombre) values (1, 0, 'Comercio');
insert into Trabajo(id, version, nombre) values (2, 0, 'Salud');
insert into Trabajo(id, version, nombre) values (3, 0, 'Sistemas/Tecnologia');
insert into Trabajo(id, version, nombre) values (4, 0, 'Marketing');
insert into Trabajo(id, version, nombre) values (5, 0, 'Desempleado');
insert into Trabajo(id, version, nombre) values (6, 0, 'Servicios');
insert into Trabajo(id, version, nombre) values (7, 0, 'Otros');
insert into Trabajo(id, version, nombre) values (8, 0, 'Estudiante');
insert into Trabajo(id, version, nombre) values (10, 0,'Deportes');
insert into Trabajo(id, version, nombre) values (11, 0, 'Finanzas');

# Materias
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (1, 'Prostodoncia', 'Sed volutpat turpis sed sem semper, id vestibulum lacus eleifend. In auctor urna id diam gravida scelerisque id vitae est', 'PRIMERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (2, 'Endodoncia'  , 'Sed volutpat turpis sed sem semper, id vestibulum lacus eleifend. In auctor urna id diam gravida scelerisque id vitae est', 'PRIMERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (3, 'Anatomia', 'Sed volutpat turpis sed sem semper, id vestibulum lacus eleifend. In auctor urna id diam gravida scelerisque id vitae est', 'PRIMERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (4, 'Histologia y Embriologia', 'Sed volutpat turpis sed sem semper, id vestibulum lacus eleifend. In auctor urna id diam gravida scelerisque id vitae est', 'PRIMERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (5, 'Quimica bilogica', 'Sed volutpat turpis sed sem semper, id vestibulum lacus eleifend. In auctor urna id diam gravida scelerisque id vitae est', 'PRIMERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (6, 'Fisiologia', 'Quisque facilisis lectus eget urna pellentesque, ac mattis mauris ultricies. Phasellus quis dui semper, tristique massa eget, sagittis quam. Nulla facilis', 'SEGUNDO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (7, 'Ergonomia y Bioseguridad' , 'Quisque facilisis lectus eget urna pellentesque, ac mattis mauris ultricies. Phasellus quis dui semper, tristique massa eget, sagittis quam. Nulla facilis', 'SEGUNDO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (8, 'Ingles', 'Quisque facilisis lectus eget urna pellentesque, ac mattis mauris ultricies. Phasellus quis dui semper, tristique massa eget, sagittis quam. Nulla facilis', 'SEGUNDO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (10,'Anatomia Patologica', 'Quisque facilisis lectus eget urna pellentesque, ac mattis mauris ultricies. Phasellus quis dui semper, tristique massa eget, sagittis quam. Nulla facilis', 'SEGUNDO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (11,'Psicologia Evolutiva', 'Quisque facilisis lectus eget urna pellentesque, ac mattis mauris ultricies. Phasellus quis dui semper, tristique massa eget, sagittis quam. Nulla facilis', 'SEGUNDO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (12, 'Oclusion', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis ornare neque.', 'TERCERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (16, 'Semiologia ', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis ornare neque.', 'TERCERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (13, 'Operatoria I', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis ornare neque.', 'TERCERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (14, 'Anatomia Clini', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis ornare neque.', 'TERCERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (15, 'Odontologia Preventiva y Comunitaria I', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus quis ornare neque.', 'TERCERO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (17, 'Periodoncia', 'Magna ante, efficitur sed dui eu, fringilla condimentum mi.', 'CUARTO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (18, 'Endodoncia', 'Magna ante, efficitur sed dui eu, fringilla condimentum mi.', 'CUARTO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (19, 'Operatoria II', 'Magna ante, efficitur sed dui eu, fringilla condimentum mi.', 'CUARTO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (20, 'Estomatologia', 'Magna ante, efficitur sed dui eu, fringilla condimentum mi.', 'CUARTO',1);
insert into Materia(id, nombre, descripcion, nivel,estadoAlta) values (21, 'Cirugia II', 'Magna ante, efficitur sed dui eu, fringilla condimentum mi.', 'CUARTO',1);

# Graupo de practica
insert into GrupoPracticaOdontologica(id, version, nombre) values (1, 0, 'Consultas');
insert into GrupoPracticaOdontologica(id, version, nombre) values (2, 0, 'Operatoria dental');
insert into GrupoPracticaOdontologica(id, version, nombre) values (3, 0, 'Endodoncia sin obturacion');
insert into GrupoPracticaOdontologica(id, version, nombre) values (4, 0, 'Protesis');
insert into GrupoPracticaOdontologica(id, version, nombre) values (5, 0, 'Odontologia preventiva');
insert into GrupoPracticaOdontologica(id, version, nombre) values (6, 0, 'Ortodoncia y ortopedia funcional');
insert into GrupoPracticaOdontologica(id, version, nombre) values (7, 0, 'Odontopediatria');
insert into GrupoPracticaOdontologica(id, version, nombre) values (8, 0, 'Periodoncia');
insert into GrupoPracticaOdontologica(id, version, nombre) values (9, 0, 'Radiologia');
insert into GrupoPracticaOdontologica(id, version, nombre) values (10, 0,'Cirugia bucal');

# Practica
INSERT INTO PracticaOdontologica (id,version,estadoAlta,fechaBaja,motivoBaja,denominacion,observaciones,grupoId) VALUES (2,0,1,NULL,NULL,'Examen, diagnostico, fichado y plan de tratamiento.','Se considera primera consulta al examen, diagnostico, fichado y plan de tratamiento. Como consecuencia del exmen, el fichado deber reflejar el estado actual de la boca, previo al tratamiento.',1);
INSERT INTO PracticaOdontologica (id,version,estadoAlta,fechaBaja,motivoBaja,denominacion,observaciones,grupoId) VALUES (3,0,1,NULL,NULL,'Visita a domicilio','Se considera consulta domiciliaria a la atencion de pacientes impedidos de trasladarse al consultorio del odontlogo.',1);
INSERT INTO PracticaOdontologica (id,version,estadoAlta,fechaBaja,motivoBaja,denominacion,observaciones,grupoId) VALUES (4,0,1,NULL,NULL,'Consulta de urgencia','Se considera consulta de urgencia a toda prestacin que no constituye paso intermedio y/o final de tratamiento. Importante establecer el motivo de la misma.',1);
INSERT INTO PracticaOdontologica (id,version,estadoAlta,fechaBaja,motivoBaja,denominacion,observaciones,grupoId) VALUES (1,0,1,NULL,NULL,'Obturacion con amalgama - Cavidad simple','Se reconocer como obturacin simple de amalgama a aquellas en las que se haya practicado un adecuado tallado de la cavidad.',2);

# Trabajos practicos
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (2,0,1,NULL,NULL,'Trabajo practico 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (3,0,1,NULL,NULL,'Trabajo practico 2','Mauris varius purus at purus rhoncus, a volutpat arcu viverra.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (4,0,1,NULL,NULL,'Trabajo practico 3','Sed in dolor convallis massa hendrerit faucibus in sit amet sem.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (5,0,1,NULL,NULL,'Trabajo practico 4','Morbi faucibus massa nec aliquet placerat.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (6,0,1,NULL,NULL,'Trabajo practico 5','Phasellus laoreet mi vitae ante auctor, quis rutrum dui pretium.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (7,0,1,NULL,NULL,'Trabajo practico 6','Morbi vehicula neque quis tellus varius, dapibus viverra lectus iaculis.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (8,0,1,NULL,NULL,'Trabajo practico 7','Aliquam quis neque eu arcu lacinia elementum dignissim at metus.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (9,0,1,NULL,NULL,'Trabajo practico 8','Suspendisse fermentum eros eu aliquam ornare.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (10,0,1,NULL,NULL,'Trabajo practico 11','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (11,0,1,NULL,NULL,'Trabajo practico 12','Mauris varius purus at purus rhoncus, a volutpat arcu viverra.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (12,0,1,NULL,NULL,'Trabajo practico 13','Sed in dolor convallis massa hendrerit faucibus in sit amet sem.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (13,0,1,NULL,NULL,'Trabajo practico 14','Morbi faucibus massa nec aliquet placerat.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (14,0,1,NULL,NULL,'Trabajo practico 15','Phasellus laoreet mi vitae ante auctor, quis rutrum dui pretium.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (15,0,1,NULL,NULL,'Trabajo practico 16','Morbi vehicula neque quis tellus varius, dapibus viverra lectus iaculis.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (16,0,1,NULL,NULL,'Trabajo practico 17','Aliquam quis neque eu arcu lacinia elementum dignissim at metus.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (17,0,1,NULL,NULL,'Trabajo practico 18','Suspendisse fermentum eros eu aliquam ornare.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (22,0,1,NULL,NULL,'Trabajo practico 22','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (23,0,1,NULL,NULL,'Trabajo practico 23','Mauris varius purus at purus rhoncus, a volutpat arcu viverra.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (24,0,1,NULL,NULL,'Trabajo practico 24','Sed in dolor convallis massa hendrerit faucibus in sit amet sem.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (25,0,1,NULL,NULL,'Trabajo practico 25','Morbi faucibus massa nec aliquet placerat.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (26,0,1,NULL,NULL,'Trabajo practico 26','Phasellus laoreet mi vitae ante auctor, quis rutrum dui pretium.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (27,0,1,NULL,NULL,'Trabajo practico 27','Morbi vehicula neque quis tellus varius, dapibus viverra lectus iaculis.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (28,0,1,NULL,NULL,'Trabajo practico 28','Aliquam quis neque eu arcu lacinia elementum dignissim at metus.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (29,0,1,NULL,NULL,'Trabajo practico 29','Suspendisse fermentum eros eu aliquam ornare.',4);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (20,0,1,NULL,NULL,'Trabajo practico 20','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (21,0,1,NULL,NULL,'Trabajo practico 21','Mauris varius purus at purus rhoncus, a volutpat arcu viverra.',1);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (32,0,1,NULL,NULL,'Trabajo practico 32','Sed in dolor convallis massa hendrerit faucibus in sit amet sem.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (33,0,1,NULL,NULL,'Trabajo practico 33','Morbi faucibus massa nec aliquet placerat.',2);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (34,0,1,NULL,NULL,'Trabajo practico 34','Phasellus laoreet mi vitae ante auctor, quis rutrum dui pretium.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (35,0,1,NULL,NULL,'Trabajo practico 35','Morbi vehicula neque quis tellus varius, dapibus viverra lectus iaculis.',3);
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (36,0,1,NULL,NULL,'Trabajo practico 36','Aliquam quis neque eu arcu lacinia elementum dignissim at metus.',4);
<<<<<<< HEAD
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (37,0,1,NULL,NULL,'Trabajo practico 37','Suspendisse fermentum eros eu aliquam ornare.',4);

insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (1,0,"Simeone",35672817,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (2,0,"Simeone",35672816,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (3,0,"Simeone",35672815,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (4,0,"Simeone",35672814,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (5,0,"Simeone",35672813,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (6,0,"Simeone",35672812,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (7,0,"Simeone",35672811,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (8,0,"Simeone",35672810,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (9,0,"Simeone",35672987,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
insert into Paciente (id, version, apellido, numero, tipoDocumento, fechaCarga, fechaNacimiento, nombre, sexo, celular, email, estadoCivil)values (10,0,"Simeone",3567017,1,now(),now(),"Diego",1,152678172,"diego_simeone@gmail.com",1);
=======
INSERT INTO TrabajoPractico(id,version,estadoAlta,fechaBaja,motivoBaja,descripcion,nombre,practicaOdontologicaId) VALUES (37,0,1,NULL,NULL,'Trabajo practico 37','Suspendisse fermentum eros eu aliquam ornare.',4);
>>>>>>> origin/abm_paciente
