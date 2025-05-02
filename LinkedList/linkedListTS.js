var NodeTS = /** @class */ (function () {
    function NodeTS(value) {
        this.value = value;
        this.next = null;
    }
    return NodeTS;
}());
var LinkedListTS = /** @class */ (function () {
    function LinkedListTS() {
        this.head = null;
    }
    LinkedListTS.prototype.append = function (value) {
        var newNode = new NodeTS(value);
        if (this.head == null) {
            this.head = newNode;
        }
        else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    };
    LinkedListTS.prototype.remove = function (value) {
        if (this.head == null)
            return;
        if (this.head.value == value) {
            this.head = this.head.next;
        }
        var current = this.head;
        while (current && current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current && current.next) {
            current.next = current.next.next;
        }
    };
    LinkedListTS.prototype.print = function () {
        var current = this.head;
        var values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        console.log(values.join(" -> "));
    };
    return LinkedListTS;
}());
var linkedListTS = new LinkedListTS();
linkedListTS.append(1);
linkedListTS.append(2);
// linkedListTS.remove(1);
linkedListTS.print(); // 1 -> 2
