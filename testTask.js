

(function () {
    "use strict";

    function searchGameItems(event) {
        if (!event.target.closest("tr")) return;

        // it is assumed that there is a playing field with the tag "table#field",
        // which has the tag "tbody", which has the tags "tr", which has the tags "td[data-type-item].cell"
        const tBody = document.querySelector("table > tbody");
        const arrTr = Array.from(tBody.rows);
        const $ = event.target;
        const cells = document.querySelectorAll(".cell");
        const currentGameTypeItem = $.dataset.typeItem;

        //will be required to search on the top or bottom rows
        let setSearchCols = new Set();

        // I denote the current cell
        $.classList.add("selected");

        for (let i = $; i.nextElementSibling; i = i.nextElementSibling) {
            if(i.nextElementSibling.dataset.typeItem === currentGameTypeItem) {
                i.nextElementSibling.classList.add("selected");
            }
        }

        for (let i = $; i.previousElementSibling; i = i.previousElementSibling) {
            if(i.previousElementSibling.dataset.typeItem === currentGameTypeItem) {
                i.previousElementSibling.classList.add("selected");
            }
        }

        // I find all cells with the same game character with class "selected" and add theirs cellIndexes
        cells.forEach(cell => {
            if(cell.dataset.typeItem === currentGameTypeItem && cell.classList.contains("selected")) {
                setSearchCols.add(cell.cellIndex);
            }
        });

        // I notice rows, which which are verified
        arrTr.forEach((tr, index )=> {
           if(index === $.parentElement.rowIndex) {
               tr.classList.add("noticed");
           }
        });

        // I find every row that is not marked and
        // find every cell that is in the same position as the other checked cells in the noticed row
        while(arrTr.find(tr => !tr.classList.contains("noticed"))) {
            for (let i = 0; i < arrTr.length; i++) {
                if(!arrTr[i].classList.contains("noticed") && arrTr[i-1].classList.contains("noticed")) {
                    let arrTd = Array.from(arrTr[i].cells);
                    arrTd.forEach((td, index) => {
                        if(setSearchCols.has(index) && (td.dataset.typeItem === currentGameTypeItem)) {
                            td.classList.add("selected");
                        }
                    });
                    arrTr[i].classList.add("noticed");
                } else if(!arrTr[i].classList.contains("noticed") && arrTr[i+1].classList.contains("noticed")) {
                    let arrTd = Array.from(arrTr[i].cells);
                    arrTd.forEach((td, index) => {
                        if(setSearchCols.has(index) && (td.dataset.typeItem === currentGameTypeItem)) {
                            td.classList.add("selected");
                        }
                    });
                    arrTr[i].classList.add("noticed");
                }
            }
        }
    }

    field.addEventListener("click", searchGameItems); //

})();
