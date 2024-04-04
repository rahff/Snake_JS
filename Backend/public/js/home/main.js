// src/home/participate.js
var participate = (fetch2) => async (competition_id, url) => {
  await fetch2(url + "/" + competition_id, { method: "POST" });
};
var participate_action = (participate2) => async (event) => {
  const clicked = event.target;
  const competition_id = clicked.getAttribute("data-competition");
  const url = clicked.getAttribute("data-url");
  await participate2(competition_id, url);
};

// src/home/main.js
var init_page_reactivity = (fetch2, dom_api) => (_) => {
  dom_api.querySelectorAll('button[data-action="participate"]').forEach((btn) => {
    btn.addEventListener("click", participate_action(participate(fetch2)));
  });
};
addEventListener("DOMContentLoaded", init_page_reactivity(fetch, document));
