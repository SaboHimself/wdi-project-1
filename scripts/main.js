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
      this.isSunk = false
    }
  }

  // Create board - default empty board one for each player
  class Board {
    constructor (playerType) {
      this.playerType = playerType
      this.attempts = []
      this.shipsPlaced = false
      this.occupied = []
      this.buildBoard()
      this.buildFleet()
      this.placeCpuShips()
      this.placePlayerShips()
      this.attack()
    }

    // buildReferenceGrid() {
    //   for(let i = 0; i < 100; i++) {
    //     this.grid.push(0)
    //     for(let j = 0; j < 10; j++) {
    //       this.grid[i].push(0)
    //     } // end of second for loop
    //   } //end of first for loop
    //   return this.grid
    // }

    buildBoard() {
      if(this.playerType === 'cpu') {
        this.board = document.querySelector('.cpu-board')
        for(let i = 0; i < 100; i++) {
          this.cpuCell = document.createElement('div')
          this.cpuCell.setAttribute('class', 'cpu-cell')
          this.cpuCell.setAttribute('data-id', i)
          this.board.appendChild(this.cpuCell)
          this.gridItem = document.querySelectorAll('.cpu-cell')
        }
      } else if (this.playerType === 'player') {
        this.board = document.querySelector('.player-board')
        for(let i = 0; i < 100; i++) {
          this.playerCell = document.createElement('div')
          this.playerCell.setAttribute('class', 'player-cell')
          this.playerCell.setAttribute('data-id', i)
          this.board.appendChild(this.playerCell)
          this.gridItem = document.querySelectorAll('.player-cell')
        }
      }
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
      let position

      if(this.playerType === 'cpu') {

        for(let i = 0; i < this.fleet.length; i++) {
          const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical
          ship = this.fleet[i]
          ship.direction = direction

          if(direction === 0) {
            position = Math.floor(Math.random() * (100 - ship.size))
            for(let j = 0; j < ship.size; j++) {
              this.gridItem[position + j].setAttribute('class', 'ship')
            }
          } else {
            position = Math.floor(Math.random() * (10 - ship.size))
            for(let j = 0; j < ship.size; j++) {
              this.gridItem[position + j * 10].setAttribute('class', 'ship')
            }
          }
        }
      }
    }

    placePlayerShips() {
      // THIS IS DISGUSTING!
      let ship = 0
      let itemsToCover = 0

      if(this.playerType === 'player') {
        this.gridItem.forEach((item) => {
          item.addEventListener('click', (e) => {
            const dataId = parseInt(e.target.getAttribute('data-id'))
            if(ship >= 5){
              return
            } else if(ship === 0) {
              for(let i = 0; i < 5; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 1) {
              for(let i = 0; i < 4; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 2) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 3) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 4) {
              for(let i = 0; i < 2; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  this.occupied.push(itemsToCover)
                }
              }
              ship++
            }
          })
        })
      }
      console.log(this.occupied)
    }

    attack() {
      if(this.playerType === 'cpu') {
        this.gridItem.forEach((item) => {
          item.addEventListener('click', () => {
            console.log('player-click')
          })
        })
      } else {
        return
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
