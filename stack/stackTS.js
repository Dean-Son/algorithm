var StackTS = /** @class */ (function () {
    function StackTS() {
        this.items = [];
    }
    StackTS.prototype.push = function (data) {
        this.items.push(data);
    };
    StackTS.prototype.pop = function () {
        return this.items.pop();
    };
    StackTS.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    StackTS.prototype.peek = function () {
        if (this.isEmpty()) {
            throw Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    };
    StackTS.prototype.size = function () {
        return this.items.length;
    };
    return StackTS;
}());
var stackTS = new StackTS();
// console.log(`stack pop : ${stack.pop()}`);
console.log("stack push : ".concat(stackTS.push(1)));
console.log("stack pop : ".concat(stackTS.pop()));
console.log("stack push : ".concat(stackTS.push(1)));
console.log("stack push : ".concat(stackTS.push(2)));
console.log("stack size : ".concat(stackTS.size()));
console.log("stack isEmpty : ".concat(stackTS.isEmpty()));
console.log("stack peek : ".concat(stackTS.peek()));
