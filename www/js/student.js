// var URL = "http://192.168.1.122:8000/"; //doma
var URL = "http://192.168.1.2:8000/"; //sk
var storage = window.localStorage;
var userID;
var semesterType = "";
var subject = "";
var professor = "";
var date = "";
var time = "";

$(document).ready(function() {

    GetAllAppointments();
});

function GetAllAppointments() {

    userID = storage.getItem("userID");

    $.getJSON(URL + "appointment/student/" + userID, function (result) {
        $.each(result, function(i, field){
            $("#studentTable").append("<tr><td>"
                +   field.date +"</td><td>"
                +   field.time + "</td><td>"
                +   field.subject.description + "</td><td>"
                +   field.professor.firstName + " " + field.professor.lastName + "</td><td style='color:" + getColor(field.appointmentType) +"'>"
                +   getAppointmentType(field.appointmentType)+"</td></tr>");
        });
    });

}


function addNewAppointment() {
    window.location.href = "addNewAppointment.html";
}

function getColor(type) {
    if(type == "APPROVED")
    {
        return "green";
    }
    else if(type=="PENDING")
    {
        return "blue";
    }
    else if (type == "REJECTED")
    {
        return "red";
    }
}

function getAppointmentType(type) {

    if(type == "APPROVED")
    {
        return "Прифатено";
    }
    else if(type=="PENDING")
    {
        return "На чекање";
    }
    else if (type == "REJECTED")
    {
        return "Одбиено";
    }

}

function  saveNewAppointment() {


    if (semesterType == "" || subject == "" || professor == "" | time == "" | date == "")
    {
        alert("Сите полиња се задолжителни!");
        return;
    }

    $.ajax({
        type : "POST",
        url : URL + "appointment/save",
        data : JSON.stringify({
            student : {
                id : userID
            },
            subject : {
                id : subject
            },
            professor : {
                id : professor
            },
            date : date,
            time : time
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success : function(data) {
           alert("Успешно закажавте нов термин за консултации");
           clear();
        },
        error: function (data) {
            alert("Закажувањето нов термин беше неуспешно!");
            clear();
        }
    });
}

function clear() {

    $("#semesterTypeSelect").val("default");

    $("#subjectSelect").val([]);

    $("#professorSelect").val([]);

    $("#inputTime").val("");

    $("#date").val("");

    var semesterType = "";
    var subject = "";
    var professor = "";
    var date = "";
    var time = "";
}

$('#semesterTypeSelect').on('change', function() {

    semesterType = this.value;

    $.getJSON(URL + "subject/" + this.value, function (result) {
        $("#subjectSelect").append("<option disabled selected value style='display: none'> Изберете предмет </option>");
        $.each(result, function(i, field){
            $("#subjectSelect").append("<option value='"+ field.id +"'>" +field.description + "</option>"
            );
        });
    });

});


$('#subjectSelect').on('change', function() {

    subject = this.value;

    $.getJSON(URL + "professorSubject/" + this.value, function (result) {
        $("#professorSelect").append("<option disabled selected value style='display: none'> Изберете професор </option>");
        $.each(result, function(i, field){
            $("#professorSelect").append("<option value='"+ field.professor.id +"'>" +field.professor.firstName + " " + field.professor.lastName + "</option>");
        });
    });

});

$('#professorSelect').on('change', function() {

    professor = this.value;

});

$('#inputTime').on('change', function() {

    time = this.value;
});

$('#date').on('change', function() {

   date = this.value;

});