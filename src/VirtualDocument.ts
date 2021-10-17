import DocumentInterface from './interfaces/Document'

export default class VirtualDocument implements DocumentInterface {
    querySelector(selector: string): Element {
        selector = selector || selector
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