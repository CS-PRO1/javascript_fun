const heroCardTemplate = document.querySelector("[data-hero-template]");
const heroCardsContainer = document.querySelector("[data-hero-cards-container]");
const searchInput = document.querySelector("[data-search]");

let heroes = [];

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    heroes.forEach((hero) => {
        const isvisible = hero.name.toLowerCase().includes(value) || hero.title.toLowerCase().includes(value);
        hero.element.classList.toggle("hide", !isvisible);
    }
    );
});
fetch("https://69e3d263cfa9394db8d9db2e.mockapi.io/users")
    .then((response) => response.json())
    .then((data) => {
        heroes = data.map((hero) => {
            const card = heroCardTemplate.content.cloneNode(true).children[0];
            console.log(card);
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            const img = card.querySelector("[data-img]");
            header.textContent = hero.name;
            body.textContent = hero.title;
            img.src = hero.image;
            heroCardsContainer.append(card);
            return { name: hero.name, title: hero.title, element: card };
        });
    });