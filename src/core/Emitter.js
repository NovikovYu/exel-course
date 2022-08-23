export class Emitter {
    constructor() {
        this.listeners = {}
    }

    //метот уведомляет слушателей, если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false //если массив слушателей не является массивом
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    //подписываемся на уведомления = добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn) // складируем в массив функции по ивенту

        //отписываемся от событий
        return () => {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== fn) //оставялем все слушатели не равные fn
        }
    }
}

//пример
// const emitter = new Emitter()
// emitter.subscribe('vladilen', data => console.log('Sub:', data)) //подписались на событие
// emitter.emit('vladilen', 42) //уведомляем слушателя, что произошло событие Владилен со значением 42