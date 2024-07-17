
# pCash

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Live Link](#live-link)
- [Demo Accounts](#demo-accounts)
- [Roles and Permissions](#roles-and-permissions)
- [Database Schema](#database-schema)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Introduction
pCash is a basic Mobile Financial Service system similar to services like bKash or Nagad. It is built using React.js, Node.js, Express.js, and MongoDB. The application includes essential features such as user authentication, sending money, cash-out, and balance inquiries. There are three user roles: User, Agent, and Admin.

## Features
### User
- **Registration:** Users register with Name, 5-digit PIN, Mobile Number, and Email. Initial status is pending until admin approval. A one-time bonus of 40 Taka is credited upon activation.
- **Secure Login:** Users can log in using Mobile Number/Email and PIN.
- **Send Money:** Users can send money to other users with PIN & JWT verification. Transactions over 100 Taka incur a 5 Taka fee. Minimum transaction amount is 50 Taka.
- **Cash-Out:** Users can cash out through an agent with PIN & JWT verification. A fee of 1.5% of the transaction amount is charged.
- **Cash-In:** Users can cash-in through agents without a fee upon agent approval.
- **Balance Inquiry:** Users can check their account balances.
- **Transaction History:** Users can view their last 10 transactions.

### Agent
- **Registration:** Agents register with Name, 5-digit PIN, Mobile Number, and Email. Initial status is pending until admin approval. A one-time bonus of 10,000 Taka is credited upon activation.
- **Secure Login:** Agents can log in using Mobile Number/Email and PIN.
- **Transaction Management:** Agents manage cash-in and cash-out requests.
- **Balance Inquiry:** Agents can check their account balances.
- **Transaction History:** Agents can view their last 20 transactions.

### Admin
- **Secure Login:** Admins can log in using Mobile Number/Email and PIN.
- **User Management:** Admins can view and manage user accounts, including activation and blocking.
- **System Monitoring:** Admins can see all transactions within the system.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **PIN Hashing:** bcrypt.js

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arparvej1/pcash-client.git
   git clone https://github.com/arparvej1/pcash-server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pcash-server
   ```
3. Install dependencies for both client and server:
   ```bash
   npm install
   cd ../pcash-client
   npm install
   cd ..
   ```

## Usage
1. Start the development server:
   ```bash
   cd pcash-server
   npm run dev
   cd ../pcash-client
   npm start
   ```
2. The application will be running at `http://localhost:3000`.

## Live Link
[pCash](https://pcash.netlify.app)

## Demo Accounts
### User
- **Email:** parvej@gmail.com
- **Mobile:** 01846922104
- **Password:** 12345

### Agent
- **Email:** masud@gmail.com
- **Mobile:** 01984545875
- **Password:** 12345

### Admin
- **Email:** parvejadmin@gmail.com
- **Mobile:** 01407067104
- **Password:** 12345

## Roles and Permissions
### User
- Register, login, send money, cash-out, cash-in, check balance, view transaction history.

### Agent
- Register, login, manage transactions, check balance, view transaction history.

### Admin
- Login, manage user accounts, view all transactions.

## Database Schema
### User
- Name, PIN (hashed), Mobile Number, Email, Status (pending/active), Balance

### Agent
- Name, PIN (hashed), Mobile Number, Email, Status (pending/active), Balance

### Transaction
- Type (send money, cash-out, cash-in), Amount, Date, Status (pending/completed), User ID, Agent ID (if applicable)

## Security
- **Authentication:** JWT for secure authentication.
- **PIN Hashing:** bcrypt.js for hashing PINs before storing in the database.

## Contributing
1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License
This project is licensed under the MIT License.
```

Feel free to copy and paste this markdown code into your README file. Adjust any details as needed for your specific project.