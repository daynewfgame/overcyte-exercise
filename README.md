# Report

Below is a high level view of the fixes that I have implemented, and my use of a.i tools.

## Fixes

1. **Performance Improvements (Task 3: Poor React Performance)**
   - Implemented skeleton loading for better user experience during data fetches
   - Added debouncing for search functionality using lodash to prevent excessive re-renders
   - Improved performance of the performance-demo page
   - Implemented Server Side pagiantion (all posts), and client side pagination (performance-demo)
   - Created better loading states across components

2. **Database and Data Loading Optimizations (Task 2: Database Queries)**
   - Added proper indexes to the post table for improved query performance
   - Implemented efficient pagination with a dedicated component
   - Deprecated inefficient `getAllPosts` function in favor of optimized queries
   - Created new API endpoints with proper search, pagination, and sorting capabilities

3. **Data Validation and Type Safety (Task 1: Data Validation)**
   - Added SafeUser type to ensure proper type checking
   - Updated default values and validation checks throughout the application
   - Improved data handling in the Posts component
   - Deprecated `getUserWithPosts` to remove unused data fetching

4. **Effect Library Integration (Task 4: Effect Library)**
   - Refactored the `registerUser` function and related operations to use the Effect library
   - Implemented proper error handling and flow control using Effect patterns

5. **React Features and Loading States (Task 5: App Router/React Features)**
   - Added skeleton loading components for better Suspense integration
   - Improved component architecture with React patterns (code splitting)
   - Created a more modular structure with dedicated components for Latest Posts
   - Enhanced dashboard with better loading states and post count displays

## A.I Usage

A.I was used to understand concepts, such as Effect and Virtualisation. I purposely minimised my usage of A.I in this excerise, as I wanted to prove that I can solve these problems without depending on A.I