/*STEP 1 define variables objects and functions*/




/*STEP 2 use variables objects and functions (triggers)*/
$(document).ready(function () {
    $('.hide-me').hide();
    $('header nav').hide();
    $('.home-page').show();
});


//Sign up
$(document).on("submit", "#signup_form", function (event) {
    event.preventDefault();
    let firstName = $('input[id="firstName"]').val();
    let username = $('input[id="username"]').val();
    let password = $('input[id="password"]').val();
    $('#signup_fail').remove();
    $.ajax({
        url: '/users/create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            firstName: firstName,
            userName: username,
            password: password
        }),
        success: (data) => {
            console.log(data);
            if (data) {
                $('#signup_section').prepend(
                    `<div class='signup_success'><span style='vertical-align: middle;'>Good job! You have successfully signed up! Now you can login!<span></div>`
                );
                //                $('.hide-me').hide();
                //                $('.dashboard-page').show();
                //                $('header nav').show();
            }
        },
        error: () => {
            $('#signup_section').prepend(
                `<div class='signup_fail'><span>Please check again! This email has already been used for signup. </span></div>`
            );
        }
    })

});

//Login

$(document).on("submit", "#login", function (event) {
    event.preventDefault();
    let username = $('input[id="username"]').val();
    let password = $('input[id="password"]').val();
    console.log(username, password);
    $.ajax({
        url: '/users/signin',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: (results) => {
            console.log(results);
            console.log(results.firstName);
            $(".logout-user").text(results.firstName)
            $(".nutritionUserName").val(results.userName);
            $(".workoutUserName").val(results.userName);
            $(".progressUserName").val(results.userName);
            $('.hide-me').hide();
            $('.dashboard-page').show();
            $('header nav').show();
        },
        error: (jqXHR, exception) => {
            $('.alert').attr('area-hidden', 'false').removeClass('hidden');
        }
    })


});

$(document).on("click", ".activate-login", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.login-page').show();
    $('header nav').hide();
});

$(document).on("click", ".buttonN_add", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonN_read", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonN_update", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonN_delete", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonP_add", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonP_read", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonP_update", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonP_delete", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonW_add", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonW_read", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonW_update", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", ".buttonW_delete", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", "#dashboard", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.dashboard-page').show();
    $('header nav').show();
});

$(document).on("click", "#champion", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.champion-page').show();
    $('header nav').show();
});

$(document).on("click", "#home", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.home-page').show();
    $('header nav').show();
});

$(document).on("click", "#rec", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.records-page').show();
    $('header nav').show();
});

$(document).on("click", "#logout", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.home-page').show();
    $('header nav').hide();
});









//
//$('#login_form').submit(function (event) {
//
//
//})
//
////Function and object definitions
//
//function SignInPage() {
//    $('.hide-me').hide();
//    $('.dashboard-page').show();
//    $('header nav').show();
//}
//
//
//$('#signup_section').click(function (event) {
//    event.preventDefault();
//    SignInPage();
//});
//
////User signs up for a new account
//
//
//
////User with account signs in
//
//$('#login_submit').on('click', function (event) {
//    event.preventDefault();
//    SignInPage();
//    const inputUname = $('input[name="signin-uname"]').val();
//    const inputPw = $('input[name="signin-pw"]').val();
//    if ((!inputUname) || (inputPw.length < 1) || (inputUname.indexOf(' ') > 0)) {
//        alert('Invalid username');
//    } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
//        alert('Invalid password');
//    } else {
//        const unamePwObject = {
//            username: inputUname,
//            password: inputPw
//        };
//        user = inputUname;
//        $.ajax({
//                type: "POST",
//                //url?
//                url: "https:///signin",
//                dataType: 'json',
//                data: JSON.stringify(unamePwObject),
//                contentType: 'application/json'
//            })
//
//            .done(function (result) {
//                //signed in user will be able to see logout button
//                SignInPage();
//            })
//
//            .fail(function (jqXHR, error, errorThrown) {
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//                alert('Invalid username or password. Pleae check your username and password and try again.');
//            });
//    };
//
//});
//
////When user clicks Add button
//
//$('.buttonN_add').on('click', function (event) {
//    event.preventDefault();
//    const nut = $('textarea').val();
//    if ((nut.length < 1) || (nut.indexOf(' '))) {
//        alert('Nothing has been added');
//    } else {
//        const nutObject = {
//            userText: nut
//        };
//        user = nut;
//        $.ajax({
//                type: "POST",
//                url: "https:///add",
//                dataType: 'json',
//                data: JSON.stringify(nutObject),
//                contentType: 'application/json'
//            })
//            .done()
//            .fail()
//
//    }
//});
