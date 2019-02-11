const scores = [3,5,2,7,8,3,2]

function calculateAverage(scores) {
    let total = 0;
    scores.forEach(score => total+=score)
    console.log((total/scores.length).toFixed(2))
}

calculateAverage(scores)
calculateAverage([3,3,3,3,3])
