# WebBooks Project

[English (Current) | Tiếng Việt](README.vi.md)

<div align="center">
  <img src="https://raw.githubusercontent.com/TagKrj/Bookstore/master/webBookHome.png" alt="WebBooks Preview" width="100%" />
</div>

## Overview
WebBooks is an e-commerce web application for a bookstore that allows users to browse, search, and purchase books online. It offers features like user authentication, shopping cart management, wishlists, order processing, and payment integration.

## Project Structure
The project follows the MVC (Model-View-Controller) architecture pattern:

- **models/**: Contains data models that represent the domain entities (books, cart items, orders, etc.)
- **views/**: Contains UI components and templates for displaying data to users
- **controllers/**: Contains the logic that handles user interactions and manages data flow between models and views
- **scripts/**: Contains JavaScript files for page-specific functionality
- **styles/**: Contains CSS stylesheets for the UI
- **assets/**: Contains images and other static resources

## Features

### User Authentication
- User registration and login system
- User profile management
- Authentication token handling for secure API access

### Book Catalog
- Browse books by categories
- Search functionality
- Detailed book pages with descriptions, prices, and ratings
- Featured books section

### Shopping Cart
- Add books to cart
- Update book quantities
- Remove books from cart
- Calculate cart totals

### Wishlist
- Add/remove books to a personal wishlist
- Move items from wishlist to cart

### Checkout Process
- Multiple shipping address management
- Address creation, editing, and deletion
- Order summary and confirmation
- Multiple payment methods

### Order Management
- Order history view
- Order status tracking
- Order details

## Technical Details

### API Integration
The application connects to a RESTful API backend at `https://javelin-advanced-daily.ngrok-free.app/api/` that handles:
- Data storage and retrieval
- User authentication
- Order processing
- Payment integration

### Code Organization

#### Models
- **productModel.js**: Represents a book product with properties like title, price, description
- **cartModel.js**: Represents items in the shopping cart
- **orderModel.js**: Represents customer orders
- **addressModel.js**: Manages user shipping addresses
- **paymentModel.js**: Handles payment methods and transactions

#### Controllers
- **addCartController.js**: Handles adding items to cart
- **cartController.js**: Manages cart operations
- **productController.js**: Fetches and displays book data
- **loginController.js**: Handles user authentication
- **registerController.js**: Manages user registration
- **searchController.js**: Processes search queries
- **orderController.js**: Manages order creation and history
- **paymentController.js**: Processes payment transactions

### Data Flow
1. Controllers fetch data from the API
2. Data is transformed into model instances
3. Views render the data for user interaction
4. User actions trigger controller methods
5. Controllers update models and API as needed

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### Running the Application
1. Clone the repository
2. Open the main HTML file in a web browser
3. Or use a local development server (like Live Server in VS Code)

## Development Guidelines

### Adding New Features
1. Create or update the relevant model(s)
2. Implement controller logic to handle the feature
3. Create or update the corresponding view
4. Connect everything together using event listeners and DOM manipulation

### API Communication
Example of making an API request:

```javascript
// Example of adding an item to cart
async function addToCart(token, productId, quantity) {
    try {
        const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify({ product: productId, quantity }),
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
}
```