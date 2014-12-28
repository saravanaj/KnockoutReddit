define(["knockout", "hasher", "redditService", "text!./posts-page.html"], function (ko, hasher, redditService, postPageTemplate) {
    // Posts page. Gets data from the API and lists
    function PostsPageViewModel(route) {
        var self = this;

        self.isLoading = ko.observable();
        self.isError = ko.observable();
        self.postType = ko.observable(route.postType);
        self.postPath = ko.observable(route.postPath);
        self.posts = ko.observableArray([]);
        self.postTypes = ko.observableArray([
            { name: "subreddit", value: "r" },
            { name: "user", value: "user" },
            { name: "domain", value: "domain" }
        ]);

        self.postUrl = ko.computed(function () {
            var postUrl = (self.postType() && self.postPath())
                    ? (self.postType() + "/" + self.postPath())
                    : "";
            if (self.postType() === "user" && self.postPath()) {
                postUrl = postUrl + "/submitted"
            }
            return postUrl;
        });

        self.loadPosts = function () {
            self.isLoading(true);
            self.isError(false);
            hasher.setHash(self.postUrl());
            redditService.getPosts(self.postUrl(), {
                count: self.currentPage,
            })
            .done(function (postsData) {
                // Push posts to the view model
                self.posts.removeAll();
                ko.utils.arrayForEach(postsData.data.children, function (post) {
                    self.posts.push(post.data);
                });
            })
            .always(function () {
                self.isLoading(false);
            })
            .error(function (err) {
                self.isError(true);
                console.log(err);
            });
        };

        // Load posts with default options
        self.loadPosts();
    }

    return { viewModel: PostsPageViewModel, template: postPageTemplate };
});