import {AbstractFactoryInterface as AbstractFactory, Field} from 'fifteen-puzzle-core'
import CellView from './CellView'
import {AnimationSpeed} from './types'

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected readonly MOVE_ALL_RANDOM_ROUNDS: number = 10

    constructor(factory: AbstractFactory) {
        super(factory)
        this.bindElement()
    }

    protected init() {
        this.cells.forEach(cell => {
            const cellView: CellView = <CellView>cell
            cellView.off('click')
        })
        super.init()
        this.cells.forEach(cell => {
            const cellView: CellView = <CellView>cell
            cellView.on('click', async() => await this.move(cell.position))
        })
        this.cells.forEach(cell => {
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
        this.element.classList.add('in-game')
        this.cells.forEach(cell => {
            const cellView: CellView = <CellView>cell
            cellView.animationSpeed = AnimationSpeed.Default
        })
        const cellView: CellView = <CellView>this.freeCell
        cellView.animationSpeed = AnimationSpeed.Default
        return result
    }

    async move(cellPosition: number): Promise<void> {
        await super.move(cellPosition)
        if (this.isWon) {
            this.won()
        }
    }

    protected won() {
        alert('Congratulations! You won!')
        this.cells.forEach(cell => {
            const cellView: CellView = <CellView>cell
            cellView.off('click')
        })
        this.element.classList.remove('in-game')
    }
}
