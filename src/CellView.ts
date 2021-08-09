import {Cell} from 'fifteen-puzzle-core'
import {default as IEventBus} from './interfaces/EventBus'
import {MovingDirection} from './types'

export default class CellView extends Cell {
    protected eventBus: IEventBus
    protected readonly ANIMATION_SPEED = 1000
    protected element: Element

    constructor(realPosition: number, data: string, eventBus: IEventBus) {
        super(realPosition, data)
        this.eventBus = eventBus
        const element = document.querySelector(`.cell${realPosition}`)
        if (!element) {
            throw new Error('Something went wrong')
        }
        this.element = element
        element.addEventListener('click', () => this.eventBus.emit('click'))
    }

    on(name: string, callback: Function) {
        this.eventBus.on(name, callback)
    }

    off(name: string) {
        this.eventBus.off(name)
    }

    protected async animate(name: string): Promise<void> {
        this.element.classList.add(name)
        await new Promise((resolve: Function) => {
            setTimeout(resolve, this.ANIMATION_SPEED)
        })
        this.element.classList.remove(name)
    }

    async move(newPosition: number): Promise<void> {
        let direction: MovingDirection
        const difference: number = newPosition - this.position
        switch (difference) {
            case -1:
                direction = MovingDirection.Left
                break
            case 1:
                direction = MovingDirection.Right
                break
            default:
                if (difference > 0) {
                    direction = MovingDirection.Down
                    break
                }
                direction = MovingDirection.Up
        }
        this.eventBus.emit('move:start', direction)
        await this.animate('animate__slideOut' + direction.charAt(0).toUpperCase() + direction.slice(1))
        const oldPosition: number = this.position
        await super.move(newPosition)
        this.eventBus.emit('move:end')
        this.element.classList.remove(`cell${oldPosition}`)
        this.element.classList.add(`cell${newPosition}`)
    }
}