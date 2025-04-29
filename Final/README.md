# Midterm Website Report

## Website Link
- https://lydia-portfolio-journey.netlify.app/

## 1.Demo site and show each page(layouts)
- Home page (Intro video animation - timeline“4 Stages” - gallery)
- Work (gallery)
- About
- Contact

This project is a **personal portfolio website** designed to showcase my artistic and digital work through an interactive timeline. 
From childhood to the present,focusing on a different art form at each stage of the process. This portfolio blends storytelling with code where I used animation and interactive layouts, also showcases selected artworks in a immersive way.

## 2.Process
- Building the Frame Animation
- Timeline Section, four different carousel page
- Creating the Interactive Gallery
- Mobile Optimization
- Solving the scroll lock bug
- Iteration from Midterm to Final
- About Page - add timeline

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

## 4. I learned in order to accomplish the project
- How to build frame-by-frame animations from scratch
- Creating a custom image carousel with dynamic layout
- Debugging layout and overflow issues
- How to use media queries not just to resize things, but to completely rethink layout and interaction for smaller devices.

## 5. Next steps
- Improve loading performance
- Build more interaction into the timeline
- Explore adding sound or ambient audio

Midterm：
- （done）Footer with my social media links
- （done）Hover effect on gallery artworks (Show information on hover)
- （done）Navigation Enhancement: Dropdown for “Work”
