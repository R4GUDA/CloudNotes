// Login
$('#login-btn').on('click', () => {
    axios.post('http://127.0.0.1:8000/api/login', {
            login: String($('.login__login-input').val()),
            password: String($('.login__password-input').val())
        })
        .then(function(response) {
            document.cookie = `token=${response.data.data.token}`
            window.location.replace("http://127.0.0.1:5500/index.html");
        })
        .catch(function(error) {

            // display validation errors
            if (error.response.data.error.errors.password == "The password field is required.") {
                $('.login__password-input').addClass('auth-input_denied')
                setTimeout(() => {
                    $('.login__password-input').removeClass('auth-input_denied')
                }, 300)
            }

            if (error.response.data.error.errors.login == "The login field is required.") {
                $('.login__login-input').addClass('auth-input_denied')
                setTimeout(() => {
                    $('.login__login-input').removeClass('auth-input_denied')
                }, 300)
            }
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
            .then(function(response) {
                location.reload()
            })
            .catch(function(error) {

                // display validation errors
                if (error.response.data.error.errors.login == "The login field is required.") {
                    $('.login__login-input').addClass('auth-input_denied')
                    setTimeout(() => {
                        $('.login__login-input').removeClass('auth-input_denied')
                    }, 300)
                }
                if (error.response.data.error.errors.email == "The email field is required.") {
                    $('.login__email-input').addClass('auth-input_denied')
                    setTimeout(() => {
                        $('.login__email-input').removeClass('auth-input_denied')
                    }, 300)
                }
                if (error.response.data.error.errors.password == "The password field is required.") {
                    $('.login__password-input').addClass('auth-input_denied')
                    setTimeout(() => {
                        $('.login__password-input').removeClass('auth-input_denied')
                    }, 300)
                }
            })
    })
})