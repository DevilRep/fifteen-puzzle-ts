import EventBus from '../src/EventBus'

test('creating object: no callbacks', () => {
    const eventBus: EventBus = new EventBus()
    expect(eventBus.countCallbacks()).toBe(0)
})

test('adding a new event callback', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test', () => {})
    expect(eventBus.countCallbacks()).toBe(1)
})

test('adding a few event callbacks on different events: did all callbacks add?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test2', () => {})
    expect(eventBus.countCallbacks()).toBe(2)
})

test('adding a few event callbacks on different events: did callbacks bind to different events?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test2', () => {})
    expect(eventBus.countCallbacks('test1')).toBe(1)
})

test('adding a few event callbacks on the same event: did all callbacks add?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test1', () => {})
    expect(eventBus.countCallbacks()).toBe(2)
})

test('adding a few event callbacks on the same event: did callbacks bind to the same event?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test1', () => {})
    expect(eventBus.countCallbacks('test1')).toBe(2)
})

test('removing all callbacks by event name: did all callbacks remove?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test1', () => {})
    eventBus.off('test1')
    expect(eventBus.countCallbacks('test1')).toBe(0)
})

test('removing all callbacks by event name: did callbacks remove only for the specific event?', () => {
    const eventBus: EventBus = new EventBus()
    eventBus.on('test1', () => {})
    eventBus.on('test2', () => {})
    eventBus.off('test1')
    expect(eventBus.countCallbacks()).toBe(1)
})

test('triggering only one event callback', async () => {
    const eventBus: EventBus = new EventBus()
    let isEventTriggered: boolean = false
    eventBus.on('test1', () => (isEventTriggered = true))
    eventBus.emit('test1')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    expect(isEventTriggered).toBeTruthy()
})

test('triggering only one event callback while bind a few', async () => {
    const eventBus: EventBus = new EventBus()
    const isEventsTriggered: boolean[] = [false, false]
    const expected: boolean[] = [true, false]
    eventBus.on('test1', () => (isEventsTriggered[0] = true))
    eventBus.on('test2', () => (isEventsTriggered[1] = true))
    eventBus.emit('test1')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    expect(isEventsTriggered).toEqual(expected)
})

test('triggering a few event callbacks', async () => {
    const eventBus: EventBus = new EventBus()
    const isEventsTriggered: boolean[] = [false, false]
    const expected: boolean[] = [true, true]
    eventBus.on('test1', () => (isEventsTriggered[0] = true))
    eventBus.on('test1', () => (isEventsTriggered[1] = true))
    eventBus.emit('test1')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    expect(isEventsTriggered).toEqual(expected)
})

test('triggering an event callback several times', async () => {
    const eventBus: EventBus = new EventBus()
    let eventTriggeredCount: number = 0
    eventBus.on('test1', () => (eventTriggeredCount++))
    eventBus.emit('test1')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    eventBus.emit('test1')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    expect(eventTriggeredCount).toBe(2)
})

test('triggering an event callback with params', async () => {
    const eventBus: EventBus = new EventBus()
    let updatedValue: string = ''
    eventBus.on('test1', (parameter1: number, parameter2: string) =>
        (updatedValue = parameter2 + '-' + (parameter1 ? parameter1.toString() : ''))
    )
    eventBus.emit('test1', 10, 'test')
    await new Promise((resolve: Function) => setTimeout(resolve, 500))
    expect(updatedValue).toBe('test-10')
})