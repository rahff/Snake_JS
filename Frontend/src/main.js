import {participate_action, participate} from "./home.js";


const init_page_reactivity = (fetch, dom_api) => _ => {
    dom_api.querySelectorAll('button[data-action="participate"]')
        .forEach(btn => {
        btn.addEventListener('click', participate_action(participate(fetch)))
    })
}


addEventListener("DOMContentLoaded", init_page_reactivity(fetch, document));


