
class Node {
    constructor(coordinates, parent = null) {
        this.value = coordinates;
        this.parent = parent;
    }
}

class Graph {
    constructor(nodes) {
        this.nodes = nodes;
    }

    getMoves() {
        const nodesCopy = [...this.nodes];
        return nodesCopy;
    }

    findShortestPath(startCoord, endCoord, knightMovement) {
        const startNode = new Node(startCoord);
        const queue = [startNode];

        while (queue.length > 0) {
            const currentNode = queue.shift();

            if (currentNode.value[0] === endCoord[0] && currentNode.value[1] === endCoord[1]) {
                // Found the end coordinate, construct the path and return it
                return this.constructPath(currentNode); 
                // the first time it finds the ending coordinate is also the shortest path
            }

            const nextMoves = this.getNextMoves(currentNode, knightMovement);

            for (let move of nextMoves) {
                const newNode = new Node(move, currentNode);
                queue.push(newNode);
            }
        }

        // If the end coordinate is not reachable, return null or an appropriate result
        return null;
    }

    getNextMoves(node, knightMovement) {
        const nextMoves = [];
        const [x, y] = node.value;

        for (let move of knightMovement) {
            const newX = x + move[0];
            const newY = y + move[1];

            if (this.isValidMove(newX, newY)) {
                nextMoves.push([newX, newY]);
            }
        }

        return nextMoves;
    }

    isValidMove(x, y) {
        return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    }

    constructPath(node) {
        const path = [];
        let currentNode = node;

        while (currentNode !== null) {
            path.unshift(currentNode.value);
            currentNode = currentNode.parent;
        }

        return path;
    }
}

const knightMovement = [
    [1, 2], [1, -2], [2, 1], [2, -1],
    [-1, 2], [-1, -2], [-2, 1], [-2, -1]
];



// TEST CASES

function getRandomNum(min = 0, max = 7) {
    const num = Math.random() * (max - min) + min;
    return Math.floor(num)
}


for (let i = 0; i < 10 ; i++) {
    const start = [getRandomNum(),getRandomNum()];
    const end = [getRandomNum(),getRandomNum()];
    const knight = new Graph([start]);
    const shortestPath = knight.findShortestPath(start, end, knightMovement);
    console.log(`Shortest Path from ${start} to ${end}:`, shortestPath);
}
