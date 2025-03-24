# **Technical Test - Mobile Store App**  

This project is a technical test for developing a single-page application (SPA) in React. The app includes:  

- **Product List Page:** Displays a list of mobile devices.  
- **Product Details Page:** Shows detailed information about a selected device.  

## **Tech Stack**  
- React (Vite)  
- React Router  
- JavaScript (ES6)  
- CSS Tailwind  
- Vitest & Testing Library (for unit tests)  

## **Installation & Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/jutorla/devTest.git
   cd devTest
   ```  
2. Install dependencies:  
   ```sh
   npm install
   ```  
3. Start development server:  
   ```sh
   npm run start
   ```  
4. Build:  
   ```sh
   npm run build
   ```  
5. Run tests:  
   ```sh
   npm run test
   ```  
6. Lint code:  
   ```sh
   npm run lint
   ```  
## **Project Structure**  
```
/src  
 ├── components/      # UI components  
 ├── pages/           # Application views
 ├── constants/       # Constants utils
 ├── utils/           # Api call logic 
 ├── routes/          # Routing configuration  
 ├── App.jsx          # Main component  
 ├── main.jsx         # Entry point  
 ├── __tests__/       # Unit tests  
 ├── README.md        # Documentation  
```
## **Deployment**  
Deployment is available on https://devtest-991x.onrender.com/ and
triggered by GithubActions CD pipeline.

## **LeftOvers**  
Some colors from the api response can not be mapped due to unknow color codes.
Typo on attribute from api/product/:id "secondaryCmera": "2 MP".
Missing api error and timeout handling.
Pre-commit hook with husky.
Unitary test for each component.
Style looks clunky.