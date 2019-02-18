document.addEventListener('DOMContentLoaded', () => {
  // Create Ship constructor

  class Ship {
    constructor(type, size, id) {
      this.type = type
      this.size = size
      this.id = id
      this.coordinates = []
      this.direction
      this.hits = 0
    }
  }

  // Create board - default empty board one for each player

  class Board {
    constructor (playerType) {
      this.playerType = playerType
      this.hits = []
      this.grid = []
    }

    buildBoard() {
      for(let i = 0; i < 10; i++) {
        this.grid.push([])
        for(let j = 0; j < 10; j++) {
          this.grid[i].push(0)
        } // end of second for loop
      } //end of first for loop
      return this.grid
    }
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

  const playerBoard = new Board('player')
  const cpuBoard = new Board('cpu')
  const playerFleet = buildFleet()
  const cpuFleet = buildFleet()

  // Place cpu ships randomly within their board limits (will need a loop to keep checking if ships fit)

  function placeCpuShips(fleet, board) {
    let ship
    let xCoord
    let yCoord

    for(let i = 0; i < fleet.length; i++) {
      const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical
      ship = fleet[i]
      ship.direction = direction

      if(direction === 0) {
        xCoord = Math.floor(Math.random() * (10 - ship.size))
        yCoord = Math.floor(Math.random() * 10)
      } else {
        xCoord = Math.floor(Math.random() * 10)
        yCoord = Math.floor(Math.random() * (10 - ship.size))
      }
      ship.coordinates.push(xCoord, yCoord)

      for(let j = 0; j < ship.size; j++) {
        if(direction === 0) {
          board[xCoord + j][yCoord] = ship.id
        } else {
          board[xCoord][yCoord + j] = ship.id
        }
      }
    }
    return board
  }

  placeCpuShips(cpuFleet, cpuBoard.buildBoard())

  // Create function to check for collisions

  // Create grid of divs for each board
  function buildPlayerBoard() {
    const playerBoard = document.querySelector('.player-board')
    for(let i = 0; i < 10; i++) {
      const xSquare = document.createElement('div')
      xSquare.setAttribute('class', 'square')
      playerBoard.appendChild(xSquare)
      for(let j = 1; j < 10; j++) {
        const ySquare = document.createElement('div')
        ySquare.setAttribute('class', 'square')
        playerBoard.appendChild(ySquare)
      }
    }
  }
let cpuReferenceBoard = []

  function buildCpuBoard() {
    const cpuBoard = document.querySelector('.cpu-board')
    for(let i = 0; i < 10; i++) {
      const xSquare = document.createElement('div')
      xSquare.setAttribute('class', 'square')
      cpuBoard.appendChild(xSquare)
      for(let j = 1; j < 10; j++) {
        const ySquare = document.createElement('div')
        ySquare.setAttribute('class', 'square')
        cpuBoard.appendChild(ySquare)
        cpuReferenceBoard.push()
      }
    }
  }
  buildPlayerBoard()
  buildCpuBoard()

  // Place players ships (check for collisions)

  function placePlayerShips (fleet, board) {

  }

  placePlayerShips(playerFleet, playerBoard)

  // Game Start

  // Player attacks the cpu board - check for hit

  // Cpu attacks player board - check for hit

  // Repeat above until either the player or cpu have no ships left in list

  //

  console.log(cpuFleet)
  console.log(cpuBoard)
})
