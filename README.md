# Portfolio

A portfolio site built with React and Three.js.

https://www.alexcolbourn.com/

## Technologies

- React 16
- Javascript ES6
- HTML 5
- CSS 3
- material-ui 4.11
- react-three-fiber 4.2
- formik 2.1
- framer-motion 2.9
- react-router-dom 5.2
- three 0.118
- yup 0.28

## Home Page

This page was made with WebGL, Three.js, and react-three-fiber.

It is intended to be a mini recreation of the big bang. When a user moves the mouse left, the website is sucked into a blackhole. When they move right, it explodes. New NASA research shows that the universe will eventually form clusters strongly resembling this portfolio.

I faced a number of challenges while creating this:

1. Processing power - Speed optimization was by far the biggest hurdle. Viewers could be on anything from a phone to a gaming PC, so every piece of code had to be meticulously optimized.
2. React State and Lifecycle - Communication between components was particularly challenging because normal state updates triggered re-renders which caused glitches. Solving this required many workarounds such as passing data with useRef's, state machines inside of useEffect's, and memoization with useMemo.
3. Math - This was an interesting crossover with robotics. The positions and rotations were calculated using rotation matrices/quaternions and linear algebra. This is the exact same math used in calculating a robot's arm joint positions and swarms of robots, for example.
4. Responsive Design - CSS was used to scale the canvas itself, but the 3d world unfortunately has no such system. Scaling and positioning commands that take 10 seconds in CSS had to be manually recreated in 3d.
5. Interactivity - Translating user mouse/touchscreen input into smooth onscreen animations required dozens of simultaneous scaling operations done with d3-scale. I also used react-spring heavily to smooth out the animations. These operations are incredibly CPU hungry so they had to be used strategically as needed and then immediately disabled.

## Projects Page

- Framer-Motion - Animates the page layout when the filter buttons are pressed.
- CSS Grid & Flexbox - Used for the page and card layouts.
- react-player and react-material-ui-carousel - Used to display video carousels.
- react-pdf - Used to display pdfs as images.
- Material-UI - Cards and buttons with heavily customized css.

## Classes Page

This page has links to my bootcamp projects. I felt these should be separate from my personal projects as they were tutorial projects.

## About Page

The timeline on this page is pure CSS and javascript. It auto-updates every month, rescales automatically, and is fully responsive.

## Contact Page

- MailChimp API - Server used to receive a message.
- Formik and Yup Validation - These were used to validate the form data in addition to basic HTML validation.

## Additional Skills

This project was all about learning so I wanted to discuss some additional skills I picked up along the journey:

- Website Hosting - This is done with a google domain, hosted on netlify, and continuously updated via Github.
- Image Optimization - The total for all images on my site combined is 370 kb!
- Speed Testing/Lighthouse Audits - Significantly sped up the site by switching to self-hosted fonts that had slow CDN's, and eliminated other blocking requests.
- SEO - Getting close to overtaking someone else on google with my name!
- Design - I spent a ton of time learning about font legibility, color selection, hover states, intuitive page layouts, etc...
- SVG's - Learned how to make custom SVG's for my logo.
- Accessibility - Everything is properly labeled for screen readers and SEO, and color contrast ratios and fonts are all easy to read.
- Google Analytics - Setup basic page visit analytics.
