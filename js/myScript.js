
var itemNames = document.body.getElementsByTagName("h3");
var addButtons = document.body.getElementsByClassName("add");
var removeButtons = document.body.getElementsByClassName("remove");
var cart = [];
var products = [];
var inactiveTime = 300;
var stock = 5

//Create associative array with all products and their quantities
var newElement = {};

for(var i = 0 ; i < itemNames.length ; i++){
	newElement[$(itemNames[i]).text()] = {};
	newElement[$(itemNames[i]).text()].quantity = stock;
	newElement[$(itemNames[i]).text()].price = parseFloat($(document.getElementsByTagName("h4")[i]).text().replace("$",""));
}
	products = newElement;

// Add click events to each button
// Use the closest div's id as the product name
for(var i = 0 ; i < addButtons.length ; i++){
	addButtons[i].addEventListener("click", function(event){addToCart($(this).closest("div").prop("id"));}); 
}

for (var i = 0 ; i < removeButtons.length ; i++){
	removeButtons[i].addEventListener("click", function(event){removeFromCart($(this).closest("div").prop("id"));});
	$(removeButtons[i]).hide();
}

//Decrement inactiveTime by 1 each second, trigger alert when it hits 0
setInterval(function(){
	//Update the footer
	var footer = document.getElementById("footer");
	footer.innerHTML = "Inactive Time Remaining: " + inactiveTime + "s";
	inactiveTime--;
	if (inactiveTime == 0){
		alert("Hey there! Are you still planning to buy something?");
		inactiveTime = 300;
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

//Updates the Cart button's text to reflect the total price of items in cart
function updateCartButton(){
	var totalPrice = 0;
	var showCartButton = document.getElementById("showCart");

	//For each cart item, look up the price and change totalPrice
	for (var key in cart){
		totalPrice += products[key].price * cart[key];
	}

	showCartButton.innerHTML = "Cart ($" + totalPrice + ")";

}

//Resets the inactivity timer
//Call this after a user action
function resetInactiveTimer(){
	inactiveTime = 300;
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
		hideRemove(productName);
		hideOutOfStock(productName);
		showAdd(productName);
	}else if(cart[productName] == 1){
		products[productName].quantity++;
		delete cart[productName];
		updateCartButton();
		hideRemove(productName);
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
	//console.log(products[productName].quantity);
	//console.log(document.getElementById(productName));
	if(products[productName].quantity < stock){
		$(document.getElementById(productName).getElementsByClassName('remove')).show();
	}
}

function hideRemove(productName){
	if(products[productName].quantity == stock){
		$(document.getElementById(productName).getElementsByClassName('remove')).hide();
		updateCartModal();
	}
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

//Show Cart button click event function
//Displays a modal with the cart contents
function updateCartModal(){
	resetInactiveTimer();

	var totalPrice = 0;
	var cartModal = document.getElementsByClassName("modal-body")[0];
	var cartModalFooter = document.getElementsByClassName("modal-footer")[0];
	var table = cartModal.childNodes[0];
	var priceText = cartModalFooter.childNodes[0];

	//Remove existing table since we're creating a new one
	if (table){
		table.parentNode.removeChild(table);
	}

	if (priceText){ //Also need to remove the total price text since it prob changed
		priceText.parentNode.removeChild(priceText);
	}

	var newTable = document.createElement("table");

	//Set up the table headings
	var headings = document.createElement("tr");
	var prodNameHead = document.createElement("th");
	var quantityHead = document.createElement("th");
	var priceHead = document.createElement("th");
	var addrm = document.createElement("th");
	prodNameHead.innerHTML = "Product Name   |   ";
	quantityHead.innerHTML = "Quantity   |   ";
	priceHead.innerHTML = "Price ($)   |   ";
	addrm.innerHTML = "Add/Remove"
	headings.appendChild(prodNameHead);
	headings.appendChild(quantityHead);
	headings.appendChild(priceHead);
	headings.appendChild(addrm);
	newTable.appendChild(headings);

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
			add.innerHTML = "+";
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
		remove.innerHTML = "-";	
		remove.className = "modalRemove";
		remove.onclick = (function() {
			var p = key;
			return function(e){
				removeFromCart(p);
			}
		})();

		
		buttons.appendChild(remove);

		prodName.innerHTML = key;
		quantity.innerHTML = cart[key];
		price.innerHTML = products[key].price * cart[key];
		totalPrice += products[key].price * cart[key]; //Keep a running total of the cost so we can display later

		newProduct.appendChild(prodName);
		newProduct.appendChild(quantity);
		newProduct.appendChild(price);
		newProduct.appendChild(buttons);
		newTable.appendChild(newProduct);

	}


	//Display the total price of all items in the footer
	var totalPriceText = document.createElement("p");
	totalPriceText.innerHTML = "Total Price: $" + totalPrice;
	cartModalFooter.insertBefore(totalPriceText, cartModalFooter.firstChild);

	
	cartModal.appendChild(newTable);
}

//Function for testing purposes
function test(){

	console.log(products);
	console.log(cart);

	// addToCart('Box1');
	// addToCart('Box2');
	// addToCart('PC1');
	updateCartModal();

	//updateCartModal();
	/*
	addToCart('Box1');
	addToCart('PC3');
	addToCart('PC3');
	console.log(cart[0]);

	removeFromCart('Box2');
	removeFromCart('Box1');
	console.log(cart[0]);
	updateCartModal();
*/
}


