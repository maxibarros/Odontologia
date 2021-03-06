var module = angular.module('practicaOdontologicaModule');


module.controller('PracticaOdontologicaCtrl_Index', ['$scope', '$cacheFactory', 'PracticaOdontologicaSrv', '$state', '$stateParams', 'MessageSrv', 'CommonsSrv', 'gruposPracticaResponse', 'PaginationService', '$mdDialog', '$filter', 'DeleteRestoreSrv',
    function ($scope, $cacheFactory, service, $state, $stateParams, message, commons, gruposPracticaResponse, pagination, $mdDialog, $filter, deleteRestoreService) {

        $scope.filter = {};
        $scope.result = [];
        $scope.gruposPractica = gruposPracticaResponse.data;
        $scope.filterChips = [];

        var handleError = $scope.$parent.handleError;
        $scope.validationErrorFromServer = $scope.$parent.validationErrorFromServer;

        var cache = $cacheFactory.get('practicaIndexCache') || $cacheFactory('practicaIndexCache');

        $scope.aux = {
            showDadosBaja: false,
            mostrarFiltros: true
        }

        pagination.config('api/practicaOdontologica/find');

        $scope.paginationData = pagination.paginationData;

        function updateFilterChips() {
            $scope.filterChips = [];
            $scope.filterChips.push(newFilterChip('dadosBaja', 'Dados de baja', $scope.filter.dadosBaja, $scope.filter.dadosBaja ? 'SI' : 'NO'));
            if ($scope.filter.denominacion) {
                $scope.filterChips.push(newFilterChip('denominacion', 'Nombre', $scope.filter.denominacion));
            }
            if ($scope.filter.idGrupoPractica) {
                $scope.filterChips.push(newFilterChip('idGrupoPractica', 'Grupo', $scope.filter.idGrupoPractica,
                    $filter('filter')($scope.gruposPractica, function (item) {
                        return item.id === $scope.filter.idGrupoPractica;
                    })[0].nombre)
                );
            }
        }

        $scope.$watchCollection('filterChips', function (newCol, oldCol) {
            if (newCol.length < oldCol.length) {
                $scope.filter = {};
                angular.forEach(newCol, function (filterChip) {
                    $scope.filter[filterChip.origin] = filterChip.value;
                });
                executeQuery();
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

        function executeQuery(pageNumber) {
            $scope.validationErrorFromServer.error = false;
            pagination.paginate($scope.filter, pageNumber).then(function (data) {
                $scope.result = data;
                $scope.aux.showDadosBaja = $scope.filter.dadosBaja;
                $scope.paginationData = pagination.getPaginationData();
                updateFilterChips();
            }, function () {
            });
        }

        $scope.consultar = function () {
            executeQuery();
        }

        $scope.nextPage = function () {
            if ($scope.paginationData.morePages) {
                executeQuery(++$scope.paginationData.pageNumber);
            }
        }
        $scope.previousPage = function () {
            if (!$scope.paginationData.firstPage) {
                executeQuery(--$scope.paginationData.pageNumber);
            }
        }

        $scope.new = function () {
            $state.go('^.create');
        }

        $scope.edit = function (materiaId) {
            $state.go('^.edit', {id: materiaId});

        }

        $scope.viewDetail = function (practicaId) {
            $state.go('^.view', {id: practicaId});
        }

        $scope.cleanFilters = function () {
            $scope.filter = {};
            executeQuery();
        }

        deleteRestoreService.config('api/practicaOdontologica/remove', 'api/practicaOdontologica/restore', 'Práctica odontológica', executeQuery, handleError);

        $scope.openDeleteDialog = function (event, id, nombre) {
            deleteRestoreService.delete(event, id, nombre, $scope.paginationData.pageNumber, $scope.filter.dadosBaja, $scope.result.length);
        }

        $scope.openRestoreDialog = function (event, id, nombre) {
            deleteRestoreService.restore(event, id, nombre, $scope.paginationData.pageNumber);
        }

        $scope.mostrarAcciones = function (item) {
            item.showAction = true;
        };

        $scope.ocultarAcciones = function (item) {
            item.showAction = false;
        };

        $scope.clickIcon = 'expand_less';
        $scope.clickIconMorph = function () {
            if ($scope.clickIcon === 'expand_more') {
                $scope.clickIcon = 'expand_less';
            }
            else {
                $scope.clickIcon = 'expand_more';
            }
        };

        $scope.colorIcon = ['#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF', '#00B0FF'];
        $scope.colorMouseOver = function (icon) {
            $scope.colorIcon[icon] = '#E91E63';
        };

        $scope.colorMouseLeave = function (icon) {
            $scope.colorIcon[icon] = '#00B0FF';
        };

        function cacheData() {
            var data = {
                filter: $scope.filter,
                result: $scope.result,
                aux: $scope.aux,
                paginationData: $scope.paginationData
            }
            cache.put('data', data);
        }

        function getCachedData() {
            var data = cache.get('data');

            $scope.filter = data.filter;
            $scope.result = data.result;
            $scope.aux = data.aux;
            $scope.paginationData = data.paginationData;
            updateFilterChips();
        }

        $scope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.startsWith('practicaOdontologica')) {
                    cacheData();
                } else {
                    cache.destroy();
                }

            });

        $scope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name.startsWith('practicaOdontologica')) {
                    if (toParams.execQuery) {
                        executeQuery();
                    } else if (toParams.execQuerySamePage) {
                        getCachedData();
                        executeQuery($scope.paginationData.pageNumber)
                    } else {
                        getCachedData();
                    }
                } else {
                    executeQuery();
                }

            })
    }]);