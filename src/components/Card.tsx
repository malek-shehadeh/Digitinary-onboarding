import React from "react";
import "../Style/Card.scss";

interface CardProps {
  img: string;
  name: string;
  description: string;
  email:string;
}

const Card: React.FC<CardProps> = ({ img, name, description,email }) => {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={img} alt={`${name} img`} className="card-img" />
      </div>
      <div className="card-content">
        <p className="name">{name}</p>
        <p className="description">{description}</p>
        <p className="email">{email}</p>

      </div>
    </div>
  );
};

export default Card;
