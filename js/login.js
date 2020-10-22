$("#phone-login").click(function() {
    $(this).addClass('active')
        .siblings()
        .removeClass('active')
    $(".mail-form").css("display", "none");
    $(".phone-form").css("display", "block");
})

$("#mail-login").click(function() {
    $(this).addClass('active')
        .siblings()
        .removeClass('active')
    $(".mail-form").css("display", "block");
    $(".phone-form").css("display", "none");
})