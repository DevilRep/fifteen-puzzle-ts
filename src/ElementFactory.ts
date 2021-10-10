export default class ElementFactory {
    create(selector: string): Element {
        selector = selector || selector
        return new Element()
    }
}