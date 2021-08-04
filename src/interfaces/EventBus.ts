export default interface EventBus {
    on(name: string, callback: Function): void
    off(name: string): void
    emit(name: string, ...args: any[]): void
}