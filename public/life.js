var currentBoard = []
var nextBoard = []
var mousePressed = false
var removeCells = false
var simulationRunning = false
var simulationStarted = false
var stopSimulation = false
var loadedBlueprints = []
var savedBoard = []
var highlightedCells = []

const xSize = 50
const ySize = 50

const gameBoard = document.getElementById('game-board')
const blueprintsBar = document.getElementById('list')
const simulationControl = document.getElementById('controlsim')
const restartControl = document.getElementById('restart')
const blueprintNameBox = document.getElementById('blueprintName')
const errorMessage = document.getElementById('errorMessage')
const resetMessage = document.getElementById('resetMessage')
const startMessage = document.getElementById('startMessage')
const saveButton = document.getElementById('savebutton')

simulationControl.onmouseover = (function() {highlightText('controlsim')})
simulationControl.onmouseleave = (function() {unhighlightText('controlsim')})

restartControl.onmouseover = (function() {highlightText('restart')})
restartControl.onmouseleave = (function() {unhighlightText('restart')})

saveButton.onmouseover = (function() {highlightText('savebutton')})
saveButton.onmouseleave = (function() {unhighlightText('savebutton')})

gameBoard.onmouseleave = (function() {mouseLeave()})
var blueprints

function mouseLeave() {
    mousePressed = false
}

function initBoard(board) {
    for (let i = 0; i < xSize + 2; i++) {
        let row = []
        for (let j = 0; j < ySize + 2; j++) {
            row.push(0)
        } 
        board.push(row)
    }
}

initBoard(currentBoard)
initBoard(nextBoard)

function setAlive(row, column) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.onmouseover = (function() {mouseOver(row, column)})
    cell.onmouseup = (function() {mouseUp(row, column)})
    cell.id = row + "," + column
    cell.classList.add('blueprintCell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function setAliveNotClickable(row, column) {
    const cell = document.createElement('div')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.id = row + "," + column
    cell.classList.add('activeCell')
    gameBoard.appendChild(cell)
    currentBoard[column][row] = 1
}

function initSimulation() {
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            let id = "toggle" + row + "," + col
            let cell = document.getElementById(id)
            if(cell) {
                cell.remove()
            }
            if (currentBoard[col][row] == 1) {
                setAliveNotClickable(row, col)
                let id = row + "," + col
                let cell = document.getElementById(id)
                if(cell) {
                    cell.remove()
                }
            } 
        }
    }
}

function setDead(row, column) {
    let id = row + "," + column
    let cell = document.getElementById(id)
    if(cell) {
        cell.remove()
    }
    currentBoard[column][row] = 0
}

function initDead(row, column) {
    const cell = document.createElement('div')
    cell.classList.add('blueprintEmpty')
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.onmouseover = (function() {mouseOver(row, column)})
    cell.onmouseup = (function() {mouseUp(row, column)})
    gameBoard.appendChild(cell)
    cell.id = "toggle" + row + "," + column
    currentBoard[column][row] = 0
}

function mouseDown(row, column) {
    if (currentBoard[column][row] == 0) {
        setAlive(row, column)
        removeCells = false
    } else {
        setDead(row, column)
        removeCells = true
    }
    mousePressed = true
}

function mouseUp(row, column) {
    mousePressed = false
}

function mouseOver(row, column) {
    if (mousePressed) {
        if (removeCells && currentBoard[column][row] == 1) {
            setDead(row, column)
        } else if (!removeCells && currentBoard[column][row] == 0) {
            setAlive(row, column)
        }
    }
}

function indicateSelection(row, column) {
    for (let i = 0; i < highlightedCells.length; i++) {
        let cell = document.getElementById(highlightedCells[i])
        if(cell) {
            cell.remove()
        }
    }
    highlightedCells = []
    highlightedCells.push("s" + row + "," + column)
    const cell = document.createElement('div')
    cell.onmousedown = (function() {mouseDown(row, column)})
    cell.style.gridRowStart = row
    cell.style.gridColumnStart = column
    cell.id = "s" + row + "," + column
    cell.classList.add('select')
    gameBoard.append(cell)    
}

function initializeUserBoard() {
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            initDead(row, col)
        }
    }
}
initializeUserBoard() 

function controlSimulation() {
    if (!simulationStarted) {
        startSimulation()
    } else if (simulationRunning) {
        pauseSimulation()
        simulationControl.innerHTML = "<span> Unpause </span>"
    } else if (!simulationRunning) {
        unpauseSimulation()
        simulationControl.textContent = "Pause"
    }
}

async function resetSimulation(loadSaved) {
    if (simulationStarted) {
        setStop()
        await sleep(10)

        for (let col = 1; col < ySize + 1; col++) {
            for (let row = 1; row < ySize + 1; row++) {
                if (currentBoard[col][row] == 1) {
                    let id = row + "," + col
                    let cell = document.getElementById(id)
                    if(cell) {
                        cell.remove()
                    }
                    currentBoard[col][row] = 0
                } 
            }
        }
        simulationRunning = false
        simulationStarted = false
        
        simulationControl.innerHTML = "<span> Start </span>"
        restartControl.innerHTML = "<span> Clear </span>"
        initializeUserBoard()
        if (loadSaved) {
            loadSavedBoard()
        }

    } else if (getNumCells() == 0) {
        generateRandom()
        restartControl.innerHTML = "<span> Clear </span>"
    } else {
        clearBoard()
        restartControl.innerHTML = "<span> Random </span>"
    }
} 

function generateRandom() {
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) { 
            let alive = Math.floor(Math.random()*2)
            if (alive) {
                setAlive(row, col)
            }
        }
    }
}

function loadSavedBoard() {
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            if (savedBoard[col][row] == 1) {
                setAlive(row, col)
            } 
        }
    }
}

function startSimulation() {

    if (getNumCells() == 0) {
        return
    }
    simulationControl.innerHTML = "<span> Pause </span>"

    stopSimulation = false
    savedBoard = []
    // Save a deep copy of the board using slice() for each row
    savedBoard = currentBoard.map(row => row.slice())
    restartControl.innerHTML = "<span> Restart </span>"
    initSimulation()
    simulationRunning = true
    simulationStarted = true
    run()
}

function getNumCells() {
    var sum = 0
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            sum += currentBoard[col][row]
        }
    }
    return sum
}

function setStop() {
    stopSimulation = true
    simulationRunning = false
}

function pauseSimulation() {
    stopSimulation = true
    simulationRunning = false
}

function unpauseSimulation() {
    simulationRunning = true
    stopSimulation = false
    run()     
}

function update(array, row, col) {
    let numLive = 0

    let x = col - 1
    for (let y = row - 1; y < row + 2; y++) {
        if (array[x][y] == 1) numLive += 1
    }

    x = col + 1
    for (let y = row - 1; y < row + 2; y++) {
        if (array[x][y] == 1) numLive += 1
    }

    let y = row + 1
    x = col
    if (array[x][y] == 1) numLive += 1

    y = row - 1
    if (array[x][y] == 1) numLive += 1

    if (array[col][row] == 1) {
        if (numLive == 2 || numLive == 3) {
            return 1
        } else {
            return 0
        }
    } else {
        if (numLive == 3) {
            return 1
        } else {
            return 0
        }
    }
}

function clearBoard() {
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) { 
            if (currentBoard[col][row] == 1) {
                setDead(row, col)
            } 
        }
    }
}

async function loadBlueprint(name) {
    var aliveCoordinates = blueprints[name]
    await resetSimulation(false)
    clearBoard()
    for (let i = 0; i < aliveCoordinates.length; i++) {
        setAlive(aliveCoordinates[i][1], aliveCoordinates[i][0])
    }
}

async function loadBlueprints() {
    await getJSON("http://nickwood5.pythonanywhere.com/retrieve").then((response) => {
        blueprints = response
    });

    var blueprintNames = Object.keys(blueprints)
    for (let i = 0; i < blueprintNames.length; i++) {
        if (!loadedBlueprints.includes(blueprintNames[i])) {
            var listItem = document.createElement('li')
            var blueprintName = document.createTextNode(blueprintNames[i])
            listItem.appendChild(blueprintName)
            listItem.onmousedown = (function() {loadBlueprint(blueprintNames[i])})
            listItem.onmouseover = (function() {highlightText("b_" + blueprintNames[i])})
            listItem.onmouseleave = (function() {unhighlightText("b_" + blueprintNames[i])})
            listItem.id = "b_" + blueprintNames[i]

            blueprintsBar.appendChild(listItem)
            loadedBlueprints.push(blueprintNames[i])
        }
    }

}

function highlightText(id) {
    var a = document.getElementById(id)
    if(a) {
        a.style.color = "yellow"
    }
}

function unhighlightText(id) {
    var a = document.getElementById(id)
    if(a) {
        a.style.color = "white"
    }
}

loadBlueprints()

function step(currentBoard) {
    // Use a proper deep clone of the board using slice()
    let clonedArray = currentBoard.map(row => row.slice())
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            currentBoard[col][row] = update(clonedArray, row, col)
        }
    }
    return clonedArray
}

function printBoard(array, previousArray) {
    for (let row = 1; row < ySize + 1; row++) {
        for (let col = 1; col < xSize + 1; col++) {
            if (array[col][row] == 1) {
                if (previousArray[col][row] == 0) {
                    setAliveNotClickable(row, col)
                }
            } else {
                if (previousArray[col][row] == 1) {
                    setDead(row, col)
                }
            }
        }
    }
}

function formatBlueprintInput() {
    var blueprintInput = "/" 
    for (let col = 1; col < ySize + 1; col++) {
        for (let row = 1; row < ySize + 1; row++) {
            if (currentBoard[col][row] == 1) {
                var coordinate = col + "_" + row + "&"
                blueprintInput += coordinate
            }
        }
    }
    return blueprintInput.slice(0, -1)
}

async function saveBlueprint() {
    var blueprintName = document.getElementById("blueprintName").value

    if (simulationStarted) {
        errorMessage.textContent = "Simulation is running."
        return
    }

    if (getNumCells() == 0) {
        errorMessage.textContent = "Design is empty."
        return
    }
    
    if (blueprintName == "") {
        errorMessage.textContent = "Name your design."
        return
    }

    if (loadedBlueprints.includes(blueprintName)) {
        errorMessage.textContent = "Design name exists."
        return
    }

    errorMessage.textContent = "Design saved!"
    var blueprintInput = formatBlueprintInput()
    var url = "http://nickwood5.pythonanywhere.com/gameoflife/insert/" + blueprintName + blueprintInput

    await getJSON(url)
    loadBlueprints()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getJSON(url) {
    const response = await fetch(url)
    return response.json()
}

async function run() {

    while (1) {
        await sleep(100)
        let clone = step(currentBoard)
        printBoard(currentBoard, clone)
        if (stopSimulation) {
            return
        }
    }
}
