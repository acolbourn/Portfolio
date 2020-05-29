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
    description:
      'Networked swarm robots, very cool practical appliation of graph algorithms.',
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
    imgSrc: '/images/optimized/reactBootcamp.jpg',
    imgAlt: 'React Bootcamp',
    title: 'The Modern React Bootcamp',
    description:
      "A full bootcamp following the exact curriculum of Colt Steele's in-person SF bootcamp.  It covers common design patterns, React Router, Hooks, useReducer, useContext, JSS, etc...",
    keyPoints: ['Hooks, useContext, useReducer', 'React Router', 'JSS'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/modern-react-bootcamp/',
    projects: [],
    featured: true,
    grade: 'Complete',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/webBootcamp.jpg',
    imgAlt: 'Web Development Bootcamp',
    title: 'The 2020 Web Bootcamp',
    description:
      'A full bootcamp focused on the MERN stack.  It provides a large overview of all aspects of web development and covers, HTML, CSS, Bootstrap 4, Javascript, jQuery, Node, Express, APIs, MongoDB, React, design, etc...',
    keyPoints: ['HTML, CSS, Javascript', 'Node, Express', 'MongoDB'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    projects: [],
    featured: true,
    grade: 'Complete',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
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
    imgSrc: '/images/Coding.jpg',
    imgAlt: 'Retirement',
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
    imgSrc: '/images/Coding.jpg',
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
    imgSrc: '/images/Coding.jpg',
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
    imgSrc: '/images/Coding.jpg',
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
