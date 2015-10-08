export default function () {
    var counter = 2;

    this.newId = function () {
        return ++counter;
    };
};