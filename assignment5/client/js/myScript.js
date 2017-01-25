


var cart = [];
var products = [];
var inactiveTime = 300;
var stock = 5
var filterMin= 0;
var filterMax= 100000000;
var PRODUCT_URL = "http://localhost:5000/products";
var CHECKOUT_URL = "http://localhost:5000/orders";
var INACTIVE_TIME_MS = 300;
var SERVER_TIMEOUT = 3000;
var MAX_REQUESTS = 20
var requestLimit = 0;

//async request. This is so we don't stall
var RequestHandler = function(url, callback, request, toSend){
    
    if (request != "GET" && request != "POST"){
        return;
    }
    
	var RequestResult;
	 var FetchProducts = function(){
        var URL = url;
        var req = request;
        var cb = callback;
        var data = toSend;
		var xhr = new XMLHttpRequest();
        
        if (req == "GET"){
            xhr.open(request, URL);
        }
		else {
            xhr.open(request, URL, true);
        }
        console.log(URL);
		xhr.onload=function(){
			if(xhr.status==200){
                
                if (req == "GET"){
                    RequestResult = xhr.responseText;
                    getProducts(RequestResult);
                    
                }			
                console.log("Request success");
                requestLimit = 0;
				if (typeof cb === "function"){
                    cb();
                }
			}
			if(xhr.status==500){
				console.log("Server error. Will request again");
                requestLimit++;
                if (requestLimit < MAX_REQUESTS){
                    RequestHandler(URL, cb, req, data);
                }
				else {
                    console.log("Request limit reached. Aborting.");
                    return;
                }
			}
		}
		xhr.ontimeout = function(){
			console.log("Request timed out. Will request again");
            requestLimit++;
            if (requestLimit < MAX_REQUESTS){
                RequestHandler(URL, cb, req, data);
            }
			else {
                console.log("Request limit reached. Aborting.");
                return;
            }
		}
		xhr.onerror = function(){
			console.log("Server error. Will request again");
            requestLimit++;
            if (requestLimit < MAX_REQUESTS){
                RequestHandler(URL, cb, req, data);
            }
			else {
                console.log("Request limit reached. Aborting.");
                return;
            }
		}
		xhr.timeout = SERVER_TIMEOUT;
        if (req == "GET"){
            xhr.send();
        }
		else {

            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(data));
        }
	};
	return FetchProducts();
};


function getProducts(string){
	products = JSON.parse(string);
	console.log(products);
}

//callback function and also initializes button
function initializeProductNodes(){
    initializeProductList(products);
	initializeButtons();
}

//dynamically initializes the dom depending on the AJAX call
function initializeProductList(products){
	var rowNum=0;
	newDiv(document.getElementById("mainContent"),"ProductList");
	
	//product list title
	var productListTitle = document.createElement("h2");
	productListTitle.id = "productListTitle";
	productListTitle.innerText= "Product List";
	document.getElementById("ProductList").appendChild(productListTitle);

	for(var i = 0 ; i < Object.keys(products).length; i++){
		//create row every 3 products
		if((i )% 3 == 0){
			newDiv(document.getElementById("ProductList"),"row"+rowNum, "row");
			rowNum++;
		}
		//product div
		newDiv(document.getElementById("row"+(rowNum-1)),"product"+i,"product");
			newDiv(document.getElementById("product"+i),"image"+i,"image");
				newImage(document.getElementById("image"+i),products[Object.keys(products)[i]].url, 200, 200);
				newDiv(document.getElementById("image"+i),"price"+i,"price","$"+products[Object.keys(products)[i]].price,"h4");
				newDiv(document.getElementById("image"+i),"cartImage"+i,"cartImage");
					newImage(document.getElementById("cartImage"+i),"images/cart.png", 170, 170);
				newDiv(document.getElementById("image"+i),Object.keys(products)[i],"productButtons");
					newButton(document.getElementById(Object.keys(products)[i]),"add"+i,"add","Add");
					newButton(document.getElementById(Object.keys(products)[i]),"remove"+i,"remove","Remove");
			newDiv(document.getElementById("product"+i),"caption"+i,"caption",products[i].name,"h3");
		if(products[Object.keys(products)[i]].quantity == 0){
			showOutOfStock(Object.keys(products)[i]);
		}
		hideAdd(Object.keys(products)[i]);
	}
}

var newDiv = function(node, id, className, innerText, header) {
	var div = document.createElement("div");
	div.id = id;
	if(className){
		div.className = className;
	}
	if(innerText){
		var div2 = document.createElement(header);
		div2.innerText = innerText;
		div.appendChild(div2);
	}
	node.appendChild(div);
};

var newImage = function(node, src, height, width){
	var img = document.createElement("img");
	img.src = src;
	img.align = "middle";
	img.height = height;
	img.width = width;
	node.appendChild(img);
}

var newButton = function(node, id,className, innerText){
	var button = document.createElement("button");
	button.id = id;
	button.className = className;
	button.innerText = innerText;
	node.appendChild(button);
}

// Add click events to each button
// Use the closest div's id as the product name
function initializeButtons(){
	var addButtons = document.body.getElementsByClassName("add");
	var removeButtons = document.body.getElementsByClassName("remove");
	for(var i = 0 ; i < addButtons.length ; i++){
		addButtons[i].addEventListener("click", function(event){addToCart($(this).closest("div").prop("id"));}); 
	}

	for (var i = 0 ; i < removeButtons.length ; i++){
		removeButtons[i].addEventListener("click", function(event){removeFromCart($(this).closest("div").prop("id"));});
		$(removeButtons[i]).hide();
	}
	
	updateFilterButton();

}

function initializeFilterButton(){
	document.getElementById("filterPrice").addEventListener("click",function(event){
		filterMin = prompt("Enter minimum price.");
		filterMax = prompt("Enter maximum price.");
		if(filterMin != null && filterMax != null){
			console.log(PRODUCT_URL+"?min="+filterMin+"&"+"max="+filterMax);
			refreshProductList();
			RequestHandler(PRODUCT_URL+"?min="+filterMin+"&"+"max="+filterMax, initializeProductNodes,"GET");
		}
	});
}

function updateFilterButton(){
	document.getElementById("filterPrice").innerText = "Filter(" + filterMin +"-" + filterMax+ ")";
}

function refreshProductList(){
	var node = document.getElementById("ProductList");
	while(node.firstChild){
		node.removeChild(node.firstChild);
	}
}

//Decrement inactiveTime by 1 each second, trigger alert when it hits 0
setInterval(function(){
	//Update the footer
	var footer = document.getElementById("footer");
	footer.innerHTML = "Inactive Time Remaining: " + inactiveTime + "s";
	inactiveTime--;
	if (inactiveTime == 0){
		alert("Hey there! Are you still planning to buy something?");
		resetInactiveTimer();
	}
}, 1000);

// Get the modal
var modal = document.getElementById('cartModal');

// Get the button that opens the modal
var modalButton = document.getElementById("showCart");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
modalButton.onclick = function() {
	updateCartModal();
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When the user presses the esc key, close the modal
$(document).keydown(function(event) {
	if (event.keyCode == 27){
		modal.style.display = "none";
	}
});

function getTotalPriceCart(){
    var totalPrice = 0;
    
    //For each cart item, look up the price and change totalPrice
	for (var key in cart){
		totalPrice += products[key].price * cart[key];
	}
    
    return totalPrice;
}

//Updates the Cart button's text to reflect the total price of items in cart
function updateCartButton(){
	var totalPrice = getTotalPriceCart();
    
	var showCartButton = document.getElementById("showCart");
    var oldText = showCartButton.childNodes[0];
    
    if (oldText){ 
        showCartButton.removeChild(oldText);
	}
    
    var priceText = document.createTextNode("Cart ($" + totalPrice + ")");
    showCartButton.appendChild(priceText);

}

//Resets the inactivity timer
//Call this after a user action
function resetInactiveTimer(){
	inactiveTime = INACTIVE_TIME_MS;
}

//Add button click event function
//Adds product to user's cart, triggers alert is item is sold out
function addToCart(productName) {
	resetInactiveTimer();

	if(products[productName].quantity > 0){
		products[productName].quantity--;
		for(var key in cart){
			if(productName==key){
				cart[key]++;
				updateCartButton();
				showRemove(productName);
				hideAdd(productName);
				if(products[productName].quantity == 0){
					showOutOfStock(productName);
				}
				updateCartModal();
				return;
			}
		}
		cart[productName] = 1;
		updateCartButton();
		updateCartModal();
		showRemove(productName);
	}else if(products[productName].quantity == 0){
		showOutOfStock(productName);
		hideAdd(productName);
	}
}

//Remove button click event function
//Removes the item from the user's cart, triggers alert if item is not found in cart
function removeFromCart(productName) {
	resetInactiveTimer();

	if(cart[productName] > 1){
		cart[productName]--;
		products[productName].quantity++;
		updateCartButton();
		//hideRemove(productName);
		hideOutOfStock(productName);
		showAdd(productName);
	}else if(cart[productName] == 1){
		products[productName].quantity++;
		hideRemove(productName);
		delete cart[productName];
		updateCartButton();
		hideOutOfStock(productName);
		showAdd(productName);
	}else{
		alert(productName + ' is not in the cart.');
	}
	updateCartModal();
}

function showOutOfStock(productName){
	var noStock = document.createElement("p");
	for(var key in document.getElementById(productName).children){
		var tag = document.getElementById(productName).children[key]
		if(tag.tagName == "P"){
			if(tag.innerText == "Out of Stock")
			return;
		}
	}
	document.getElementById(productName).appendChild(noStock);
	noStock.innerText = "Out of Stock";
}

function hideOutOfStock(productName){
	for(var key in document.getElementById(productName).children){
		var tag = document.getElementById(productName).children[key]
		if(tag.tagName == "P"){
			if(tag.innerText == "Out of Stock")
			$(tag).remove();
		}
	}
}

function showRemove(productName){
	if(cart[productName] > 0){
		$(document.getElementById(productName).getElementsByClassName('remove')).show();
	}
}

function hideRemove(productName){

    $(document.getElementById(productName).getElementsByClassName('remove')).hide();
	updateCartModal();

}

function showAdd(productName){
	if(products[productName].quantity > 0){
		$(document.getElementById(productName).getElementsByClassName('add')).show();
	}
}

function hideAdd(productName){
	if(products[productName].quantity == 0){
		$(document.getElementById(productName).getElementsByClassName('add')).hide();
	}
}

//function to update the prices in the page, also hides Out of stock messages/ shows/hides buttons
function refreshPage(products){
	for(var i = 0 ; i < Object.keys(products).length; i++){
		document.getElementById("price"+i).children[0].innerHTML = "$"+products[Object.keys(products)[i]].price;
		if(products[Object.keys(products)[i]].quantity == 0){
			showOutOfStock(Object.keys(products)[i]);
		}
		hideAdd(Object.keys(products)[i]);
		showAdd(Object.keys(products)[i]);
		hideRemove(Object.keys(products)[i]);
		showRemove(Object.keys(products)[i]);
		if(products[Object.keys(products)[i]].quantity > 0){
			hideOutOfStock(Object.keys(products)[i]);
		}
	}
}

// Used as a callback function upon successful server reply in RequestHandler
function updateCartContents(oldProducts){
    var msg = ""
    var send = {};
    
    //Check availability and price of products in the cart
    //Out of stock product label toggled if needed
    for (var key in cart){
        if (oldProducts[key].price != products[key].price){
            msg = msg.concat(key + "'s price has been changed from $" + oldProducts[key].price + " to $"
                            + products[key].price + "\n");
        }     
        if (products[key].quantity < cart[key]){
            if (products[key].quantity > 0){
                // Not enough stock for the cart quantity anymore, update cart quantity
                msg = msg.concat("Insufficient stock for " + key + 
                                ". Changing cart quantity from "+ cart[key] + " to " + products[key].quantity + "\n");
                cart[key] = products[key].quantity;
                showOutOfStock(key);
                
            }
            else {
                // Product is now out of stock, delete from the cart list
                msg = msg.concat(key + " is out of stock. Removing from cart.\n");
                delete cart[key];
                showOutOfStock(key);
            }
        }  
        else if (products[key].quantity == cart[key]){
            // We have all the product in our cart, so it should be displayed as out of stock
            showOutOfStock(key);
        }
        else{
            hideOutOfStock(key);
        }             
    }
    
    refreshPage(products);    

    // If msg is not empty anymore, either quantity or price has changed
    if (msg != ""){
        msg = msg.concat("\nYour cart will be updated");
        alert(msg);
        updateCartModal(); // Recreate modal to reflect updates
        updateCartButton();
    }
    
    var totalPrice = getTotalPriceCart();
    alert("Total price of cart contents: $" + totalPrice);
  
    send.jsonObject = JSON.stringify(cart);
    send.total = totalPrice;
    var sendCart = RequestHandler(CHECKOUT_URL, null, "POST", send);
}

// Sends a request to the server for an updated product list
function syncCart(){
    alert("Checking product availability...");
    var oldProducts = products;
   
    var updatedProducts = RequestHandler(PRODUCT_URL, updateCartContents.bind(null, oldProducts), "GET"); // updateCartContents called when request is a success
 

}

//Set up the table headings for the cart modal
function createTableHeadings(newTable){
	var headings = document.createElement("tr");
    
	var prodNameHead = document.createElement("th");
    var prodNameHeadText = document.createTextNode("Product Name   |   ");
    prodNameHead.appendChild(prodNameHeadText);
    
	var quantityHead = document.createElement("th");
    var quantityHeadText = document.createTextNode("Quantity   |   ");
    quantityHead.appendChild(quantityHeadText);
    
	var priceHead = document.createElement("th");
    var priceHeadText = document.createTextNode("Price ($)   |   ");
    priceHead.appendChild(priceHeadText);
    
	var addrm = document.createElement("th");
    var addrmText = document.createTextNode("Add/Remove");
    addrm.appendChild(addrmText);


	headings.appendChild(prodNameHead);
	headings.appendChild(quantityHead);
	headings.appendChild(priceHead);
	headings.appendChild(addrm);
	newTable.appendChild(headings);
    
    return newTable;
}

//Show Cart button click event function
//Displays a modal with the cart contents
function updateCartModal(){
	resetInactiveTimer();

	var totalPrice = 0;
	var cartModal = document.getElementsByClassName("modal-body")[0];
	var cartModalFooter = document.getElementsByClassName("modal-footer")[0];
	var table = cartModal.childNodes[0];
	var footerChildren = cartModalFooter.childNodes;

	//Remove existing table since we're creating a new one
	if (table){
		table.parentNode.removeChild(table);
	}

	if (footerChildren.length > 0){ //Also need to remove the total price text since it prob changed
		while(cartModalFooter.hasChildNodes()){
            cartModalFooter.removeChild(cartModalFooter.lastChild);
        }
	}

	var newTable = document.createElement("table");
	newTable = createTableHeadings(newTable);

	//create the table content using the cart contents
	for (key in cart){
		var newProduct = document.createElement("tr");
		var prodName = document.createElement("th");
		var quantity = document.createElement("th");
		var price = document.createElement("th");
		var buttons = document.createElement("th");

		//Each product needs an add/remove button
		//Only create the add button if the product is in stock
		//Use closures to save the product name so we can call the function correctly!

		if (products[key].quantity > 0){
			var add = document.createElement("button");
            var addTextNode = document.createTextNode("+");
            add.appendChild(addTextNode);
			add.className =  "modalAdd";
			add.onclick = (function() {
				var p = key;
				return function(e){
					addToCart(p);
				}
			})();
			buttons.appendChild(add);
		}
		
		//Always create the remove button since items only appear in the cart
		//if the user has one or more of them in the cart
		var remove = document.createElement("button");
        var removeTextNode = document.createTextNode("-");
        remove.appendChild(removeTextNode);
		remove.className = "modalRemove";
		remove.onclick = (function() {
			var p = key;
			return function(e){
				removeFromCart(p);
			}
		})();

		
		buttons.appendChild(remove);
        
        var prodNameText = document.createTextNode(key);
        var quantityText = document.createTextNode(cart[key]);        
		var priceText = document.createTextNode(products[key].price * cart[key]);
        prodName.appendChild(prodNameText);        
        quantity.appendChild(quantityText);
        price.appendChild(priceText);

		totalPrice += products[key].price * cart[key]; //Keep a running total of the cost so we can display later

		newProduct.appendChild(prodName);
		newProduct.appendChild(quantity);
		newProduct.appendChild(price);
		newProduct.appendChild(buttons);
		newTable.appendChild(newProduct);

	}


	//Display the total price of all items in the footer
	var totalPriceText = document.createElement("p");
    var totalPriceTextNode = document.createTextNode("Total Price: $" + totalPrice);
	totalPriceText.appendChild(totalPriceTextNode);
	cartModalFooter.insertBefore(totalPriceText, cartModalFooter.firstChild);

	//Create a checkout button
    var checkoutButton = document.createElement("button");
    var buttonText = document.createTextNode("Checkout Cart");
    checkoutButton.appendChild(buttonText);
    checkoutButton.id = "checkout"
    checkoutButton.name = "Checkout Cart"
    checkoutButton.addEventListener("click", function(event){ syncCart(); })
    
    cartModalFooter.appendChild(checkoutButton);
	cartModal.appendChild(newTable);
}


window.onload = function(){
	RequestHandler(PRODUCT_URL+"?min="+filterMin+"&"+"max="+filterMax, initializeProductNodes,"GET");
	updateCartButton();
	initializeFilterButton();
}
