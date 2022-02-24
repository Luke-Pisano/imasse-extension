function menuScroll() {
    document.getElementById("menu-toggle").checked = !1
}
$(window).load(function() {
    $("body").show(0)
});
var srchBar = document.querySelector(".search-bar"),
    srchSugg = document.querySelector(".srch-suggest"),
    srchInput = document.getElementById("search-input"),
    srchBtn = document.getElementById("search-btn");
srchInput.addEventListener("blur", function() {
    srchBar.style.boxShadow = ""
}), srchInput.addEventListener("keyup", function(e) {
    13 === e.keyCode ? wikiSearch(wikiURL + srchInput.value.split(" ").join("+")) : srchInput.value ? suggSearch(suggURL + srchInput.value.split(" ").join("+")) : srchSugg.style.display = "none"
}), srchBtn.addEventListener("click", function(e) {
    wikiSearch(wikiURL + srchInput.value.split(" ").join("+"))
});
var suggURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&callback=suggCallback&list=prefixsearch&pslimit=5&pssearch=";

function wikiSearch(e) {
    var t = document.createElement("script");
    t.src = e, document.body.appendChild(t), document.body.removeChild(t)
}

function wikiCallback(e) {
    Velocity(articlesCon, {
        opacity: 0
    }, {
        duration: 0
    }), articlesCon.innerHTML = "", srchSugg.style.display = "none", srchSugg.innerHTML = "";
    var t = e.query.pages;
    for (var n in t) {
        var c = '<div class="article"><a href="' + t[n].fullurl + '" target="_blank">';
        c += '<h3 class="article_title">' + t[n].title + "</h3>", c += '<p class="article_extract">' + t[n].extract + "</P>", c += "</a></div>", articlesCon.insertAdjacentHTML("beforeend", c)
    }
    Velocity(articlesCon, {
        opacity: 1
    }, {
        duration: 1e3
    })
}

function suggSearch(e) {
    var t = document.createElement("script");
    t.src = e, document.body.appendChild(t), document.body.removeChild(t)
}

function suggCallback(e) {
    srchSugg.innerHTML = "", srchSugg.style.display = "block", e.query.prefixsearch.forEach(function(e) {
        var t = document.createElement("h3");
        t.classList.add("srch-suggest_title"), t.textContent = e.title, t.addEventListener("click", function() {
            srchInput.value = this.textContent, wikiSearch(wikiURL + srchInput.value.split(" ").join("+")), document.getElementById("search-form").submit()
        }), srchSugg.appendChild(t)
    })
}

function ac() {
    var e = document.getElementById("ac");
    "none" === e.style.display && (e.style.display = "block");
    var t = document.getElementById("download-btn");
    "block" === t.style.display && (t.style.display = "none")
}

function acoff() {
    var e = document.getElementById("ac");
    "block" === e.style.display && (e.style.display = "none");
    var t = document.getElementById("download-btn");
    "none" === t.style.display && (t.style.display = "block")
}