import { v4 as uuidv4 } from 'uuid';

const roboticsProjects = [
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/turtlebot.jpg',
    imgAlt: 'Turtlebot Robot',
    title: 'Search and Rescue',
    description:
      'A proof-of-concept search and rescue robot developed using Python and ROS (Robot Operating System).  It autonomously searches and maps an unknown environment using LIDAR, finds and picks up targets using basic computer vision, and delivers them to a safe location.',
    featured: true,
    youtube: [
      {
        vidLink: 'vD6ngnMxDQM',
        vidDesc:
          'Autonomously searching for and retrieving targets in a real world environment.',
      },
      {
        vidLink: 'Vt46-e4vAJM',
        vidDesc: 'Mapping a real world environment with LIDAR.',
      },
      {
        vidLink: 'H3HIfaRytCg',
        vidDesc:
          'Using Gazebo/Rviz to autonomously search for and retrieve targets in a simulated environment.',
      },
      {
        vidLink: 'Fu9YxBRYT_E',
        vidDesc: 'Using Gazebo/Rviz to map a simulated environment with LIDAR.',
      },
    ],
    github: null,
    pdf: null,
    webLink: null,
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/drone.jpg',
    imgAlt: 'Drone',
    title: 'Autonomous Drone',
    description:
      'A project for an Army Research Lab funded drone startup aiming to use the electromagnetic radiation emitted from power lines to both avoid and fly along them for inspections.  I created an experimental test setup and LabVIEW software that proves the feasibility of such a system using magnetic fields.',
    featured: true,
    youtube: null,
    github: null,
    pdf: {
      local: 'MS Project Report - Alex Colbourn.pdf',
      dropbox:
        'https://www.dropbox.com/s/vwcrto0gxdbpa7g/MS%20Project%20Report%20-%20Alex%20Colbourn.pdf?dl=0',
    },
    webLink: null,
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/swarms.jpg',
    imgAlt: 'Swarms of Drones',
    title: 'Swarm Robotics',
    description:
      'A project using Python and graph algorithms to simulate a swarm of differential drive robots.  There is no centralized control system, they use a distributed graph mesh network to communicate and pass data to nearby robots.  They then navigate a maze in coordinated formations while avoiding collisions.',
    featured: false,
    youtube: [
      {
        vidLink: 'eUMud7Ygu5s',
        vidDesc:
          'Navigating a maze in formation with a swarm of decentralized robots.',
      },
    ],
    github: null,
    pdf: null,
    webLink: null,
  },
];

const webProjects = [
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/retirement.jpg',
    imgAlt: 'Retirement Website',
    title: 'Retirement Calculator',
    description:
      'A visual retirement calculator made with D3, Javascript, jQuery, Bootstrap 4, HTML, and CSS. This was my first big non-tutorial project to solidify my understanding of the basics before moving onto React.  Use it to find the day when you no longer have to look at portfolio sites like this!',
    featured: true,
    youtube: null,
    github: 'https://github.com/acolbourn/Retirement-Calculator',
    pdf: null,
    webLink: 'https://affectionate-bhabha-988fc4.netlify.app/',
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/covid.jpg',
    imgAlt: 'Coronavirus Video Thumbnail',
    title: 'Covid-19 Hackathon',
    description:
      'This was my entry into a hackathon where I apply simple computer science algorithms to significantly boost Coronavirus testing capacity.  I ended up getting in contact with Dr. Desai (MSNBC contributor and Chief Medical Officer at Osmosis) who made a video featuring my idea and used my animations made with React/CSS!',
    youtube: [
      {
        vidLink: 'WZ6fewjkqo4',
        vidDesc:
          "Dr. Desai's great video explaining the core concept using my React animations and research I sent him.  He also connected me with the CEO of Lifebridge Health who are now looking into trialing this idea at a chain of Baltimore hospitals!",
      },
      {
        vidLink: 'uWXcr1ekypU',
        vidDesc:
          'My original hackathon submission.  The animations at 41 seconds were made using React and CSS.',
      },
    ],
    featured: true,
    github: null,
    pdf: null,
    webLink: null,
  },
  {
    id: uuidv4(),
    imgSrc: 'images/optimized/colors.jpg',
    imgAlt: 'Color Picker Website',
    title: 'Color Picker',
    description:
      'This was a guided project from the Udemy React Bootcamp.  Even though this was a tutorial project, I decided to put it here because I think it is an accurate representation of my current skill level with React.  I feel very comfortable making projects of around this scope.  It covers React Router, JSS, Material-UI, responsive design, validation, etc...',
    featured: false,
    youtube: null,
    github:
      'https://github.com/acolbourn/React-Bootcamp-Projects/tree/master/colors-app',
    pdf: null,
    webLink: 'https://vibrant-archimedes-c03d7f.netlify.app/',
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
    link:
      'http://catalog.poly.edu/preview_course_nopop.php?catoid=9&coid=23963',
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
    link:
      'https://courses.edx.org/courses/course-v1:MITx+6.00.1x+2T2019a/course/',
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
    link:
      'https://issuu.com/foothill_college/docs/winter_2012_schedule_of_classes',
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
    link:
      'http://bulletin.engineering.nyu.edu/preview_course_nopop.php?catoid=9&coid=25675',
    projects: null,
    featured: false,
    grade: 'A',
  },
];

const jobs = [
  {
    job: 'Microfluidics Lab',
    jobTitle: 'Junior Specialist',
    startYear: '2011',
    endYear: '2012',
    color: '#08FDD8',
    overlapTimeline: false,
  },
  {
    job: 'Scifiniti',
    jobTitle: 'Junior Mechanical Engineer',
    startYear: '2012',
    endYear: '2013.5',
    color: '#DD0849',
    overlapTimeline: false,
  },
  {
    job: 'Sycal',
    jobTitle: 'Controls Engineer',
    startYear: '2013.5',
    endYear: '2017.5',
    color: '#08BCFD',
    overlapTimeline: false,
  },
  {
    job: 'Freelancer',
    jobTitle: 'Product Design',
    startYear: '2015.5',
    endYear: '2017.5',
    color: '#D26CD5',
    overlapTimeline: true,
  },
  {
    job: "Robotics Master's",
    jobTitle: 'NYU Student',
    startYear: '2017.5',
    endYear: '2019.5',
    color: '#96bb7c',
    overlapTimeline: false,
  },
  {
    job: 'Bootcamps & Quarantine',
    jobTitle: 'Udemy Student',
    startYear: '2019.5',
    endYear: 'current',
    color: '#FFF600',
    overlapTimeline: false,
  },
];

export { roboticsProjects, webProjects, codingClasses, jobs };
