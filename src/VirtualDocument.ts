import Document from './interfaces/Document';
import DocumentInterface from './interfaces/Document'

export default class VirtualDocument implements DocumentInterface {
    public constructor(private document: Document) {
    }

    querySelector(selector: string): Element {
        selector = selector || selector
        this.document = this.document || this.document
        return new Element()
    }
    querySelectorAll(selector: string): NodeList {
        selector = selector || selector
        return new NodeList()
    }
    getElementsByClassName(className: string): HTMLCollectionOf<Element> {
        className = className || className
        return new HTMLCollection()
    }
}