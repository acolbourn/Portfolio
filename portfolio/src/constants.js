import { v4 as uuidv4 } from 'uuid';

const roboticsProjects = [
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Robot',
    title: 'Autonomous Search and Rescue Robot',
    description: 'A robot for search and rescue.',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Drone',
    title: 'Autonomous Drone',
    description:
      'A drone that detects electromagnetic radiation from powerlines to avoid and fly along them.',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Swarms',
    title: 'Robotic Swarms',
    description:
      'Networked swarm robots, very cool practical appliation of graph algorithms.',
  },
];

const webProjects = [
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Retirement',
    title: 'Retirement Calculator',
    description: 'A calculator built with javacript and jQuery.',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Coronavirus',
    title: 'Covid-19 Hackathon',
    description: 'Animations made with React',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Colors',
    title: 'Color Picker',
    description: 'A large udemy project.',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Drone',
    title: 'Next Project',
    description: 'Music project.',
  },
];

const codingClasses = [
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/reactBootcamp.jpg',
    imgAlt: 'React Bootcamp',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Hooks, useContext, useReducer', 'React Router', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [
      {
        projectTitle: 'Hangman',
        projectLink: 'https://priceless-perlman-4364a1.netlify.com/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/hangman',
        projectDesc: '',
        projectFeatured: false,
      },
      {
        projectTitle: 'Lights Out',
        projectLink: 'https://clever-payne-8fc0ae.netlify.com/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/lights-out',
        projectDesc: '',
        projectFeatured: true,
      },
      {
        projectTitle: 'Todo List',
        projectLink: 'https://unruffled-haibt-21c6de.netlify.com/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/todo-list',
        projectDesc: '',
        projectFeatured: false,
      },
      {
        projectTitle: 'Yahtzee',
        projectLink: 'https://keen-almeida-7f8c34.netlify.com/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/yahtzee',
        projectDesc: '',
        projectFeatured: false,
      },
      {
        projectTitle: 'Dad Jokes',
        projectLink: 'https://priceless-minsky-751dd3.netlify.com/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/dad-jokes',
        projectDesc:
          'Fetches jokes from an API. Handles voting/sorting and uses local storage to prevent duplicate jokes.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Context App',
        projectLink: 'https://keen-knuth-3d6fdd.netlify.app/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/context-app',
        projectDesc:
          'A simple project to learn React Contexts. Dark mode and language can be switched using contexts.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Todo Hooks, useReducer, useContext',
        projectLink: 'https://loving-meninsky-42ef4e.netlify.app/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/todos-hooks',
        projectDesc:
          'A Todo app completely built using Hooks, useContext, and useReducer.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Color Picker',
        projectLink: 'https://vibrant-archimedes-c03d7f.netlify.app/',
        projectGit:
          'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/colors-app',
        projectDesc:
          "This is the capstone project of the bootcamp. It's a color palette website that lets you create and manage color pallettes.",
        projectFeatured: true,
      },
    ],
    featured: true,
    grade: 'Complete',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/webBootcamp.jpg',
    imgAlt: 'Web Development Bootcamp',
    title: 'Complete 2020 Web Bootcamp',
    description:
      'A full bootcamp focused on the MERN stack.  It provides a large overview of all aspects of web development and covers, HTML, CSS, Bootstrap 4, Javascript, jQuery, Node, Express, APIs, MongoDB, React, design, etc...',
    keyPoints: ['HTML, CSS, Javascript', 'Node, Express', 'MongoDB'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    projects: [
      {
        projectTitle: '',
        projectLink: '',
        projectDesc: '',
        projectFeatured: false,
      },
    ],
    featured: true,
    grade: 'Complete',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/Nyu1.jpg',
    imgAlt: 'Washington Square Park',
    title: 'Algorithms',
    description:
      'A graduate level course on the design and analysis of algorithms.  It covers data structures, queues, binary search trees, searching, sorting, dynamic programming, greedy algorithms, graph algorithms, etc...',
    keyPoints: [
      'Data Structures',
      'Searching, Sorting',
      'Graph Algorithms, Dynamic Programming',
    ],
    school: 'NYU',
    link: 'http://archive.engineering.nyu.edu/files/CS-GY-6033-INET.pdf',
    projects: [],
    featured: true,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/cs50.jpg',
    imgAlt: 'Harvard Computer Science',
    title: 'CS50 Intro to Computer Science',
    description:
      "Harvard's Introduction to Computer Science.  Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, software engineering, and web development. Languages include C, Python, SQL, and JavaScript plus CSS and HTML. ",
    keyPoints: [
      'Algorithms, Data Structures',
      'C, Python, SQL',
      'HTML, CSS, Javascript',
    ],
    school: 'HarvardX (edx)',
    link: 'https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/course/',
    projects: [],
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/mit6.jpg',
    imgAlt: 'MIT Computer Science',
    title: 'MITx Intro to Computer Science',
    description:
      "MITx: 6.00.1x is MIT's Introduction to Computer Science.  This course focuses on the fundamentals of Python and covers Object Oriented Programming, Classes, Computational Complexity, Searching and Sorting, etc...",
    keyPoints: ['Python', 'Object Oriented Programming', 'Algorithms'],
    school: 'MITx (edx)',
    link:
      'https://courses.edx.org/courses/course-v1:MITx+6.00.1x+2T2019a/course/',
    projects: [],
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/ucsb1.jpg',
    imgAlt: 'UC Santa Barbara',
    title: 'Intro to C Programming',
    description:
      'This course focuses on the fundamentals of the C programming language, MatLab, and the Linux operating system. Special emphasis is placed on using the tools acquired in this class to solve problems faced by engineers. ',
    keyPoints: ['C', 'Matlab', 'Linux'],
    school: 'UCSB',
    link: 'https://www.ece.ucsb.edu/~ilan/Classes/ENGR3_SUM2009/syllabus.pdf',
    projects: [],
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/code2.jpg',
    imgAlt: 'Retirement',
    title: 'Computer Science I: Java',
    description:
      'CIS27A Introduces the discipline of computer science using the Java language; provides an overview of computer organization and an introduction to software engineering. Topics include methodologies for program design, development, style, testing and documentation, algorithms, control structures, sub-programs, objects, and elementary data structures.',
    keyPoints: ['Java', 'Program Design', 'Data Structures'],
    school: 'Foothill College',
    link: 'https://www.foothill.edu/publications/archives/Schedule_2011_F.pdf',
    projects: [],
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Retirement',
    title: 'Computer Science II: Java',
    description:
      'CIS27B is a systematic approach to the design, construction, and management of computer programs, emphasizing object oriented design and programming, documentation, and testing and debugging techniques.',
    keyPoints: [
      'Object Oriented Programming',
      'Classes, Inheritance',
      'Testing and Debugging',
    ],
    school: 'Foothill College',
    link:
      'https://issuu.com/foothill_college/docs/winter_2012_schedule_of_classes',
    projects: [],
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/labview.jpg',
    imgAlt: 'Labview Logo',
    title: 'LabVIEW Programming',
    description:
      'Introduction to mechatronics, electromechanical systems, data acquisition, software programming and Labview. Students learn programming fundamentals, hardware interfacing and controls with simulated hardware and actual motor controllers.',
    keyPoints: ['LabVIEW', 'Data Acquisition', 'Hardware/Software Interfacing'],
    school: 'UCSB',
    link: 'https://ninjacourses.com/explore/4/course/ME/147/',
    projects: [],
    featured: false,
    grade: 'A-',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/c3p0.jpg',
    imgAlt: 'Retirement',
    title: 'Simulation Tools for Robotics',
    description:
      "MITx: 6.00.1x is MIT's Introduction to Computer Science.  This course focuses on the fundamentals of Python and covers Object Oriented Programming, Classes, Computational Complexity, Searching and Sorting, etc...",
    keyPoints: ['Matlab', 'Simulink', 'Computational Efficiency'],
    school: 'NYU',
    link:
      'http://bulletin.engineering.nyu.edu/preview_course_nopop.php?catoid=9&coid=25675',
    projects: [],
    featured: false,
    grade: 'A',
  },
];

export { roboticsProjects, webProjects, codingClasses };
