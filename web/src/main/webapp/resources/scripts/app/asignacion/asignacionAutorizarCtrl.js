var module = angular.module('asignacionModule');


module.controller('AsignacionCtrl_Autorizar', ['$scope', '$cacheFactory', 'AsignacionSrv', '$state', '$stateParams', 'MessageSrv',
    'CommonsSrv', 'PaginationService', '$mdDialog','practicasResponse', 'profesorResponse', 'tiposDocumentoResponse',
    'estadosAsignacionResponse', 'authFactory','$filter',
    function ($scope, $cacheFactory, service, $state, $stateParams, message, commons, pagination, $mdDialog,
              practicasResponse, profesorResponse, tiposDocumentoResponse,estadosAsignacionResponse,authFactory, $filter) {
        var vm = this;
        vm.result = [];
        vm.data = {
            practicas: practicasResponse.data,
            profesor: profesorResponse.data,
            tiposDocumentos: tiposDocumentoResponse.data,
            estados: estadosAsignacionResponse.data,
            profesor : profesorResponse.data,
            trabajosPracticos: []
        };
        vm.aux = {
            isTipoDocumentoSelected: false,
            mostrarFiltros: true
        }

        vm.filter = {};
        vm.filter.dadosBaja = false;
        vm.filterChips = [];
        vm.selectedAsignaciones = [];
        vm.buscarAsignaciones = buscarAsignaciones;
        //Cambio de estado
        vm.autorizar = autorizar;
        vm.reload = reload;
        //paginación
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        //Diálogos
        vm.filterAlumno = {};
        vm.paginationData = pagination.paginationData;
        vm.busqueda = false;
        vm.onCatedraSelected = onCatedraSelected;
        vm.goIndex = goIndex;

        var handleError = $scope.$parent.handleError;
        $scope.validationErrorFromServer = $scope.$parent.validationErrorFromServer;

        (function init() {
            vm.user = authFactory.getAuthData();
            vm.data.catedras = [];
            if (vm.user.profesor) {
                service.findCatedrasByProfesor(vm.user.id)
                    .success(function (data) {
                        vm.data.catedras = data;
                        for (var i = 0; i < vm.data.catedras.length; i++) {
                            vm.filter.catedrasId.push(vm.data.catedras[i].id);
                        }
                    }).error(function (error) {
                        console.log(error);
                    })
            } else {
                service.getCatedras()
                    .success(function (data) {
                        vm.data.catedras = data;
                    }).error(function (error) {
                        console.log(error);
                    })
            }
        })();


        //BUSQUEDA ALUMNO
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

        //SELECCION DE ALUMNO
        function reload() {
            $rootScope.persistedOperation = vm.data.persistedOperation;
            $state.go($state.current, {}, {reload: true});
        }

        vm.paginationData = pagination.paginationData;
        pagination.config('api/asignacion/findAsignacionesConfirmadasAutorizadas');

        //Consulta
        function executeQuery(pageNumber) {
            pagination.paginate(vm.filter, pageNumber)
                .then(function (data) {
                        vm.result = data;
                        updateFilterChips();
                        vm.aux.showDadosBaja = vm.filter.dadosBaja;
                    vm.paginationData = pagination.getPaginationData();
                }, function () {
                });
        }

        function buscarAsignaciones(form) {
            if (!form.$invalid) {
                vm.filter.trabajoPracticoId = angular.isUndefined(vm.filter.trabajoPractico) ? null : vm.filter.trabajoPractico.id;
                vm.filter.catedraId = angular.isUndefined(vm.filter.catedra) ? null : vm.filter.catedra.id;
                executeQuery();
            }else {
                angular.forEach(form.$error, function (field) {
                    angular.forEach(field, function (errorField) {
                        console.log(field.name);
                        errorField.$setTouched();
                    })
                });
            }
        }

        vm.keyboardOk = function (event) {
            if (event.which == 13) {
                executeQuery();
            }
        }

        //Chips
        function updateFilterChips() {
            vm.filterChips = [];
            if (vm.filter.catedra) {
                vm.filterChips.push(newFilterChip('catedra', 'Cátedra', vm.filter.catedra, (vm.filter.catedra.materia + ' ' +  vm.filter.catedra.denominacion)));
            }
            if (vm.filter.trabajoPractico) {
                vm.filterChips.push(newFilterChip('trabajoPractico', 'Trabajo práctico', vm.filter.trabajoPractico, vm.filter.trabajoPractico.nombre ));
            }
            if (vm.filter.profesorId) {
                vm.filterChips.push(newFilterChip('profesorId', 'Profesor', vm.filter.profesorId));
            }
            if (vm.filter.fechaAsignacion) {
                vm.filterChips.push(newFilterChip('fechaAsignacion', 'Fecha asignación', vm.filter.fechaAsignacion, $filter('date')(vm.filter.fechaAsignacion, 'dd/MM/yyyy')));
            }
            if (vm.filter.practica) {
                vm.filterChips.push(newFilterChip('practica', 'Práctica', vm.filter.practica));
            }
        }

        $scope.$watchCollection('vm.filterChips', function (newCol, oldCol) {
            if (newCol.length < oldCol.length) {
                vm.filter = {};
                angular.forEach(newCol, function (filterChip) {
                    vm.filter[filterChip.origin] = filterChip.value;
                });
            }
        });

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

        function findObjectInCollection(id, collection){
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].key == id) {
                    return collection[i];
                }
            }
            return {};
        }


        //Caché
        function cacheData() {
            var data = {
                filter: vm.filter,
                result: vm.result,
                aux: vm.aux
            }
            cache.put('data', data);
        };

        function getCachedData() {
            var data = cache.get('data');
            vm.filter = data.filter;
            vm.result = data.result;
            vm.aux = data.aux;
        };

        //Paginación
        function nextPage() {
            if (vm.paginationData.morePages) {
                executeQuery(++vm.paginationData.pageNumber);
            }
        }

        function previousPage() {
            if (!vm.paginationData.firstPage) {
                executeQuery(--vm.paginationData.pageNumber);
            }
        }

        //Cambio de estado
        function autorizar(){
            if(!vm.filter.fechaAsignacion){
              message.errorMessage("Se debe seleccionar una fecha para el práctico,");
              return;
            }
            var today = new Date();
/*            var todayTime = today.getTime();
            var fechaTime = vm.filter.fechaAsignacion.getTime();*/
            if(vm.filter.fechaAsignacion > today){
                message.errorMessage("Solo pueden autorizarse las asignaciones a partir del día " +  $filter('date')(vm.filter.fechaAsignacion, 'dd/MM/yyyy') +".");
                return;
            }
            service.autorizar(vm.selectedAsignaciones)
                .then(function(){
                    vm.selectedAsignaciones = [];
                    buscarAsignaciones("autorizarAsignacionesForm");
                    message.successMessage("Asignaciones autorizadas", null, 3000);
                }, function(data){
                    handleError(data, status);
                });

        }
        //NAVEGACION
        function goIndex() {
            $state.go('^.index', {execQuery: vm.data.persistedOperation});
        }

        //Métodos auxiliares
        vm.clickIcon = 'expand_more';
        vm.colorIcon = ['#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF'];

        vm.cleanFilters = function () {
            vm.filter = {};
            vm.filterChips = [];
        };

        vm.mostrarAcciones = function (item) {
            item.showAction = true;
        };

        vm.ocultarAcciones = function (item) {
            item.showAction = false;
        };

        vm.colorMouseOver = function (icon) {
            vm.colorIcon[icon] = '#E91E63';
        };

        vm.colorMouseLeave = function (icon) {
            vm.colorIcon[icon] = '#00B0FF';
        };

        vm.clickIconMorph = function () {
            if (vm.clickIcon === 'expand_more') {
                vm.clickIcon = 'expand_less';
            }
            else {
                vm.clickIcon = 'expand_more';
            }
        };
    }]);



