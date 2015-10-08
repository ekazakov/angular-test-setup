export default function () {
    return {
        scope: {
            addMessage: '&'
        },
        restrict: 'E',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function (idGenerator, $scope) {
            this.limit = 0;
            this.overLimit = false;
            this.maxLength = 15;
            this.newMessage = '';

            this.updateLimit = function () {
                var diff = this.maxLength - this.newMessage.length;
                this.limit = Math.abs(diff);
                this.overLimit = (diff < 0);
                $scope.msgForm.msg.$error.maxlength = this.overLimit;
            };

            this.add = function () {
                if (this.newMessage.length === 0) {
                    return;
                }

                var message = {
                    id: idGenerator.newId(),
                    text: this.newMessage
                };

                this.addMessage({$message: message});
                this.newMessage = '';
            }
        },
        template: `
            <form name="msgForm">
                <div>
                    <label>
                        Type your message
                        <span ng-show="!ctrl.overLimit">
                            Left <span class="messageBox__underLimit">{{ ctrl.limit }}</span> characters
                        </span>
                        <span ng-show="ctrl.overLimit" style="color: red">
                            Over limit by <span class="messageBox__overLimit">{{ ctrl.limit }}</span> characters
                        </span>
                                  <!--ng-maxlength="ctrl.maxLength"-->
                        <textarea ng-model="ctrl.newMessage"
                                  name="msg"
                                  ng-minlength="1"
                                  ng-change="ctrl.updateLimit()"
                                  ng-class="{error: msgForm.msg.$error.maxlength}"></textarea>
                    </label>
                    <small ng-if="msgForm.msg.$error.maxlength" class="error">Text to long</small>
                </div>
                <button ng-click="ctrl.add()"
                   ng-disabled="msgForm.msg.$error.maxlength || ctrl.newMessage.length == 0"
                   href="#" class="button success expand">Publish</button>
            </form>
            `
    };
};