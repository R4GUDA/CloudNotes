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
        $('.notes__inner').append(`
            <form action="" class="note" >
                <div class="note__top">
                    <input class="note__title" value="${element.title}" placeholder="Title" type="text" name="">
                    <button type="button" class="note__close"><img alt="cross" src="./assets/imgs/sections/note__close.png" class="note__close-img"></button>
                </div>
                <textarea placeholder="Content" class="note__content" name="" cols="30" rows="10">${element.text}</textarea>
            <form>
        `)
    })
}