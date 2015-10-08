export default class Controller{
    constructor (initialMessages) {
        this.messages = initialMessages;
    }

    add (message) {
        this.messages.push(message);
    }
};