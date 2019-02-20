document.addEventListener('DOMContentLoaded', () => {
  let cpuHits = 0
  let playerHits = 0
  let cpuAttempts = []
  let playerAttempts = []
  let cpuOccupied = []
  let playerOccupied = []
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
      this.shipsPlaced = false
      this.buildBoard()
      this.buildFleet()
      this.placeCpuShips()
      this.placePlayerShips()
    }

    buildBoard() {
      if(this.playerType === 'cpu') {
        this.board = document.querySelector('.cpu-board')
        for(let i = 0; i < 100; i++) {
          this.cpuCell = document.createElement('div')
          this.cpuCell.setAttribute('class', 'cpu-cell')
          this.cpuCell.setAttribute('id', 'cpu-cell')
          this.cpuCell.setAttribute('data-id', i)
          this.board.appendChild(this.cpuCell)
          this.gridItem = document.querySelectorAll('.cpu-cell')
        }
      } else if (this.playerType === 'player') {
        this.board = document.querySelector('.player-board')
        for(let i = 0; i < 100; i++) {
          this.playerCell = document.createElement('div')
          this.playerCell.setAttribute('class', 'player-cell')
          this.playerCell.setAttribute('id', 'player-cell')
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

          if(direction === 0) {
            position = Math.floor(Math.random() * 100)
            for(let j = 0; j < ship.size; j++) {
              this.gridItem[position + j].setAttribute('class', 'ship')
            }
          } else {
            position = Math.floor(Math.random() * 100)
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
            if(ship >= 5) {
              this.gameStart
            } else if(ship === 0) {
              for(let i = 0; i < 5; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 1) {
              for(let i = 0; i < 4; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 2) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 3) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 4) {
              for(let i = 0; i < 2; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  playerOccupied.push(itemsToCover)
                }
              }
              ship++
              cpuAttack()
            }
          })
        })
      }
    }
  }

  function initGame() {
    new Board('player')
    new Board('cpu')
  }

  function playerAttack() {
    const attack = document.querySelectorAll('#cpu-cell')
    attack.forEach((item) => {
      item.addEventListener('click', (e) => {
        if(item.classList.contains('enemy-ship')) {
          e.target.setAttribute('class', 'hit')
          playerHits++
          // setTimeout(cpuAttack, 2000)
          cpuAttack()
        } else if(item.classList.contains('cpu-cell')) {
          e.target.setAttribute('class', 'miss')
          // setTimeout(cpuAttack, 2000)
          cpuAttack()
        }
      })
    })
  }

  function cpuAttack() {
    const choice = Math.floor(Math.random() * 100)
    const attack = document.querySelectorAll('#player-cell')
    console.log('my turn')
    if(!cpuAttempts.includes((choice))) {
      if(attack[choice].classList.contains('ship')) {
        attack[choice].setAttribute('class', 'hit')
        console.log(choice)
        cpuAttempts.push(choice)
        playerAttack()
      } else {
        attack[choice].setAttribute('class', 'miss')
        console.log(choice)
        cpuAttempts.push(choice)
        playerAttack()
      }
    } else {
      console.log('repeat')
      cpuAttack()
    }
  }
  initGame()
})
