define(["uiRouter"], function() {
    var app = angular.module("Demo", ["ui.router"]);
    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("index", {
            url: "/index",
            template: "这是首页页面"
        });
        $stateProvider.state("computers", {
            url: "/computers",
            template: "这是电脑分类页面",
            resolve: {
                load: function() {
                    require(["file"]);
                }
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
    }]);
});
