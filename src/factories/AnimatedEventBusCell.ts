import {AbstractFactoryDecorator, CellInterface} from 'fifteen-puzzle-core';
import EventBusInterface from '../interfaces/EventBus';

export default class AnimatedEventBusCell extends AbstractFactoryDecorator {
    constructor(factory: AbstractFactoryDecorator, eventBus: EventBusInterface) {
        eventBus = eventBus || eventBus
        super(factory);
    }

    create(position: number, data: string): CellInterface {
        return super.create(position, data);
    }
}
