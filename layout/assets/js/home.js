import { card_rendering, get_cookie, delete_card, update_card, clear_cards, store_card, search } from "./modules.js"

let theme = 'All'

// redirect without token
axios('http://127.0.0.1:8000/api/checkToken', {
        method: 'post',
        headers: { 'Authorization': get_cookie('token') },
        data: {}
    })
    .then(function(response) {
        if (!response.data.isCorrect) window.location.replace("/login.html")
    })

// render cards
axios('http://127.0.0.1:8000/api/get', {
        method: "get",
        headers: { 'Authorization': get_cookie('token') }
    })
    .then(function(response) {
        card_rendering(response.data)
        delete_card(response.data)
        update_card()
    })

// themes
$('.group-all').on('click', function() {
    axios('http://127.0.0.1:8000/api/get', {
            method: "get",
            headers: { 'Authorization': get_cookie('token') }
        })
        .then(function(response) {
            clear_cards()
            card_rendering(response.data)
            delete_card(response.data)
            update_card()
        })
})

$('.group-another').on('click', function() {
    theme = $(this).val()
    axios(`http://127.0.0.1:8000/api/theme?theme=${theme}`, {
            method: "get",
            headers: { 'Authorization': get_cookie('token') }
        })
        .then(function(response) {
            if (!response.data.empty) {
                clear_cards()
                card_rendering(response.data.notes)
                delete_card(response.data.notes)
                update_card()
            }
        })
})


// log-out
$('#header__log-out').on('click', () => {
    document.cookie = "token=1; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    window.location.replace("/login.html")
})

// add note
$('.notes__add-note').on('click', () => {
    $('.notes__cards').append(`
    <form action="" class="note" >
        <div class="note__top">
            <input class="note__title" data-id="new_note" value="" placeholder="Title" type="text" name="">
            <button type="button" data-id="new_note" class="note__close"><img alt="cross" src="./assets/imgs/sections/note__close.png" class="note__close-img"></button>
        </div>
        <textarea placeholder="Content" data-id="new_note" class="note__content" name="" cols="30" rows="10"></textarea>
    <form>
    `)
    store_card(theme)
})

// search note
$('.notes__search').on('click', function() {
    search()
})

$('.notes__search-field').on('keyup', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        search()
    }
})