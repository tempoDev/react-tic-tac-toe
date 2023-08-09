export const saveGame = ({board, turn}) => {
    window.localStorage.setItem("tablero", JSON.stringify(board))
    window.localStorage.setItem("turn", turn)
}

export const resetGame = () => {
    window.localStorage.removeItem("tablero")
    window.localStorage.removeItem("turn")
}