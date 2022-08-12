import { ExcelComponent } from "@core/ExcelComponent";

export class Header extends ExcelComponent{
    static className = 'excel__header'

    toHTML() {
        // let div = document.createElement('div');
        // div.innerHTML = `<strong>Всем привет!</strong> из Header`
        // return div

        return `
            <input class="input" type="text" value="Новая таблица">

            <div class="">
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>

                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div>
        `
    }
}