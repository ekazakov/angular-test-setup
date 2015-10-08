
export default function () {
    return {
        scope: {
            messages: '='
        },
        restrict: 'E',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function ($scope) {
            this.count = this.messages.length;

            this.remove = function (message) {
                var index = this.messages.indexOf(message);
                if (index === -1) {
                    return;
                }

                this.messages.splice(index, 1);
            };

            $scope.$watchCollection('ctrl.messages', function (newMessages, old, scope) {
                if (newMessages == null) {
                    return;
                }

                scope.ctrl.count = newMessages.length;
            });
        },
        template: require('raw!./message-list.html')
        //templateUrl: require('./message-list.html')
        //template: `
        //        <div>
        //            Total Messages: <span class="messageList__count">{{ ctrl.count }}</span>
        //        </div>
        //        <message-item
        //            ng-repeat="message in ctrl.messages track by message.id"
        //            message="message"
        //            remove="ctrl.remove($message)"
        //            />
        //    `
    };

};