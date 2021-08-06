import {AbstractFactoryInterface} from 'fifteen-puzzle-core'
import {CellInterface as Cell} from 'fifteen-puzzle-core'
import CellView from './CellView'
import EventBus from './EventBus'

export default class CellViewFactory implements AbstractFactoryInterface {
    create(position: number, data: string): Cell {
        return new CellView(position, data, new EventBus())
    }
}