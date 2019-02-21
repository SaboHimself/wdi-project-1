document.addEventListener('DOMContentLoaded', () => {
  let cpuHits = 0
  let playerHits = 0
  const cpuAttempts = []
  const cpuOccupied = []

  const header = document.querySelector('header')
  const main = document.querySelector('main')
  const starwars = document.querySelector('.star-wars')
  const fade = document.querySelector('.fade')
  const music = document.querySelector('.music')
  const sfx = document.querySelector('.sfx')
  const start = document.querySelector('.start')
  const intro = document.querySelector('.intro')
  const newGame = document.querySelector('.new-game')
  newGame.addEventListener('click', () => {
    window.location.reload()
  })

  start.addEventListener('click', () => {
    start.style.display = 'none'
    intro.style.display = 'flex'
    setTimeout(() => {
      intro.style.display = 'none'
    }, 2500)
    setTimeout(() => {
      music.src = 'audio/theme.wav'
      music.play()
      starwars.style.display = 'flex'
      fade.style.display = 'block'
    }, 3000)
    setTimeout(() => {
      header.style.display = 'flex'
      main.style.display = 'flex'
      starwars.style.display = 'none'
      fade.style.display = 'none'
    }, 50000)
    setTimeout(() => {
      music.src = 'audio/cantina.wav'
      music.play()
    }, 70000)
  })

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
      this.placeCpuShips(this.fleet[0])
      this.placeCpuShips(this.fleet[1])
      this.placeCpuShips(this.fleet[2])
      this.placeCpuShips(this.fleet[3])
      this.placeCpuShips(this.fleet[4])
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

    checkCollisionHorz(position, shipLength) {
      let check
      for(let i = 0; i < shipLength; i++) {
        if(!cpuOccupied.includes(position + i)) {
          check = true
        } else {
          return false
        }
      }
      if(check) return true
    }

    checkCollisionVert(position, shipLength) {
      let check
      for(let i = 0; i < shipLength; i++) {
        if(!cpuOccupied.includes(position + i) && !cpuOccupied.includes(position + (i * 10))) {
          check = true
        } else {
          return false
        }
      }
      if(check) return true
    }

    placeCpuShips(ship) {
      let position

      if(this.playerType === 'cpu') {

        const direction = Math.floor(Math.random() * 2) // 0 for horizontal. 1 for vertical

        if(direction === 0) {
          position = Math.floor(Math.random() * 100)

          if(this.checkCollisionHorz(position, ship.size)) {
            if (position % 10 > (10 - ship.size)) {
              this.placeCpuShips(ship)
            } else {

              for(let i = 0; i < ship.size; i++) {
                this.gridItem[position + i].setAttribute('class', 'enemy-ship')
                cpuOccupied.push(position + i)
              }
            }
          } else {
            this.placeCpuShips(ship)
          }
        } else if (direction === 1) {
          position = Math.floor(Math.random() * ((100 - (ship.size * 10)) + 10))

          if(this.checkCollisionVert(position, ship.size)) {
            for(let i = 0; i < ship.size; i++) {
              this.gridItem[position + i * 10].setAttribute('class', 'enemy-ship')
              cpuOccupied.push(position + (i * 10))
            }
          } else {
            this.placeCpuShips(ship)
          }
        }
      }
    }

    placePlayerShips() {
      // THIS IS DISGUSTING! TODO - FIX!
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
      alert('You Lose')
    } else {
      alert('You Win')
    }
  }

  function playerAttack() {
    if(cpuHits === 17) {
      result('cpu')
      newGame.style.display = 'block'
    } else {
      const attack = document.querySelectorAll('#cpu-cell')
      attack.forEach((item) => {
        item.addEventListener('click', (e) => {
          if(item.classList.contains('enemy-ship')) {
            sfx.src = 'audio/tie-fire.wav'
            sfx.play()
            e.target.setAttribute('class', 'enemy-hit')
            playerHits++
            setTimeout(cpuAttack, 1200)
          } else if(item.classList.contains('cpu-cell')) {
            sfx.src = 'audio/miss.wav'
            sfx.play()
            e.target.setAttribute('class', 'player-miss')
            setTimeout(cpuAttack, 1200)
          }
        })
      })
    }
  }

  function cpuAttack() {
    if(playerHits === 17) {
      result('player')
      newGame.style.display = 'block'
    } else {
      const choice = Math.floor(Math.random() * 100)
      const attack = document.querySelectorAll('#player-cell')

      if(!cpuAttempts.includes((choice))) {
        if(attack[choice].classList.contains('ship')) {
          sfx.src = 'audio/tie-fire.wav'
          sfx.play()
          attack[choice].setAttribute('class', 'player-hit')
          cpuAttempts.push(choice)
          cpuHits++
          playerAttack()
        } else {
          attack[choice].setAttribute('class', 'enemy-miss')
          sfx.src = 'audio/miss.wav'
          sfx.play()
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
