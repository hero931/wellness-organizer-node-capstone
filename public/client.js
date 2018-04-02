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

            $.each(result.nutritions, function (nutritionsArrayKey, nutritionsArrayValue) {
                buildTheHtmlOutput += "<div class='box'>";
                buildTheHtmlOutput += "<p>" + nutritionsArrayValue.nutritionText + "</p>";
                buildTheHtmlOutput += "<input type='hidden' class='nutritionRecordsToEdit' value='" + nutritionsArrayValue._id + "'>";
                buildTheHtmlOutput += "<button type='text' class='buttonN_edit'>Edit</button>";
                buildTheHtmlOutput += "<button type='text' class='buttonN_delete'>Delete</button>";
                buildTheHtmlOutput += "</div>";
            });

            $("#nutritionRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

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

            $.each(result.workouts, function (workoutsArrayKey, workoutsArrayValue) {
                buildTheHtmlOutput += "<div class='box'>";
                buildTheHtmlOutput += "<p>" + workoutsArrayValue.workoutText + "</p>";
                buildTheHtmlOutput += "<input type='hidden' class='workoutRecordsToEdit' value='" + workoutsArrayValue._id + "'>";
                buildTheHtmlOutput += "<button type='text' class='buttonW_edit'>Edit</button>";
                buildTheHtmlOutput += "<button type='text' class='buttonW_delete'>Delete</button>";
                buildTheHtmlOutput += "</div>";
            });

            $("#workoutRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//add a new progress
$(document).on("click", ".buttonP_add", function (event) {
    event.preventDefault();
    let username = $('.progressUserName').val();
    let progressTextarea = $('#progress textarea').val();
    $.ajax({
        url: '/progress/create',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            progressTextarea: progressTextarea
        }),
        success: (result) => {
            console.log(result);
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

            $.each(result.progresses, function (progressesArrayKey, progressesArrayValue) {
                buildTheHtmlOutput += "<div class='box'>";
                buildTheHtmlOutput += "<p>" + progressesArrayValue.progressText + "</p>";
                buildTheHtmlOutput += "<input type='hidden' class='progressRecordsToEdit' value='" + progressesArrayValue._id + "'>";
                buildTheHtmlOutput += "<button type='text' class='buttonP_edit'>Edit</button>";
                buildTheHtmlOutput += "<button type='text' class='buttonP_delete'>Delete</button>";
                buildTheHtmlOutput += "</div>";
            });

            $("#progressRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

$(document).on("click", ".activate-login", function (event) {
    event.preventDefault();
    $('.hide-me').hide();
    $('.login-page').show();
    $('header nav').hide();
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

/*function deleteData(item, url) {
    return fetch('/nutrition' + '/' + nutritionId, {
            method: 'delete'
        })
        .then(response => response.json());
};*/

/*
//Delete a workout record
$('.buttonW_delete').on('click', function (event) {
    event.preventDefault();
    let workoutd = "";
    if (confirm('Are you sure you want to delete your workout record?') === true) {
        $.ajax({
            method: 'DELETE',
            url: '/workout/' + workoutId,
            //            success: deleteData
        });
    }
});

//Delete a progress record
$('.buttonP_delete').on('click', function (event) {
    event.preventDefault();
    let progressId = "";
    if (confirm('Are you sure you want to delete your progress record?') === true) {
        $.ajax({
            method: 'DELETE',
            url: '/workout/' + progressId,
            //            success: deleteData
        });
    }
});*/

//Update a nutrition record
$(document).on('click', '.buttonN_edit', function (event) {
    event.preventDefault();
    let username = $('.nutritionUserName').val();
    let nutritionTextarea = $('#nutrition textarea').val();
    $.ajax({
        url: '/nutrition/update',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            nutritionTextarea: nutritionTextarea
        }),
        success: (result) => {
            console.log(result);
            populateNutritionUpdates(username);
            $('.hide-me').hide();
            $('.records-page').show();
            $('header nav').show();
        },
        error: (jqXHR, exception) => {
            $('.alert').attr('area-hidden', 'false').removeClass('hidden');
        }
    })
});

//Populate a nutrition updated record
function populateNutritionUpdates(username) {
    $.ajax({
            type: 'GET',
            url: '/nutrition/get/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            var buildTheHtmlOutput = "";

            $.each(result.nutritions, function (nutritionsArrayKey, nutritionsArrayValue) {
                buildTheHtmlOutput += "<div class='box'>";
                buildTheHtmlOutput += "<p>" + nutritionsArrayValue.nutritionText + "</p>";
                buildTheHtmlOutput += "<input type='hidden' class='nutritionRecordsToEdit' value='" + nutritionsArrayValue._id + "'>";
                buildTheHtmlOutput += "<button type='text' class='buttonN_edit'>Edit</button>";
                buildTheHtmlOutput += "<button type='text' class='buttonN_delete'>Delete</button>";
                buildTheHtmlOutput += "</div>";
            });

            $("#nutritionRecords").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
