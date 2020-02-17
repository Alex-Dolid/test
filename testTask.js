

(function () {
    "use strict";

    // it is assumed that there is a playing field with the tag "table#field",
    // which has the tag "tbody", which has the tags "tr", which has the tags "td[data-type-item].cell"
    const tBody = document.querySelector("table > tbody");
    const arrTr = Array.from(tBody.rows);

    function searchGameItems(event) {
        if (!event.target.closest("tr")) return;

        const $ = event.target;
        const cells = document.querySelectorAll(".cell");
        const currentGameItem = $.dataset.typeItem;
        let allCellsWithTypeItem = [];
        let setSearchCols = new Set();

        currentGameItem.classList.add("selected");
        cells.forEach(cell => {
            if(cell.dataset.typeItem === currentGameItem) {
                allCellsWithTypeItem.push(cell);
            }
        });


        allCellsWithTypeItem.forEach(item => {
            if(item === currentGameItem.nextElementSiblling || item === currentGameItem.previousElementSibling) {
                item.classList.add("selected");
            }
        });

        allCellsWithTypeItem.forEach(item => {
           if(item.cellIndex === currentGameItem.cellIndex) {
               if(!item.classList.contains("selected")) {
                   if(item.nextElementSibling.classList.contains("selected") || item.previousElementSibling.classList.contains("selected")) {
                       item.classList.add("selected");
                   }
               }
           }
        });

        allCellsWithTypeItem.forEach((item, index) => {
            if(item.classList.contains("selected")) {
                setSearchCols.add(item.cellIndex);
            }
        });

        arrTr.forEach((tr, index )=> {
           if(index === currentGameItem.parentElement.rowIndex) {
               tr.classList.add("noticed");
           }
        });

        arrTr.forEach((tr, index) => {
            if(tr === currentGameItem.parentElement.rowIndex - 1) {
                let arrTd = Array.from(tr.cells);
                arrTd.forEach((td, indx) => {
                    if(setSearchCols.has(indx) && (td.dataset.typeItem === currentGameItem)) {
                        td.classList.add("selected");
                    }
                })
            } else if(tr === currentGameItem.parentElement.rowIndex + 1) {
                let arrTd = Array.from(tr.cells);
                arrTd.forEach((td, indx) => {
                    if(setSearchCols.has(indx) && (td.dataset.typeItem === currentGameItem)) {
                        td.classList.add("selected");
                    }
                })
            }
        });

        while(arrTr.find(tr => !tr.classList.contains("noticed"))) {
            for (let i = 0; i < arrTr.length; i++) {
                if(!arrTr[i].classList.contains("noticed") && arrTr[i-1].classList.contains("noticed")) {
                    let arrTd = Array.from(arrTr[i].cells);
                    arrTd.forEach((td, index) => {
                        if(setSearchCols.has(index) && (td.dataset.typeItem === currentGameItem)) {
                            td.classList.add("selected");
                        }
                    });
                    arrTr[i].classList.add("noticed");
                } else if(!arrTr[i].classList.contains("noticed") && arrTr[i+1].classList.contains("noticed")) {
                    let arrTd = Array.from(arrTr[i].cells);
                    arrTd.forEach((td, index) => {
                        if(setSearchCols.has(index) && (td.dataset.typeItem === currentGameItem)) {
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
