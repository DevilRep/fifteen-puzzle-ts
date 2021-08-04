import {Cell} from 'fifteen-puzzle-core'
import {default as IEventBus} from './interfaces/EventBus'

export default class CellView extends Cell implements IEventBus {
    protected eventBus: IEventBus

    constructor(realPosition: number, data: string, eventBus: IEventBus) {
        super(realPosition, data)
        this.eventBus = eventBus
    }

    on(name: string, callback: Function) {
        name = name || 'test'
        callback = callback || 'test'
        //this.eventBus.on(name, callback)
    }

    off(name: string) {

        name = name || 'test'
        //this.eventBus.off(name)
    }

    emit(name: string, ...args: any[]) {
        name = name || 'test'
        args = args || 'test'
        //this.eventBus.emit(name, ...args)
    }
}