var module = angular.module('practicaOdontologicaModule');


module.controller('PracticaOdontologicaCtrl_Index', ['$scope','$cacheFactory', 'PracticaOdontologicaSrv', '$state', '$stateParams', 'NotificationSrv', 'CommonsSrv', 'gruposPracticaResponse', 'PaginationService', function ($scope, $cacheFactory, service, $state, $stateParams, notification, commons, gruposPracticaResponse, pagination) {

    $scope.filter = {};
    $scope.result = [];
    $scope.gruposPractica = gruposPracticaResponse.data;

    var cache = $cacheFactory.get('practicaIndexCache') || $cacheFactory('practicaIndexCache');

    $scope.aux = {
        showDadosBaja: false
    }

    pagination.config('api/practicaOdontologica/find');

    $scope.paginationData = pagination.paginationData;

    function executeQuery(pageNumber) {
        notification.showWidget();
        pagination.paginate($scope.filter, pageNumber).then(function(data){
            notification.hideWidget();
            $scope.result = data;
            $scope.aux.showDadosBaja = $scope.filter.dadosBaja;
            $scope.paginationData = pagination.getPaginationData();
        }, function(){notification.hideWidget();});
    }

    $scope.consultar = function () {
        executeQuery();
    }

    $scope.nextPage = function(){
        executeQuery(++$scope.paginationData.pageNumber);
    }
    $scope.previousPage = function() {
        executeQuery(--$scope.paginationData.pageNumber);
    }

    $scope.new = function () {
        $state.go('^.create');
    }

    $scope.darDeBaja = function (practicaId) {
        notification.requestReason().then(function (motivo) {
            if (motivo != null) {
                notification.showWidget();
                service.remove(practicaId, motivo).success(function (response) {
                    notification.hideWidget();
                    notification.goodAndOnEscape("Práctica dada de baja correctamente.", function () {
                        executeQuery($scope.paginationData.pageNumber);
                    }, function () {
                        executeQuery($scope.paginationData.pageNumber);
                    })
                })
                    .error(function (response) {
                        notification.hideWidget();
                        notification.badArray(response, function () {
                        });
                    })
            }
        });
    }

    $scope.darDeAlta = function (practicaId) {
        notification.requestConfirmation("¿Está seguro?", function () {
            altaConfirmada(practicaId)
        });

        function altaConfirmada(practicaId) {
            notification.showWidget();
            service.restore(practicaId)
                .success(function () {
                    notification.hideWidget();
                    notification.goodAndOnEscape("Práctica odontológica dada de alta correctamente.", function () {
                        executeQuery($scope.paginationData.pageNumber);
                    }, function () {
                        executeQuery($scope.paginationData.pageNumber);
                    })
                })
                .error(function () {
                    notification.hideWidget();
                })
        }
    }

    $scope.edit = function (materiaId) {
        $state.go('^.edit', {id: materiaId});

    }

    $scope.viewDetail = function (practicaId) {
        $state.go('^.view', {id: practicaId});
    }

    $scope.cleanFilters = function () {
        $scope.filter = {};
    }

    function cacheData() {
        var data = {
            filter: $scope.filter,
            result: $scope.result,
            aux: $scope.aux
        }
        cache.put('data', data);
    }

    function getCachedData() {
        var data = cache.get('data');

        $scope.filter = data.filter;
        $scope.result = data.result;
        $scope.aux = data.aux;
    }

    $scope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (toState.name.startsWith('practicaOdontologica')) {
                cacheData();
            } else {
                cache.put('data', null);
            }

        });

    $scope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name.startsWith('practicaOdontologica')) {
                if (toParams.execQuery) {
                    executeQuery();
                } else if (toParams.execQuerySamePage){
                    getCachedData();
                    executeQuery($scope.paginationData.pageNumber)
                } else {
                    getCachedData();
                }

            }

        })

}]);