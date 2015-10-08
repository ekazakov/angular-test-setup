import {dispatchEvent} from '../utils';

describe('Message List', function () {
    let $rootScope;
    let scope;
    let directive;
    let controller;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function (_$rootScope_, $compile) {
        $rootScope = _$rootScope_;

        scope = $rootScope.$new();
        scope.messages = [
            {id: 0, text: 'Message 1'},
            {id: 1, text: 'Message 2'}
        ];
        directive = $compile(`<message-list messages="messages"></message-list>`)(scope);
        controller = directive.controller('messageList');
    }));

    it('displays messages', function () {
        expect(controller.count).toEqual(2);
        scope.messages.push({id: 2, text: 'Message 3'});

        scope.$digest();
        expect(controller.count).toEqual(3);

        const items = directive.find('message-item');
        expect(items.length).toEqual(3);
    });

    it('remove item', function () {
        expect(controller.count).toEqual(2);
        controller.remove(scope.messages[0]);
        scope.$digest();
        expect(controller.count).toEqual(1);

        const items = directive.find('message-item');
        expect(items.length).toEqual(1);

        dispatchEvent('click', $('.close', directive)[0]);

        const items2 = directive.find('message-item');
        expect(items2.length).toEqual(0);
        expect(controller.count).toEqual(0);
    });

});