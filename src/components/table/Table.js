import {
    ExcelComponent
} from "@core/ExcelComponent";
import {
    createTable
} from "@/components/table/table.template";
import {
    resizeHAndler
} from "@/components/table/table.resize";
import {
    shouldResize
} from "@/components/table/table.functions";



export class Table extends ExcelComponent {
    static className = 'excel__tabel'

    constructor($root) {
        super($root, {
            listeners: [
                'mousedown'
            ]
        })
    }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHAndler(this.$root, event)
        }
    }



}