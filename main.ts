#! /usr/bin/env node

import inquirer from "inquirer"
//bank account interface
interface BankAccount{
    accountNumber: number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void
}
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;

   
    }
    withdraw(amount: number):void{
        if (this.balance >= amount){
            this.balance -= amount 
            console.log(`Withdrawl of $${amount} successful, Remaining balance is $${this.balance}`)
        }else {
            console.log("INSUFFICIENT BALANCE")
        }
    }
    deposit(amount: number): void{
        if (amount > 100){
            amount -= 1; //$1 will be deducted if more than $100 is charged
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful.Remaining balance is $${this.balance}`)
    } 

    //check balance
    checkBalance(): void {
        console.log(`Current balance: ${this.balance}`)
    }
    


} 
class Customer{
    firstName:string;
    lastName:string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName:string, gender:string, age:number,mobileNumber:number,account:BankAccount){
        this.firstName = firstName
        this.lastName = lastName
        this. gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}
   const accounts: BankAccount[]=[
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,4000)
];

const customers: Customer [] = [
    new Customer ("Hiba", "Khaliq","Female",18,7477447744,accounts[0]),
    new Customer ("Huda", "Khaliq","Female",23,444774744,accounts[1]),
    new Customer ("Afiya", "Sohail","Female",21,466464467744,accounts[2])
]
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome ${customer.firstName} ${customer.lastName}!\n`)
            const ans = await inquirer.prompt([{
                name: "Select",
                type: "list",
                message:"SELECT AN OPRATOR",
                choices: ["Deposit","Check Balance","Withdraw","Exit"]
            }]);

            switch (ans.select){
                case "Deposit" : 
                const depositAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to deposit"
                }) 
                customer.account.deposit(depositAmount.amount);
                break;

                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to withdraw"
                    }) 
                    customer.account.withdraw(withdrawAmount.amount);
                    break;

                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                        case "Exit":
                            console.log("Exiting bank program...")
                            return;
                }
            }else{
                console.log("Invalid account number.Please try again!")
            }
            
        
    }while(true)
}
service();