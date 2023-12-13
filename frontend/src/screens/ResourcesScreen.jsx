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
    backgroundColor: '#f7f7f7', // This is the background color of the container
  },
  header: {
    fontSize: '2rem',
    color: '#333', // Adjust the color to match your design
  },
  subheader: {
    fontSize: '1rem',
    marginBottom: '30px',
    color: '#555', // Adjust the color to match your design
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px', // Adjust the space between cards
  },
  cardLink: {
    textDecoration: 'none',
    color: 'inherit', // This ensures that the link does not have the default link color
  },
  card: {
    width: '300px', // Adjust card width as needed
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adjust the shadow to match your design
    backgroundColor: '#fff', // Card background color
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
    ':hover': {
      transform: 'scale(1.05)', // Slightly scale up the card on hover
    },
  },
  cardImage: {
    width: '100%',
    height: '200px', // Adjust image height as needed
    objectFit: 'cover', // This will make sure the image covers the card
    marginBottom: '15px',
    borderRadius: '4px', // Adjust the border-radius to match your design
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333', // Adjust the title color to match your design
  },
};

export default Resources;
