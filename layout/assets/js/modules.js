// get cookie function
export function get_cookie(cookie_name) {
    let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

// card rendering
export function card_rendering(data) {
    data.forEach(element => {
        $('.notes__cards').append(`
            <form action="" class="note" >
                <div class="note__top">
                    <input class="note__title" data-id=${element.id} value="${element.title}" placeholder="Title" type="text" name="">
                    <button type="button" data-id=${element.id} class="note__close"><img alt="cross" src="./assets/imgs/sections/note__close.png" class="note__close-img"></button>
                </div>
                <textarea placeholder="Content" data-id=${element.id} class="note__content" name="" cols="30" rows="10">${element.text}</textarea>
            <form>
        `)
    })

}

// delete on cards
export function delete_card(data) {
    $('.note__close').on('click', function() {
        axios('http://127.0.0.1:8000/api/delete', {
            method: "delete",
            headers: { 'Authorization': get_cookie('token') },
            data: { 'id': this.getAttribute('data-id') }
        })
        $(this).closest('form').remove()
    })
}

// update card
export function update_card() {
    $('.note__title').on('input keyup', function() {
        update_func(this)
    })
    $('.note__content').on('input keyup', function() {
        update_func(this)
    })
}

// delay setTimeout
let delay = (function() {
    let timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

// collect and send data
export function update_func(obj) {
    let id = obj.getAttribute('data-id')
    let title = $(`.note__title[data-id=${id}]`).val()
    let text = $(`.note__content[data-id=${id}]`).val()
    delay(function() {
        axios('http://127.0.0.1:8000/api/put', {
            method: "put",
            headers: { 'Authorization': get_cookie('token') },
            data: {
                'title': String(title),
                'text': String(text),
                'id': id
            }
        })
    }, 500)
}

// clear cards

export function clear_cards() {
    $('.notes__cards').empty()
}

// store empty card
export function store_card() {
    axios('http://127.0.0.1:8000/api/store', {
            headers: { Authorization: get_cookie('token') },
            method: 'post',
            data: {
                'theme': 'default',
                'title': $('.note__title[data-id="new_note"]').val(),
                'text': $('.note__text[data-id="new_note]').val()
            }
        })
        .then(function(response) {
            $('.note__title[data-id="new_note"]').attr('data-id', response.data[0])
            $('.note__close[data-id="new_note"]').attr('data-id', response.data[0])
            $('.note__content[data-id="new_note"]').attr('data-id', response.data[0])
            delete_card(response.data)
            update_card()
        })
}