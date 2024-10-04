import {loadOrderTableHome} from "./IndexController.js";
var recordIndexOrders;
var priceTagInterval;

$(document).ready(function(){

    $('#nav-orders-section').on('click', () => {

        const home = $('.current-page-button');
        const orders = $('.Orders');
        const customers = $('.Customers');
        const items = $('.Items');

        /*Hide/show relevant sections*/
        $('#home-section').hide();
        $('#items-section').hide();
        $('#customers-section').hide();
        $('#orders-section').show();


        /*Define a function for styling buttons*/
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
        styleButton(customers);
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
        applyHoverEffect(customers);
        applyHoverEffect(items);

        /*this hover makes sure that home btn style stays same as the up hover btn other wise the up hover will override
        the css style in the orders page btn.This is because all the css is applied to one file (SPA)*/
        $(orders).hover(function (){
            $(this).css({
                background: '#B05200',
                color: '#FEE5D4'
            });
        });
    });

    var ValidItemID = $('#orders-content-card-left>#txtItemId-orders');
    var ValidItemName = $('#orders-content-card-left>#txtItemName-orders');
    var ValidUnitPrice = $('#orders-content-card-left>#txtUnitPrice-orders');
    var ValidQtyONHand = $('#orders-content-card-left>#txtQtyOnHand-orders');
    var ValidQty = $('#orders-content-card-left>#txtOrderQuantity');
    var ValidOrderID = $('#orders-content-card-right>#txtOrderId');
    var ValidCustomerID = $('#orders-content-card-right>#txtCustomerId-orders');
    var ValidCustomerName = $('#orders-content-card-right>#txtCustomerName-orders');
    var ValidPhoneNumber = $('#orders-content-card-right > #txtPhoneNumber-orders');
    var ValidOrderDate = $('#orders-content-card-right > #txtOrderDate');
    var isValidName = new RegExp("\\b[A-Z][a-z]*( [A-Z][a-z]*)*\\b");
    var isValidPriceAndQty = new RegExp("^[0-9]+\\.?[0-9]*$");
    var isValidPhoneNumber = new RegExp("^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$");

    $(ValidItemID).on("input", function () {
        $(ValidItemID).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidItemName).on("input", function () {
        $(ValidItemName).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidUnitPrice).on("input", function () {
        $(ValidUnitPrice).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidQtyONHand).on("input", function () {
        $(ValidQtyONHand).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidQty).on("input", function () {
        $(ValidQty).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidOrderID).on("input", function () {
        $(ValidOrderID).css({
            border: "2px solid #B05200"
        });
    });
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
    $(ValidPhoneNumber).on("input", function () {
        $(ValidPhoneNumber).css({
            border: "2px solid #B05200"
        });
    });
    $(ValidOrderDate).on("input", function () {
        $(ValidOrderDate).css({
            border: "2px solid #B05200"
        });
    });

    loadOrderTable();

    function ClearAll() {
        $('#txtItemId-orders').val("");
        $('#txtItemName-orders').val("");
        $('#txtUnitPrice-orders').val("");
        $('#txtQtyOnHand-orders').val("");
        $('#txtOrderQuantity').val("");
        $('#txtSearch-01').val("");

        $('#txtOrderId').val("");
        $('#txtCustomerId-orders').val("");
        $('#txtCustomerName-orders').val("");
        $('#txtPhoneNumber-orders').val("");
        $('#txtOrderDate').val("");
        $('#txtSearch-02').val("");
    }

    function ClearOne() {
        $('#txtItemId-orders').val("");
        $('#txtItemName-orders').val("");
        $('#txtUnitPrice-orders').val("");
        $('#txtQtyOnHand-orders').val("");
        $('#txtOrderQuantity').val("");
        $('#txtSearch-01').val("");
    }

    function ClearTwo() {
        $('#txtOrderId').val("");
        $('#txtCustomerId-orders').val("");
        $('#txtCustomerName-orders').val("");
        $('#txtPhoneNumber-orders').val("");
        $('#txtOrderDate').val("");
        $('#txtSearch-02').val("");
    }

    /*Search Customers*/
    function searchCustomers(query) {
        const customerID = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/customerController?customerID=' + customerID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                var customerDTO = response;
                console.log('Customer retrieved successfully:', customerDTO);

                $('#txtCustomerId-orders').val(customerDTO.customerID);
                $('#txtCustomerName-orders').val(customerDTO.customerName);
                $('#txtPhoneNumber-orders').val(customerDTO.customerPhoneNumber);
                $('#txtSearch-02').val("");
            },
            error: function(error) {
                console.error('Error searching customer:', error);
            }
        });
    }

    $('#search-customers-orders').on('click', function() {
        const searchQuery = $('#txtSearch-02').val();
        searchCustomers(searchQuery);
    });

    /*Search Items*/
    function searchItems(query) {
        const itemID = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/itemController?itemID=' + itemID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                var itemDTO = response;
                console.log('Item retrieved successfully:', itemDTO);

                $('#txtItemId-orders').val(itemDTO.itemID);
                $('#txtItemName-orders').val(itemDTO.itemName);
                $('#txtUnitPrice-orders').val(itemDTO.itemPrice);
                $('#txtQtyOnHand-orders').val(itemDTO.itemQty);
                $('#txtSearch-01').val("");
            },
            error: function(error) {
                console.error('Error searching item:', error);
            }
        });
    }

    $('#search-items-orders').on('click', function() {
        const searchQuery = $('#txtSearch-01').val();
        searchItems(searchQuery);
    });


    /**Add, Update, Delete, Clear All**/

    function emptyPlaceHolder() {
        $(ValidItemID).attr("placeholder", "");
        $(ValidItemName).attr("placeholder", "");
        $(ValidUnitPrice).attr("placeholder", "");
        $(ValidQtyONHand).attr("placeholder", "");
        $(ValidQty).attr("placeholder", "");
        $(ValidOrderID).attr("placeholder", "");
        $(ValidCustomerID).attr("placeholder", "");
        $(ValidCustomerName).attr("placeholder", "");
        $(ValidPhoneNumber).attr("placeholder", "");
        $(ValidOrderDate).attr("placeholder", "");
    }

    function defaultBorderColor() {
        $(ValidItemID).css({
            border: "2px solid #B05200"
        });
        $(ValidItemName).css({
            border: "2px solid #B05200"
        });
        $(ValidUnitPrice).css({
            border: "2px solid #B05200"
        });
        $(ValidQtyONHand).css({
            border: "2px solid #B05200"
        });
        $(ValidQty).css({
            border: "2px solid #B05200"
        });
        $(ValidOrderID).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerID).css({
            border: "2px solid #B05200"
        });
        $(ValidCustomerName).css({
            border: "2px solid #B05200"
        });
        $(ValidPhoneNumber).css({
            border: "2px solid #B05200"
        });
        $(ValidOrderDate).css({
            border: "2px solid #B05200"
        });
    }

    function validOrder() {
        var itemID = $('#txtItemId-orders').val();
        var itemName = $('#txtItemName-orders').val();
        var unitPrice = $('#txtUnitPrice-orders').val();
        var qtyOnHand = $('#txtQtyOnHand-orders').val();
        var orderQty = $('#txtOrderQuantity').val();

        var orderID = $('#txtOrderId').val();
        var customerID = $('#txtCustomerId-orders').val();
        var customerName = $('#txtCustomerName-orders').val();
        var phoneNumber = $('#txtPhoneNumber-orders').val();
        var orderDate = $('#txtOrderDate').val();

        if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
            || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
            || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {

            $(ValidItemID).css({
                border: "3px solid red"
            });
            $(ValidItemName).css({
                border: "3px solid red"
            });
            $(ValidUnitPrice).css({
                border: "3px solid red"
            });
            $(ValidQtyONHand).css({
                border: "3px solid red"
            });
            $(ValidQty).css({
                border: "3px solid red"
            });
            $(ValidOrderID).css({
                border: "3px solid red"
            });
            $(ValidCustomerID).css({
                border: "3px solid red"
            });
            $(ValidCustomerName).css({
                border: "3px solid red"
            });
            $(ValidPhoneNumber).css({
                border: "3px solid red"
            });
            $(ValidOrderDate).css({
                border: "3px solid red"
            });

            $(ValidItemID).attr("placeholder", "ID Empty");
            $(ValidItemName).attr("placeholder", "Wrong Input Try Again");
            $(ValidUnitPrice).attr("placeholder", "Wrong Input");
            $(ValidQtyONHand).attr("placeholder", "Wrong Input");
            $(ValidQty).attr("placeholder", "Wrong Input");
            $(ValidOrderID).attr("placeholder", "Wrong Input");
            $(ValidCustomerID).attr("placeholder", "Wrong Input");
            $(ValidCustomerName).attr("placeholder", "Wrong Input Try Again");
            $(ValidPhoneNumber).attr("placeholder", "Wrong Input");
            $(ValidOrderDate).attr("placeholder", "Wrong Input");

            $(ValidItemID).addClass('red');
            $(ValidItemName).addClass('red');
            $(ValidUnitPrice).addClass('red');
            $(ValidQtyONHand).addClass('red');
            $(ValidQty).addClass('red');
            $(ValidOrderID).addClass('red');
            $(ValidCustomerID).addClass('red');
            $(ValidCustomerName).addClass('red');
            $(ValidPhoneNumber).addClass('red');
            $(ValidOrderDate).addClass('red');
        }
    }

    function loadOrderTable() {
        $("#orders-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/orderController',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res); // Log the response to verify the data format

                if (Array.isArray(res)) { // Check if 'res' is an array
                    res.forEach(function(order) {
                        var orderRecord = `<tr>
                        <td class="o-id">${order.orderID}</td>
                        <td class="o-itemID">${order.itemID}</td>
                        <td class="o-itemName">${order.itemName}</td>
                        <td class="o-unit-price">${order.itemPrice}</td>
                        <td class="o-qty-on-hand">${order.itemQty}</td>
                        <td class="o-qty">${order.orderQty}</td>
                        <td class="o-order-date">${order.orderDate}</td>
                        <td class="o-customerID">${order.customerID}</td>
                        <td class="o-totalPrice">${order.totalPrice}</td>
                    </tr>`
                        $('#orders-table-tb').append(orderRecord);
                    });
                } else {
                    console.log('No Order data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading Order data:', res);
            }
        });
    }

    function totalTagUpdate() {
        priceTagInterval = setInterval(function(){
            $("#price-tag").text("Rs : "+"0"+"/=");
        }, 7000);
    }

    $('#orders-table-tb').on('click','tr',function () {
        recordIndexOrders = $(this).index();

        var oId = $(this).find(".o-id").text();
        var iId = $(this).find(".o-itemID").text();
        var itemName = $(this).find(".o-itemName").text();
        var unitPrice = $(this).find(".o-unit-price").text();
        var qtyOnHand = $(this).find(".o-qty-on-hand").text();
        var orderQty = $(this).find(".o-qty").text();
        var orderDate = $(this).find(".o-order-date").text();
        var cId = $(this).find(".o-customerID").text();
        var total = $(this).find(".o-totalPrice").text();

        $('#txtItemId-orders').val(iId);
        $('#txtItemName-orders').val(itemName);
        $('#txtUnitPrice-orders').val(unitPrice);
        $('#txtOrderQuantity').val(orderQty);

        $('#txtOrderId').val(oId);
        $('#txtCustomerId-orders').val(cId);
        $('#price-tag').text("Rs : "+total+"/=");

        searchCustomers(cId);
        searchItems(iId);

        $('#txtOrderDate').val(orderDate);

        clearInterval(priceTagInterval);
    });

    $('#place-order').on('click', function () {
        var itemID = $('#txtItemId-orders').val();
        var itemName = $('#txtItemName-orders').val();
        var unitPrice = $('#txtUnitPrice-orders').val();
        var qtyOnHand = $('#txtQtyOnHand-orders').val();
        var orderQty = $('#txtOrderQuantity').val();

        var orderID = $('#txtOrderId').val();
        var customerID = $('#txtCustomerId-orders').val();
        var customerName = $('#txtCustomerName-orders').val();
        var phoneNumber = $('#txtPhoneNumber-orders').val();
        var orderDate = $('#txtOrderDate').val();

        var totalPrice = unitPrice * orderQty;

        if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
            || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
            || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
            validOrder();
            return false;
        }

        const orderData = {
            orderID: orderID,
            orderDate: orderDate,
            customerID: customerID,
            itemID: itemID,
            itemName:itemName,
            itemPrice:unitPrice,
            itemQty:qtyOnHand,
            orderQty:orderQty,
            totalPrice:totalPrice,
        }

        const orderJSON = JSON.stringify(orderData);
        console.log(orderJSON);

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/orderController',
            type: 'POST',
            data: orderJSON,
            headers: {'Content-Type': 'application/json'},
            success: (res) => {
                console.log(JSON.stringify(res));
                loadOrderTable();
            },
            error: (res) => {
                console.error(res);
                console.log("Order did not Saved");
            }
        });

        /*Update the price tag and tables*/
        $('#price-tag').text("Rs : "+totalPrice+"/=");

        emptyPlaceHolder();
        defaultBorderColor();
        totalTagUpdate();
        loadOrderTableHome();
        ClearAll();
    });

    $('#btnDelete').on('click', function () {
        var itemID = $('#txtItemId-orders').val();
        var itemName = $('#txtItemName-orders').val();
        var unitPrice = $('#txtUnitPrice-orders').val();
        var qtyOnHand = $('#txtQtyOnHand-orders').val();
        var orderQty = $('#txtOrderQuantity').val();

        var orderID = $('#txtOrderId').val();
        var customerID = $('#txtCustomerId-orders').val();
        var customerName = $('#txtCustomerName-orders').val();
        var phoneNumber = $('#txtPhoneNumber-orders').val();
        var orderDate = $('#txtOrderDate').val();


        if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
            || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
            || !isValidPriceAndQty.test(orderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
            validOrder();
            return false;
        }

        console.log("Order ID: " + orderID, "Item ID: " + itemID, "Order Qty: " + orderQty);
        $.ajax({
            url: 'http://localhost:8081/PTOBackend/orderController?orderID=' + orderID + '&itemID=' + itemID + '&orderQty=' + orderQty,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                loadOrderTable();
            },
            error: (res) => {
                console.error(res);
                console.log("Order Not Deleted");
            }
        });
        totalTagUpdate();
        ClearAll();
    });

    $('#btnUpdate').on('click',function () {
        var itemID = $('#txtItemId-orders').val();
        var itemName = $('#txtItemName-orders').val();
        var unitPrice = $('#txtUnitPrice-orders').val();
        var newOrderQty = parseInt($('#txtOrderQuantity').val());
        var qtyOnHand = parseInt($('#txtQtyOnHand-orders').val());

        var orderID = $('#txtOrderId').val();
        var customerID = $('#txtCustomerId-orders').val();
        var customerName = $('#txtCustomerName-orders').val();
        var phoneNumber = $('#txtPhoneNumber-orders').val();
        var orderDate = $('#txtOrderDate').val();

        var totalPrice = unitPrice * newOrderQty;

        if (itemID === "" || orderID === "" || customerID === "" || orderDate === "" || !isValidName.test(itemName)
            || !isValidPriceAndQty.test(unitPrice) || !isValidPriceAndQty.test(qtyOnHand)
            || !isValidPriceAndQty.test(newOrderQty) || !isValidName.test(customerName) || !isValidPhoneNumber.test(phoneNumber)) {
            validOrder();
            return false;
        }

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/orderController?orderID=' + orderID,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                var oldOrderQty = parseInt(response.orderQty);
                console.log('Old Order Qty retrieved successfully:',oldOrderQty);

                // Correct qtyOnHand calculation
                if (oldOrderQty > newOrderQty) {
                    // Restoring more stock as the order quantity is decreased
                    qtyOnHand += (oldOrderQty - newOrderQty);
                } else if (oldOrderQty < newOrderQty) {
                    // Reducing stock as the order quantity is increased
                    qtyOnHand -= (newOrderQty - oldOrderQty);
                }

                console.log(qtyOnHand);

                const orderData = {
                    orderID: orderID,
                    orderDate: orderDate,
                    customerID: customerID,
                    itemID: itemID,
                    itemName:itemName,
                    itemPrice:unitPrice,
                    itemQty:qtyOnHand,
                    orderQty:newOrderQty,
                    totalPrice:totalPrice,
                }

                const orderJSON = JSON.stringify(orderData);
                console.log(orderJSON);

                $.ajax({
                    url: 'http://localhost:8081/PTOBackend/orderController?orderID=' + orderID + '&itemID=' + itemID + '&qtyOnHand=' + qtyOnHand,
                    type: 'PATCH',
                    data: orderJSON,
                    headers: {'Content-Type': 'application/json'},
                    success: (res) => {
                        console.log(JSON.stringify(res));
                        console.log("Order updated");
                        loadOrderTable();
                        loadOrderTableHome();
                    },
                    error: (res) => {
                        console.error(res);
                        console.log("Order not updated");
                    }
                });
            },
            error: function(error) {
                console.error('Error searching customer:', error);
            }
        });

        totalTagUpdate();
        loadOrderTable();
        ClearAll();
    });

    function searchOrders(query) {
        const orderID = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/PTOBackend/orderController?orderID=' + orderID,
            type: 'GET',
            dataType: 'json',
            success: (res)=> {
                console.log(res); // Log the response to verify the data format
                var order = res;
                console.log('Order:', res);

                $('#txtOrderId').val(order.orderID);
                $('#txtItemId-orders').val(order.itemID);
                $('#txtItemName-orders').val(order.itemName);
                $('#txtUnitPrice-orders').val(order.itemPrice);
                $('#txtQtyOnHand-orders').val(order.itemQty);
                $('#txtOrderQuantity').val(order.orderQty);
                $('#txtOrderDate').val(order.orderDate);
                $('#txtCustomerId-orders').val(order.customerID);
                $('#price-tag').text("Rs : "+order.totalPrice+"/=");
                searchCustomers(order.customerID);
            },
            error: function(res) {
                console.error('Error loading Order data:', res);
            }
        });
    }

    $('#searchOrders').on('click', function() {
        const searchQuery = $('#txtSearch-03').val();
        searchOrders(searchQuery);
    });

    $('#btnClearAll').on('click',function () {
        ClearAll();
        $('#price-tag').text("Rs : "+"0"+"/=");
    });

    $('#btnClear-1').on('click',function () {
        ClearOne();
    });

    $('#btnClear-2').on('click',function () {
        ClearTwo();
    });

});
