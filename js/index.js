console.log(" ∧,,∧\n( •·•)\n/ > @hoopengo was here 💌")

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function update_time() {
    weekday = days[(new Date()).getDay()]
    solo = (new Date()).toLocaleTimeString(["ru-RU"], {hour: '2-digit', minute:'2-digit', second: '2-digit'})
    mono = (new Date()).toLocaleDateString(["id"]);

    date = `${weekday}, ${solo} | ${mono}`

    document.getElementById("updatetime").innerHTML = date;
    setTimeout(update_time, 1000);
}

update_time()