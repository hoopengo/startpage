console.log(" ∧,,∧\n( •·•)\n/ > @hoopengo was here 💌")

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function update_time() {
    weekday = days[(new Date()).getDay()]
    solo = (new Date()).toLocaleTimeString(["ru-RU"], {hour: '2-digit', minute:'2-digit', second: '2-digit'})
    mono = (new Date()).toLocaleDateString(["id"]);

    date = `${weekday}, ${solo}, ${mono}`

    document.getElementById("updatetime").innerHTML = date;
    setTimeout(update_time, 1000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

update_time()

// Search

search_input = document.getElementById("textbox")

search_input.addEventListener('blur', async function(event) {
    search = document.getElementById("show-on-slash")

    for (let i = 1; i > 0; i = i - 0.1) {
        search.style.opacity = i;
        await sleep(10)
    }
})

search_input.addEventListener('focus', async function(event) {
    search = document.getElementById("show-on-slash")

    for (let i = 0; i < 1; i = i + 0.1) {
        search.style.opacity = i;
        await sleep(10)
    }
})

document.addEventListener('keydown', async function(event) {
    if (event.code == 'Slash' && (event.ctrlKey || event.metaKey)) {
        search = document.getElementById("show-on-slash")
        search.style.display = 'block';
        search_input.focus();

        location = 'https://google.com/'
    }
});