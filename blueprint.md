# Toto Random Generator

## Overview

This project is a simple web application that generates random numbers for a lottery game. It's built using modern web technologies, including a Web Component for the main functionality, and features a responsive design with support for both light and dark themes.

## Project Outline

### Style and Design

*   **Layout:** A centered, clean interface.
*   **Color Palette:** A dynamic color scheme supporting light (Day) and dark (Night) modes.
*   **Typography:** System default sans-serif font.
*   **Effects:** Multi-layered drop shadows, floral borders (Sunflowers/Roses), and glowing interactive elements.

### Features

*   **Random Number Generation:** Generates 6 unique random numbers between 1 and 49.
*   **Web Component:** Encapsulated `<lotto-generator>` custom element.
*   **Theme Toggle:** Switch between Light (Day) and Dark (Night) modes.
*   **Multi-Language TTS:** Read generated numbers in English, Mandarin, or Teochew dialect.
*   **Persistence:** Saves theme and language preferences in `localStorage`.

## Current Plan

*   **Implement Multi-Language TTS:**
    *   Add a language selection dropdown to the `lotto-generator`.
    *   Map numbers 1-49 to Mandarin and Teochew pronunciations.
    *   Integrate language detection and voice selection in the `speakNumbers` method.
*   **Implement Accessibility Features:**
    *   Add a Text-to-Speech button to the `lotto-generator`.
*   **Implement Theme Support:**
    *   Define CSS variables and implement the `theme-toggle` component.
*   **Update UI:**
    *   Add floral borders and improve visual design.
