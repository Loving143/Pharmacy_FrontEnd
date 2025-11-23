import React, { useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import styles from './Homepage.module.css';

const Homepage = () => {
  // Sample data for medicines by category
  const [medicinesByCategory] = useState({
    'Pain Relief': [
      { id: 1, name: 'Paracetamol', price: '$5.99', rating: 4.5, sales: 1200, description: 'Fast pain relief' },
      { id: 2, name: 'Ibuprofen', price: '$7.99', rating: 4.3, sales: 980, description: 'Anti-inflammatory' },
      { id: 3, name: 'Aspirin', price: '$4.99', rating: 4.2, sales: 750, description: 'Heart health' }
    ],
    'Cold & Flu': [
      { id: 4, name: 'Coldrex', price: '$12.99', rating: 4.6, sales: 890, description: 'Cold symptom relief' },
      { id: 5, name: 'Vitamin C', price: '$8.99', rating: 4.4, sales: 1500, description: 'Immune booster' },
      { id: 6, name: 'Nasal Spray', price: '$6.99', rating: 4.1, sales: 620, description: 'Nasal congestion' }
    ],
    'Digestive Health': [
      { id: 7, name: 'Antacid', price: '$9.99', rating: 4.3, sales: 1100, description: 'Acid relief' },
      { id: 8, name: 'Probiotics', price: '$15.99', rating: 4.7, sales: 850, description: 'Gut health' },
      { id: 9, name: 'Laxative', price: '$7.99', rating: 4.0, sales: 530, description: 'Digestive aid' }
    ],
    'Skin Care': [
      { id: 10, name: 'Antibiotic Ointment', price: '$8.99', rating: 4.5, sales: 920, description: 'Infection prevention' },
      { id: 11, name: 'Hydrocortisone', price: '$11.99', rating: 4.4, sales: 780, description: 'Itch relief' },
      { id: 12, name: 'Antifungal Cream', price: '$10.99', rating: 4.6, sales: 670, description: 'Fungal treatment' }
    ]
  });

  // Calculate hot selling medicines (top 6 by sales)
  const hotSellingMedicines = Object.values(medicinesByCategory)
    .flat()
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 6);

  const [activeCategory, setActiveCategory] = useState('Pain Relief');

  return (
    <div className={styles.container}>
      {/* Include the CategoryBar component */}
      <CategoryBar />
      
      {/* Category-based Medicine Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Browse by Medicine Category</h2>
        
        {/* Category Tabs */}
        <div className={styles.tabs}>
          {Object.keys(medicinesByCategory).map(category => (
            <button
              key={category}
              className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Medicine Grid for Active Category */}
        <div className={styles.grid}>
          {medicinesByCategory[activeCategory].map(medicine => (
            <div key={medicine.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.badge}>Medicare</div>
                <div className={styles.rating}>⭐ {medicine.rating}</div>
              </div>
              <div className={styles.image}>
                <div className={styles.imagePlaceholder}>💊</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.medicineName}>{medicine.name}</h3>
                <p className={styles.description}>{medicine.description}</p>
                <div className={styles.priceSection}>
                  <span className={styles.price}>{medicine.price}</span>
                  <span className={styles.sales}>{medicine.sales.toLocaleString()} sold</span>
                </div>
                <button className={styles.cartBtn}>
                  <span>Add to Cart</span>
                  <span className={styles.cartIcon}>🛒</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hot Selling Medicines Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🔥 Hot Selling Medicines</h2>
        <div className={styles.grid}>
          {hotSellingMedicines.map(medicine => (
            <div key={medicine.id} className={`${styles.card} ${styles.hotCard}`}>
              <div className={styles.cardHeader}>
                <div className={styles.hotBadge}>HOT 🔥</div>
                <div className={styles.rating}>⭐ {medicine.rating}</div>
              </div>
              <div className={styles.image}>
                <div className={styles.imagePlaceholder}>🔥</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.medicineName}>{medicine.name}</h3>
                <p className={styles.description}>{medicine.description}</p>
                <div className={styles.priceSection}>
                  <span className={styles.price}>{medicine.price}</span>
                  <span className={styles.sales}>{medicine.sales.toLocaleString()} sold</span>
                </div>
                <button className={styles.buyBtn}>
                  <span>Buy Now</span>
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;