import { card_rendering, get_cookie, delete_card, update_card, clear_cards, store_card } from "./modules.js"
// on load

// redirect without token
axios('http://127.0.0.1:8000/api/checkToken', {
        method: 'post',
        headers: { 'Authorization': get_cookie('token') },
        data: {}
    })
    .catch(function(error) {
        if (error.response.status == 403) window.location.replace("/login.html")
    })

axios('http://127.0.0.1:8000/api/get', {
        method: "get",
        headers: { 'Authorization': get_cookie('token') }
    })
    .then(function(response) {
        card_rendering(response.data)
        delete_card(response.data)
        update_card()
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
    store_card()
})

// search note
$('.notes__search').on('click', () => {
    axios('http://127.0.0.1:8000/api/search', {
            method: 'post',
            headers: { 'Authorization': get_cookie('token') },
            data: { 'key_word': $('.notes__search-field').val() }
        })
        .then(function(response) {
            clear_cards()
            card_rendering(response.data)
        })
})