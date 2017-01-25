
var itemNames = document.body.getElementsByTagName("h3");
var addButtons = document.body.getElementsByClassName("add");
var removeButtons = document.body.getElementsByClassName("remove");
var cart = [];
var products = [];
var inactiveTime = 30;


//Create associative array with all products and their quantities
var newElement = {};

for(var i = 0 ; i < itemNames.length ; i++){
	newElement[$(itemNames[i]).text()] = 5;
}
	products = newElement;

// Add click events to each button
// Use the closest div's id as the product name
for(var i = 0 ; i < addButtons.length ; i++){
	addButtons[i].addEventListener("click", function(event){addToCart($(this).closest("div").prop("id"));}); 
}

for (var i = 0 ; i < removeButtons.length ; i++){
	removeButtons[i].addEventListener("click", function(event){removeFromCart($(this).closest("div").prop("id"));});
}

//Decrement inactiveTime by 1 each second, trigger alert when it hits 0
setInterval(function(){
	inactiveTime--;
	if (inactiveTime == 0){
		alert("Hey there! Are you still planning to buy something?");
		inactiveTime = 30;
	}
}, 1000);


//Add button click event function
//Adds product to user's cart, triggers alert is item is sold out
function addToCart(productName) {
	//Reset inactive timer
	inactiveTime = 30;

	if(products[productName] > 0){
		products[productName]--;
		for(var key in cart){
			if(productName==key){
				cart[key]++;
				return;
			}
		}
		cart[productName]=1;
	}else{
		alert(productName + " is no longer in stock.");
	}
}

//Remove button click event function
//Removes the item from the user's cart, triggers alert if item is not found in cart
function removeFromCart(productName) {
	//Reset inactive timer
	inactiveTime = 30;

	if(cart[productName] > 1){
		cart[productName]--;
		products[productName]++;
	}else if(cart[productName] == 1){
		products[productName]++;
		delete cart[productName];
	}else{
		alert(productName + ' is not in the cart.');
	}
}

//Show Cart button click event function
//Displays the contents of the cart, with each item in a separate alert (5s apart)
function showCart(){
	var addTime = 0;
	for(var key in cart){
		if(cart[key] > 0){
			setTimeout(function(product){ 
				return function(){
					alert("You have "+ cart[product]+" "+ product +" in your shopping cart");
			}}(key),5000*addTime);
		}
		addTime++;
	}
}

//Function for testing purposes
function test(){

	console.log(products);
	console.log(cart);

	// addToCart('Box1');
	// addToCart('Box2');
	// addToCart('PC1');
	showCart();

	//showCart();
	/*
	addToCart('Box1');
	addToCart('PC3');
	addToCart('PC3');
	console.log(cart[0]);

	removeFromCart('Box2');
	removeFromCart('Box1');
	console.log(cart[0]);
	showCart();
*/
}
