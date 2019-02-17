// Create Ship constructor

class Ship {
  constructor(type, size, id) {
    this.type = type
    this.size = size
    this.id = id
    this.coordinates = []
    this.hits = 0
  }
}

// Create board - default empty board one for each player
function board() {
  const grid = []

  for(let i = 0; i < 10; i++) {
    grid.push([])
    for(let j = 0; j < 10; j++) {
      grid[i].push(0)
    }
  }
  return grid
}

// Create a fleet function to store all ships in a list
function buildFleet() {
  const carrier = new Ship('carrier', 5, 'AC')
  const battleship = new Ship('battleship', 4, 'B')
  const cruiser = new Ship('cruiser', 3, 'C')
  const submarine = new Ship('submarine', 3, 'S')
  const destroyer = new Ship('destroyer', 2, 'D')

  const fleet = [carrier, battleship, cruiser, submarine, destroyer]
  return fleet
}

const playerBoard = board()
const cpuBoard = board()
const playerFleet = buildFleet()
const cpuFleet = buildFleet()

// Place cpu ships randomly within their board limits (will need a loop to keep checking if ships fit)

function placeCpuShips(fleet) {
  let ship
  let xCoord
  let yCoord
  const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical

  for(let i = 0; i < fleet.length; i++) {
    ship = fleet[i]
    console.log(ship)

    if(direction === 0) {
      xCoord = Math.floor(Math.random() * (10 - ship.size))
      yCoord = Math.floor(Math.random() * 10)
      ship.coordinates = [xCoord, yCoord]
    }

    if(direction === 1) {
      xCoord = Math.floor(Math.random() * 10)
      yCoord = Math.floor(Math.random() * (10 - ship.size))
      ship.coordinates = [xCoord, yCoord]
    }
  }
}

placeCpuShips(cpuFleet)

// Create function to check for collisions

// Place players ships (check for collisions)

// Game Start

// Player attacks the cpu board - check for hit

// Cpu attacks player board - check for hit

// Repeat above until either the player or cpu have no ships left in list

//

console.log(cpuFleet)
console.log(playerFleet)
console.log(cpuBoard)
console.log(playerBoard)
