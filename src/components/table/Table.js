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
import {
    TableSelection
} from "./TableSelection";
import {
    isCell
} from "@/components/table/table.functions";
import {
    matrix
} from "@/components/table/table.functions";
import {
    nextSelector
} from "@/components/table/table.functions";
import {
    $
} from "@core/dom";



export class Table extends ExcelComponent {
    static className = 'excel__tabel'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: [
                'mousedown',
                'keydown',
                'input'
            ],
            ...options
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init() // вызываем метод инит, но с базовыми сотавляющими (так же вызываем родительский метод) 

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.current.text(text) //классу где хранится текущий выбранный элемент
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHAndler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']

        const {
            key
        } = event
        if (keys.includes(key) && !event.shiftKey) { //если нажата какая-нибудь клавиша из массива key и не нажат shift
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}