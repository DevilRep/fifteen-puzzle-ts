import {AbstractCellDecorator, CellInterface} from 'fifteen-puzzle-core';
import IEventBus from '../interfaces/EventBus'

export default class EventBusCell extends AbstractCellDecorator {
    public prefixBeforeMove: string = 'move'
    public prefixAfterMove: string = 'move'

    constructor(cell: CellInterface, eventBus: IEventBus) {
        super(cell);
        eventBus = eventBus || eventBus
    }
}