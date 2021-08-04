export default class EventBus {
    protected callbacks = {}

    on(name: string, callback: Function): void {
        name = name || 'test'
        callback = callback || 'test'
    }

    off(name: string): void {
        name = name || 'test'
    }

    emit(name: string): void {
        name = name || 'test'
    }

    countCallbacks(name?: string): number {
        name = name || 'test'
        return 0
    }
}