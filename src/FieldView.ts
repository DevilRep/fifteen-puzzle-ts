import {AbstractFactoryInterface as AbstractFactory, Field, CellInterface as Cell} from 'fifteen-puzzle-core'
import CellView from './CellView'
import {Modal} from 'materialize-css'
import * as M from 'materialize-css'

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected readonly MOVE_ALL_RANDOM_ROUNDS: number = 30
    protected modal: Modal = <Modal>{}
    protected cellAlreadyMoved: CellView | null = null

    constructor(factory: AbstractFactory) {
        super(factory)
        this.modal = M.Modal.init(document.querySelectorAll('.modal'))[0]
        this.bindElement()
    }

    protected initElements(): void {
        const elements: Array<Element> = Array.from(document.getElementsByClassName('cell'))
        elements.forEach(element => {
            const classPosition = Array.from(element.classList)
                .find(className => !['cell', 'animate__animated', 'freeCell'].includes(className))
            const startPositionAttr: Attr | null = element.attributes.getNamedItem('data-index')
            if (!classPosition || !startPositionAttr || classPosition === 'cell' + startPositionAttr.value) {
                return
            }
            element.classList.remove(classPosition)
            element.classList.add('cell' + startPositionAttr.value)
        })
    }

    protected init(): void {
        this.initElements()
        this.unbindEventHandlersOnCells()
        super.init()
        this.bindMoveEndEventHandlersOnCells()
    }

    protected bindElement(): void {
        const element = document.querySelector('.field')
        if (!element) {
            throw new Error('Something went wrong')
        }
        this.element = element
    }

    protected createClickEventHandler(cell: Cell): Function {
        return async (): Promise<void> => {
            return await this.move(cell.position)
        }
    }

    protected createMoveEndEventHandler(cell: CellView): Function {
        return async (): Promise<void> => {
            if (!this.cellAlreadyMoved) {
                this.cellAlreadyMoved = cell
                return
            }
            cell.animationEnd()
            this.cellAlreadyMoved.animationEnd()
            this.cellAlreadyMoved = null
        }
    }

    protected bindClickEventHandlersOnCells(): void {
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.on('click', this.createClickEventHandler(cellView))
        })
    }

    protected bindMoveEndEventHandlersOnCells(): void {
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.on('move:end', this.createMoveEndEventHandler(cellView))
        })
        const cellView: CellView = <CellView>this.freeCell
        cellView.on('move:end', this.createMoveEndEventHandler(cellView))
    }

    protected unbindEventHandlersOnCells(): void {
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.off('click')
        })
    }

    async newGame(): Promise<void> {
        const result = await super.newGame()
        this.bindClickEventHandlersOnCells()
        this.element.classList.add('in-game')
        return result
    }

    async move(cellPosition: number): Promise<void> {
        try {
            await super.move(cellPosition)
        } catch(error) {}
        if (this.isWon) {
            this.won()
        }
    }

    protected won(): void {
        this.modal.open()
        this.unbindEventHandlersOnCells()
        this.element.classList.remove('in-game')
    }
}
