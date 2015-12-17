angular.module('app')

    .controller('DashboardCtrl', ['$scope', '$sce',
        function($scope, $sce) {
            $scope.gridsterOptions = {
                margins: [20, 20],
                columns: 4,
                draggable: {
                    handle: 'div'
                }
            };

            $scope.dashboards = {
                '1': {
                    id: '1',
                    name: 'Home',
                    widgets: [{
                        col: 0,
                        row: 0,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Widget 1",
                        width: 500,
                        height: 500,
                        iFrameUrl: $sce.trustAsResourceUrl("http://gbdashboards.glassbeam.com/ArubaNetworks_Dev_408/rdPage.aspx?rdReport=customer.customer_overview")

                    }, {
                        col: 2,
                        row: 1,
                        sizeY: 2,
                        sizeX: 2,
                        name: "Widget 2",
                        height: 590,
                        iFrameUrl: $sce.trustAsResourceUrl("http://gbdashboards.glassbeam.com/ArubaNetworks_Dev_408/rdPage.aspx?rdReport=customer.customer_overview")
                    }]
                },
                '2': {
                    id: '2',
                    name: 'Other',
                    widgets: [{
                        col: 1,
                        row: 1,
                        sizeY: 2,
                        sizeX: 2,
                        name: "Other Widget 1",
                        height: 590,
                        iFrameUrl: $sce.trustAsResourceUrl("http://gbdashboards.glassbeam.com/ArubaNetworks_Dev_408/rdPage.aspx?rdReport=customer.uptime_analysis")
                    }, {
                        col: 1,
                        row: 3,
                        sizeY: 2,
                        sizeX: 2,
                        name: "Other Widget 2",
                        height: 590,
                        iFrameUrl: $sce.trustAsResourceUrl("http://gbdashboards.glassbeam.com/ArubaNetworks_Dev_408/rdPage.aspx?rdReport=Version_Upgrade.version_upgrade_report")
                    }]
                }
            };

            $scope.clear = function() {
                $scope.dashboard.widgets = [];
            };

            $scope.addWidget = function() {
                $scope.dashboard.widgets.push({
                    name: "New Widget",
                    sizeX: 1,
                    sizeY: 1,
                    width: 500,
                    height: 500,
                    exampleData: [{
                        key: "One",
                        y: 5
                    }, {
                        key: "Two",
                        y: 2
                    }, {
                        key: "Three",
                        y: 9
                    }, {
                        key: "Four",
                        y: 7
                    }, {
                        key: "Five",
                        y: 4
                    }, {
                        key: "Six",
                        y: 3
                    }, {
                        key: "Seven",
                        y: 9
                    }]
                });
            };


            $scope.xFunction = function() {
                return function(d) {
                    return d.key;
                };
            }
            $scope.yFunction = function() {
                return function(d) {
                    return d.y;
                };
            }
            $scope.descriptionFunction = function() {
                return function(d) {
                    return d.key;
                }
            }

            $scope.$watch('selectedDashboardId', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.dashboard = $scope.dashboards[newVal];
                } else {
                    $scope.dashboard = $scope.dashboards[1];
                }
            });

            // init dashboard
            $scope.selectedDashboardId = '1';

        }
    ])

    .controller('CustomWidgetCtrl', ['$scope', '$modal',
        function($scope, $modal) {

            $scope.remove = function(widget) {
                $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            };

            $scope.openSettings = function(widget) {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'partials/widget_settings.html',
                    controller: 'WidgetSettingsCtrl',
                    resolve: {
                        widget: function() {
                            return widget;
                        }
                    }
                });
            };



        }
    ])

    .controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
        function($scope, $timeout, $rootScope, $modalInstance, widget) {
            $scope.widget = widget;

            $scope.form = {
                name: widget.name,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                col: widget.col,
                row: widget.row
            };

            $scope.sizeOptions = [{
                id: '1',
                name: '1'
            }, {
                id: '2',
                name: '2'
            }, {
                id: '3',
                name: '3'
            }, {
                id: '4',
                name: '4'
            }];

            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };

            $scope.remove = function() {
                $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
                $modalInstance.close();
            };

            $scope.submit = function() {
                angular.extend(widget, $scope.form);

                $modalInstance.close(widget);
            };

        }
    ])

    // helper code
    .filter('object2Array', function() {
        return function(input) {
            var out = [];
            for (i in input) {
                out.push(input[i]);
            }
            return out;
        }
    });