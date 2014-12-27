define(['jquery', 'knockout', 'router', 'bootstrap', 'knockout-projections'], function ($, ko, router) {
    // Components can be packaged as AMD modules, such as the following:
    ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
    ko.components.register('posts-page', { require: 'components/posts-page/post' });

    // ... or for template-only components, you can just point to a .html file directly:
    ko.components.register('about-page', {
        template: { require: 'text!components/about-page/about-page.html' }
    });
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
    // Start the application
    ko.applyBindings({ route: router.currentRoute });
});