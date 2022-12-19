// Logout Function Declaration
const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}

// Ready Call Back Function using JQuery
$(document).ready( () => {


// Fetch Product API data using GET method
$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", (userData) => {

// Login Function Declaration
const checkLogin = () => {
    if(!localStorage.getItem('login')) {
        window.location.href = "./index.html";
    }
}

// Class Object Declaration for User Cards
class userCards {

    constructor(filteruserData) {
        this.idnum = filteruserData.id;
        this.profilePic = filteruserData.profilePic;
        this.fullName = filteruserData.fullName;
        this.dob = filteruserData.dob;
        this.gender = filteruserData.gender;
        this.currentCity = filteruserData.currentCity;
        this.currentCountry = filteruserData.currentCountry;
    }
    printuserCards() {
        return (`<tr>
        <td class="light"> ${this.idnum} </td>
        <td> <img src="${this.profilePic}" alt=""> </td>
        <td class="light"> ${this.fullName} </td>
        <td> ${this.dob} </td>
        <td class="light">${this.gender}</td>
        <td class="light">${this.currentCity}, ${this.currentCountry}</td>
    </tr>`);
    }
}

let allContent = userData;

// Search Functionality
$('#search-form').submit((e) => {
    e.preventDefault();

    // Store Search Value
    let inputVal = $('#search-box').val();
    
    // When Search Box Submitted with Empty Value
    if (!inputVal.trim()) {
        renderUI(allContent);
        return;
    }

    // Render User Cards Names Matched with Search Value (> 2 Char)
    if (inputVal.length > 1) {
        $('#search-box').val('');
        const filterurl = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=' + inputVal;
        
        // Render User Cards Based on Search Function
        $.get(filterurl, (filterData) =>{

            renderUI(filterData);
        
        });
        // searchContent(filterurl);
    } else {
        alert('please enter at least 2 character');
    }
});

// DOM (to Generate HTML Codes) Declaration
const renderUI = (args) => {
    $('#cards').html(" ");
    $('#count').html(args.length)
    let generateuserCard = [];
    let htmlstr = " ";

    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateuserCard [i] = new userCards(args[i]);
            htmlstr += generateuserCard[i].printuserCards();
        
        }
    $("#cards").html(htmlstr);
    }
}

// Check Login Function Executed
checkLogin();

// To Generate User Cards When Page Loaded
renderUI(userData);

// Reset Button Functionality
$(".reset-btn").click(() => renderUI(userData));

});

});