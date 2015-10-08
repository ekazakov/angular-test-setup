import $ from 'jquery';
import {dispatchEvent} from '../utils';

describe('MessageBox', function () {
    let $rootScope;
    let scope;
    let idGenerator;
    let directive;
    let controller;
    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function (_$rootScope_, _idGenerator_, $compile) {
        $rootScope = _$rootScope_;
        idGenerator = _idGenerator_;

        scope = $rootScope.$new();
        spyOn(idGenerator, 'newId').and.callThrough();
        directive = $compile(`<message-box add-message="add($message)"></message-box>`)(scope);
        controller = directive.controller('messageBox');
    }));

    it('add message callback works', function () {
        var messageText = '';

        scope.add = function (message) {
            messageText = message.text;
        };

        controller.newMessage = 'Hello';
        controller.add();

        expect(messageText).toBe('Hello');
        expect(idGenerator.newId).toHaveBeenCalled();
    });

    it('updates limit indicator on input', function () {
        const textarea = directive.find('textarea');
        textarea.val('Hello');
        dispatchEvent('input', textarea);

        expect(controller.limit).toBe(10);
        expect(controller.overLimit).toBeFalsy();
    });

    it('set over limit flag', function () {
        const textarea = directive.find('textarea');
        textarea.val('Toooooooooooooooooo long text');
        dispatchEvent('input', textarea);

        expect(controller.limit).toBe(14);
        expect(controller.overLimit).toBeTruthy();
    });

    it('disable save btn if input too long', function () {
        const textarea = directive.find('textarea');
        textarea.val('Toooooooooooooooooo long text');
        dispatchEvent('input', textarea);
        expect(directive.find('button')[0].disabled).toBe(true);
    });

    it('save btn disabled if textarea is empty', function () {
        scope.$digest();
        expect(directive.find('button')[0].disabled).toBe(true);
    });

    it('addMessage doesn\'t called if textarea is empty', function () {
        scope.$digest();
        console.log(directive.scope().$$childTail.msgForm.msg.$error);
        controller.add();
        expect(idGenerator.newId).not.toHaveBeenCalled();
    });
});

