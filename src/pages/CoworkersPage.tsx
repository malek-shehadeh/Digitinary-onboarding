import React from "react";
import Card from "../components/Card";
import "../Style/CoWorkersPage.scss";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";
import user6 from "../assets/user6.png";


const CoWorkersPage: React.FC = () => {
  const frontEndCoworkers = [
    {
      img: user1,
      title: "Alice",   
      description: "Front-End Developer",
      email: "alice@gmail.com",
    },
    {
      img: user2,
      title: "Bob",
      description: "Front-End Developer",
      email: "bob@gmail.com",
    },
    {
      img: user3,
      title: "Charlie",
      description: "Front-End Developer",
      email: "charlie@gmail.com",
    },
    {
      img: user4,
      title: "Dave",
      description: "Front-End Developer",
      email: "dave@gmail.com",
    },
    {
      img: user5,
      title: "Eve",
      description: "Front-End Developer",
      email: "eve@gmail.com",
    },
    {
      img: user6,
      title: "Frank",
      description: "Front-End Developer",
      email: "frank@gmail.com",
    },
  ];

  return (
    <div className="coworkers-page">
      <h1>Front-End Co-workers</h1>
      <div className="coworkers-grid">
        {frontEndCoworkers.map((coworker, index) => (
          <Card
            key={index}
            img={coworker.img}
            name={coworker.title}
            description={coworker.description}
            email={coworker.email}
          />
        ))}
      </div>
    </div>
  );
};

export default CoWorkersPage;
