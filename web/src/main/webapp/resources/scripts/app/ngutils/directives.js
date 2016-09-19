var directives = angular.module('sapo.directives', []);

directives.directive('sameAs', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            ngModel.$parsers.unshift(validate);

            // Force-trigger the parsing pipeline.
            scope.$watch(attrs.sameAs, function () {
                ngModel.$setViewValue(ngModel.$viewValue);
            });

            function validate(value) {
                var isValid = scope.$eval(attrs.sameAs) == value;

                ngModel.$setValidity('sameAs', isValid);

                return isValid ? value : undefined;
            }
        }
    };
});

directives.directive('showFocus', function ($timeout) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function (newValue) {
                $timeout(function () {
                    newValue && element.focus() && element.select();
                });
            }, true);
    };
});

directives.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);

directives.directive('validateLength', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

            scope.$watch(function () { return ngModel.$modelValue && ngModel.$modelValue.length; }, function() {
                ngModel.$validate(); // validate again when array changes
            });

            ngModel.$validators.length = function() {
                var arr = ngModel.$modelValue;
                if(!arr) { return false; }

                return arr.length > 0;
            };

        }
    };
});

// CUSTOM INPUT DIRECTIVES
var templateInput =
    '<md-input-container flex> ' +
        '<label> {{ ctrl.label }} </label>'+
        '<input name="{{ ctrl.name }}" ng-model="ctrl.model"  ng-required="{{ ctrl.req }}" md-maxlength="{{ ctrl.max }}" ng-pattern="ctrl.pat" minlength="{{ ctrl.min }}" ng-disabled="{{ ctrl.disabled }}" type="{{ ctrl.type }}" aria-label="{{ ctrl.label }}">'+
        '<div ng-messages="ctrl.form.$error" ng-show="ctrl.form.$touched ||  ctrl.submitted  && ctrl.form.$invalid"> ' +
              '<div ng-messages-include="error-messages"></div>' +
        '</div> ' +
        '</md-input-container>' ;
var inputController = function(){
    var ctrl = this;

    function init(){
        if(ctrl.pattern != 'undefined'){
            ctrl.pat = new RegExp(ctrl.pattern);
        }
    }
    init();
};

var directiveInput = function(){
    return {
        restrict: 'E',
        template: templateInput,
        scope: {
            label: '@',
            name: '@',
            model: '=',
            req: '@',
            max: '@',
            min: '@',
            pattern: '@',
            disabled: '@',
            form: '=',
            submitted: '=',
            type: '@'
        },
        controller: inputController,
        controllerAs: 'ctrl',
        bindToController: true
    };
};

var templateDetalleHC = "<md-list-item class='md-3-line md-long-text' flex-gt-sm>" +
    "<div class='md-list-item-text compact'>" +
    "<div layout='row'> <h4 style='font-weight: bold'> {{ camposino.nombre }}</h4> <h4>{{ camposino.siNo | siNo}} </h4> </div>"+
    "<h4 ng-if='camposino.siNo == true && campodetalle != null'> {{ campodetalle.nombre }} {{ campodetalle.only_detalle }}</h4>" +
    "<p ng-if='camposino.siNo == true && campofecha != null'>{{ campofecha.nombre }} {{ campofecha.fecha |  date:'MM/dd/yyyy' }}</p>" +
    "</div>" +
    "</md-list-item>";
var detalle = function(){
    return {
        restrict: 'E',
        template: templateDetalleHC,
        replace: true,
        scope: {
            camposino : "=",
            campodetalle : "=",
            campofecha : "=",
            exp: "@"
        }
    };
};

var errorMessages = function(){
    return{
        restrict: 'AE',
        template: '<div class="validation-messages" ng-messages="form.$error" ng-show="form.$touched ||  submitted  && form.$invalid" multiple> ' +
                    '<div ng-messages-include="error-messages"></div>' +
                   '</div> ',
        scope: {
            form: '=',
            submitted: '='
        }
    }
} ;

var controllerEditHC = function ($scope) {

    var vm = this;
    vm.limpiarCampos = limpiarCampos;

    function limpiarCampos(id){
        $scope.limpiarCampos(id);
    }


};
var templateEditHC =
    '<div layout-gt-sm="row" layout-margin flex-gt-sm>' +
        '<md-switch ng-model="vm.camposino.siNo" aria-label="vm.camposino.nombre" ng-true-value="true" ng-false-value="false" class="md-primary" ng-change="vm.change({id : vm.camposino.id})"> {{vm.camposino.nombre }}: {{vm.camposino.siNo | siNo}} </md-switch>' +
        '</div>'+
        '<div layout-gt-sm="row" layout-margin flex-gt-sm>'+
        '<md-input-container flex-gt-sm ng-if="vm.campodetalle && vm.camposino.siNo == true" ng-form="formDetalle">'+
        '<label> {{ vm.campodetalle.nombre }} </label>'+
        '<input name="detalle" ng-model="vm.campodetalle.only_detalle" md-maxlength="75" ng-required="vm.camposino.siNo == true" aria-label="{{vm.campodetalle.nombre }}">'+
        '<error-messages form="formDetalle.detalle" submitted="vm.submitted"></error-messages>'+
        '</md-input-container>'+
        '<div layout="column" ng-if="vm.campofecha && vm.camposino.siNo == true" ng-form="formDetalle">'+
        '<md-datepicker name="fecha" ng-model="vm.campofecha.fecha" md-placeholder="{{ vm.campofecha.nombre }}" ng-required="vm.camposino.siNo == true"></md-datepicker>'+
        '<error-messages form="formDetalle.fecha" submitted="vm.submitted"></error-messages>'+
        '</div>'+
        '<div ng-transclude layout-gt-sm="row" layout-margin flex-gt-sm></div> '+
    '</div>';
var editHC = function(){
  return {
      restrict: 'E',
      scope:{
          camposino : '=',
          campodetalle: '=',
          campofecha: '=',
          form : '=',
          submitted: '=',
          change: '&'
      },
      template: templateEditHC,
      controller: controllerEditHC,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
  }
};

var toolbar = '<md-toolbar class="md-accent">'+
    '<div class="md-toolbar-tools">'+
    '<img ng-src="resources/img/image_user.jpg" class="md-avatar-login " hide-xs ng-click="ctrl.showCard($event, ctrl.paciente)"/>'+
    '<h2>'+
    '<span>{{ ctrl.paciente.apellido }}</span> '+
    '</h2>'+
    '<span flex></span>'+
    '<md-button class="md-icon-button" aria-label="Editar paciente" ng-click="ctrl.edit(ctrl.paciente.id)">'+
    '<ng-md-icon icon="edit" size="24" style="fill: white">'+
    '<md-tooltip> Editar paciente </md-tooltip>'+
    '</ng-md-icon>'+
    '</md-button>'+
    '</div>'+
'</md-toolbar>'
var pacienteToolbar = function(){
    return {
       restrict: 'E',
       template: toolbar,
       scope:{
            paciente : '='
      },
        controller: pacienteToolbarCtrl,
        controllerAs: 'ctrl',
        bindToController: true,
        replace:true
    }
}

function pacienteToolbarCtrl($mdDialog){
    var ctrl = this;

    ctrl.showCard = showCard;
    ctrl.edit = edit;

    function edit(pacienteId){
        $state.go('paciente.edit', {id:pacienteId});
    }

    function showCard(event, paciente){
        $mdDialog.show({
                templateUrl: 'views/historiaClinica/historiaClinicaCard.html',
                parent: angular.element(document.body),
                locals: {
                    pacienteData: paciente},
                targetEvent: event,
                clickOutsideToClose: true,
                controller: function DialogController($scope, $mdDialog, $state, pacienteData){
                    $scope.paciente = pacienteData;
                    $scope.goHistoriaClinica = goHistoriaClinica;
                    $scope.goDatosPersonales = goDatosPersonales;
                    $scope.close = close;

                    function close(){
                        $mdDialog.hide();
                    }

                    function goDatosPersonales(pacienteId){
                        $state.go('paciente.view', {id:pacienteId});
                        close();
                    }

                    function goHistoriaClinica(pacienteId){
                        $state.go('historiaClinica.view', {id:pacienteId});
                        close();
                    }
                }
            }
        );
    }
}

directives.directive('validatedInput',directiveInput);
directives.directive('errorMessages',errorMessages);
directives.directive('detalle',detalle);
directives.directive('itemHistoria', editHC);
directives.directive('pacienteToolbar', pacienteToolbar);

/* DIRECTIVES ODONTOGRAMA */

var piezaDentalController = function(){

}

var piezaDentalDirective = function(){
    return{
        restrict: 'E',
        templateUrl: 'views/odontograma/piezaDental.html',
        scope:{
            piezaDental: '='
        },
        controller: piezaDentalController,
        controllerAs: 'vm',
        bindToController: true
    }
}

directives.directive('piezaDental', piezaDentalDirective);

//FILTERS
directives.filter('cut', function () {
    return function (value, wordwise, max) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value +  '…';
    };
});

directives.filter('noDefinido',function(){
    return function(input){
        if(angular.isUndefined(input) || input == null){
            return 'No definido';
        }
        return input;
    }
})

directives.filter('siNo', function(){
    return function(input){
        if(angular.isDefined(input) && input == true ){
            return "Sí";
        }else{
            return "No";
        }
    }
});

directives.directive('filterChips', function () {
    return {
        restrict: 'E',
        template: '<div class="query-chips" layout-gt-sm="row" ng-if="data.length > 0" layout-margin> ' +
            '<md-chips ng-model="data" readonly="readonly">' +
            '<md-chip-template>' +
            '<em>{{$chip.name}}</em> ' +
            '<b>{{$chip.displayValue}}</b>' +
            '</md-chip-template>' +
            '</md-chips></div>',
        scope: {
            data: '=',
            readonly: '='
        },
        controller: function($scope) {}
    }
});

directives.filter('truncate', function() {
    return function(text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        } else {
            return String(text).substring(0, length - end.length) + end;
        }

    };
});




