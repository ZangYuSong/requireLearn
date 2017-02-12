define(["app"], function(app) {
    app.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider",
        function($stateProvider, $urlRouterProvider, $controllerProvider) {
            app.registerController = $controllerProvider.register;
            app.loadFile = function(js) {
                return function($rootScope, $q) {
                    var def = $q.defer(),
                        deps = [];
                    angular.isArray(js) ? (deps = js) : deps.push(js);
                    require(deps, function() {
                        $rootScope.$apply(function() {
                            def.resolve();
                        });
                    });
                    return def.promise;
                };
            }
            $urlRouterProvider.otherwise('/index');
            $stateProvider.state("index", {
                url: "/index",
                template: "这是首页页面"
            });
            $stateProvider.state("computers", {
                url: "/computers",
                template: "这是电脑分类页面{{title}}",
                controller: "ctrl.file",
                resolve: {
                    loadFile: app.loadFile("file")
                }
            });
            $stateProvider.state("printers", {
                url: "/printers",
                template: "这是打印机页面"
            });
            $stateProvider.state("blabla", {
                url: "/blabla",
                template: "其他"
            });
        }
    ]);
});
