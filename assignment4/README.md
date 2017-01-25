# Assignment 4

This is a continuation of [Assignment 3](https://github.com/erkartik91/assignment3). As a part of this assignment, you will focus on interacting with the remote server (https://cpen400a.herokuapp.com/products)
to fetch the product items. You will need to build on your previous code - no code will be provided by us for this assignment. 

## Tasks

1. **Fetch products from server using AJAX:** (2 points) You will initialize your **product** variable by making an AJAX call to the following url. The **cart** variable should follow the same structure as the previous assignments - you should not make any changes to it. When calculating the total price of the products in the cart, use the price information from the products array.
  ```
  https://cpen400a.herokuapp.com/products
  
  var cart = {
    'productName1' : 2,
    'productName2' : 1,
    ...
  };
  ```

2. **Handle Timeout / Error:** (3 points)  The remote server you are fetching the data from is not very reliable. Sometimes, instead of returning the product list the server takes long time, due to which the ajax request times out. Also, sometimes the server returns error 500 instead of the product list. In either case, you will need to make repeated AJAX calls untill you get the list of products from the web server (you can give up after a reasonable number of such repeated tries).

3. **Synchronize the price / quantity before checkout:** (5 points) In your show cart modal you need to present the user with a checkout button. When the user clicks on checkout, you will need to make sure that the products are still available in the back store and the prices are updated. You will do that by making another AJAX call to the same url. Therefore, when the user clicks on checkout, you will alert the user with the message showing that you are confirming the final total price as well as the availability.  If there is any price change, you will need to alert the user for each product for which the price changed. For any of the selected products, if the quantity that the user ordered is not available any more, you will change the number of products in the cart to the now available quantity. You will also need to alert the user about the updated quantity as well. The cart variable should also be updated to reflect the revised prices/quantity.

4. **Update Cart modal and show total price:** (2 points) Once you have the updated cart information, you will need to update the cart information shown to the user. Also, you will alert the user with the total amount due (based on the cart's contents).

## Bonus Task
(1 point) The code for the server used for the server side application, is made available at https://github.com/erkartik91/cpen400. The instructions to run the server locally are available in the README file.
You need to have the server up and running in your local machine as well as you will need to host the same application on Heroku servers. You can create a free account to deploy this application. The task is only considered complete, if you have it setup on your local machine as well as on Heroku. The instructions to run on local machine are provided in the read me file. For deploying to Heroku, please follow the instructions given on their website. **Please include a link to your heroku deployment in your README file.**

## Code Quality

(3 points) You should ensure that your JavaScript code follows the best practices around variable/function naming, variable placement, modularization (dividing long code blocks into smaller functions) and comments (your comments should explain why a design choice was taken, instead of how your code works). You still need to consider creating DOM elements programmatically (from Assignment 2 onwards) rather than hardcoding them in your HTML if you did not well in your previous assignments. Additionally, HTML DOM elements should not be  hardcoded as strings in JavaScript either. Your code will be assessed for code quality during marking.


## Submission instructions:

* Copy the code from your assignment 3
* Update the code to reflect the changes for this assignment.
* Create a branch called assignment-4.
* Make sure you push your changes before the due date - late submissions will not be accepted.
* For students in L1A, the assignment is due on Tuesday, November 15 at 11:59 PM.
* For students in L1B, the assignment is due on Thursday, November 17 at 11:59 PM.
* We will be downloading the code on the due date, any changes to the code after that point will not be considered for marking.

## Labs are mandatory on the week of assignment submission:

* If you can not attend the lab to demo your assignment for any reason, you need to notify Instructors on Piazza at least 24 hours prior to the start of your lab section. Otherwise, you will be recorded as no attendance and will have marks deducted.
