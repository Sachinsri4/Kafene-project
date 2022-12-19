// Ready Call Back Function using JQuery
$(document).ready(() => {
    
    // Check Login Status from Local Storage & Re-direct Webpage
    localStorage.getItem('login') && window.location.replace('./orders.html');
    
    // Login Form Submit - Callback function
        $('.submitBtn').click((e) => {
        e.preventDefault();
    
        // Store Form Value
        let userName = $("#userName").val();
        let password = $("#password").val();
    
        // Validate Credentials
        if(userName === password) {
            
                // Set Login Status & Re-direct Webpage
                localStorage.setItem('login', JSON.stringify(true));
                alert('login Successful');
                window.location.href = './orders.html';
        } else {
            alert('please enter valid credentials');
        }
    
    });
    
    });
    
    
    