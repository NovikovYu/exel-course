import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []

        this.prepare()
    }

    //метод для вспомогательного функционала (до запуска инита)
    //настраиваем компонент до init
    prepare(){

    }

    //метод возвращает шаблон компонента
    toHTML() {
        return ''
    }


    //уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    //подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn) //функиция подписки
        this.unsubscribers.push(unsub) //складываем функцию подписки в массив отписок??? или это просто массив функций
    }

    // Инициализируем компонент
    // добавляем DOM слушатели
    init() {
        this.initDOMListeners()
    }

    //удаляем компонент и чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}