// Login
$('#login-btn').on('click', () => {
    axios.post('http://127.0.0.1:8000/api/login', {
            login: String($('.login__login-input').val()),
            password: String($('.login__password-input').val())
        })
        .catch(function(error) {
            console.log(error)
        })
        .then(function(response) {
            document.cookie = `token=${response.data.data.token}`
        })
})

// sign up switch
$('.login__register').on('click', function() {
    $('.login__right').remove()
    $(`
    <div class="login__right">
    <input class="login__login-input auth-input" placeholder="Login" type="text" name="" id="">
    <input class="login__email-input auth-input" placeholder="Email" type="text" name="" id="">
    <input class="login__password-input auth-input" placeholder="Password" type="password">
    <input id="register-btn" class="login__register auth-btn auth-btn_sign-up" value="Sign up" type="button">
    </div>
    `).insertAfter('.login__hr')

    // register
    $('#register-btn').on('click', () => {
        axios.post('http://127.0.0.1:8000/api/register', {
                login: String($('.login__login-input').val()),
                email: String($('.login__email-input').val()),
                password: String($('.login__password-input').val())
            })
            .catch(function(error) {
                console.log(error)
            })
            .then(function(response) {
                location.reload()
            })
    })
})