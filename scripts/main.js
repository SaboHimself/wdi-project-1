document.addEventListener('DOMContentLoaded', () => {
  let cpuHits = 0
  let playerHits = 0
  const cpuAttempts = []
  const playerAttempts = []
  const cpuOccupied = []
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
      this.placeCpuShips(5)
      this.placeCpuShips(4)
      this.placeCpuShips(3)
      this.placeCpuShips(3)
      this.placeCpuShips(2)
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
      this.fleet = []
      const carrier = new Ship('carrier', 5, 'AC')
      const battleship = new Ship('battleship', 4, 'B')
      const cruiser = new Ship('cruiser', 3, 'C')
      const submarine = new Ship('submarine', 3, 'S')
      const destroyer = new Ship('destroyer', 2, 'D')
      this.fleet.push(carrier, battleship, cruiser, submarine, destroyer)
    }



    placeCpuShips(shipLength) {
      let position

      if(this.playerType === 'cpu') {

        const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical

        if(direction === 0) {
          position = Math.floor(Math.random() * 100)
          if(!cpuOccupied.includes(position)) {
            if (position % 10 > (10 - shipLength)) {
              this.placeCpuShips(shipLength)
            } else {
              for(let j = 0; j < shipLength; j++) {
                this.gridItem[position + j].setAttribute('class', 'ship')
                cpuOccupied.push(position + j)
              }
            }
          } else if (cpuOccupied.includes(position)) {
            this.placeCpuShips(shipLength)
          }
        } else if (direction === 1) {
          position = Math.floor(Math.random() * ((100 - (shipLength * 10)) + 10))
          if(!cpuOccupied.includes(position)) {
            for(let j = 0; j < shipLength; j++) {
              this.gridItem[position + j * 10].setAttribute('class', 'ship')
              cpuOccupied.push(position + j * 10)
            }
          } else if(cpuOccupied.includes(position)){
            this.placeCpuShips(shipLength)
          }
        }
      }
      console.log(cpuOccupied)
    }

    placePlayerShips() {
      // THIS IS DISGUSTING!
      let ship = 0
      let itemsToCover = 0
      const occupied = []

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
                  occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 1) {
              for(let i = 0; i < 4; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 2) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 3) {
              for(let i = 0; i < 3; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                }
              }
              ship++
            } else if (ship === 4) {
              for(let i = 0; i < 2; i++) {
                if(e.shiftKey) {
                  itemsToCover = dataId + i * 10
                  e.target.setAttribute('class', 'ship')
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                } else {
                  itemsToCover = dataId + i
                  this.gridItem[itemsToCover].setAttribute('class', 'ship')
                  occupied.push(itemsToCover)
                }
              }
              ship++
              setTimeout(cpuAttack, 1000)
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

  function result(winner){
    if(winner === 'cpu') {
      alert('You lose')
    } else {
      alert('winner')
    }
  }

  function playerAttack() {
    if(cpuHits === 17) {
      result('cpu')
    } else {
      const attack = document.querySelectorAll('#cpu-cell')
      attack.forEach((item) => {
        item.addEventListener('click', (e) => {
          if(item.classList.contains('enemy-ship')) {
            e.target.setAttribute('class', 'hit')
            playerHits++
            setTimeout(cpuAttack, 1000)
            // cpuAttack()
          } else if(item.classList.contains('cpu-cell')) {
            e.target.setAttribute('class', 'miss')
            setTimeout(cpuAttack, 1000)
            // cpuAttack()
          }
        })
      })
    }
  }

  function cpuAttack() {
    if(playerHits === 17) {
      result('player')
    } else {
      const choice = Math.floor(Math.random() * 100)
      const attack = document.querySelectorAll('#player-cell')

      if(!cpuAttempts.includes((choice))) {
        if(attack[choice].classList.contains('ship')) {
          attack[choice].setAttribute('class', 'hit')
          cpuAttempts.push(choice)
          cpuHits++
          playerAttack()
        } else {
          attack[choice].setAttribute('class', 'miss')
          cpuAttempts.push(choice)
          playerAttack()
        }
      } else {
        cpuAttack()
      }
    }
  }
  initGame()
})
