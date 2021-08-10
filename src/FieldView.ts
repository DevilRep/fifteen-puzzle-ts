import {AbstractFactoryInterface as AbstractFactory, Field, CellInterface as Cell} from 'fifteen-puzzle-core'
import CellView from './CellView'
import {AnimationSpeed} from './types'
import {Modal} from 'materialize-css'
import * as M from 'materialize-css'

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected readonly MOVE_ALL_RANDOM_ROUNDS: number = 30
    protected modal: Modal = <Modal>{}

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

    protected init() {
        this.initElements()
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.off('click')
        })
        super.init()
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.animationSpeed = AnimationSpeed.Fast
        })
        const cellView: CellView = <CellView>this.freeCell
        cellView.animationSpeed = AnimationSpeed.Fast
    }

    protected bindElement(): void {
        const element = document.querySelector('.field')
        if (!element) {
            throw new Error('Something went wrong')
        }
        this.element = element
    }

    async newGame(): Promise<void> {
        const result = await super.newGame()
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.on('click', async() => await this.move(cell.position))
        })
        this.element.classList.add('in-game')
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.animationSpeed = AnimationSpeed.Default
        })
        const cellView: CellView = <CellView>this.freeCell
        cellView.animationSpeed = AnimationSpeed.Default
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

    protected won() {
        this.modal.open()
        this.cells.forEach((cell: Cell) => {
            const cellView: CellView = <CellView>cell
            cellView.off('click')
        })
        this.element.classList.remove('in-game')
    }
}
