describe('Moa', function() {

    beforeEach(module('moaApp'));

    var $httpBackend, $rootScope, createController;

    beforeEach(inject(function($injector) {

        // Set up the mock http service responses.
        $httpBackend = $injector.get('$httpBackend');

        // backend definition common for all tests.
        $httpBackend.when('GET', '/Magento-on-Angular/api/public/categories')
                    .respond('{"10":{"name":"Furniture","children":[{"name":"Living Room"}]}}');

        // Get hold of a scope (i.e. the root scope).
        $rootScope = $injector.get('$rootScope');

        // The $controller service is used to create instances of controllers.
        var $controller = $injector.get('$controller');

        createController = function(name) {
            return $controller(name + 'Controller', {'$scope' : $rootScope });
        };

    }));

    it('Can create an Angular module;', function() {
        expect(angular.module('moaApp')).toBeDefined();
    });

    describe('CategoriesController', function() {

        it('Can issue an AJAX request and obtain the categories;', function() {

            $httpBackend.expectGET('/Magento-on-Angular/api/public/categories');
            createController('Categories');
            $httpBackend.flush();

            expect($rootScope.categories).toBeDefined();
            expect($rootScope.categories[10]).toBeDefined();

        });

    });

});