const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, 
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn, 
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard(){
    startPieces.forEach((startPiece, i)=>{
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        const row = Math.floor(( 63 - i) / 8) + 1
        if( row % 2 === 0 ){
            square.classList.add(i % 2 === 0 ? "beige" : "brown")
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige")
        }
        if( i <= 15){
            square.firstChild.firstChild.classList.add('black')
        }
        if( i >= 48){
            square.firstChild.firstChild.classList.add('white')
        }

        gameBoard.append(square)
    })
}

createBoard()

const allSquares = document.querySelectorAll(".square")

allSquares.forEach( square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionID 
let draggedElement

function dragStart(e) {
    startPositionID = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if(correctGo){
        //must check somethiong before
        if(takenByOpponent && valid){
                e.target.parentNode.append(draggedElement)
                e.target.remove()
                checkWin()
                changePlayer()
                return
        }
        //the check this
        if(taken && !takenByOpponent){
            infoDisplay.textContent = "You cannot go here"
            setTimeout(()=> infoDisplay.textContent ="", 2000)
            return
        }
        if(valid){
            e.target.append(draggedElement)
            checkWin() 
            changePlayer()
            return
        }
    }
}

function checkValid(target){
    const targetID = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startID = Number(startPositionID)    
    const piece = draggedElement.id
    console.log("targetID: ", targetID);
    console.log("startID: ", startID);
    console.log("piece: ", piece);

    switch(piece){
        case 'pawn' : 
        const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
        if( starterRow.includes(startID) && startID + width * 2 === targetID ||
            startID + width === targetID ||
            startID + width - 1 === targetID && document.querySelector(`[square-id="${startID + width - 1}"]`).firstChild ||
            startID + width + 1 === targetID && document.querySelector(`[square-id="${startID + width + 1}"]`).firstChild 
        ){
                return true
        }
            break;
        case 'knight' :
            if(
                startID + width * 2 + 1 === targetID ||
                startID + width * 2 - 1 === targetID ||
                startID + width - 2 === targetID ||
                startID + width + 2 === targetID ||
                startID - width * 2 + 1 === targetID ||
                startID - width * 2 - 1 === targetID ||
                startID - width - 2 === targetID ||
                startID - width + 2 === targetID 
            ){
                return true
            }
            break;
        case 'bishop' :
            if(
                //one direction movements to front
                startID + width + 1 === targetID ||
                startID + width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6 + 6}"]`).firstChild ||

                //other direction movements  to front
                startID - width - 1 === targetID ||
                startID - width * 2 - 2  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild ||
                startID - width * 3 - 3  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild ||
                startID - width * 4 - 4  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild ||
                startID - width * 5 - 5  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild ||
                startID - width * 6 - 6  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 - 5}"]`).firstChild ||
                startID - width * 7 - 7  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6 - 6}"]`).firstChild ||
                
                //one direction movements to BACK
                startID - width + 1 === targetID ||
                startID - width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild ||
                startID - width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild ||
                startID - width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild ||
                startID - width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild ||
                startID - width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 + 5}"]`).firstChild ||
                startID - width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6 + 6}"]`).firstChild ||
                //other direction movements to BACK
                startID + width + 1 === targetID ||
                startID + width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6 + 6}"]`).firstChild 
                
            ){
                return true
            }
            break;
            case 'rook' :
                if(
                //one direction movements to front    
                startID + width === targetID ||
                startID + width * 2 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild ||
                startID + width * 3 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild ||
                startID + width * 4 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild ||
                startID + width * 5 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild ||
                startID + width * 6 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5}"]`).firstChild ||
                startID + width * 7 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6}"]`).firstChild ||
                
                //other direction movements to front    
                startID - width === targetID ||
                startID - width * 2 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild ||
                startID - width * 3 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild ||
                startID - width * 4 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild ||
                startID - width * 5 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild ||
                startID - width * 6 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5}"]`).firstChild ||
                startID - width * 7 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6}"]`).firstChild ||
                
                //one direction movements to back
                startID + 1 === targetID ||
                startID + 2 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 5}"]`).firstChild ||
                startID + 7 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 6}"]`).firstChild ||
                
                //other direction movements to back
                startID - 1 === targetID ||
                startID - 2 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 5}"]`).firstChild ||
                startID - 7 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 6}"]`).firstChild
                
                ){
                    return true
                }
                break;
                case 'queen' :
                    if(
                //one diagonal movements to front
                startID + width + 1 === targetID ||
                startID + width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6 + 6}"]`).firstChild ||

                //other diagonal movements  to front
                startID - width - 1 === targetID ||
                startID - width * 2 - 2  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild ||
                startID - width * 3 - 3  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild ||
                startID - width * 4 - 4  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild ||
                startID - width * 5 - 5  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild ||
                startID - width * 6 - 6  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 - 5}"]`).firstChild ||
                startID - width * 7 - 7  === targetID &&  !document.querySelector(`[square-id = "${startID - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6 - 6}"]`).firstChild ||
                
                //one diagonal movements to BACK
                startID - width + 1 === targetID ||
                startID - width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild ||
                startID - width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild ||
                startID - width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild ||
                startID - width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild ||
                startID - width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 + 5}"]`).firstChild ||
                startID - width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6 + 6}"]`).firstChild ||
                //other diagonal movements to BACK
                startID + width + 1 === targetID ||
                startID + width * 2 + 2  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7  === targetID &&  !document.querySelector(`[square-id = "${startID + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6 + 6}"]`).firstChild ||
              
                //one straight movements to front    
                startID + width === targetID ||
                startID + width * 2 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild ||
                startID + width * 3 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild ||
                startID + width * 4 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild ||
                startID + width * 5 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild ||
                startID + width * 6 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5}"]`).firstChild ||
                startID + width * 7 === targetID && !document.querySelector(`[square-id = "${startID + width}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + width * 6}"]`).firstChild ||
                
                //other straight movements to front    
                startID - width === targetID ||
                startID - width * 2 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild ||
                startID - width * 3 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild ||
                startID - width * 4 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild ||
                startID - width * 5 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild ||
                startID - width * 6 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5}"]`).firstChild ||
                startID - width * 7 === targetID && !document.querySelector(`[square-id = "${startID - width}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - width * 6}"]`).firstChild ||
                
                //one straight movements to back
                startID + 1 === targetID ||
                startID + 2 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 5}"]`).firstChild ||
                startID + 7 === targetID && !document.querySelector(`[square-id = "${startID + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID + 6}"]`).firstChild ||
                
                //other straight movements to back
                startID - 1 === targetID ||
                startID - 2 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 5}"]`).firstChild ||
                startID - 7 === targetID && !document.querySelector(`[square-id = "${startID - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startID - 6}"]`).firstChild
                
                ){
                    return true
                }
                break;
                case 'king' :
                    if(

                startID + 1 === targetID ||
                startID - 1 === targetID ||
                startID + width === targetID ||
                startID - width === targetID ||
                startID + width - 1 === targetID ||
                startID + width + 1 === targetID ||
                startID - width - 1 === targetID ||
                startID - width + 1 === targetID 

                    ){
                    return true
                    }
    }
}

function changePlayer(){
    if(playerGo === "black"){
        reverseIDs()
        playerGo = "white"
        playerDisplay.textContent = "white"
    } else {
        revertIDs()
        playerGo = "black"
        playerDisplay.textContent = "black"
    }
}

function reverseIDs(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i)
    })
}

function revertIDs(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', i)
    })
}

function checkWin(){
    const kings = Array.from(document.querySelector('#king'))
   
    if(!kings.some(king => king.firstChild.classList.contains('white'))){
        infoDisplay.innerHTML = "Black player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }

    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        infoDisplay.innerHTML = "White player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false))
    }
}
