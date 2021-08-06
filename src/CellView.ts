import {Cell} from 'fifteen-puzzle-core'
import {default as IEventBus} from './interfaces/EventBus'

export default class CellView extends Cell {
    protected eventBus: IEventBus

    constructor(realPosition: number, data: string, eventBus: IEventBus) {
        super(realPosition, data)
        this.eventBus = eventBus
    }

    on(name: string, callback: Function) {
        this.eventBus.on(name, callback)
    }

    off(name: string) {
        this.eventBus.off(name)
    }

    async move(newPosition: number): Promise<void> {
        let direction: string
        const difference: number = newPosition - this.position
        switch (difference) {
            case -1:
                direction = 'left'
                break
            case 1:
                direction = 'right'
                break
            default:
                if (difference > 0) {
                    direction = 'down'
                    break
                }
                direction = 'up'
        }
        this.eventBus.emit('move:start', direction)
        await super.move(newPosition)
        this.eventBus.emit('move:end')
    }
}