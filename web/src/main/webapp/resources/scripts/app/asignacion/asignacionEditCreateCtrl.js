/**
 * Created with IntelliJ IDEA.
 * User: Usuario
 * Date: 22/12/15
 * Time: 13:53
 * To change this template use File | Settings | File Templates.
 */
var module = angular.module('asignacionModule');

module.controller('AsignacionCtrl_EditCreate',
    ['$scope', '$rootScope', '$filter', '$mdDialog', 'AsignacionSrv', '$state', 'MessageSrv', 'PaginationService',
        'tiposDocumentoResponse', 'sexosResponse', 'asignacionResponse', 'catedrasResponse','authFactory',
        function ($scope, $rootScope, $filter, $mdDialog, service, $state, message, pagination, tiposDocumentoResponse,
                  sexosResponse, asignacionResponse, catedrasResponse, authFactory) {
            var vm = this;
            //Asignacion a guardar
            vm.updating = $state.current.data.updating;
            vm.asignacion = asignacionResponse != null ? asignacionResponse.data : { };
            //Data auxiliar.
            vm.data = {
                sexos: sexosResponse.data,
                tiposDocumentos: tiposDocumentoResponse.data,
                catedras: catedrasResponse.data,
                trabajosPracticos: []
            };
            vm.titulo = vm.updating ? "Editar asignación" : "Registrar nueva asignación";
            //Resultados a mostrar
            vm.diagnosticos = [];
            vm.alumnos = [];
            //CONSULTA Y PAGINACION PACIENTE
            vm.buscarDiagnosticos = buscarDiagnosticos;
            vm.nextPageDiagnostico = nextPageAlumno;
            vm.previousPageDiagnostico = previousPageAlumno;
            vm.onCatedraSelected = onCatedraSelected;
            vm.onTrabajoPracticoSelected = onTrabajoPracticoSelected;
            vm.cleanFiltersPaciente = cleanFiltersPaciente;
            vm.isBusquedaDiagnostico = true;
            vm.filter = {};
            vm.filterChips = [];
            vm.filterAlumno = [];
            //CONSULTA Y PAGINACION ALUMNO
            vm.buscarAlumnos = buscarAlumnos;
            vm.nextPageAlumno = nextPageAlumno;
            vm.previousPageAlumno = previousPageAlumno;
            vm.paginationData = pagination.paginationData;
            vm.busqueda = false;
            vm.cleanFiltersAlumno = cleanFiltersAlumno;
            //Seleccion Alumno
            vm.onAlumnoSelected = onAlumnoSelected;
            vm.deleteSelectedAlumno = onDeleteSelectedAlumno;
//            vm.isAlumnoSelected = false;
            vm.selectedAlumnos = [];
            //Seleccion diagnostico
            vm.onDiagnosticoSelected = onDiagnosticoSelected;
            vm.deleteSelectedDiagnostico = onDeleteSelectedDiagnostico;
            vm.autorizado = true;
            vm.isDiagnosticoSelected = false;
            vm.selectedDiagnosticos = [];
            vm.filterPaciente = [];
            vm.fecha = {};
            //GUARDAR
            vm.verificarAsignacionCompleta = verificarAsignacionCompleta;
            vm.save = save;
            //Navegacion
            vm.goIndex = goIndex;
            vm.reload = reload;
            vm.submitted = false;
            var performSubmit = $scope.$parent.performSubmit;
            var handleError = $scope.$parent.handleError;
            vm.validationErrorFromServer = $scope.$parent.validationErrorFromServer;
            //AUX UI
            vm.clickIcon = 'expand_less';
            vm.colorIcon = ['#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF'];
            vm.clickIconMorph = clickIconMorph;
            vm.colorMouseOver = colorMouseOver;
            vm.colorMouseLeave = colorMouseLeave;
            vm.mostrarFiltros = true;
            vm.colorIconRemove = 'crimson';
            vm.esAlumno = false;
            vm.user = null;

            (function init() {
                vm.user = authFactory.getAuthData();
                vm.esAlumno = isAlumno();
                if (vm.updating) {
                    vm.filter.trabajoPractico = vm.asignacion.trabajoPractico;
                    vm.filter.tipoDocumentoAlumno = vm.asignacion.alumno.documento.tipoDocumento;
                    vm.filter.numeroDocumentoAlumno = vm.asignacion.alumno.documento.numero;
//                    vm.isAlumnoSelected = true;
                    vm.filterAlumno.push(newFilterChip('selectedAlumno', 'Alumno', vm.asignacion.alumno, vm.asignacion.alumno.apellido + ", " + vm.asignacion.alumno.nombre));
                    vm.filterPaciente.push(newFilterChip('selectedPaciente', 'Paciente', vm.asignacion.idPaciente, vm.asignacion.apellidoPaciente + ", " + vm.asignacion.nombrePaciente));
                    vm.filterPaciente.push(newFilterChip('trabajoPractico', 'Trabajo práctico', vm.filter.trabajoPractico, vm.filter.trabajoPractico.nombre));
                    vm.isDiagnosticoSelected = true;
                    vm.colorIconRemove = 'darkgrey';
                }
                if(vm.esAlumno){
                   findPersona();
                }

            })();

            //USUARIO
            function isAlumno(){
                if(vm.user.alumno){
                    return true;
                }
                return false;
            }

            function findPersona(){
                service.findAlumnoByUser(vm.user.id)
                    .success(function(data){
                        vm.asignacion.alumno = data;
                    }).error(function(error){
                        console.log(error);
                    })
            }
            //CONSULTA  Y PAGINACION
            function executeQuery(pageNumber) {
                pagination.paginate(vm.filter, pageNumber).then(function (data) {
                    if (vm.isBusquedaDiagnostico) {
                        vm.diagnosticos = data;
                        updateFilterChips();
                    } else {
                        vm.alumnos = data;
                    }
                    vm.paginationData = pagination.getPaginationData();
                }, function () {
                });
            }

            //BUSQUEDA DIAGNOSTICOS
            function buscarDiagnosticos(form) {
//                if(form.$invalid){
                pagination.config('api/asignacion/findDiagnosticosByFilters');
                vm.filter.trabajoPracticoId = angular.isUndefined(vm.filter.trabajoPractico) ? null : vm.filter.trabajoPractico.id;
                vm.filter.catedraId = angular.isUndefined(vm.filter.catedra) ? null : vm.filter.catedra.id;
                vm.isBusquedaDiagnostico = true;
                executeQuery();
//                }
            }

            function nextPageDiagnostico() {
                if (vm.paginationData.morePages) {
                    executeQuery(++vm.paginationData.pageNumber);
                }
            }

            function previousPageDiagnostico() {
                if (!vm.paginationData.firstPage) {
                    executeQuery(--vm.paginationData.pageNumber);
                }
            }

            //BUSQUEDA ALUMNO
            function buscarAlumnos(form) {
                if (!form.$invalid) {
                    pagination.config('api/asignacion/findAlumnoByFilters');
                    vm.isBusquedaDiagnostico = false;
                    executeQuery();
                }
            }

            function nextPageAlumno() {
                if (vm.paginationData.morePages) {
                    executeQuery(++vm.paginationData.pageNumber);
                }
            }

            function previousPageAlumno() {
                if (!vm.paginationData.firstPage) {
                    executeQuery(--vm.paginationData.pageNumber);
                }
            }

            function cleanFiltersAlumno() {
                vm.filter.tipoDocumentoAlumno = null;
                vm.filter.numeroDocumentoAlumno = null;
            }

            //SELECCION DE ALUMNO
            function onAlumnoSelected(alumno) {
                vm.asignacion.alumno = alumno;
//                vm.isAlumnoSelected = true;
                vm.filterAlumno.push(newFilterChip('selectedAlumno', 'Alumno', vm.asignacion.alumno, vm.asignacion.alumno.apellido + ", " + vm.asignacion.alumno.nombre));
            }

            function onDeleteSelectedAlumno() {
//                vm.isAlumnoSelected = false;
                vm.asignacion.alumno = {};
                vm.selectedAlumnos = [];
            }

            //SELECCION DE Diagnostico
            function onDiagnosticoSelected(diagnosticoSupport) {
                vm.isDiagnosticoSelected = true;
                vm.asignacion.diagnostico = diagnosticoSupport.diagnostico;
                vm.asignacion.idPaciente = diagnosticoSupport.idPaciente;
                vm.asignacion.apellidoPaciente = diagnosticoSupport.apellido;
                vm.asignacion.nombrePaciente = diagnosticoSupport.nombre;
                vm.asignacion.trabajoPractico = vm.filter.trabajoPractico;
                vm.filterPaciente.push(newFilterChip('selectedPaciente', 'Paciente', vm.asignacion.idPaciente, vm.asignacion.apellidoPaciente + ", " + vm.asignacion.nombrePaciente));
                if (vm.filter.catedra) {
                    vm.filterPaciente.push(newFilterChip('catedra', 'Cátedra', vm.filter.catedra, (vm.filter.catedra.materia + ' ' + vm.filter.catedra.denominacion)));
                }
                if (vm.filter.trabajoPractico) {
                    vm.filterPaciente.push(newFilterChip('trabajoPractico', 'Trabajo práctico', vm.filter.trabajoPractico, vm.filter.trabajoPractico.nombre));
                }
            }


            function onDeleteSelectedDiagnostico() {
                vm.isDiagnosticoSelected = false;
                vm.asignacion.diagnostico = {};
                vm.asignacion.paciente = {};
                vm.asignacion.apellidoPaciente = {};
                vm.asignacion.nombrePaciente = {};
                vm.selectedDiagnosticos = [];
            }

            function onCatedraSelected() {
                var idCatedra = vm.filter.catedra.id;
                service.getTrabajosPracticosByCatedra(idCatedra)
                    .success(function (response) {
                        vm.data.trabajosPracticos = response;
                    })
                    .error(function (data, status) {
                        handleError(data, status);
                    })
            }

            function onTrabajoPracticoSelected() {
                service.estaAutorizado(vm.asignacion.alumno.id, vm.filter.trabajoPractico.id)
                    .success(function (response) {
                        vm.autorizado = response;
                        updateFilterChips();
                    }).error(function (data, status) {
                        handleError(data, status);
                    })
            }

            function cleanFiltersPaciente() {
                vm.filter.tipoDocumentoPaciente = null;
                vm.filter.numeroDocumentoPaciente = null;
            }

            //GUARDAR
            function verificarAsignacionCompleta() {
                if (vm.asignacion.diagnostico != null
                    && vm.asignacion.alumno != null
                    && vm.asignacion.fecha != null) {
                    return true;
                } else {
                    return false;
                }
            }

            function save(form, ev) {
//                preSave();
                var mensajeSave = vm.updating ? "Asignacion de paciente " + vm.asignacion.apellidoPaciente + ", "
                    + vm.asignacion.nombrePaciente + " modificada."
                    : "Paciente " + vm.asignacion.apellidoPaciente + ", " + vm.asignacion.nombrePaciente + " asignado con éxito";
                var titileDialog = vm.updating ? '¿Desea editar la asignación?' : '¿Desea crear una nueva asignación?';
                var textContent = vm.updating ? 'Se editará la asignación del paciente ' + vm.asignacion.apellidoPaciente + ", " + vm.asignacion.nombrePaciente + '.' : 'Se creará una asignación para tratar al paciente ' + vm.asignacion.apellidoPaciente + ", " + vm.asignacion.nombrePaciente + ' .';
                var confirm = $mdDialog.confirm()
                    .title(titileDialog)
                    .textContent(textContent)
                    .targetEvent(ev)
                    .ok('Aceptar')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function () {
                    vm.submitted = true;
                    performSubmit(function () {
                        service.save(vm.asignacion)
                            .success(function () {
                                vm.data.persistedOperation = true;
                                vm.data.disableFields = true;
                                vm.data.saved = true;
                                message.successMessage(mensajeSave, null, 3000);
                                vm.goIndex();
                            }).error(function (data, status) {
                                handleError(data, status);
                            })
                    }, form)
                }, function () {

                });
            }

            //Chips
            function updateFilterChips() {
                vm.filterChips = [];
                /* if (vm.filter.catedra) {
                 vm.filterChips.push(newFilterChip('catedra', 'Cátedra', vm.filter.catedra, (vm.filter.catedra.materia + ' ' + vm.filter.catedra.denominacion)));
                 }
                 if (vm.filter.trabajoPractico) {
                 vm.filterChips.push(newFilterChip('trabajoPractico', 'Trabajo práctico', vm.filter.trabajoPractico, vm.filter.trabajoPractico.nombre));
                 }*/
                /*             if (vm.filter.profesorId) {
                 vm.filterChips.push(newFilterChip('profesorId', 'Profesor', vm.filter.profesorId));
                 }
                 if (vm.filter.fechaAsignacion) {
                 vm.filterChips.push(newFilterChip('fechaAsignacion', 'Fecha asignación', vm.filter.fechaAsignacion, $filter('date')(vm.filter.fechaAsignacion, 'dd/MM/yyyy')));
                 }*/
                if (vm.filter.practica) {
                    vm.filterChips.push(newFilterChip('practica', 'Práctica', vm.filter.practica));
                }
                if (vm.filter.tipoDocumentoPaciente) {
                    vm.filterChips.push(newFilterChip('tipoDocumentoPaciente', 'Tipo doc.', vm.filter.tipoDocumentoPaciente, findInColecction(vm.filter.tipoDocumentoPaciente, vm.data.tiposDocumentos)));
                }
                if (vm.filter.numeroDocumentoPaciente) {
                    vm.filterChips.push(newFilterChip('numeroDocumentoPaciente', 'Nro. doc.', vm.filter.numeroDocumentoPaciente));
                }
                if (vm.filter.apellidoPaciente) {
                    vm.filterChips.push(newFilterChip('apellidoPaciente', 'Apellido', vm.filter.apellidoPaciente));
                }
                if (vm.filter.nombrePaciente) {
                    vm.filterChips.push(newFilterChip('nombrePaciente', 'Nombre', vm.filter.nombrePaciente));
                }
                if (vm.filter.estado) {
                    vm.filterChips.push(newFilterChip('estado', 'Estado', vm.filter.estado));
                }
            }

            function newFilterChip(origin, name, value, displayValue) {
                var filterChip = {
                    origin: origin,
                    name: name,
                    value: value,
                    displayValue: displayValue ? displayValue : value
                }
                return filterChip;
            }

            function findInColecction(id, collection) {
                for (var i = 0; i < collection.length; i++) {
                    if (collection[i].key == id) {
                        return collection[i].nombre;
                    }
                }
                return "Sin definir";
            }

            //NAVEGACION
            function goIndex() {
                $state.go('^.index', {execQuery: vm.data.persistedOperation});
            }

            function reload() {
                $rootScope.persistedOperation = vm.data.persistedOperation;
                $state.go($state.current, {}, {reload: true});
            }

            $scope.$watchCollection('vm.filterChips', function (newCol, oldCol) {
                if (newCol.length < oldCol.length) {
                    vm.filter = {};
                    angular.forEach(newCol, function (filterChip) {
                        vm.filter[filterChip.origin] = filterChip.value;
                    });
                    buscarDiagnosticos(editCreateAsignacionForm);
                }
            })

            $scope.$watchCollection('vm.filterAlumno', function (newCol, oldCol) {
                if (newCol.length < oldCol.length) {
                    onDeleteSelectedAlumno();
                    onDeleteSelectedDiagnostico();
                }
            })

            $scope.$watchCollection('vm.filterPaciente', function (newCol, oldCol) {
                if (newCol.length < oldCol.length) {
                    onDeleteSelectedDiagnostico();
                }
            })

            $scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (!angular.equals($state.current, toState)) {
                        delete $rootScope.persistedOperation;
                    }
                })

            //AUX UI.
            function clickIconMorph() {
                if (vm.clickIcon === 'expand_more') {
                    vm.clickIcon = 'expand_less';
                }
                else {
                    vm.clickIcon = 'expand_more';
                }
            }


            function colorMouseOver(icon) {
                vm.colorIcon[icon] = '#E91E63';
            }

            function colorMouseLeave(icon) {
                vm.colorIcon[icon] = '#00B0FF';
            }

        }]);
