'use strict';
var module=angular.module('catedraModule');

module.controller('CatedraCtrl_Edit', ['$scope', '$rootScope', '$state', 'CommonsSrv', 'NotificationSrv','CatedraSrv', 'materiasResponse', 'diasResponse', 'gruposPracticaResponse', 'practicasResponse', '$filter','PaginationService', 'catedraResponse',
    function($scope, $rootScope, $state, commons, notification, service, materiasResponse, diasResponse, gruposPracticaResponse, practicasResponse, $filter, pagination, catedraResponse){

        $scope.catedra = catedraResponse.data;

        $scope.data = {
            disableFields: false,
            materias: materiasResponse.data,
            dias: commons.enumToJson(diasResponse.data),
            persistedOperation: $rootScope.persistedOperation || false,
            saved: false
        }

        $scope.tpData = {
            editing: false,
            result: [],
            filter: {},
            gruposPractica: gruposPracticaResponse.data,
            practicas: practicasResponse.data,
            select: {
                practicas: practicasResponse.data
            }
        }

        $scope.addTPs = function(show) {
            $scope.tpData.editing = show;
        }

        $scope.$watch('tpData.filter.grupoPracticaId', function (newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                delete $scope.tpData.filter.practicaId;
                filterPracticas();
            }

            function filterPracticas() {

                if (!$scope.tpData.filter.grupoPracticaId || !angular.isDefined($scope.tpData.filter.grupoPracticaId)) {
                    $scope.tpData.select.practicas = $scope.tpData.practicas;
                } else {
                    $scope.tpData.select.practicas = $filter('filter')($scope.tpData.practicas, function (value) {
                        return angular.equals(value.grupo.id, $scope.tpData.filter.grupoPracticaId);
                    })
                }
            }
        })

        pagination.config('api/trabajoPractico/find');

        $scope.tpData.paginationData = pagination.paginationData;

        function executeQuery(pageNumber) {
            pagination.paginate($scope.tpData.filter, pageNumber).then(function (data) {
                $scope.tpData.result = data;
                for(var i = 0; i < $scope.tpData.result.length; i++) {
                    var indexInOtherList = findItemIndexInList($scope.tpData.result[i].id, $scope.catedra.trabajosPracticos);
                    if (indexInOtherList > -1 && !$scope.catedra.trabajosPracticos[indexInOtherList].deleted) {
                         $scope.tpData.result[i].added = true;
                    }
                }
                $scope.paginationData = pagination.getPaginationData();
            }, function () {
            });
        }

        $scope.tpData.consultar = function () {
            executeQuery();
        }

        $scope.tpData.cleanFilters = function() {
            $scope.tpData.filter = {};
        }

        $scope.tpData.nextPage = function () {
            if ($scope.paginationData.morePages) {
                executeQuery(++$scope.paginationData.pageNumber);
            }
        }
        $scope.tpData.previousPage = function () {
            if (!$scope.paginationData.firstPage) {
                executeQuery(--$scope.paginationData.pageNumber);
            }
        }

        $scope.isSomethingSelected = function(){
            return $filter('filter')($scope.tpData.result, function(item){
                return item.selected && !item.added;
            }).length;
        }

        $scope.addTrabajosPracticos = function(){
            for (var i=0; i<$scope.tpData.result.length; i++) {
                var tp = $scope.tpData.result[i];
                if (tp.selected && !tp.added) {
                    $scope.tpData.result[i].added = true;
                    var indexInOtherList = findItemIndexInList($scope.tpData.result[i].id, $scope.catedra.trabajosPracticos);
                    if (indexInOtherList === -1) {
                        tp.new = true;
                        $scope.catedra.trabajosPracticos.push(tp);
                    } else {
                        $scope.catedra.trabajosPracticos[indexInOtherList].deleted = false;
                    }


                }
            }
        }

        function findItemIndexInList(id, list) {
            var index = -1;
            for (var i = 0; i< list.length; i++) {
                if (list[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        $scope.deleteTrabajosPracticos = function(index) {
            if ($scope.catedra.trabajosPracticos[index].new) {
                $scope.catedra.trabajosPracticos.splice(index, 1);
            } else {
                $scope.catedra.trabajosPracticos[index].deleted = true;
            }
            var indexInResult = findItemIndexInList($scope.catedra.trabajosPracticos[index].id, $scope.tpData.result);
            if (indexInResult != -1) {
                $scope.tpData.result[indexInResult].added = false;
                $scope.tpData.result[indexInResult].selected = false;
            }
        }


        function newHour(hour,minutes) {
            var date = new Date();
            date.setYear(1970);
            date.setMonth(0);
            date.setDate(1);
            date.setHours(hour);
            date.setMinutes(minutes);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        }

        $scope.newHorario = {
            horaDesde: newHour(8,0),
            horaHasta: newHour(18,0)
        };

        $scope.addHorario = function() {
            if (!$scope.newHorario.horaDesde || !$scope.newHorario.horaHasta) {
                notification.bad('Debe seleccionar hora desde y hasta.', function(){});
                return;
            }
            var horaDesdeGTHoraHasta = $scope.newHorario.horaDesde >= $scope.newHorario.horaHasta;
            if (horaDesdeGTHoraHasta) {
                notification.bad('La hora desde debe ser menor a la hora hasta.', function(){});
                return;
            }
            var isAlreadyAdded = $filter('filter')($scope.catedra.horarios, function(horario){
                return angular.equals(horario, $scope.newHorario);
            }).length;
            if (isAlreadyAdded){
                notification.bad('Día y horario ya agregado.', function(){});
                return;
            }
            var overlappingHours = $filter('filter')($scope.catedra.horarios, function(horario){
                var sameDay = horario.dia === $scope.newHorario.dia;
                var overlappingHours = $scope.newHorario.horaDesde >= horario.horaDesde && $scope.newHorario.horaHasta <= horario.horaHasta;
                overlappingHours |=  $scope.newHorario.horaDesde < horario.horaDesde && $scope.newHorario.horaHasta > horario.horaDesde;
                overlappingHours |=  $scope.newHorario.horaDesde < horario.horaHasta && $scope.newHorario.horaHasta > horario.horaHasta;
                return sameDay && overlappingHours;
            }).length;
            if (overlappingHours) {
                notification.bad('El horario elegido se encuentra contenido en uno ya agregado.', function(){});
                return;
            }
            $scope.catedra.horarios.push($scope.newHorario);
            $scope.newHorario = {
                horaDesde: newHour(8,0),
                horaHasta: newHour(18,0)
            };
        }

        $scope.deleteHorario = function(index) {
            $scope.catedra.horarios.splice(index, 1);
        }

        function validateRequireList(errors, list, name) {
            if (!list.length) {
                errors.push('Debe ingresar ' + name);
            }
        }

        $scope.save = function() {

            var errors = [];
            validateRequireList(errors, $scope.catedra.horarios, "horarios de la cátedra.");
            validateRequireList(errors, $scope.catedra.trabajosPracticos, 'trabajos prácticos de la cátedra.');

            if (errors.length) {
                notification.badArray(errors, function() {});
                return;
            }

//        for (var i = 0; i < $scope.catedra.horarios.length; i++) {
//            $scope.catedra.horarios[i].horaDesde = getTimeFromDate($scope.catedra.horarios[i].horaDesde);
//            $scope.catedra.horarios[i].horaHasta = getTimeFromDate($scope.catedra.horarios[i].horaHasta);
//        }

            //Quitamos de la lista de trabajos prácticos aquellos que se eliminaron pero que ya estaban persistidos.
            $scope.catedra.trabajosPracticos = $filter('filter')($scope.catedra.trabajosPracticos, function (tp){
                return !tp.deleted;
            })

            $scope.tpData.editing = false;

            service.save($scope.catedra)
                .success(function(data) {
                    $scope.data.persistedOperation = true;
                    $scope.data.disableFields = true;
                    $scope.data.saved = true;
                    notification.scrollTo('container');
                })
                .error(function (response) {
                    if (response.status === 400) {
                        notification.badArray(response, function() {});
                    } else {
                        notification.bad('Se produjo un error inesperado', function(){});
                    }

                })
        }

        function getTimeFromDate(date) {
            var time = date.getHours() + ':';
            time += date.getMinutes();

            return time;
        }


        $scope.goIndex = function() {
            $state.go('^.index', {execQuery: $scope.data.persistedOperation});
        };

        $scope.reload = function() {
            $rootScope.persistedOperation = $scope.data.persistedOperation;
            $state.go($state.current, {}, {reload: true});
        };

        $scope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (!angular.equals($state.current, toState)) {
                    delete $rootScope.persistedOperation;
                }
            });

    }]);
