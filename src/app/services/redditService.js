define(["jquery", "appConfig"], function ($, appConfig) {
    // Services get data from APIs

    var redditService = {
        // Return a Promise.
        getPosts: function (path, params) {
            var postsRequest = $.getJSON(appConfig.redditApiUrl + path, $.extend({
                sort: "hot",
                count: 0,
                limit: 25
            }, params));
            return postsRequest;
        }
    };

    return redditService;
});