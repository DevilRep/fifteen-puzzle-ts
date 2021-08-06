import {Field} from 'fifteen-puzzle-core'
import CellView from './CellView'
import {AbstractFactoryInterface as AbstractFactory} from 'fifteen-puzzle-core'

export default class FieldView extends Field {
    protected element: Element = <Element>{}

    constructor(factory: AbstractFactory) {
        super(factory)
    }

    protected init() {
        super.init()
        this.cells.forEach(cell => {
            const cellView: CellView = <CellView>cell
            cellView.on('click', async () => await this.move(cell.position))
        })
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
    }
}
