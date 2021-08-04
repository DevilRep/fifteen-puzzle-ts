import CallbacksList from './interfaces/CallbacksList'

export default class EventBus {
    protected callbacks: CallbacksList = {}

    on(name: string, callback: Function): void {
        if (!(name in this.callbacks)) {
            this.callbacks[name] = []
        }
        this.callbacks[name].push(callback)
    }

    off(name: string): void {
        if (!(name in this.callbacks)) {
            return
        }
        this.callbacks[name] = []
    }

    emit(name: string, ...args: any[]): void {
        if (!(name in this.callbacks)) {
            return
        }
        this.callbacks[name].forEach((callback: Function) => setTimeout(() => callback(...args), 0))
    }

    countCallbacks(name?: string): number {
        if (name) {
            if (!(name in this.callbacks)) {
                return 0
            }
            return this.callbacks[name].length
        }
        return Object.keys(this.callbacks)
            .reduce((result, name) => {
                result += this.callbacks[name].length
                return result
            }, 0)
    }
}