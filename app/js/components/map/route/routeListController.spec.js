describe('the route list controller', function () {
    var component;

    beforeEach(function () {

        module('routemap');
        inject(function ($injector) {
            var $componentController = $injector.get('$componentController');
            component = $componentController('routelist');
        });
    });

    it('should show routes', function () {
        console.log('test runs, ...');
        
        // expect().toBe();
    });
});
