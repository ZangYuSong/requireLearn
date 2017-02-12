require.config({
    // 所有模块的查找根路径
    baseUrl: "app",
    // path映射那些不直接放置于baseUrl下的模块名
    paths: {
        "jquery": "../scripts/jquery-1.13.1/jquery.min",
        "angular": "../scripts/angular-1.4.6/angular.min",
        "angular-route": "../scripts/angular-1.4.6/angular-route.min",
        "require": "./scripts/require",
        "uiRouter": "../scripts/angular-1.4.6/angular-ui-router"
    },
    // 为那些没有使用define()来声明依赖关系、设置模块的"浏览器全局变量注入"型脚本做依赖和导出配置
    shim: {
        "angular": {
            // 表明这个模块外部调用时的名称
            exports: "angular"
        },
        "angular-route": {
            deps: ["angular"], // angular-route 依赖 angular
            exports: "angular-route"
        },
        "uiRouter": {
            deps: ["angular"], // angular-ui-router 依赖 angular
            exports: "uiRouter"
        }
    },
    // 指定要加载的一个依赖数组
    // deps: [
    //     "angular",
    //     "angular-route",
    //     "jquery"
    // ],
    // RequireJS获取资源时附加在URL后面的额外的query参数
    urlArgs: "bust=" + (new Date()).getTime()
});

require(["jquery", "route", "angular"], function() {
    // 手动启动 angular，不要使用 ng-app="Demo" 来定义
    angular.bootstrap(document, ["Demo"]);
});
