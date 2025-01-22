import type React from "react"
import "../Style/Card.scss"

interface CardProps {
  img: string
  name: string
  description: string
  email: string
  imgRef?: React.RefObject<HTMLImageElement>
}

const Card: React.FC<CardProps> = ({ img, name, description, email, imgRef }) => {
  return (
    <div className="card-container">
      <div className="card-image">
        <img 
          ref={imgRef}
          src={img || "/placeholder.svg"} 
          alt={`${name} img`} 
          className="card-img" 
        />
      </div>
      <div className="card-content">
        <p className="name">{name}</p>
        <p className="description">{description}</p>
        <p className="email">{email}</p>
      </div>
    </div>
  )
}

export default Card