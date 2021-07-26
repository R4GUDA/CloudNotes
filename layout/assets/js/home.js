import { card_rendering, get_cookie, add_delete_card } from "./modules.js"
// on load
axios.get('http://127.0.0.1:8000/api/get', {
        headers: { 'token': get_cookie('token') }
    })
    .then(function(response) {
        card_rendering(response.data)
        add_delete_card(response.data)
    })

// log-out
$('#header__log-out').on('click', () => {
    document.cookie = "token=1; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
})