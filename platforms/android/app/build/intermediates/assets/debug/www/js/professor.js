/**
 * Created by user on 31.1.2018.
 */
// var URL = "http://192.168.1.122:8000/"; //doma
var URL = "http://192.168.1.2:8000/"; //sk
$(document).ready(function() {

    GetPendingAppointments();
});

function GetPendingAppointments() {

    userID = storage.getItem("userID");

    $("#professorTable").empty();

    $("#professorTable").append("<tr><th>"
        + "Датум</th><th>Време</th><th>Предмeт</th><th>Студент</th><th></th></tr>");

    $.getJSON(URL + "appointment/professor/" + userID, function (result) {
        $.each(result, function(i, field){
            $("#professorTable").append("<tr><td>"
                +   field.date +"</td><td>"
                +   field.time + "</td><td>"
                +   field.subject.description + "</td><td>"
                +   field.student.firstName + " " + field.student.lastName
                + "</td><td><button class='btn btn-success btn-sm btnProfessor' onclick='approveAppointment("+field.id+")'>Прифати</button><button class='btn btn-sm btnDelete btnProfessor' onclick='rejectAppointment("+field.id+")'><i class='fa fa-trash-o'></i></button></td></tr>");
        });

        GetApprovedAppointments();
    });



}
function GetApprovedAppointments()
{
    $.getJSON(URL + "appointment/professor/approvedAppointments/" + userID, function (result) {
        $.each(result, function(i, field){
            $("#professorTable").append("<tr><td>"
                +   field.date +"</td><td>"
                +   field.time + "</td><td>"
                +   field.subject.description + "</td><td>"
                +   field.student.firstName + " " + field.student.lastName
                + "</td><td style='color: #5cb85c'>Прифатено</td></tr>");
        });
    });
}
function approveAppointment(id) {
    alert("Терминот беше успешно прифатен.");
    $.getJSON(URL + "appointment/changeStatus/" + id  + "/" + "APPROVED", function (result) {
        GetPendingAppointments();
        });
}

function rejectAppointment(id) {
    alert("Терминот беше успешно одбиен");
    $.getJSON(URL + "appointment/changeStatus/" + id  + "/" + "REJECTED", function (result) {
        GetPendingAppointments();
    });
}