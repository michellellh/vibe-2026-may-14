# Toto Random Generator

## Overview

This project is a simple web application that generates random numbers for a lottery game. It's built using modern web technologies, including a Web Component for the main functionality, and features a responsive design with support for both light and dark themes.

## Project Outline

### Style and Design

*   **Layout:** A centered, clean interface.
*   **Color Palette:** A dynamic color scheme supporting light (Day) and dark (Night) modes.
    *   **Light Mode:** Clean background (#f0f0f0) with dark text and subtle shadows.
    *   **Dark Mode:** Deep dark background (#121212) with light text and vibrant accents.
*   **Typography:** System default sans-serif font.
*   **Effects:** Multi-layered drop shadows to create depth, and glowing effects for interactive elements in dark mode.

### Features

*   **Random Number Generation:** Generates 6 unique random numbers between 1 and 49.
*   **Web Component:** The entire functionality is encapsulated in a `<lotto-generator>` custom element.
*   **Theme Toggle:** A toggle component to switch between Light and Dark modes.
*   **Persistence:** Saves the user's theme preference in `localStorage`.

## Current Plan

*   **Implement Theme Support:**
    *   Define CSS variables for colors in `style.css`.
    *   Create a `theme-toggle` Web Component.
    *   Update `lotto-generator` to use CSS variables for styling.
    *   Add logic to `main.js` for theme switching and persistence.
*   **Update UI:**
    *   Add the `theme-toggle` to `index.html`.
    *   Improve the visual design of the `lotto-generator` with modern CSS features.
