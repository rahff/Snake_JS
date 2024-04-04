import {participate_action, participate} from "./participate.js";

const PARTICIPATE_BTNS = 'button[data-action="participate"]';

const init_page_reactivity = (fetch, dom_api) => _ => {
    dom_api.querySelectorAll(PARTICIPATE_BTNS).forEach(btn => {
        btn.addEventListener('click', participate_action(participate(fetch)))
    })
}

addEventListener("DOMContentLoaded", init_page_reactivity(fetch, document));


