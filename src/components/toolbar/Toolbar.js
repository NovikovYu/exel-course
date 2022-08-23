import { ExcelComponent } from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent{
    static className = 'excel__toolbar'

    constructor($root, options) {
super($root, {
    name: 'Toolbar',
    listeners: ['click'],
    ...options
})
    }
    toHTML() {
        return `
        <div class="button">
                   <!-- <i class="material-icons">format_align_left</i> -->
                    <i class="material-icons">al</i>
                </div>

                <div class="button">
                <!--<i class="material-icons">format_align_center</i> -->
                    <i class="material-icons">ac</i>
                </div>

                <div class="button">
                <!--<i class="material-icons">format_align_right</i>-->
                    <i class="material-icons">ar</i>
                </div>

                <div class="button">
                <!-- <i class="material-icons">format_bold</i>-->
                    <i class="material-icons">b</i>
                </div>

                <div class="button">
                <!-- <i class="material-icons">format_italic</i>-->
                    <i class="material-icons">i</i>
                </div>

                <div class="button">
                    <!-- <i class="material-icons">format_underlined</i> -->
                    <i class="material-icons">u</i>
                </div>
        `
    }

    onClick(event) {
        console.log(event.target)
    }
}