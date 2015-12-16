var app = angular.module('app', ['gridster', 'ui.router', 'ui.bootstrap', 'nvd3ChartDirectives']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider.state('dashboard', {
            url: '/dashboard',
            views: {
                'index': {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })
    }
]);