import FieldView from './FieldView'
import CellViewFactory from './CellViewFactory'
import './../main.css'

const field: FieldView = new FieldView(new CellViewFactory())

const element: Element = document.querySelector('.new-game')!
element.addEventListener('click', async () => {
    await field.newGame()
})