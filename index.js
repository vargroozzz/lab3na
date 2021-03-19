const math = require('mathjs')
const Graph = require("graphlib").Graph
const fs = require("fs")

const vertexes_pairs = JSON.parse(fs.readFileSync("graph.json", "UTF-8"))
const epsilon = 0.001

const rand_vector = n => math.zeros(n).map(_ => Math.random()*50)

const power_iteration = (A, iteration_count) => {
    const A_matrix = math.matrix(A)
    let b_k = rand_vector(A_matrix.size()[0])
    for (const _ of math.range(0, iteration_count).valueOf()) {
        const b_k1 = math.multiply(A_matrix, b_k)
        const b_k1_norm = math.norm(b_k1)
        b_k = math.divide(b_k1, b_k1_norm)
    }
    return b_k.map(el => el / math.sum(b_k))
}

const PRMatrix = graph =>
    graph.nodes().map(node => graph.nodes().map(pred => g.predecessors(node).findIndex(el => el === pred) === -1 ? 0 : 1 / g.successors(pred).length))


// const PageRank = (A, graph) =>
//     (1 - d) + d * math.sum(g.predecessors("a").map(
//         predecessor => PageRank(predecessor,graph) / g.successors(predecessor).length)
//     )
let g = new Graph();
vertexes_pairs.forEach(([start, end]) => g.setEdge(start, end))
const res = power_iteration(PRMatrix(g), 40)
console.log(res)
console.log(math.multiply(PRMatrix(g), res))
console.log(math.subtract(math.multiply(PRMatrix(g), res), res).valueOf().every(el => el < epsilon))
