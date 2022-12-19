// Logout Function Declaration
const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}

// Ready Call Back Function using JQuery
$(document).ready( () => {

// Fetch Order API data using GET method
$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders", (orderData) => {

// Login Function Declaration
const checkLogin = () => {
    if(!localStorage.getItem('login')) {
        window.location.href = "./index.html";
    }
}

// Class Object Declaration for Order Cards
class OrderCards {              

    // Class Object Constructor
    constructor(filterOrderData) {
        this.idnum = filterOrderData.id;
        this.customerName = filterOrderData.customerName;
        this.orderDate = filterOrderData.orderDate;
        this.amount = filterOrderData.amount;
        this.orderTime = filterOrderData.orderTime;
        this.orderStatus = filterOrderData.orderStatus;
    }
        
    // Class Method Declaration
    printOrderCards() {
        return (`<tr>
        <td class="light"> ${this.idnum} </td>
        <td> ${this.customerName} </td>
        <td>${this.orderDate}<p class="light lightP">${this.orderTime}</p>
        </td>
        <td class="light">$${this.amount}</td>
        <td>${this.orderStatus}</td>
    </tr> `)
    }
}
// Store API raw Data
let allContent = orderData;

//Declare Filter content to store filtered data based on checkbox functionality
let filteredContent = [];


// Filtercontent function
const filterContent = () => {

    // Store Checkbox Checked Status
    const newId = $('#new').prop('checked');
    const packedId = $('#packed').prop('checked');
    const intransitId = $('#intransit').prop('checked');
    const deliveredId = $('#delivered').prop('checked');
    filteredContent = [];

    // Store Filter Content Using Filter Function
    if(allContent.length > 0) {
        filteredContent = allContent.filter((OrderCards) => {
            if (newId && OrderCards.orderStatus === 'New') return true
            if (packedId && OrderCards.orderStatus === 'Packed') return true
            if (deliveredId && OrderCards.orderStatus === 'Delivered') return true
            if (intransitId && OrderCards.orderStatus === 'InTransit') return true
            return false
        })
    
    // Call Render UI function using filtered Content
        renderUI(filteredContent);
    }
}
// DOM (HTML Codes) Declaration
const renderUI = (args) => {

    // Empty Table body
    $('#cards').html(" ");

    // Update Count Value
    $('#count').html(args.length)

    // Declare Object &  variable to Store HTML codes as String
    let generateOrderCard = [];
    let htmlstr = " ";

    // Generate Order Card Objects & Store DOM (HTML codes) as String
    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateOrderCard [i] = new OrderCards(args[i]);
            htmlstr += generateOrderCard[i].printOrderCards();
        
        }
    // Update Table Body with DOM (HTML Codes) - Order Cards generated in UI
    $("#cards").html(htmlstr);
    }
}

// Check Login Function Executed
checkLogin();

// To Generate Order Cards When Page Loaded
filterContent();

// Generate Filtered Order Cards When Checkbox Value Changed
$('.checkBox').change(filterContent);


});

});