TODO:

- Reminders

* [x] Create cache tags for reminders routes
* [x] Invalidate reminders cache when a reminder is created, updated or deleted
* [ ] Add pagination in reminders

- Transactions

* [ ] Create the create, update and delete transactions routes
* [x] Create cache tags for transactions routes
* [x] Invalidate transactions cache when a transaction is created, updated or deleted
* [ ] Add pagination in transactions
* [x] Create the create, update and delete transactions modals

- Categories

* [ ] Check if there are transactions linked to this category before deleting it
* [ ] Check permissions in categories to hide the create, update and delete buttons
* [x] Invalidate categories cache when a category is created, updated or deleted
* [x] Create cache tags for categories routes
* [ ] Add pagination in categories

- Others

* [ ] Create a error page
* [ ] Create whatsapp button to redirect user to whatsapp of adap
* [ ] After a certain time with the application not used, the token is removed and then the request does not work well. Create a function to refresh the token in the cookie.
* [ ] handle deletion of transaction with installments
* [ ] handle deletion of category with transactions
