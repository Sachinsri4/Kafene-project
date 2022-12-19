// Logout Function 
const logout = () => {
    localStorage.clear();
    window.location.href = './index.html';
}

// Ready Call Back Function using JQuery
$(document).ready(() => {

// Fetch Product API data using GET method
$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products/", (productData) => {


// Login Function 
const checkLogin = () => {
    if(!localStorage.getItem('login')) {
        window.location.href = "./index.html";
    }
}

// Class Object 
class ProductCards {

    constructor(filterProductData) {
        this.idnum = filterProductData.id;
        this.productName = filterProductData.medicineName;
        this.productBrand = filterProductData.medicineBrand;
        this.expiryDate = filterProductData.expiryDate;
        this.unitPrice = filterProductData.unitPrice;
        this.stock = filterProductData.stock;
    }
    printProductCards() {
        return (`<tr>
        <td class="light"> ${this.idnum} </td>
        <td> ${this.productName} </td>
        <td class="light"> ${this.productBrand} </td>
        <td> ${this.expiryDate} </td>
        <td class="light">$${this.unitPrice}</td>
        <td class="light">${this.stock}</td>
    </tr>`)
    }
}

let allContent = productData;
let filteredContent = [];


const filterContent = () => {
    const expired = $('#expired').prop('checked');
    const lowStock = $('#low-stock').prop('checked');

    filteredContent = [];

    // Store Filter Content Using Filter Function
    if(allContent.length > 0) {
        filteredContent = allContent.filter((ProductCards) => {
            if(expired) return (new Date() > new Date(ProductCards.expiryDate));
            return true;
        });
        filteredContent = filteredContent.filter((ProductCards) => {
            if(lowStock) return (ProductCards.stock < 100);
            return true;
        });

        renderUI(filteredContent);
    }
}

// DOM (to Generate HTML Codes) Declaration
const renderUI = (args) => {
    $('#cards').html(" ");
    $('#count').html(args.length)
    let generateProductCard = [];
    let htmlstr = " ";

    if(args.length > 0) {
        for (let i = 0; i < args.length; i++) {
    
            generateProductCard [i] = new ProductCards(args[i]);
            htmlstr += generateProductCard[i].printProductCards();
        
        }
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