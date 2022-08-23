const CODES = {
    A: 65,
    Z: 90
}

const rowNum = 9


//почему col приравнялся к индексу? просто потому что он второй в списке?
// function toCell(row, col) {
//     return `
//     <div class="cell" data-col="${col}" data-row="${row}" contenteditable></div>
//     `
// }

//тут есть замыкание
function toCell(row) { //функция создания ячейки с параметром номера ряда
    return function (_, col) { //функция создания ячейки с параметрами номера колонки
        return `
    <div 
    class="cell" 
    data-col="${col}"
     data-id="${row}:${col}"
     data-type="cell"
     contenteditable>
     </div>
    `
    }
}

function toColumn(col, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    
    `
}

function createRow(index, content) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''

    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount) // создаём пустой массив с длинной равной количеству колонок
            .fill('') //заполняем значения пустотой
            // .map(toCell) //в кажое значение записываем разметку одной ячейки (ГДЕ МЫ передаём аргументы в шаблон ячейки???)
            // .map((_, col) => toCell(row, col)) //не выразительно из за колбека
            .map(toCell(row)) // к каждому значению массива вызываем метод ячейки с параметром (номер ряжа) 
            .join('') //соединяем разметку каждой ячейки в разметку строки (без первой )

        rows.push(createRow(row + 1, cells))
    }
    return rows.join(' ')
}