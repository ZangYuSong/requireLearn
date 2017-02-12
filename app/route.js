define(["angular-route"], function() {
    var app = angular.module("Demo", ["ngRoute"]);
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/", {
                template: "这是首页页面"
            })
            .when("/computers", {
                template: "这是电脑分类页面",
                resolve: {
                    load: function() {
                        require(["file"]);
                    }
                }
            })
            .when("/printers", {
                template: "这是打印机页面"
            })
            .otherwise({
                redirectTo: "/"
            });
    }]);
});
