import {AbstractFactoryInterface, AbstractFactoryDecorator} from 'fifteen-puzzle-core';
import EventBusInterface from '../interfaces/EventBus';

export default class AnimatedEventBusCell extends AbstractFactoryDecorator {
    constructor(factory: AbstractFactoryInterface, eventBus: EventBusInterface) {
        eventBus = eventBus || eventBus
        super(factory);
    }
}
