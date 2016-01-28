'use strict';

var auth = angular.module('auth.services', ['ngCookies']);

auth.factory('authFactory', ['$rootScope', '$http', '$cookies', function ($rootScope, $http, $cookies) {

    var SESSION_COOKIE = 'SESSION';
    var MENU_COOKIE = 'MENU';

    var authFactory = {
        authData: undefined
    };

    authFactory.login = function (user) {
        return $http({
            url: 'api/auth/login',
            method: 'POST',
            data: angular.toJson(user)
        });
    };

    function getExpiresDate() {
        var now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        return now;
    }

    authFactory.setAuthData = function (authData) {
        this.authData = {
            authId: authData.authId,
            authToken: authData.authToken,
            authPermission: authData.authPermission,
            permission: authData.permission,
            hasMoreRoles: authData.hasMoreRoles,
            firstLogin: authData.firstLogin,
            typeOfPerson: authData.typeOfPerson
        };
        $cookies.putObject(SESSION_COOKIE, this.authData, {expires: getExpiresDate()});
    };

    authFactory.communicateAuthChanged = function() {
        $rootScope.$broadcast('authChanged');
    }

    authFactory.getAuthData = function () {
        return $cookies.getObject(SESSION_COOKIE);
    };

    authFactory.isAuthenticated = function () {
        return !angular.isUndefined(this.getAuthData());
    };

    authFactory.updateExpiresTime = function () {
        this.authData = this.getAuthData();
        $cookies.putObject(SESSION_COOKIE, this.authData, {expires: getExpiresDate()});
    };

    authFactory.logout = function() {
        $cookies.remove(SESSION_COOKIE);
        $cookies.remove(MENU_COOKIE);
        return this.authData = undefined;
    };

    authFactory.setMenu = function(menu) {
        $cookies.putObject(MENU_COOKIE, menu, {});
    };

    authFactory.getMenu = function() {
        return $cookies.getObject(MENU_COOKIE);
    };

    authFactory.removeMenu = function() {
        $cookies.remove(MENU_COOKIE);
    }
    return authFactory;
}]);

auth.factory('authHttpRequestInterceptor', ['$rootScope', '$injector',
    function ($rootScope, $injector) {
        var authHttpRequestInterceptor = {
            request: function ($request) {
                var authFactory = $injector.get('authFactory');
                if (authFactory.isAuthenticated()) {
                    authFactory.updateExpiresTime();
                    $request.headers['auth-id'] = authFactory.getAuthData().authId;
                    $request.headers['auth-token'] = authFactory.getAuthData().authToken;
                }
                return $request;
            }
//            'response': function(response) {
//                // do something on success
//                return response;
//            },

            // optional method
//            'responseError': function(rejection) {
//                // do something on error
//                if (rejection.status == 1000)
//                    return $q.reject(rejection);
//                else               {
//                    rejection.data = [['Error, check de log']];
//                    return $q.reject(rejection)
//
//                }
//            }
        };
        return authHttpRequestInterceptor;
    }]);