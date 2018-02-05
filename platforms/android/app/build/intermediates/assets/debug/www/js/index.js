// var URL = "http://192.168.1.122:8000/"; //doma
var URL = "http://192.168.1.2:8000/"; //sk
var storage = window.localStorage;

var loginInfo;
var user;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

function login() {

    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();

    if(email == "" || password == "")
    {
        alert("Полињата за емаил и лозинка се задолжителни!")
        return;
    }
    $.ajax({
        type : "POST",
        url : URL + "loginInfo/",
        data : JSON.stringify({
            email : email,
            password : password
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success : function(data) {
            loginInfo = data;
            getUser();
        },
        error: function (data) {
            alert("Податоците кои ги внесовте за најава не се валидни!");
        }
    });


}
function getUser() {

    if (loginInfo != [])
    {
        if(loginInfo.userType == "STUDENT")
        {
            $.ajax({
                type : "POST",
                url : URL + "student/",
                data : JSON.stringify({
                    id : loginInfo.id
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success : function(data) {
                    user = data;
                    storage.setItem("userID",user.id);
                    window.location.href = "views/student/main.html";
                },
                error: function (data) {
                    alert("Податоците кои ги внесовте за најава не се валидни!");
                }
            });
        }
        else
        {   $.ajax({
            type : "POST",
            url : URL + "professor/",
            data : JSON.stringify({
                id : loginInfo.id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success : function(data) {
                user = data;
                storage.setItem("userID",user.id);
                window.location.href = "views/professor/main.html";
            },
            error: function (data) {
                alert("Податоците кои ги внесовте за најава не се валидни!");
            }
        });
        }
    }
    else
    {
        alert("Податоците кои ги внесовте за најава не се валидни!");
    }

}

function logout() {

    if(confirm("Дали сте сигурни дека сакате да се одјавите?"))
    {
        storage.removeItem("userID");
        window.location.href = "../../index.html";
    }
}
app.initialize();