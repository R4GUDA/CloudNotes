import { get_cookie } from "./modules.js"

// redirect with token
axios('http://127.0.0.1:8000/api/checkToken', {
        method: 'post',
        headers: { 'Authorization': get_cookie('token') },
        data: {}
    })
    .then(function(response) {
        if (response.data.isCorrect)
            window.location.replace("/index.html")
    })

// Login

$('.login__right').on('submit', (evt) => {
    evt.preventDefault()
    axios.post('http://127.0.0.1:8000/api/login', {
            login: $('.login__login-input').val(),
            password: $('.login__password-input').val()
        })
        .then(function(response) {
            document.cookie = `token=${response.data.data.token}`
            window.location.replace("/index.html");
        })
        .catch(function(error) {

            // display validation errors

            Object.keys(error.response.data.error.errors).forEach((item) => {
                if (item == 'login') {
                    if (error.response.data.error.errors.login == "The login field is required.") {
                        $('.login__login-input').addClass('auth-input_denied')
                        setTimeout(() => {
                            $('.login__login-input').removeClass('auth-input_denied')
                        }, 300)
                    }
                    if (error.response.data.error.errors.login == "Incorrect login") {
                        $('.login-error').text("Incorrect login")
                        setTimeout(() => {
                            $('.login-error').text("")
                        }, 2000)
                    }
                }

                if (item == 'password') {
                    if (error.response.data.error.errors.password == "The password field is required.") {
                        $('.login__password-input').addClass('auth-input_denied')
                        setTimeout(() => {
                            $('.login__password-input').removeClass('auth-input_denied')
                        }, 300)
                    }
                    if (error.response.data.error.errors.password == "Incorrect password") {
                        $('.password-error').text("Incorrect password")
                        setTimeout(() => {
                            $('.password-error').text("")
                        }, 2000)
                    }
                }

            })

        })
})

// sign up switch
$('.login__register').on('click', function() {
    $('.login__right').remove()
    $(`
    <div class="login__right">
    <input class="login__login-input auth-input" placeholder="Login" type="text">
    <div class="login__error register-login-error"></div>
    <input class="login__email-input auth-input" placeholder="Email" type="text">
    <div class="login__error register-email-error"></div>
    <input class="login__password-input auth-input" placeholder="Password" type="password">
    <div class="login__error register-password-error"></div>
    <input id="register-btn" class="login__register auth-btn auth-btn_sign-up" value="Sign up" type="button">
    </div>
    `).insertAfter('.login__hr')

    // register
    $('#register-btn').on('click', () => {
        axios.post('http://127.0.0.1:8000/api/register', {
                login: $('.login__login-input').val(),
                email: $('.login__email-input').val(),
                password: $('.login__password-input').val()
            })
            .then(function(response) {
                location.reload()
            })
            .catch(function(error) {
                console.log(error.response)
                    // display validation errors
                Object.keys(error.response.data.error.errors).forEach((item) => {

                    if (item == 'login') {
                        if (error.response.data.error.errors.login == "The login field is required.") {
                            $('.login__login-input').addClass('auth-input_denied')
                            setTimeout(() => {
                                $('.login__login-input').removeClass('auth-input_denied')
                            }, 300)
                        }
                        if (error.response.data.error.errors.login == "The login has already been taken.") {
                            $('.register-login-error').text("Login already taken")
                            setTimeout(() => {
                                $('.register-login-error').text("")
                            }, 2000)
                        }
                        if (error.response.data.error.errors.login == "The login must be at least 3 characters.") {
                            $('.register-login-error').text("The login is too short")
                            setTimeout(() => {
                                $('.register-login-error').text("")
                            }, 2000)
                        }
                    }

                    if (item == 'email') {
                        if (error.response.data.error.errors.email == "The email field is required.") {
                            $('.login__email-input').addClass('auth-input_denied')
                            setTimeout(() => {
                                $('.login__email-input').removeClass('auth-input_denied')
                            }, 300)
                        }
                        if (error.response.data.error.errors.email == "The email must be a valid email address.") {
                            $('.register-email-error').text("No email was entered")
                            setTimeout(() => {
                                $('.register-email-error').text("")
                            }, 2000)
                        }
                        if (error.response.data.error.errors.email == "The email has already been taken.") {
                            $('.register-email-error').text("Email already taken")
                            setTimeout(() => {
                                $('.register-email-error').text("")
                            }, 2000)
                        }
                    }

                    if (item == 'password') {
                        if (error.response.data.error.errors.password == "The password field is required.") {
                            $('.login__password-input').addClass('auth-input_denied')
                            setTimeout(() => {
                                $('.login__password-input').removeClass('auth-input_denied')
                            }, 300)
                        }
                        if (error.response.data.error.errors.password == "The password must be at least 6 characters.") {
                            $('.register-password-error').text("The username is too short")
                            setTimeout(() => {
                                $('.register-password-error').text("")
                            }, 2000)
                        }
                    }
                })
            })
    })
})