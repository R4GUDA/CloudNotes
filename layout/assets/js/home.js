import { card_rendering, get_cookie, delete_card, update_card, clear_cards } from "./modules.js"
// on load
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
})

// add note
$('.notes__add-note').on('click', () => {
    //todo
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