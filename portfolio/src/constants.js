import { v4 as uuidv4 } from 'uuid';

const roboticsProjects = [
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Robot',
    title: 'Autonomous Search and Rescue Robot',
    description: 'A robot for search and rescue.',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Drone',
    title: 'Autonomous Drone',
    description:
      'A drone that detects electromagnetic radiation from powerlines to avoid and fly along them.',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Swarms',
    title: 'Robotic Swarms',
    description: 'Networked swarm robots.',
  },
];

const webProjects = [
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
    title: 'Retirement Calculator',
    description: 'A calculator built with javacript and jQuery.',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Coronavirus',
    title: 'Covid-19 Hackathon',
    description: 'Animations made with React',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Colors',
    title: 'Color Picker',
    description: 'A large udemy project.',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Drone',
    title: 'Next Project',
    description: 'Music project.',
  },
];

const codingClasses = [
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Class/Functional Components', 'Hooks', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [],
    featured: true,
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Class/Functional Components', 'Hooks', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [],
    featured: false,
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Class/Functional Components', 'Hooks', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [],
    featured: true,
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Class/Functional Components', 'Hooks', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [],
    featured: false,
  },
];

export { roboticsProjects, webProjects, codingClasses };
