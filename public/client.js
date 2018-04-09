/*STEP 1 define variables objects and functions*/

//Populate a progress text
function populateProgressRecords(username) {
    $.ajax({
            type: 'GET',
            url: '/progress/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            var buildTheHtmlOutput = "";

            //if there are records send them to the html
            if (result.progresses.length != 0) {

                $.each(result.progresses, function (progressesArrayKey, progressesArrayValue) {
                    buildTheHtmlOutput += "<div class='box'>";
                    buildTheHtmlOutput += "<p>" + progressesArrayValue.progressText + "</p>";
                    buildTheHtmlOutput += "<input type='hidden' class='progressRecordsToEdit' value='" + progressesArrayValue._id + "'>";
                    buildTheHtmlOutput += "<button type='text' class='buttonP_delete'>Delete</button>";
                    buildTheHtmlOutput += "</div>";
                });
            }
            // if the are no records show a friendly error
            else {
                buildTheHtmlOutput += "<div class='box'>No progresses found</div>";
            }


            $("#progressRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


//Populate a nutrition text
function populateNutritionRecords(username) {
    $.ajax({
            type: 'GET',
            url: '/nutrition/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            var buildTheHtmlOutput = "";

            //if there are records send them to the html
            if (result.nutritions.length != 0) {

                $.each(result.nutritions, function (nutritionsArrayKey, nutritionsArrayValue) {
                    buildTheHtmlOutput += "<div class='box'>";
                    buildTheHtmlOutput += "<p>" + nutritionsArrayValue.nutritionText + "</p>";
                    buildTheHtmlOutput += "<input type='hidden' class='nutritionRecordsToEdit' value='" + nutritionsArrayValue._id + "'>";
                    buildTheHtmlOutput += "<button type='text' class='buttonN_delete'>Delete</button>";
                    buildTheHtmlOutput += "</div>";
                });
            }
            // if the are no records show a friendly error
            else {
                buildTheHtmlOutput += "<div class='box'>No nutritions found</div>";
            }

            $("#nutritionRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


//Populate a workout text
function populateWorkoutRecords(username) {

    $.ajax({
            type: 'GET',
            url: '/workout/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            var buildTheHtmlOutput = "";

            //if there are records send them to the html
            if (result.workouts.length != 0) {
                $.each(result.workouts, function (workoutsArrayKey, workoutsArrayValue) {
                    buildTheHtmlOutput += "<div class='box'>";
                    buildTheHtmlOutput += "<p>" + workoutsArrayValue.workoutText + "</p>";
                    buildTheHtmlOutput += "<input type='hidden' class='workoutRecordsToEdit' value='" + workoutsArrayValue._id + "'>";
                    buildTheHtmlOutput += "<button type='text' class='buttonW_delete'>Delete</button>";
                    buildTheHtmlOutput += "</div>";
                });
            }
            // if the are no records show a friendly error
            else {
                buildTheHtmlOutput += "<div class='box'>No workouts found</div>";
            }

            $("#workoutRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

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
                $('.signup_success').show();
            }
        },
        error: () => {
            $('.signup_fail').show();
        }
    })

});

//Login

$(document).on("submit", "#login", function (event) {
    event.preventDefault();
    let username = $('input[id="loginUsername"]').val();
    let password = $('input[id="loginPassword"]').val();
    console.log(username, password);
    if ((!username) || (username.length < 1) || (username.indexOf(' ') > 0)) {
        alert('Invalid username');
        console.log('invalid username');
        //            alert('Invalid username');
    } else if ((!password) || (password.length < 1) || (password.indexOf(' ') > 0)) {
        alert('Invalid password');
        //            alert('Invalid password');
        console.log('invalid password');
    } else {
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
                $(".container nav ul li#dashboard").addClass("navSelected");
            },
            error: (jqXHR, exception) => {
                $('.wrong_login').show();
            }
        })
    }
});

// add a new nutrition
$(document).on("click", ".buttonN_add", function (event) {
    event.preventDefault();
    let username = $('.nutritionUserName').val();
    let nutritionTextarea = $('#nutrition textarea').val();
    console.log(username, nutritionTextarea);

    $.ajax({
        url: '/nutrition/create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            nutritionTextarea: nutritionTextarea
        }),
        success: (results) => {
            console.log(results);
            populateNutritionRecords(username);
            $('.hide-me').hide();
            $('.records-page').show();
            $('header nav').show();
        },
        error: (jqXHR, exception) => {
            $('.alert').attr('area-hidden', 'false').removeClass('hidden');
        }
    })
});


//add a new workout
$(document).on("click", ".buttonW_add", function (event) {
    event.preventDefault();
    let username = $('.workoutUserName').val();
    let workoutTextarea = $('#workout textarea').val();
    console.log(username, workoutTextarea);
    $.ajax({
        url: '/workout/create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            workoutTextarea: workoutTextarea
        }),
        success: (results) => {
            console.log(results);
            populateWorkoutRecords(username);
            $('.hide-me').hide();
            $('.records-page').show();
            $('header nav').show();
        },
        error: (jqXHR, exception) => {
            $('.alert').attr('area-hidden', 'false').removeClass('hidden');
        }
    })
});


// add a new progress
$(document).on("click", ".buttonP_add", function (event) {
    event.preventDefault();
    let username = $('.progressUserName').val();
    let progressTextarea = $('#progress textarea').val();
    console.log(username, progressTextarea);

    $.ajax({
        url: '/progress/create',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            progressTextarea: progressTextarea
        }),
        success: (results) => {
            console.log(results);
            populateProgressRecords(username);
            $('.hide-me').hide();
            $('.records-page').show();
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

$(document).on("click", "#dashboard", function (event) {
    event.preventDefault();


    //remove the selected class on all the nav items
    $(".container nav ul li").removeClass("navSelected");
    //add selected class only on the current item
    $(this).addClass("navSelected");


    $('.hide-me').hide();
    $('.dashboard-page').show();
    $('header nav').show();
});

$(document).on("click", "#champion", function (event) {
    event.preventDefault();


    //remove the selected class on all the nav items
    $(".container nav ul li").removeClass("navSelected");
    //add selected class only on the current item
    $(this).addClass("navSelected");

    $('.hide-me').hide();
    $('.champion-page').show();
    $('header nav').show();
});

$(document).on("click", "#home", function (event) {
    event.preventDefault();


    //remove the selected class on all the nav items
    $(".container nav ul li").removeClass("navSelected");
    //add selected class only on the current item
    $(this).addClass("navSelected");

    $('.hide-me').hide();
    $('.home-page').show();
    $('header nav').show();
});

$(document).on("click", "#rec", function (event) {
    event.preventDefault();

    //remove the selected class on all the nav items
    $(".container nav ul li").removeClass("navSelected");
    //add selected class only on the current item
    $(this).addClass("navSelected");

    //take the input from the user
    let username = $('.nutritionUserName').val();
    populateProgressRecords(username);
    populateWorkoutRecords(username);
    populateNutritionRecords(username);
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

//Delete a nutrition record
$(document).on('click', '.buttonN_delete', function (event) {
    event.preventDefault();
    let username = $('.nutritionUserName').val();
    let nutritionId = $('.nutritionRecordsToEdit').val();
    console.log(nutritionId);
    if (confirm('Are you sure you want to delete your nutrition record?') === true) {
        $.ajax({
                method: 'DELETE',
                url: '/nutrition/' + nutritionId
            })
            .done(function (result) {
                console.log(result);
                populateNutritionRecords(username);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    }
});

//Delete a workout record
$(document).on('click', '.buttonW_delete', function (event) {
    event.preventDefault();
    let username = $('.workoutUserName').val();
    let workoutId = $('.workoutRecordsToEdit').val();
    console.log(workoutId);
    if (confirm('Are you sure you want to delete your workout record?') === true) {
        $.ajax({
                method: 'DELETE',
                url: '/workout/' + workoutId
            })
            .done(function (result) {
                console.log(result);
                populateWorkoutRecords(username);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    }
});

//Delete a progress record
$(document).on('click', '.buttonP_delete', function (event) {
    event.preventDefault();
    let username = $('.progressUserName').val();
    let progressId = $('.progressRecordsToEdit').val();
    console.log(progressId);
    if (confirm('Are you sure you want to delete your progress record?') === true) {
        $.ajax({
                method: 'DELETE',
                url: '/progress/' + progressId
            })
            .done(function (result) {
                console.log(result);
                populateProgressRecords(username);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

    }
});
