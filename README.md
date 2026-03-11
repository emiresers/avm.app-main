🏬 AVM Management and Financial Tracking System

A full-stack demo application consisting of a Spring Boot–based REST API backend and a modern web interface developed with React + TypeScript.

This project was developed to track rent, income, expenses, and profit/loss status of stores inside a shopping mall.

The project also demonstrates the following concepts in practice:
	•	Object-Oriented Programming (OOP)
	•	RESTful API development
	•	Full Stack application architecture
	•	Backend–Frontend integration
	•	Financial data modeling


⸻

🚀 Features

🏪 Store Management
	•	Add new stores
	•	List stores
	•	View store details
	•	Delete stores

Store information includes:
	•	Store ID
	•	Store name
	•	Address
	•	Rent information


⸻

💰 Income / Expense Management

Financial records can be kept for the selected store.

Available records:
	•	Income record
	•	Expense record

Each record contains the following information:
	•	Amount
	•	Description
	•	Date

⸻

📊 Financial Reporting

The following summary information can be calculated for each store:
	•	Total income
	•	Total expenses
	•	Net profit / loss

Reports can also be generated optionally by specifying a date range.

Example:
	•	Start date
	•	End date

⸻

🌐 Modern Web Interface

The frontend is developed using React + TypeScript.

Main interface components include:
	•	Store creation form
	•	Store list
	•	Selected store panel
	•	Income entry form
	•	Expense entry form
	•	Profit / loss summary cards

The frontend communicates with the backend via a REST API.

⸻

⚙️ Backend

The backend application is developed using Spring Boot.

Technologies used:
	•	Java 17
	•	Spring Boot
	•	Gradle
	•	REST API architecture

Main controller classes in the backend:

Controller                Responsibility
MagazaController          Store CRUD operations
FinansController          Income and expense records
RaporController           Financial report generation

💻 Frontend
The frontend application is developed using the following technologies:
	•	React
	•	TypeScript


👨‍💻 Developer : Emir Eser
