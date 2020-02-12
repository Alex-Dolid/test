

(function () {
    "use strict";

    const field = document.querySelector(".field");
    //it is assumed that there is a playing field with class "field"


    function searchGameItems(event) {
        if(!event.target.classList.contains("cell")) return;

        const $ = event.target;
        const cells = document.querySelectorAll(".cell");
        // it is assumed that there is a playing field with class "field" which contains blocks with class "cell"
        // blocks with class "cell" have data-attributes type-item with values "<typeGameElement>"
        const currentGameItem = $.dataset.typeItem;

        cells.forEach(cell => {

            if(cell.dataset.typeItem === currentGameItem) return true;
            // we've found all of the game elements by cell, and we can already erase them in the future

        });

    }

    field.addEventListener("click", searchGameItems); //

})();



/*
* There also may be other search options, depending on situation, on which the search should be done.
* For example, the interface of playing field can be released not on a data-attributes. Then in another case we need
*  to make search with "id" or "img"
* */


/*
* And this task can be set in the realities of React App. In such case we need to use the store in the architecture
*  "Flux" or "Redux" and therefore to update the local state and if needed to synchronized this state to Server-Side
*  witch the help of Fetch API
*
* */
