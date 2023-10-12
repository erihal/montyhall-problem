const getRandomDoorId = numberOfDoors => Math.floor(Math.random() * numberOfDoors)

const setupDoors = numberOfDoors => {
    const doors = [...Array(numberOfDoors).keys()].map(i => ({
        id: i,
        winner: false,
        picked: false,
    }))
    doors[getRandomDoorId(numberOfDoors)].winner = true
    return doors
}

const pickDoor = doors => {
    doors[getRandomDoorId(doors.length)].picked = true
    return doors
}  

const getPicked = doors => doors.find(door => door.picked)

const removeDoors = doors => {
    const pickedDoor = getPicked(doors)
    
    const secondDoor = doors.find(x => x.winner === !pickedDoor.winner)
       
    return [pickedDoor, secondDoor]
}

const changePick = doors => doors.map(x => ({ ...x, picked: !x.picked }))

const winnerIsPicked = doors => doors.find(x => x.winner).picked ? 1 : 0

const runIterations = (iterations, numberOfDoors) => {
    const stats = { wins: 0 }
    
    for (let index = 0; index < iterations; index++) {
        let doors = setupDoors(numberOfDoors)
        doors = pickDoor(doors)

        let remainingDoors = removeDoors(doors)
        remainingDoors = changePick(remainingDoors)

        stats.wins += winnerIsPicked(remainingDoors)
    }

    const getPercentage = i => `${Math.floor((i / iterations) * 100)} %`

    return {
        wins: getPercentage(stats.wins),
        losses: getPercentage(iterations - stats.wins)
    }
}

console.table(runIterations(1000000, 3)) // wins 66%, losses 33%
console.table(runIterations(1000000, 10)) // wins 90%, losses 10%