const utils = {
    dispatchEvent
};

function dispatchEvent (eventType, element) {
    element = $(element)[0];
    var event = document.createEvent('Event');
    event.initEvent(eventType, true, true);
    element.dispatchEvent(event);
}

export {utils as default, dispatchEvent}