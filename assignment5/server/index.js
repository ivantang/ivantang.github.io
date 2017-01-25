var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/products', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	//connect to mongodb
	var mongob = require('mongodb');
	var mongoClient = mongob.MongoClient;
	var url = 'mongodb://localhost:27017/shopDB';

	mongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to mongodb server. Error:', err);
		}else{
			//get min max
			var min = parseInt(request.query.min);
			var max = parseInt(request.query.max);
			console.log(min + " " + max);
			console.log('Connection establisted to', url);

			db.collection("products", function(err,collection){
				if(min>max){
					response.status(500).send("An error occurred, please try again");
					db.close();
				}else if(min < 0 || max < 0){
					response.status(500).send("An error occurred, please try again");
					db.close();
				}else if(min < max){
					collection.find({"price": {$lte:max, $gte:min}}).toArray(function(err,documents){
					console.log(documents);
					response.json(documents);
					db.close();
					});
				}else{
					collection.find().toArray(function(err,documents){
						console.log(documents);
						response.json(documents);
						db.close();
					});
				}
			});
		}
	});
});

app.get('/orders', function(request, response){
    var checkout = {};
    checkout.cart = request.body.jsonObject;
    order.total = request.body.total;
    cartItems = JSON.parse(checkout.cart);

    response.addHeader("Access-Control-Allow-Origin", "*");
	response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    MongoClient.connect(url, function(err, db){
        if (err){
            console.log('Unable to connect to mongodb server. Error:', err);
        } else {
            
            // update the order collection
            db.collection('orders').insert(checkout, function(err, result){
                if (err){
                    console.log(err);
                } else{
                    console.log('Inserted %d documents into the "orders" collection. The documents inserted with "_id" are:', result.length, result);
                }
            });
            
            // update the product collection
            for (var key in cartItems){
                db.collection('products').update(
                    {'name' : key},
                    { $inc: {"quantity" : (-1)*cartItems[key]}}
                );
            }
        }
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});