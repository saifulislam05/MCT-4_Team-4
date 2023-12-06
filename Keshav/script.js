// Display/UI

// Logic

const TILE_STATUSES = {
    HIDDEN: "hidden",
    MINE: "mine",
    NUMBER: "number",
    MARKED: "marked",
  }
  
  function createBoard(boardSize, numberOfMines) {
    const board = []
    const minePositions = getMinePositions(boardSize, numberOfMines)
  
    for (let x = 0; x < boardSize; x++) {
      const row = []
      for (let y = 0; y < boardSize; y++) {
        const element = document.createElement("div")
        element.dataset.status = TILE_STATUSES.HIDDEN
  
        const tile = {
          element,
          x,
          y,
          mine: minePositions.some(positionMatch.bind(null, { x, y })),
          get status() {
            return this.element.dataset.status
          },
          set status(value) {
            this.element.dataset.status = value
          },
        }
  
          
        row.push(tile)
      }
      board.push(row)
    }
  
    return board
  }
  
   function markTile(tile) {
    if (
      tile.status !== TILE_STATUSES.HIDDEN &&
      tile.status !== TILE_STATUSES.MARKED
    ) {
      return
    }
  
    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN
        tile.element.innerHTML = ''

    } else {
        tile.status = TILE_STATUSES.MARKED
        tile.element.innerHTML = ' 🚩'
    }
  }
  
   function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
      return
    }
  
    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE
        tile.element.innerHTML =  '💣'
      return
    }
  
    tile.status = TILE_STATUSES.NUMBER
    const adjacentTiles = nearbyTiles(board, tile)
    const mines = adjacentTiles.filter(t => t.mine)
    if (mines.length === 0) {
      adjacentTiles.forEach(revealTile.bind(null, board))
    } else {
      tile.element.textContent = mines.length
    }
  }
  
   function checkWin(board) {
    return board.every(row => {
      return row.every(tile => {
        return (
          tile.status === TILE_STATUSES.NUMBER ||
          (tile.mine &&
            (tile.status === TILE_STATUSES.HIDDEN ||
              tile.status === TILE_STATUSES.MARKED))
        )
      })
    })
  }
  
   function checkLose(board) {
    return board.some(row => {
      return row.some(tile => {
        return tile.status === TILE_STATUSES.MINE
      })
    })
  }
  
  function getMinePositions(boardSize, numberOfMines) {
    const positions = []
  
    while (positions.length < numberOfMines) {
      const position = {
        x: randomNumber(boardSize),
        y: randomNumber(boardSize),
      }
  
      if (!positions.some(positionMatch.bind(null, position))) {
        positions.push(position)
      }
    }
  
    return positions
  }
  
  function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y
  }
  
  function randomNumber(size) {
    return Math.floor(Math.random() * size)
  }
  
  function nearbyTiles(board, { x, y }) {
    const tiles = []
  
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const tile = board[x + xOffset]?.[y + yOffset]
        if (tile) tiles.push(tile)
      }
    }
  
    return tiles
  }  
const BOARD_SIZE = 8
  const NUMBER_OF_MINES = 3
  
  
  const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
  const boardElement = document.querySelector(".board")
  const minesLeftText = document.querySelector("[data-mine-count]")
  const messageText = document.querySelector(".subtext")
  const restart = document.querySelector(".restart")
  
  board.forEach(row => {
    row.forEach(tile => {
      boardElement.append(tile.element)
      tile.element.addEventListener("click", () => {
        revealTile(board, tile)
        checkGameEnd()
      })
      tile.element.addEventListener("contextmenu", e => {
        e.preventDefault()
        markTile(tile)
        listMinesLeft()
      })
    })
  })
  boardElement.style.setProperty("--size", BOARD_SIZE)
  minesLeftText.textContent = NUMBER_OF_MINES
  
  function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
      return (
        count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
      )
    }, 0)
  
    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
  }
  
  function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)
  
    if (win || lose) {
      boardElement.addEventListener("click", stopProp, { capture: true })
      boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }
  
    if (win) {
      messageText.textContent = "You Win"
    }
    if (lose) {
        messageText.textContent = "You Lose"
        
      board.forEach(row => {
        row.forEach(tile => {
          if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
          if (tile.mine) revealTile(board, tile)
        })
      })
      }
      restart.style.display = "block";
        restart.addEventListener("click", () => {
            window.location.reload();
        })
  }
  
  function stopProp(e) {
    e.stopImmediatePropagation()
  }