var mongob = require('mongodb');
var mongoClient = mongob.MongoClient;
var url = 'mongodb://localhost:27017/shopDB';

mongoClient.connect(url, function(err, db){
  if(err){
    console.log('Unable to connect to mongodb server. Error:', err);
  }else{
    console.log('Connection establisted to', url);

    var collection1 = db.collection('products');

    //var product1 = {"name": 'KeyboardCombo', "price":25,"quantity":9,"url":"https://cpen400a.herokuapp.com/images/KeyboardCombo.png"};
    var products =    [{"name": "KeyboardCombo", "price":25,"quantity":9,"url":"https://cpen400a.herokuapp.com/images/KeyboardCombo.png"},
              {"name": "Mice", "price":7,"quantity":3,"url":"https://cpen400a.herokuapp.com/images/Mice.png"},
              {"name":"PC1", "price":329,"quantity":7,"url":"https://cpen400a.herokuapp.com/images/PC1.png"},
              {"name":"PC2", "price":372,"quantity":8,"url":"https://cpen400a.herokuapp.com/images/PC2.png"},
              {"name":"PC3", "price":363,"quantity":10,"url":"https://cpen400a.herokuapp.com/images/PC3.png"},
              {"name":"Tent", "price":38,"quantity":5,"url":"https://cpen400a.herokuapp.com/images/Tent.png"},
              {"name":"Box1", "price":6,"quantity":5,"url":"https://cpen400a.herokuapp.com/images/Box1.png"},
              {"name":"Box2", "price":7,"quantity":7,"url":"https://cpen400a.herokuapp.com/images/Box2.png"},
              {"name":"Clothes1", "price":28,"quantity":6,"url":"https://cpen400a.herokuapp.com/images/Clothes1.png"},
              {"name":"Clothes2", "price":24,"quantity":0,"url":"https://cpen400a.herokuapp.com/images/Clothes2.png"},
              {"name":"Jeans", "price":39,"quantity":4,"url":"https://cpen400a.herokuapp.com/images/Jeans.png"},
              {"name":"Keyboard", "price":17,"quantity":9,"url":"https://cpen400a.herokuapp.com/images/Keyboard.png"}];

    collection1.insertMany(products,function(err, result){
      if(err){
        console.log(err);
      }else{
        console.log('Inserted %d documents into the "products" collection. The documents inserted with "_id" are:', result.length, result);
      }
    });

    var collection2 = db.collection('orders');

    //init empty cart
    var order = {"cart":"", "total":0};

    collection2.insert(order,function(err, result){
      if(err){
        console.log(err);
      }else{
        console.log('Inserted %d documents into the "order" collection. The documents inserted with "_id" are:', result.length, result);
      }
    });

    var collection3 = db.collection('users');

    var users = {"token":"cpen411user"};

    collection3.insert(users,function(err, result){
      if(err){
        console.log(err);
      }else{
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
    }

    db.close();
    });
  }
});