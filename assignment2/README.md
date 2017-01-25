# Assignment2

This is a continuation of [Assignment 1](https://github.com/abrahamchanUBC/assignment1). If you have successfully completed Assignment 1, you can continue working with your own code. **To help you, we will also release the solution for Assignment 1 (once the marking for assignment 1 is complete)**. You are free to use the solution provided for Assignment 1 or with your own code. Because this is the first assignment, we are providing the solution - solutions for future assignments may not be provided and you'll have to use your own code.

As part of this assignment you will be implementing the "add to cart" functionality in the shopping cart web application.


## Tasks

1. **Add to cart buttons:** (3 points)
When you hover over any of the products within the web page, you need to show the cart symbol on top of the product image. The user should still be able to see the product in the background. Please refer to the [layout.png](https://github.com/erkartik91/assignment2/blob/master/layout.png) file reference. You will also need to show two buttons **Add** and **Remove**.

2. **Cart Variables:** (4 points)
  * You will need to maintain your cart as a JavaScript global variable **cart**. It should be represented as an associative array (i.e., object). Product names represent the indexes, and values represent the number of products ordered by the customer.
  * You will also need to maintain product quantity as a global variable **products**. This variable should be initialized as soon as the web page is loaded. It is also an associative array of product names and quantity (again an object). Initialize all the product quantities to 5.
  * When the user clicks on **Add** button, you will call **addToCart** JavaScript function, that will update the cart (Use the 'click' event for this purpose). If the product already exists in the cart, you will need to increment the quantity of the product by 1. If it does not exist you will add the product in the cart and initialize the quantity to be 1. Use the following function signature to define the function (**NOTE: Please follow the function signatures exactly as otherwise our automated tests will fail, and you will be penalized.**).
     ```
     function addToCart(productName) {
  
     }
     ```
   The product names are given in assignment 1, in products folder, image of each product is named as "ProductName_Price.png". So you should use the same names here, for example, for "Box1_$10.png", you should name the product "Box1".
  * When the user clicks on **Remove** button, you will call the **removeFromCart** Javascript function, that will update the cart. If there is no such product in the cart, you should present the user with an alert message saying the product does not exist in the cart. If there are more than 1 of the same product, decrement the quantity by 1. If the quantity in the cart is 1, remove the product completely from the cart object. Use the following function signature to define the function.
     ```
     function removeFromCart(productName) {
  
     }
     ```
   Make sure when you add or remove a product to the cart, the quantity in **products** is updated.

3. **Timeout popup:**  (3 points)
You also need to implement a timeout feature in the web application. Once the user loads the web page, you need to start the timer with an initial value of 30 seconds (Use the setTimeout or setInterval functions). If the user **does not** add / remove any product from the cart, you need to display an alert to the user. The alert message should be **Hey there! Are you still planning to buy something?** However, if the user adds/removes a product from the cart there should be no popup displayed (i.e., the timer is reset). You will need to keep track of the time the user has been inactive. Use a global variable called **inactiveTime** for this purpose. Once the user clicks OK in the alert popup, you will need to reset this time.   

4. **Show Cart:** (Bonus Task: 1 point)
You can add a button called **Show Cart** in your website. Clicking the button should display all the current product items/quantity in the cart one by one in an alert box. For example, if you have 3 items in your cart, you should have 3 different alert boxes. However, to not overwhelm the user with a bunch of alerts all together, we need to maintain a gap of 5 seconds between each alert box displayed to the user (from the moment the user presses OK).


At any point in time, the following global variables should reflect the cart state:

1. cart - represents the total number of products in the cart in the form of associative array.
2. products - represents the total products available on the website along with their quantity in the form of associative array.
3. inactiveTime - represents the total time in seconds that the user has not clicked on add, remove, or the alert popup.


## Testing
**To test your code, insert the following script tags within the head tag of your page**
```
<script src="http://ece.ubc.ca/~kbajaj/cpen400a/jquery.js" type="text/javascript"></script>
<script src="http://ece.ubc.ca/~gpli/CPEN400A/hw2/test.js" type="text/javascript"></script>
```
Once you add the above scripts, the testing automatically starts when page is loaded. Watch out for the alert messages which tells you any missing components/functionalites. You are responsible for ensuring that all the functionalities above are implemented correctly - the tests are only there to help you. We reserve the right to test your code with other test cases than the above.

## Code Quality
(3 points)
You should ensure that your JavaScript code follows the best practices around variable naming, variable placement, modularization (dividing long code blocks into smaller functions) and comments (at the minimum, describing what each function does). Your code will be assessed for code quality during marking.

## Scalability
(2 points)
There are multiple ways to go about implementing the tasks specified in this assignment. However, you should consider the scalability of your implementation. For example, how much development effort would be required to maintain the website if you wish to add more products to the store?

## Submission instructions:

* Copy the code from your assignment 1 (or the one provided as solution for assignment 1)
* Update the code to reflect the changes for this assignment.
* Create a branch called assignment-2.
* Make sure you push your changes before the due date - late submissions will not be accepted.
* For students in L1A, the assignment is due on Tuesday, October 11 at 11:59 PM.
* For students in L1B, the assignment is due on Thursday, October 13 at 11:59 PM.  
* We will be downloading the code on the due date, any changes to code after that point will not be considered for marking.

## Labs are mandatory on the week of assignment submission:

* If you can not attend the lab to demo your assignment for any reason, you need to notice Instructors on Piazza ahead of at least 24 hours before the lab section starts. Otherwise, you will be recorded as no attendance and will have marks deducted.
