import React, { useEffect, useState } from 'react';
import '../styles/Gallery.css';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    category: 'Adventure',
    description: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format',
      title: 'Kedarnath Temple',
      category: 'Temples',
      location: 'Kedarnath',
      date: '2023-06-15'
    },
    {
      url: 'https://media.istockphoto.com/id/1142877679/photo/young-people-enjoying-whitewater-river-rafting-in-river-ganges-rishikesh-india.jpg?s=612x612&w=0&k=20&c=sskxkTsmcseiloBTkv7UGTtb2ZjPTBi-q2aiY83zGXQ=',
      title: 'River Rafting',
      category: 'Adventure',
      location: 'Rishikesh',
      date: '2023-04-22'
    },
    {
      url: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?w=800&auto=format',
      title: 'Naini Lake',
      category: 'Lakes',
      location: 'Nainital',
      date: '2023-05-10'
    },
    {
      url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&auto=format',
      title: 'Skiing in Auli',
      category: 'Adventure',
      location: 'Auli',
      date: '2023-01-15'
    },
    {
      url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&auto=format',
      title: 'Valley of Flowers',
      category: 'Nature',
      location: 'Valley of Flowers',
      date: '2023-07-25'
    },
    {
      url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&auto=format',
      title: 'Rock Climbing',
      category: 'Adventure',
      location: 'Rishikesh',
      date: '2023-03-18'
    },
    {
      url: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=800&auto=format',
      title: 'Badrinath Temple',
      category: 'Temples',
      location: 'Badrinath',
      date: '2023-06-05'
    },
    {
      url: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&auto=format',
      title: 'Mountain Sunset',
      category: 'Nature',
      location: 'Mussoorie',
      date: '2023-02-28'
    },
    {
      url: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&auto=format',
      title: 'Camping Under Stars',
      category: 'Adventure',
      location: 'Chopta',
      date: '2023-03-30'
    },
    {
      url: 'https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?w=800&auto=format',
      title: 'Morning Yoga',
      category: 'Culture',
      location: 'Rishikesh',
      date: '2023-04-10'
    },
    {
      url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&auto=format',
      title: 'Local Market',
      category: 'Culture',
      location: 'Dehradun',
      date: '2023-05-20'
    },
    {
      url: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?w=800&auto=format',
      title: 'Mountain Trek',
      category: 'Adventure',
      location: 'Tungnath',
      date: '2023-04-05'
    },
    {
      url: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&auto=format',
      title: 'Traditional Festival',
      category: 'Culture',
      location: 'Uttarakhand',
      date: '2023-08-12'
    },
    {
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format',
      title: 'Himalayan Peaks',
      category: 'Nature',
      location: 'Gangotri',
      date: '2023-02-15'
    },
    {
      url: 'https://images.unsplash.com/photo-1559521783-1d1599583485?w=800&auto=format',
      title: 'Mountain Views',
      category: 'Nature',
      location: 'Ranikhet',
      date: '2023-07-08'
    }
  ];

  const categories = ['All', 'Adventure', 'Nature', 'Temples', 'Culture', 'Lakes'];
  
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Handle filter button click
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle opening and closing the modal
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    // Reset form after a successful submission
    if (submitSuccess) {
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          title: '',
          location: '',
          category: 'Adventure',
          description: '',
          file: null
        });
      }, 300);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      console.log('Photo submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Automatically close modal after successful submission
      setTimeout(() => {
        closeModal();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1>Photo Gallery</h1>
        <p>Capturing the beauty of Uttarakhand</p>
      </div>

      <div className="gallery-content">
        <div className="gallery-intro">
          <h2>Explore Our Collection</h2>
          <p>Discover the diverse landscapes and cultural richness of Uttarakhand through our curated photo gallery</p>
        </div>

        <div className="gallery-filters-container">
          <div className="gallery-filters">
            {categories.map((category) => (
              <button 
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="gallery-item"
              style={{ 
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              <img src={image.url} alt={image.title} loading="lazy" />
              <div className="image-overlay">
                <h3>{image.title}</h3>
                <p>
                  <span className="location-icon">📍</span> 
                  {image.location}
                </p>
                <span className="category-tag">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="no-images-message">
            <p>No images found for the selected category.</p>
          </div>
        )}

        <div className="gallery-cta">
          <h2>Have Amazing Photos to Share?</h2>
          <p>Submit your Uttarakhand travel photos and get featured in our gallery</p>
          <button className="submit-btn" onClick={openModal}>
            Submit Photos
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>

      {/* Photo Submission Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {submitSuccess ? (
              <div className="submission-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your photo has been submitted successfully. Our team will review it shortly.</p>
              </div>
            ) : (
              <>
                <h2>Submit Your Photo</h2>
                <p className="modal-description">Share your Uttarakhand travel experiences with our community</p>
                
                <form onSubmit={handleSubmit} className="photo-form">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Photo Title</label>
                      <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select 
                      id="category" 
                      name="category" 
                      value={formData.category} 
                      onChange={handleInputChange}
                      required
                    >
                      {categories.filter(cat => cat !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                      id="description" 
                      name="description" 
                      value={formData.description} 
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="form-group file-input-group">
                    <label htmlFor="photo-upload">Upload Photo</label>
                    <input 
                      type="file" 
                      id="photo-upload" 
                      name="photo-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      required 
                    />
                    <p className="file-help">Maximum file size: 10MB. Supported formats: JPG, PNG</p>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-photo-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Photo'}
                    {!isSubmitting && <span className="btn-icon">→</span>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 