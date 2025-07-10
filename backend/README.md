Reminders

- [x] Add status to reminders to know if it was sent for ther user or not.
- [x] Check if user is the owner of the reminder before deleting it.

Categories

- [x] Create a ref in transactions to link category with transactions.
- [x] Check if user is the owner of the category before deleting it.
- [x] Create default categories for new users.

User

- [x] Check user id in all transactions, categories and reminders.
- [x] If some user already has the registry in mongodb, then check the phone number and if it is the same, then update the user.
- [x] name
- [x] email
- [x] phoneNumber (whatsapp)
- [ ] documentType (CPF/CNPJ)
- [ ] documentNumber
- [ ] segment (segmento da empresa)
- [ ] mainActivity (atividade principal)
- [x] password

Reports

- [x] Create a document to store the monthly report of the user.
- [x] Create a service to create the monthly report.
- [x] Create a service to get the monthly report.
- [x] Create a repository function to get the monthly report.
- [x] Create a repository function to create the monthly report.
- [x] Create a controller function to get the monthly report.
- [x] Create a job to create the monthly report.

Others

- [x] Create an .env var to set the frontend url in cors.
- [x] Create a function to send the user information in registration in the zapier webhook.
