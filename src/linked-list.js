const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {

        if(this.isEmpty()) {
            let node = new Node(data);
            this._head = this._tail = node;
            this.length++;
            return this;
        }

        let node = new Node(data, this._tail);
        this._tail = node;
        this._tail.prev.next = node;
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    nodeAt(index) {
        if (this.isEmpty() || index < 0 || index > this.length - 1) {
            throw new Error("Wrong index");
        }
        let currentIndex = 0;
        let currentNode = this._head;

        while(currentIndex < index && currentNode.next!=null) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        return currentNode;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    insertAt(index, data) {
        if(this.isEmpty()) {
            return this;
        }
        this.nodeAt(index).data = data;
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        if(this.isEmpty()) return this;
        this._head.next = this._head.data = this._tail.prev = this._tail.data = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let deletedNode = this.nodeAt(index);
        if(index === 0){
            this._head = deletedNode.next;
        }
        else {
            deletedNode.prev.next = deletedNode.next;
        }
        if(index === this.length - 1 ) {
            this._tail = deletedNode.prev;
        }
        else {
            deletedNode.next.prev = deletedNode.prev;
        }
        deletedNode = null;
        this.length--;
        return this;
    }

    reverse() {
        let listLength = this.length;
        let tempArray = [];
        for(let i=0; i<listLength; i++) {
            let data = this.at(listLength - 1 - i);
            tempArray.push(data)
        }
        for(let i=0; i<listLength; i++) {
            this.insertAt(i, tempArray[i]);
        }

        return this;
    }

    indexOf(data) {
        for(let i=0; i<this.length; i++) {
            if(this.at(i) === data) return i;
        }
        return -1;
    }
}

module.exports = LinkedList;