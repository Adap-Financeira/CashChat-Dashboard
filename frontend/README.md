TODO:

- Authentication

* [] Add refresh token logic or change the token expiration time to some days

- Reminders

* [x] Create cache tags for reminders routes
* [x] Invalidate reminders cache when a reminder is created, updated or deleted
* [ ] Add pagination in reminders

- Transactions

* [x] Create the create, update and delete transactions routes
* [x] Create cache tags for transactions routes
* [x] Invalidate transactions cache when a transaction is created, updated or deleted
* [x] Create the create, update and delete transactions modals
* [x] handle deletion of transaction with installments
* [ ] Think a way to dont pass null values in installmentsCount and check if the payment method is credit to create installments with the default instalmentCount of 1
* [ ] Add pagination in transactions

- Categories

* [x] Check if there are transactions linked to this category before deleting it
* [x] Invalidate categories cache when a category is created, updated or deleted
* [x] Create cache tags for categories routes
* [x] handle deletion of category with transactions
* [ ] Add pagination in categories

- Others

* [ ] Create a error page
* [ ] Create whatsapp button to redirect user to whatsapp of adap
* [ ] After a certain time with the application not used, the token is removed and then the request does not work well. Create a function to refresh the token in the cookie.
