import {Field, CellInterface as Cell} from 'fifteen-puzzle-core'
import {Modal} from 'materialize-css'
import {AbstractFactoryInterface} from 'fifteen-puzzle-core'
import DocumentInterface from './interfaces/Document'
import EventBusInterface from './interfaces/EventBus';

export default class FieldView extends Field {
    protected element: Element = <Element>{}
    protected modal: Modal = <Modal>{}
    protected readonly document: DocumentInterface
    protected readonly eventBus: EventBusInterface

    protected initElements(): void {}

    protected bindElements(): void {}

    protected createClickEventHandler(cell: Cell): Function {
        cell = cell || cell
        return new Function()
    }

    protected bindClickEventHandlersOnCells(): void {}

    protected unbindEventHandlersOnCells(): void {}

    protected won(): void {}

    public constructor(factory: AbstractFactoryInterface, document: DocumentInterface, eventBus: EventBusInterface) {
        super(factory)
        this.document = document
        this.eventBus = eventBus
    }
}
