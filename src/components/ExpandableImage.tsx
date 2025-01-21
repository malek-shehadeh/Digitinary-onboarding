import { useState } from "react";
import styles from "../Style/ExpandableImage.module.scss";

interface ExpandableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ExpandableImage({ src, alt, width, height }: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.image} ${isExpanded ? `${styles.expanded} ${styles.animate}` : ""}`}
        onClick={toggleExpand}
      />
      {isExpanded && <div className={styles.overlay} onClick={toggleExpand}></div>}
    </div>
  );
}