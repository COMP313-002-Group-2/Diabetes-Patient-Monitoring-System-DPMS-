import React from 'react';

// Array of resources
const resources = [
  {
    name: 'Diabetes Canada',
    imageUrl:
      'https://i.cbc.ca/1.3980616.1487014706!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_940/diabetes-canada-rebranding.jpg',
    link: 'https://guidelines.diabetes.ca/home',
  },
  {
    name: 'LMC',
    imageUrl:
      'https://www.lmc.ca/wp-content/uploads/2015/09/LMCresearch-screenshot-1080x675.png',
    link: 'https://www.lmc.ca/',
  },
  {
    name: 'Navigating Nutrition',
    imageUrl:
      'https://diabetes.org/sites/default/files/styles/hero_banner_with_timer_short_812_x_400_2x/public/2023-09/hero-salad-with-vegetables-on-plate-diet-food.jpg?h=bc8d5615&itok=SV76u6p6',
    link: 'https://www.cdc.gov/diabetes/managing/active.html',
  },
  // Add more resources as needed
];

const Resources = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Resources on Diabetes Information</h2>
      <p style={styles.subheader}>
        A collection of resources to help you understand and manage diabetes.
      </p>
      <div style={styles.cardContainer}>
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target='_blank'
            rel='noopener noreferrer'
            style={styles.cardLink}
          >
            <div style={styles.card}>
              <img
                src={resource.imageUrl}
                alt={resource.name}
                style={styles.cardImage}
              />
              <div style={styles.cardTitle}>{resource.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
  },
  subheader: {
    fontSize: '1rem',
    marginBottom: '30px',
    color: '#555',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '15px',
    borderRadius: '4px',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default Resources;
