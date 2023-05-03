class LinkedList {
    constructor(node) {
        this.head = node
    }

    append(value) {
        let tail = this.tail()
        tail.next = new Node(value)
    }

    prepend(value) {
        let head = this.head
        let newNode = new Node(value)
        newNode.next = head
        this.head = newNode
    }

    size(node = this.head, total = 1) { // recursion
        if (node.next) {
            return this.size(node.next, total += 1) 
        } return total
    }

    head() {
        return this.head
    }

    tail() {
        let node = this.head
        while (node.next) {
            node = node.next
        } return node
    }

    at(searchIdx) { 
        if (searchIdx > this.size()) {
            return 'This index is greater than the list size.'
        } else {
            let currIdx = 0
            let node = this.head
            while (currIdx !== searchIdx) {
                node = node.next
                currIdx++
            } return node
        }
    }

    pop() {
        let targetIdx = this.size() - 2 // access 2nd to last node
        let targetNode = this.at(targetIdx)
        targetNode.next = null
    }

    contains(searchValue) { // where a value may exist at multiple nodes, return true at the first occurrence
        let node = this.head
        while (node.next !== null) {
            if (node.value === searchValue) return true
            node = node.next
        } return false
    }

    find(searchValue) {
        let node = this.head
        let targetIdx = 0
        while (node) {
            if (node.value === searchValue) return 'Node index #' + targetIdx
            
            node = node.next
            targetIdx++
        } return null
    }

    toString() {
        let node = this.head
        let result = ''
        while (node) {
            result += node.value + ' -> '
            node = node.next
        }
        result += null
        return result
    }

    insertAt(value, index) {
        const prevNode = this.at(index-1)
        const currNode = this.at(index)
        const newNode = new Node(value)
        newNode.next = currNode
        prevNode.next = newNode
    }

    removeAt(index) {
        if (index >= this.size()) {
            console.warn(`Node index ${index} could be null or it doesn't exist in this list.`)
        } else if (index === (this.size()-1)) { // if last index, same as pop().
            this.pop()
        } else {
            const nextNode = this.at(index+1)

            if (index === 0) { // drop 1st node & consider 2nd node as new 1st node
                this.head = nextNode
            } else { // drop node at index then connect previous & next node
                const prevNode = this.at(index-1)
                prevNode.next = nextNode
            }
        }
    }
}

class Node {
    constructor(value = null, next = null) {
        this.value = value
        this.next = next
    }
}

// TEST CASES
const test = new LinkedList(new Node('second node'))
test.append('third node')
test.append('fourth node')
test.prepend('new head')

console.log(test.contains('fourth node'))
console.log(test.find('new head'))
console.log(test.toString())

test.insertAt('second node v2', 2)
console.log(test.toString())
console.log(test.find('fourth node'))

console.log(test.size())
test.removeAt(4)
console.log(test.toString())