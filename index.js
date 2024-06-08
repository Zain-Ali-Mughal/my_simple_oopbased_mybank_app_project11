#! /usr/bin/env node
// Making a simple OOP Based My Bank Application
import inquirer from "inquirer";
import chalk from "chalk";
// Creating a Bank Account Class implementing the BankAccount interface
class BankAccountClass {
    accountNumber; // Unique account number
    balance; // Balance of the account
    // Constructor to initialize the account number and balance
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Method to deposit money into the account
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if amount is greater than $100
        }
        this.balance += amount; // Adding the amount to the balance
        console.log(`Deposited ${amount} into your account. Your new balance is: ${this.balance}`);
    }
    // Method to withdraw money from the account
    withdraw(amount) {
        if (this.balance > amount) {
            this.balance -= amount; // Deducting the amount from the balance
            console.log(`Withdrew ${amount} from your account. Your remaining balance: ${this.balance}`);
        }
        else if (this.balance < amount) {
            console.log("Insufficient Balance"); // Insufficient funds message
        }
    }
    // Method to check the current balance of the account
    checkBalance() {
        console.log(`Your current balance is: ${this.balance}`);
    }
}
// Creating a Customer Class
class Customer {
    firstName; // First name of the customer
    lastName; // Last name of the customer
    gender; // Gender of the customer
    age; // Age of the customer
    mobileNumber; // Mobile number of the customer
    account; // Bank account of the customer
    // Constructor to initialize the customer details
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Creating Bank Accounts
const accounts = [
    new BankAccountClass(10001, 1000),
    new BankAccountClass(10002, 2000),
    new BankAccountClass(10003, 3000),
    new BankAccountClass(10004, 4000),
    new BankAccountClass(10005, 5000),
];
// Creating Customers
const customers = [
    new Customer("Zain", "Ali", "Male", 25, 3111111111, accounts[0]),
    new Customer("Kashif", "Ali", "Male", 28, 3111111112, accounts[1]),
    new Customer("Ayeza", "Khan", "Female", 38, 3111111113, accounts[2]),
    new Customer("Asif", "Ali", "Male", 35, 3111111114, accounts[3]),
    new Customer("Sara", "Khan", "Female", 35, 3111111115, accounts[4]),
];
// Function to interact with bank accounts
async function interactWithBankAccount() {
    // Displaying the title message
    console.log(chalk.yellow.bold("=================================="));
    console.log(chalk.yellow.bold("====== OOP-Based My Bank App ====="));
    console.log(chalk.yellow.bold("=================================="));
    // Loop to interact with the user until they choose to exit
    do {
        // Prompting user to enter their account number
        const { accountNumber } = await inquirer.prompt([
            {
                type: "input",
                name: "accountNumber",
                message: "Enter your account number:",
            },
        ]);
        const accountNumberInput = Number(accountNumber); // Converting input to a number
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput); // Finding the customer with the entered account number
        if (customer) {
            console.log(chalk.blue("----------------------------------")); // Separator line
            console.log("\t", chalk.green(`Welcome, ${customer.firstName} ${customer.lastName}!`)); // Greeting the user with their name
            console.log(chalk.blue("----------------------------------")); // Separator line
            // Prompting user to select an action
            const ans = await inquirer.prompt([
                {
                    type: "list",
                    name: "select",
                    message: "What would you like to do?",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Deposit":
                    // Prompting user to enter the amount to deposit
                    const { amount: depositAmount } = await inquirer.prompt([
                        {
                            type: "input",
                            name: "amount",
                            message: "How much would you like to deposit?",
                        },
                    ]);
                    customer.account.deposit(Number(depositAmount)); // Depositing the entered amount
                    break;
                case "Withdraw":
                    // Prompting user to enter the amount to withdraw
                    const { amount: withdrawAmount } = await inquirer.prompt([
                        {
                            type: "input",
                            name: "amount",
                            message: "How much would you like to withdraw?",
                        },
                    ]);
                    customer.account.withdraw(Number(withdrawAmount)); // Withdrawing the entered amount
                    break;
                case "Check Balance":
                    customer.account.checkBalance(); // Checking the account balance
                    break;
                case "Exit":
                    console.log("Exiting...");
                    console.log("Thank you for banking with us!"); // Exit message
                    return;
            }
        }
        else {
            console.log("Invalid Account Number"); // Invalid account number message
        }
    } while (true); // Loop continues until user chooses to exit
}
// Starting the interaction with the bank account
interactWithBankAccount();
