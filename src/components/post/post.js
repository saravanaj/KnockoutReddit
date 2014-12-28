define(["knockout", "text!./post.html"], function (ko, postTemplate) {
    function PostViewModel(params) {
        var self = this;
        // Mostly read-only properties
        ko.utils.extend(self, params.postData);
        self.hidden = ko.observable(params.postData.hidden);
        
        self.hidePost = function () {
            self.hidden = true;
        }
    }

    return { viewModel: PostViewModel, template: postTemplate };
});