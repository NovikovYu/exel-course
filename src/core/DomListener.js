import { capitalize } from "@core/utils"

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DpmListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        // console.log(this.listeners)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // console.log(method)
            //то же что и addEventListener

            if (!this[method]){
                const name = this.name || ''
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
            // this.$root.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })   
    }
}


function getMethodName(eventName){
    return 'on' + capitalize(eventName)
}