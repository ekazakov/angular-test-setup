describe('AppController', function () {
    let $rootScope;
    let scope;
    let $controller;
    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        scope = $rootScope.$new();
    }));

    it('init controller with messages', function () {
        const appCtrl = $controller('AppController', [1, 2, 3]);
        expect(appCtrl.messages.length).toEqual(3);
    });

    it('add message to list', function () {
        const appCtrl = $controller('AppController', [1, 2, 3]);
        appCtrl.add(4);
        expect(appCtrl.messages.length).toEqual(4);
    });
});