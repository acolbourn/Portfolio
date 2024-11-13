import { v4 as uuidv4 } from 'uuid';

export const codingClasses = [
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
        projectDesc: 'Turn off all the lights to win.',
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
        projectFeatured: true,
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
          "This is the capstone project of the bootcamp. It's a color palette website that lets you create and manage color palettes.",
        projectFeatured: true,
      },
    ],
    featured: true,
    grade: null,
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/webBootcamp.jpg',
    imgAlt: 'Web Development Bootcamp',
    title: 'Complete 2020 Web Bootcamp',
    description:
      'A full bootcamp focused on the MERN stack.  It provides a large overview of all aspects of web development and covers: HTML, CSS, Bootstrap 4, Javascript, jQuery, Node, Express, APIs, MongoDB, React, visual design, etc...',
    keyPoints: ['HTML, CSS, Javascript', 'Node, Express', 'MongoDB'],
    school: 'Udemy',
    link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    projects: [
      {
        projectTitle: 'TinDog',
        projectLink: 'https://ecstatic-yalow-6215cb.netlify.com',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/TinDog',
        projectDesc:
          'A startup landing page using Bootstrap 4 for responsive design.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Drum Kit',
        projectLink: 'https://practical-brown-b01565.netlify.com',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/Drum%20Kit',
        projectDesc: 'A pure Javascript drum kit.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Simon',
        projectLink: 'https://elated-panini-b8cd96.netlify.com',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/Simon-Game',
        projectDesc:
          'Javascript/jQuery implementation of the classic game Simon.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Newsletter Sign-up',
        projectLink: 'https://secret-earth-69190.herokuapp.com/',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/Newsletter-Signup',
        projectDesc: 'Newsletter signup using the MailChimp API.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Todo List',
        projectLink: 'https://morning-mesa-38937.herokuapp.com/',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/todolist-v2',
        projectDesc:
          'Todo List made with MongoDB/Mongoose, Node/Express, and hosted on Atlas/Heroku.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Blog',
        projectLink: 'https://pure-plateau-18911.herokuapp.com/',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/Blog-with-Database',
        projectDesc:
          'Made using EJS, MongoDB/Mongoose, Node/Express, and hosted on Atlas/Heroku.',
        projectFeatured: true,
      },
      {
        projectTitle: 'Wiki API',
        projectLink: '#',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/Wiki-API',
        projectDesc:
          'This is a RESTful API simulating a wikipedia type website. This was purely backend code so there is no live website.',
        projectFeatured: false,
      },
      {
        projectTitle: 'Notes App',
        projectLink: 'https://condescending-goldwasser-d048ed.netlify.com',
        projectGit:
          'https://github.com/acolbourn/Udemy-Bootcamp-Projects/tree/master/notes-app',
        projectDesc: 'A note taking website built with React.',
        projectFeatured: true,
      },
    ],
    featured: true,
    grade: null,
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
      'Graph & Dynamic Algorithms',
    ],
    school: 'NYU',
    link: 'http://catalog.poly.edu/preview_course_nopop.php?catoid=9&coid=23963',
    projects: null,
    featured: false,
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
    projects: null,
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/codeImg1.jpg',
    imgAlt: 'MIT Computer Science',
    title: 'MITx Intro to Computer Science',
    description:
      "MITx: 6.00.1x is MIT's Introduction to Computer Science.  This course focuses on the fundamentals of Python and covers Object Oriented Programming, Classes, Computational Complexity, Searching and Sorting, etc...",
    keyPoints: ['Python', 'Object Oriented Programming', 'Algorithms'],
    school: 'MITx (edx)',
    link: 'https://courses.edx.org/courses/course-v1:MITx+6.00.1x+2T2019a/course/',
    projects: null,
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
    projects: null,
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/code2.jpg',
    imgAlt: 'Code',
    title: 'Computer Science I: Java',
    description:
      'CIS27A Introduces the discipline of computer science using the Java language; provides an overview of computer organization and an introduction to software engineering. Topics include methodologies for program design, development, style, testing and documentation, algorithms, control structures, sub-programs, objects, and elementary data structures.',
    keyPoints: ['Java', 'Program Design', 'Data Structures'],
    school: 'Foothill College',
    link: 'https://www.foothill.edu/publications/archives/Schedule_2011_F.pdf',
    projects: null,
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/code1.jpg',
    imgAlt: 'Code',
    title: 'Computer Science II: Java',
    description:
      'CIS27B is a systematic approach to the design, construction, and management of computer programs, emphasizing object oriented design and programming, documentation, and testing and debugging techniques.',
    keyPoints: [
      'Object Oriented Programming',
      'Classes, Inheritance',
      'Testing and Debugging',
    ],
    school: 'Foothill College',
    link: 'https://issuu.com/foothill_college/docs/winter_2012_schedule_of_classes',
    projects: null,
    featured: false,
    grade: 'A',
  },
  {
    id: uuidv4(),
    imgSrc: '/images/optimized/labview.jpg',
    imgAlt: 'Labview Logo',
    title: 'LabVIEW Programming',
    description:
      'Introduction to mechatronics, electromechanical systems, data acquisition, software programming and LabVIEW. Students learn programming fundamentals, hardware interfacing and controls with simulated hardware and actual motor controllers.',
    keyPoints: ['LabVIEW', 'Data Acquisition', 'Hardware/Software Interfacing'],
    school: 'UCSB',
    link: 'https://ninjacourses.com/explore/4/course/ME/147/',
    projects: null,
    featured: false,
    grade: 'A-',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/c3p0.jpg',
    imgAlt: 'Robot',
    title: 'Simulation Tools for Robotics',
    description:
      'The student who completes this course will gain an advanced understanding of the principles underlying simulation of dynamical systems, with particular reference to mechatronics and robotic systems. He/she will be able to use modern tools for simulation of mechatronics and robotic systems. Moreover, he/she will be able to design and implement control algorithms and assess their performance on the simulated systems.',
    keyPoints: ['Matlab', 'Simulink', 'Computational Efficiency'],
    school: 'NYU',
    link: 'http://bulletin.engineering.nyu.edu/preview_course_nopop.php?catoid=9&coid=25675',
    projects: null,
    featured: false,
    grade: 'A',
  },
];
