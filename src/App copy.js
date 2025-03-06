import React from "react";
import "./App.css";

function App() {
  // Example data (replace with your own)
  const projectsData = [
    {
      title: "CompEng.gg",
      externalLink: "https://your-portfolio.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A personal portfolio website built to showcase my projects and skills.",
      tools: ["MATLAB", "CSS", "HTML"],
      dateCompleted: "January 2023",
    },
    {
      title: "DoodleBot 560",
      externalLink: "https://your-portfolio.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A personal portfolio website built to showcase my projects and skills.",
      tools: ["MATLAB", "CSS", "HTML"],
      dateCompleted: "January 2023",
    },
    {
      title: "Linear Control Robot",
      // No externalLink here, so the title isn’t clickable
      image: null,
      description:
        "A simple task tracker application that allows users to add, edit, and remove tasks.",
      tools: ["React", "TypeScript", "Material UI"],
      dateCompleted: "March 2022",
    },
    {
      title: "JS Game of Life",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "Multiplayer Snake",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "Movie Poster Genre Classifier",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "WallStreetBots 2",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "Remindful",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "S.W.I.M Bot",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "Qregpulse",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "City Navigation App",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
    {
      title: "Restaurant Recommendation App",
      externalLink: "https://weather-app-demo.com",
      image: "https://via.placeholder.com/300x150",
      description:
        "A weather forecast app that displays current and forecasted weather based on user’s location.",
      tools: ["React", "OpenWeather API", "Bootstrap"],
      dateCompleted: "June 2021",
    },
  ];

  return (
    <div className="App">
      <h1>My Projects</h1>
      <div className="projects-container">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const { title, externalLink, image, description, tools, dateCompleted } = project;

  // If there's an externalLink, make the title clickable, otherwise plain text
  const TitleElement = externalLink ? (
    <h2 className="project-title clickable">
      <a href={externalLink} target="_blank" rel="noopener noreferrer">
        {title}
        {/* Inline external link icon next to the title */}
        <svg
          className="external-link-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10.5 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1.707L5.354 6.354a.5.5 0 1 1-.708-.708L9.293 1H7.5a.5.5 0 0 1 0-1h3z"
          />
          <path
            fillRule="evenodd"
            d="M13.5 3a.5.5 0 0 1 .5.5v9A2.5 2.5 0 0 1 11.5 15h-9A2.5 2.5 0 0 1 0 12.5v-9A2.5 2.5 0 0 1 2.5 1h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-9a.5.5 0 0 1 .5-.5z"
          />
        </svg>
      </a>
    </h2>
  ) : (
    <h2 className="project-title">{title}</h2>
  );

  return (
    <div className="project-card">
      {image && (
        <div className="project-image">
          <img src={image} alt={title} />
        </div>
      )}

      {TitleElement}

      <p className="project-description">{description}</p>

      <div className="tools-container">
        {tools.map((tool, index) => (
          <span key={index} className="tool-pill">
            {tool}
          </span>
        ))}
      </div>

      <p className="date-completed">
        <strong>Date Completed:</strong> {dateCompleted}
      </p>
    </div>
  );
}

export default App;


