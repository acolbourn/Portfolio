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
    featured: false,
    youtube: null,
    github: 'https://github.com/acolbourn/Retirement-Calculator',
    pdf: null,
    webLink: 'https://affectionate-bhabha-988fc4.netlify.app/',
  },
];

export { roboticsProjects, webProjects };
