# Midterm Website Report

## 1.Demo site and show each page(layouts)
- Home page (timeline - 4 Stages)
- Work (gallery)
- About
- Contact

This project is a **personal portfolio website** designed to showcase my artistic and digital work through an interactive timeline. 
From childhood to the present,focusing on a different art form at each stage of the process.

## 2.Progress completed
- Nav bar with (Hover behavior, Links to pages, Fixed position)
- Built timeline with scrolling. Implemented flexbox and grid for layout.
- Added interactive hover effects and animations.
- Individual css/html for each category of my main artwork.
- Aesthetics: selected typography, color scheme, and layout structure.
- Responsive Design
- Contact Page 

## 3.Show snippet of code 
- I used a horizontal scrolling gallery for art8 process images.
- By applying overflow-x: auto;, I enabled a horizontal scrollbar when the content exceeded the viewport width.

.process-gallery {
    display:flex; /* Aligns images in a single row. */
    gap: 10px;
    overflow-x: auto; /* Adds a horizontal scrollbar when content overflows */
    padding: 10px;
    scroll-snap-type: x mandatory; /* Forces the scroll to snap to images */
}

## 4.Fuctions to Add
- Footer with my social media links
- Hover effect on gallery artworks (Show information on hover) —— Have done
- Navigation Enhancement: Dropdown for “Work”

