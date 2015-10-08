export default function () {


    return {
        scope: {
            message: '=',
            remove: '&'
        },
        restrict: 'E',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function () {
        },
        template: `
            <div data-alert class="alert-box info radius">
                <span ng-bind="ctrl.message.text"></span>
                <a href="#" class="close" ng-click="ctrl.remove({$message: ctrl.message})">&times;</a>
            </div>
        `
    };
};