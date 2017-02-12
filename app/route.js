define(["app"], function(app) {
    app.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider",
        function($stateProvider, $urlRouterProvider, $controllerProvider) {
            // angular有个启动函数，叫做bootstrap；
            // 根据angular的代码设计，你需要在启动之前定义所有的controller；
            // 就好似有个袋子，你在bootstrap之前想往里塞什么就塞什么；
            // 可是一旦bootstrap了，他就不再接受你任何往里塞的controller了；
            // 解决这个问题，只有一个方法，就是利用主模块的provider主动注册controller；
            // 但是由于provider不能直接使用，所以我们把它存在主模块下面；
            // 通过存下来的方法，可以用来注册异步加载回来的页面组件。
            app.registerController = $controllerProvider.register;
            app.loadFile = function(js) {
                return function($rootScope, $q) {
                    //通过$q服务注册一个延迟对象 deferred
                    var def = $q.defer(),
                        deps = [];
                    angular.isArray(js) ? (deps = js) : deps.push(js);
                    require(deps, function() {
                        $rootScope.$apply(function() {
                            // 成功
                            def.resolve();
                            // def.reject() 不成功
                            // def.notify() 更新状态
                        });
                    });
                    //通过deferred延迟对象，可以得到一个承诺promise，而promise会返回当前任务的完成结果
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
