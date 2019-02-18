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
      this.buildReferenceGrid()
      this.buildBoard()
      this.buildFleet()
      this.placeCpuShips()
    }

    buildReferenceGrid() {
      for(let i = 0; i < 10; i++) {
        this.grid.push([])
        for(let j = 0; j < 10; j++) {
          this.grid[i].push(0)
        } // end of second for loop
      } //end of first for loop
      return this.grid
    }

    buildBoard() {
      if(this.playerType === 'cpu') {
        this.board = document.querySelector('.cpu-board')
      } else {
        this.board = document.querySelector('.player-board')
      }
      for(let i = 0; i < 100; i++) {
        this.square = document.createElement('div')
        this.square.setAttribute('class', 'square')
        this.square.setAttribute('data-id', i)
        this.board.appendChild(this.square)
      }
      const divs = document.querySelectorAll('.square')
      divs.forEach(div => div.addEventListener('click', this.placePlayerShips.bind(this)))
    }

    buildFleet () {
      this.fleet = [
        new Ship('carrier', 5, 'AC'),
        new Ship('battleship', 4, 'B'),
        new Ship('cruiser', 3, 'C'),
        new Ship('submarine', 3, 'S'),
        new Ship('destroyer', 2, 'D')
      ]
    }

    placeCpuShips() {
      let ship
      let xCoord
      let yCoord

      if(this.playerType === 'cpu') {

        for(let i = 0; i < this.fleet.length; i++) {
          const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical
          ship = this.fleet[i]
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
              this.grid[xCoord + j][yCoord] = ship.id
            } else {
              this.grid[xCoord][yCoord + j] = ship.id
            }
          }
        }
        return this.grid
      }
    }

    placePlayerShips(e) {
      console.log(e.target.getAttribute('data-id'))
      if(this.playerType === 'player') {
        for(let i = 0; i < this.fleet.length; i++) {
          const currentShip = this.fleet[i]
        }
      }
    }
  }

  const playerBoard = new Board('player')
  const cpuBoard = new Board('cpu')


  console.log(playerBoard)
  console.log(cpuBoard)

  // Place players ships (check for collisions)

  // Game Start

  // Player attacks the cpu board - check for hit

  // Cpu attacks player board - check for hit

  // Repeat above until either the player or cpu have no ships left in list

  //
})
