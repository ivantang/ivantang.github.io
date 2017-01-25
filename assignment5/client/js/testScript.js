var PRODUCT_URL = "http://localhost:5000/products";
var SERVER_TIMEOUT = 3000;

var RequestHandler = function(url, callback){
    
	var RequestResult;
	 var FetchProducts = function(){
         
        var URL = url;
        var cb = callback;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", URL);
        console.log(URL);
		xhr.onload=function(){
			if(xhr.status==200){
				RequestResult = xhr.responseText;
                getProducts(RequestResult);
				console.log("Request success");
                
				if (typeof cb === "function"){
                    cb();
                }
			}
			if(xhr.status==500){
				console.log("Server error. Will request again");
				RequestHandler(URL, cb);
			}
		}
		xhr.ontimeout = function(){
			console.log("Request timed out. Will request again");
			RequestHandler(URL, cb);
		}
		xhr.onerror = function(){
			console.log("Server error. Will request again");
			RequestHandler(URL, cb);
		}
		xhr.timeout = SERVER_TIMEOUT;
		xhr.send();
	};
	return FetchProducts();
};

function getProducts(string){
	//products = JSON.parse(string);
	products = string;
	console.log(products);
}

window.onload = function(){
	RequestHandler(PRODUCT_URL, initializeProductNodes);
}

function initializeProductNodes(){
	console.log("done");
}