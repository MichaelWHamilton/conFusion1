//ASSignmnet 4 MODALS


$(function(){

    //login modal
    $("#login-btn").on('click', function(){
        console.log("clicked login");
        $('#loginModal').modal('show');
    });

    //reservation modal
    $("#reservation-btn").on('click', function(){
        console.log("clicked reservation");
        $('#reserveModal').modal('show');
    });
});