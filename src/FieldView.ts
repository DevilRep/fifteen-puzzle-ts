import {Field, CellInterface as Cell} from 'fifteen-puzzle-core'
import {Modal} from 'materialize-css'

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected modal: Modal = <Modal>{}

    protected initElements(): void {}

    protected bindElements(): void {}

    protected createClickEventHandler(cell: Cell): Function {
        cell = cell || cell
        return new Function()
    }

    protected bindClickEventHandlersOnCells(): void {}

    protected unbindEventHandlersOnCells(): void {}

    protected won(): void {}
}
