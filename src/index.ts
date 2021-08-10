import FieldView from './FieldView'
import CellViewFactory from './CellViewFactory'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import 'animate.css/animate.min.css'
import '../css/main.css'

const field: FieldView = new FieldView(new CellViewFactory())

const element: Element = document.querySelector('.new-game')!
element.addEventListener('click', async () => {
    await field.newGame()
})