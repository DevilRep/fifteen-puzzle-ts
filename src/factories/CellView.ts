import {AbstractFactoryDecorator} from 'fifteen-puzzle-core'
import {CellInterface} from 'fifteen-puzzle-core'

export default class CellView extends AbstractFactoryDecorator {
    create(position: number, data: string): CellInterface {
        return super.create(position, data)
    }
}
