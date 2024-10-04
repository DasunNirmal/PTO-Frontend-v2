export {totalCustomers}
import {totalCustomersHome} from "./IndexController.js";
var recordIndexCustomers;

function totalCustomers(count) {
    $('#count').text(count);
    return count;
}

$(document).ready(function(){

    $('#nav-customers-section').on('click',() => {

        const home = $('.current-page-button');
        const orders = $('.Orders');
        const customers = $('.Customers');
        const items = $('.Items');

        // Hide/show relevant sections
        $('#home-section').hide();
        $('#orders-section').hide();
        $('#items-section').hide();
        $('#customers-section').show();


        // Define a function for styling buttons
        function styleButton(button) {
            button.css({
                background: 'none',
                color: '#B05200',
                padding: '18px 28px',
                border: '30px',
                text: 'none',
                font: '700',
                cursor: 'pointer'
            });
        }

        /*Applying styles to buttons*/
        styleButton(home);
        styleButton(orders);
        styleButton(items);

        /*Define a function for hover effect*/
        function applyHoverEffect(button) {
            button.hover(function () {
                $(this).css({
                    background: '#B05200',
                    color: '#FEE5D4'
                });
            }, function () {
                $(this).css({
                    background: 'none',
                    color: '#B05200',
                    padding: '18px 28px',
                    border: '30px',
                    text: 'none',
                    font: '700'
                });
            });
        }

        /*Applying hover effect to buttons*/
        applyHoverEffect(home);
        applyHoverEffect(orders);
        applyHoverEffect(items);

        /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
        the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
        $(customers).hover(function (){
            $(this).css({
                background: '#B05200',
                color: '#FEE5D4'
            });
        });
    });

    var ValidCustomerID = $('#customers-content-card-left>#txtCustomerID');
    var ValidCustomerName = $('#customers-content-card-left>#txtName');
    var ValidCustomerAddress = $('#customers-content-card-left>#txtAddress');
    var ValidCustomerPhoneNumber = $('#customers-content-card-left>#txtPhoneNumber');
    var isValidCustomerName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    var isValidCustomerAddress = new RegExp("^[A-Za-z0-9'\\/\\.,\\s]{5,}$");
    var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");


    $(ValidCustomerID).on("input", function () {
        $(ValidCustomerID).css({
            border: "2px solid #B05200"
        });
    });

    $(ValidCustomerName).on("input", function () {
        $(ValidCustomerName).css({
            border: "2px solid #B05200"
        });
    });

    $(ValidCustomerAddress).on("input", function () {
        $(ValidCustomerAddress).css({
            border: "2px solid #B05200"
        });
    });

    $(ValidCustomerPhoneNumber).on("input", function () {
        $(ValidCustomerPhoneNumber).css({
            border: "2px solid #B05200"
        });
    });

    /**Add, Update, Delete, Clear All**/

    loadCustomerTable();

    function clearAll() {
        $('#txtCustomerID').val("");
        $('#txtName').val("");
        $('#txtAddress').val("");
        $('#txtPhoneNumber').val("");
    }

    function emptyPlaceHolder() {
        $(ValidCustomerID).attr("placeholder", "");
        $(ValidCustomerName).attr("placeholder", "");
        $(ValidCustomerAddress).attr("placeholder", "");
        $(ValidCustomerPhoneNumber).attr("placeholder", "");
    }

    function defaultBorderColor() {
        $(ValidCustomerID).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerName).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerAddress).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerPhoneNumber).css({
            border: "2px solid #B05200"
        });
    }

    function validCustomer() {
        var customerID = $('#txtCustomerID').val();
        var customerName = $('#txtName').val();
        var customerAddress = $('#txtAddress').val();
        var phoneNumber = $('#txtPhoneNumber').val();

        if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {

            $(ValidCustomerID).css({
                border: "3px solid red"
            });
            $(ValidCustomerName).css({
                border: "3px solid red"
            });
            $(ValidCustomerAddress).css({
                border: "3px solid red"
            });
            $(ValidCustomerPhoneNumber).css({
                border: "3px solid red"
            });

            $(ValidCustomerID).attr("placeholder", "ID Empty");
            $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
            $(ValidCustomerAddress).attr("placeholder", "Wrong Input Try Again");
            $(ValidCustomerPhoneNumber).attr("placeholder", "Wrong Input Try Again");

            $(ValidCustomerID).addClass('red');
            $(ValidCustomerName).addClass('red');
            $(ValidCustomerAddress).addClass('red');
            $(ValidCustomerPhoneNumber).addClass('red');

        }  else {
            defaultBorderColor();
            emptyPlaceHolder();
        }
    }

    $('#btnClearAll-customer').on('click',() => {
        clearAll();
    });

    function loadCustomerTable() {
        $("#customers-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res); // Log the response to verify the data format

                if (Array.isArray(res)) { // Check if 'res' is an array
                    res.forEach(function(customer) {
                        var customerRecord = `
                        <tr>
                            <td class="c-id">${customer.customerID}</td>
                            <td class="c-name">${customer.customerName}</td>
                            <td class="c-address">${customer.customerAddress}</td>
                            <td class="c-phoneNumber">${customer.customerPhoneNumber}</td>
                        </tr>`;
                        $('#customers-table-tb').append(customerRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                    totalCustomers(count);
                    totalCustomersHome(count);
                } else {
                    console.log('No customer data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading customer data:', res);
            }
        });
    }

    $('#customers-table-tb').on('click','tr',function () {
        recordIndexCustomers = $(this).index();

        var id = $(this).find(".c-id").text();
        var name = $(this).find(".c-name").text();
        var address = $(this).find(".c-address").text();
        var phoneNumber = $(this).find(".c-phoneNumber").text();

        $('#txtCustomerID').val(id);
        $('#txtName').val(name);
        $('#txtAddress').val(address);
        $('#txtPhoneNumber').val(phoneNumber);
    });

    $('#addCustomers').on('click', () => {

        var customerID = $('#txtCustomerID').val();
        var customerName = $('#txtName').val();
        var customerAddress = $('#txtAddress').val();
        var phoneNumber = $('#txtPhoneNumber').val();

        if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
            validCustomer();
            return;
        }

        const customerData = {
            customerID: customerID,
            customerName: customerName,
            customerAddress:customerAddress,
            customerPhoneNumber:phoneNumber
        }

        const customerJSON = JSON.stringify(customerData);
        console.log(customerJSON);

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController',
            type: 'POST',
            data: customerJSON,
            headers: {'Content-Type': 'application/json'},
            success: (res) => {
                console.log(JSON.stringify(res));
                loadCustomerTable();
            },
            error: (res) => {
                console.error(res);
            }
        });

        defaultBorderColor();
        emptyPlaceHolder();
        clearAll();
        /*totalCustomers();*/
    });

    $('#btnDelete-customer').on('click',() => {

        var customerID = $('#txtCustomerID').val();
        var customerName = $('#txtName').val();
        var customerAddress = $('#txtAddress').val();
        var phoneNumber = $('#txtPhoneNumber').val();

        if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
            validCustomer();
            return;
        }

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController?customerID=' + customerID,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                loadCustomerTable();
                console.log("Customer Deleted");
            },
            error: (res) => {
                console.error(res);
                console.log("Customer Not Deleted");
            }
        });

        defaultBorderColor();
        emptyPlaceHolder();
        clearAll();
        /*totalCustomers();*/
    });

    $('#btnUpdate-customer').on('click',() => {

        var customerID = $('#txtCustomerID').val();
        var customerName = $('#txtName').val();
        var customerAddress = $('#txtAddress').val();
        var phoneNumber = $('#txtPhoneNumber').val();

        if (customerID === "" || !isValidCustomerName.test(customerName) || !isValidCustomerAddress.test(customerAddress) || !isValidPhoneNumber.test(phoneNumber)) {
            validCustomer();
            return;
        }

        const customerData = {
            customerID: customerID,
            customerName: customerName,
            customerAddress:customerAddress,
            customerPhoneNumber:phoneNumber
        }

        const customerJSON = JSON.stringify(customerData);
        console.log(customerJSON);

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController?customerID=' + customerID,
            type: 'PATCH',
            data: customerJSON,
            headers: {'Content-Type': 'application/json'},
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Customer updated");
                loadCustomerTable();
            },
            error: (res) => {
                console.error(res);
                console.log("Customer not updated");
            }
        });

        defaultBorderColor();
        emptyPlaceHolder();
        loadCustomerTable();
        clearAll();
        /*totalCustomers();*/
    });

    function searchCustomersByID(query) {
        const customerID = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController?customerID=' + customerID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                var customerDTO = response;
                console.log('Customer retrieved successfully:', customerDTO);

                $('#txtCustomerID').val(customerDTO.customerID);
                $('#txtName').val(customerDTO.customerName);
                $('#txtAddress').val(customerDTO.customerAddress);
                $('#txtPhoneNumber').val(customerDTO.customerPhoneNumber);
            },
            error: function(error) {
                console.error('Error searching customer:', error);
                loadCustomerTable();
            }
        });
    }

    function searchCustomersByPhoneNumber(searchQuery) {
        const customerPhoneNumber = searchQuery.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController?customerPhoneNumber=' + customerPhoneNumber,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                var customerDTO = response;
                console.log('Customer retrieved successfully:', customerDTO);

                $('#txtCustomerID').val(customerDTO.customerID);
                $('#txtName').val(customerDTO.customerName);
                $('#txtAddress').val(customerDTO.customerAddress);
                $('#txtPhoneNumber').val(customerDTO.customerPhoneNumber);
            },
            error: function(error) {
                console.error('Error searching customer:', error);
                loadCustomerTable();
            }
        });
    }

    $('#search-customer').on('click', function() {
        const searchQuery = $('#txtSearch-customers').val();
        if (isValidPhoneNumber.test(searchQuery)) {
            searchCustomersByPhoneNumber(searchQuery);
        } else {
            searchCustomersByID(searchQuery);
        }
    });
});

