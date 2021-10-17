import FieldView from './FieldView'
import CellView from './factories/CellView'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import 'animate.css/animate.min.css'
import '../css/main.css'

const field: FieldView = new FieldView(new CellView())

const element: Element = document.querySelector('.new-game')!
let isRunning = false

element.addEventListener('click', async () => {
    if (isRunning) {
        return
    }
    isRunning = true
    await field.newGame()
    isRunning = false
})