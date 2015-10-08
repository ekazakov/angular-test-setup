import angular from 'angular';

import '../css/normalize.css';
import '../css/foundation.css';

import idGeneratorService from './id-generator-service';
import AppController from './app-controller';

import messageBox from './directives/message-box';
import messageList from './directives/message-list';
import messageItem from './directives/message-item';

angular.module('app', []);

angular.module('app')
    .service('idGenerator', idGeneratorService)
    .controller('AppController', AppController)
    .value('initialMessages', [
        {id: 0, text: `Σολετ απεριαμ σιθ αδ. Φελ δοσθυς περσιυς αθωμωρυμ νε.`},
        {id: 1, text: `Νο σομμυνε κυαεστιο ευμ, φελ εα λεγιμυς σομπρεχενσαμ. Εξ υσυ θεμπορ πυθενθ,`},
        {id: 2, text: `φιξ ετ σωνσεπθαμ ελωκυενθιαμ, ταντας υτιναμ ινσωλενς ευμ αν.,`}
    ])
;

angular.module('app')
    .directive('messageBox', messageBox)
    .directive('messageList', messageList)
    .directive('messageItem', messageItem)
;




