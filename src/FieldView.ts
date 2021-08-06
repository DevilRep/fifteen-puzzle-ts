import {Field} from 'fifteen-puzzle-core'
import CellView from './CellView'
import {AbstractFactoryInterface as AbstractFactory} from 'fifteen-puzzle-core'

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected readonly MOVE_ALL_RANDOM_ROUNDS: number = 1

    constructor(factory: AbstractFactory) {
        super(factory)
        this.bindElement()
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
