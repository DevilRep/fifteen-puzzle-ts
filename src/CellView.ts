import {Cell} from 'fifteen-puzzle-core'
import {default as IEventBus} from './interfaces/EventBus'
import {AnimationSpeed, MovingDirection} from './types'

export default class CellView extends Cell {
    protected eventBus: IEventBus
    protected element: Element
    protected newClassesForElement: string[] = []

    constructor(realPosition: number, data: string, eventBus: IEventBus) {
        super(realPosition, data)
        this.eventBus = eventBus
        this.clearElementListeners(realPosition)
        const element = document.querySelector(`.cell${realPosition}`)
        if (!element) {
            throw new Error('Something went wrong')
        }
        this.element = element
        this.element.addEventListener('click', () => this.eventBus.emit('click'))
    }

    protected clearElementListeners(realPosition: number): void {
        let element = document.querySelector(`.cell${realPosition}`)
        if (!element) {
            throw new Error('Something went wrong')
        }
        const clone = element.cloneNode(true)
        if (!element.parentNode) {
            throw new Error('Something went wrong')
        }
        element.parentNode.replaceChild(clone, element)
    }

    on(name: string, callback: Function): void {
        this.eventBus.on(name, callback)
    }

    off(name: string) {
        this.eventBus.off(name)
    }

    protected async animate(classes: string[]): Promise<void> {
        this.element.classList.add(...classes)
        await new Promise((resolve: Function) =>
            setTimeout(resolve, classes.includes('animate__fast') ? AnimationSpeed.Fast : AnimationSpeed.Default))
    }

    protected direction(newPosition: number): MovingDirection {
        const difference: number = newPosition - this.position
        switch (difference) {
            case -1:
                return MovingDirection.Left
            case 1:
                return MovingDirection.Right
            default:
                if (difference > 0) {
                    return MovingDirection.Down
                }
                return MovingDirection.Up
        }
    }

    async move(newPosition: number, animationClasses: string[] = []): Promise<void> {
        const direction: MovingDirection = this.direction(newPosition)
        this.newClassesForElement = ['cell', 'animate__animated', 'freeCell']
        await this.animate(
            ['animate__slideOut' + direction.charAt(0).toUpperCase() + direction.slice(1)]
                .concat(animationClasses)
        )
        await super.move(newPosition)
    }

    moveWhileShuffling(newPosition: number): Promise<void> {
        return this.move(newPosition, ['animate__fast']);
    }

    animationEnd() {
        const toRemove: string[] = Array.from(this.element.classList)
            .filter(className => !this.newClassesForElement.includes(className) && className !== `cell${this.realPosition}`)
        this.element.classList.add(`cell${this.realPosition}`)
        if (!toRemove) {
            return
        }
        this.element.classList.remove(...toRemove)
    }
}