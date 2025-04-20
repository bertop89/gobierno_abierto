# Gobierno Abierto

This project is a web application designed to promote transparency and open governance. It provides tools and resources for exploring legislative data, including information about diputados (representatives), parliamentary groups, and voting records.

## Features

- **Legislative Data**: View detailed information about diputados, parliamentary groups, and voting records.

## Project Structure

- **app/**: Contains the main application pages and layouts.
  - `diputados/`, `grupos_parlamentarios/`, `votaciones/`: Dynamic routes for legislative data.
- **components/**: Reusable UI components
- **lib/**: Utility functions and helpers.
- **scripts/**: Scripts and data files for processing legislative data.
- **utils/**: Supabase client and server utilities.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and fill in the required values.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run linting checks.

## Data

- **Raw Data**: Located in `scripts/data/raw_json/`.
- **Processed Data**: Located in `scripts/data/processed/`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
