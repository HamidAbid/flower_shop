import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Services data
const servicesData = {
  weddings: {
    title: 'Wedding Flowers',
    description: 'Make your special day unforgettable with our beautiful floral arrangements.',
    hero: 'https://images.unsplash.com/photo-1547131303-94bdd42d6c6d?q=80&w=1470&auto=format&fit=crop',
    intro: 'Your wedding day is one of the most important days of your life. Let us help you create the perfect floral atmosphere for your ceremony and reception. From elegant bouquets to stunning centerpieces, we offer customized floral solutions for weddings of all sizes and styles.',
    packages: [
      {
        id: 'basic',
        name: 'Essential Package',
        price: 1499,
        description: 'Perfect for intimate weddings with essential floral elements',
        includes: [
          'Bridal bouquet',
          'Groom\'s boutonniere',
          '2 Bridesmaid bouquets',
          '2 Groomsmen boutonnieres',
          '2 Parent corsages',
          'Altar/Ceremony arrangement',
          'Cake flowers'
        ],
        image: 'https://images.unsplash.com/photo-1509601824459-c2c6676477c6?q=80&w=1471&auto=format&fit=crop'
      },
      {
        id: 'deluxe',
        name: 'Deluxe Package',
        price: 2999,
        description: 'Comprehensive package for medium-sized weddings',
        includes: [
          'Luxury bridal bouquet',
          'Groom\'s boutonniere',
          '4 Bridesmaid bouquets',
          '4 Groomsmen boutonnieres',
          '4 Parent corsages',
          'Altar/Ceremony arrangement',
          'Cake flowers',
          '8 Centerpieces',
          'Welcome table arrangement',
          'Aisle decorations'
        ],
        image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1470&auto=format&fit=crop'
      },
      {
        id: 'luxury',
        name: 'Luxury Package',
        price: 4999,
        description: 'Premium floral experience for larger celebrations',
        includes: [
          'Premium bridal bouquet',
          'Groom\'s boutonniere',
          '6 Bridesmaid bouquets',
          '6 Groomsmen boutonnieres',
          '6 Parent corsages',
          'Elaborate altar/ceremony arrangements',
          'Cake flowers',
          '12 Centerpieces',
          'Welcome table arrangement',
          'Extensive aisle decorations',
          'Floral arch or backdrop',
          'Reception area features',
          'Ceiling installations',
          'Full venue consultation'
        ],
        image: 'https://images.unsplash.com/photo-1563339007-6914941199f0?q=80&w=1470&auto=format&fit=crop'
      }
    ],
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1470&auto=format&fit=crop',
        caption: 'Elegant ceremony setup'
      },
      {
        image: 'https://images.unsplash.com/photo-1549417229-7686ac5595fd?q=80&w=1470&auto=format&fit=crop',
        caption: 'Romantic table centerpiece'
      },
      {
        image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1374&auto=format&fit=crop',
        caption: 'Bridal bouquet'
      },
      {
        image: 'https://images.unsplash.com/photo-1482575832105-cb49e7b9defa?q=80&w=1470&auto=format&fit=crop',
        caption: 'Wedding venue decoration'
      },
      {
        image: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=1374&auto=format&fit=crop',
        caption: 'Floral arch'
      },
      {
        image: 'https://images.unsplash.com/photo-1533035350251-aa8b8e208d95?q=80&w=1374&auto=format&fit=crop',
        caption: 'Reception table arrangement'
      }
    ],
    faqs: [
      {
        question: 'How far in advance should I book wedding flowers?',
        answer: 'We recommend booking your wedding flowers at least 6-9 months in advance, especially for peak wedding season (May-October). For very popular dates, booking up to a year ahead ensures availability.'
      },
      {
        question: 'Do you offer consultations for wedding flowers?',
        answer: 'Yes, we offer both in-person and virtual consultations for our wedding clients. During this meeting, we will discuss your vision, color scheme, budget, and show you samples of our work.'
      },
      {
        question: 'Can you work with specific color schemes?',
        answer: 'Absolutely! We can match any color scheme you have in mind, from traditional whites and pastels to bold and vibrant combinations. We work with seasonal flowers to achieve your desired palette.'
      },
      {
        question: 'Do you provide setup and delivery for weddings?',
        answer: 'Yes, all our wedding packages include professional delivery and setup at your venue. We coordinate with your venue and wedding planner to ensure everything is placed perfectly.'
      },
      {
        question: 'Can you create custom packages based on my needs?',
        answer: 'Definitely! Our packages are starting points, but we can create a completely customized proposal based on your specific needs, preferences, and budget.'
      }
    ]
  },
  corporate: {
    title: 'Corporate Events',
    description: 'Elevate your corporate events with sophisticated floral designs.',
    hero: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop',
    intro: 'From intimate board meetings to large-scale corporate galas, our floral designs add sophistication and style to any business event. We understand the importance of presenting your company in the best possible light and create custom floral arrangements that align with your brand identity and event objectives.',
    packages: [
      {
        id: 'meeting',
        name: 'Executive Meeting Package',
        price: 299,
        description: 'Perfect for boardrooms and small business meetings',
        includes: [
          'Reception desk arrangement',
          'Conference table centerpiece',
          'Small accent pieces (2-3)',
          'Setup and removal'
        ],
        image: 'https://images.unsplash.com/photo-1520263307231-0cc879ea10d2?q=80&w=1470&auto=format&fit=crop'
      },
      {
        id: 'event',
        name: 'Corporate Event Package',
        price: 999,
        description: 'Ideal for moderate-sized corporate functions',
        includes: [
          'Welcome area display',
          '5-7 Table centerpieces',
          'Speaker podium arrangement',
          'VIP area flowers',
          'Branded color matching',
          'Setup and removal'
        ],
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1470&auto=format&fit=crop'
      },
      {
        id: 'gala',
        name: 'Corporate Gala Package',
        price: 2499,
        description: 'Comprehensive floral design for large corporate events',
        includes: [
          'Grand entrance displays',
          '10-15 Premium table centerpieces',
          'Stage/Podium arrangements',
          'VIP table special designs',
          'Branded color integration',
          'Lounge area arrangements',
          'Bar/Buffet table flowers',
          'Custom logo or company element integration',
          'Full consultation and venue visit',
          'Professional setup and removal'
        ],
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1470&auto=format&fit=crop'
      }
    ],
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop',
        caption: 'Elegant conference setup'
      },
      {
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1470&auto=format&fit=crop',
        caption: 'Corporate event centerpiece'
      },
      {
        image: 'https://images.unsplash.com/photo-1600698280639-f719cb26b399?q=80&w=1462&auto=format&fit=crop',
        caption: 'Reception area display'
      },
      {
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop',
        caption: 'Gala dinner arrangement'
      },
      {
        image: 'https://images.unsplash.com/photo-1603208000755-0c83d364795f?q=80&w=1374&auto=format&fit=crop',
        caption: 'Modern corporate design'
      },
      {
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1632&auto=format&fit=crop',
        caption: 'Company anniversary decoration'
      }
    ],
    faqs: [
      {
        question: 'Do you offer recurring service for office flowers?',
        answer: 'Yes, we provide weekly, bi-weekly, or monthly flower delivery and maintenance services for offices. We can create a customized plan based on your office layout and preferences.'
      },
      {
        question: 'Can you incorporate our company branding into the floral designs?',
        answer: 'Absolutely! We can incorporate your company colors, logo elements, and overall brand aesthetic into our floral designs to create a cohesive look that represents your brand.'
      },
      {
        question: 'How much notice do you need for corporate events?',
        answer: 'For small meetings, 1-2 weeks notice is typically sufficient. For larger events, we recommend 1-3 months depending on the scale. For annual galas and major corporate functions, 3-6 months is ideal.'
      },
      {
        question: 'Do you provide proposals with visual mock-ups?',
        answer: 'Yes, for larger corporate events we provide detailed proposals including visual mock-ups or inspiration boards so you can see what the floral designs will look like before approving.'
      },
      {
        question: 'Are there any discounts for recurring corporate clients?',
        answer: 'Yes, we offer loyalty programs for corporate clients who book multiple events with us or subscribe to our recurring office flower services.'
      }
    ]
  }
};

const Services = () => {
  const { service } = useParams();
  const [activePackage, setActivePackage] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationFlags, setAnimationFlags] = useState({
    hero: false,
    intro: false,
    packages: false,
    gallery: false,
    faq: false,
    contact: false
  });
  
  // Set animations when component mounts
  useEffect(() => {
    // Initial fade-in for hero section
    setAnimationFlags(prev => ({ ...prev, hero: true }));
    
    // Setup IntersectionObserver for other sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setAnimationFlags(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    
    // Observe sections
    const sections = ['intro', 'packages', 'gallery', 'faq', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    
    // Set overall loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, [service]);
  
  // Check if service exists in our data
  if (!service || !servicesData[service]) {
    return (
      <div className="bg-gray-50 py-16 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 slide-up">Service Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 slide-up" style={{animationDelay: '0.2s'}}>
            The service you're looking for doesn't exist or hasn't been created yet.
          </p>
          <a href="/events" className="btn-primary hover-float">
            Back to Event Services
          </a>
        </div>
      </div>
    );
  }
  
  const serviceInfo = servicesData[service];
  
  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div 
        id="hero" 
        className={`relative h-[60vh] ${animationFlags.hero ? 'fade-in' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-accent/70 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${serviceInfo.hero})` }}
        ></div>
        <div className="relative h-full flex items-center justify-center z-20">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${animationFlags.hero ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              {serviceInfo.title}
            </h1>
            <p className={`text-xl text-white mb-8 ${animationFlags.hero ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
              {serviceInfo.description}
            </p>
            <button
              onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              className={`btn-secondary text-base hover-float ${animationFlags.hero ? 'slide-up' : 'opacity-0'}`}
              style={{animationDelay: '0.7s'}}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <section id="intro" className={`py-16 bg-white ${animationFlags.intro ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 ${animationFlags.intro ? 'slide-up' : 'opacity-0'}`}>
            Our {serviceInfo.title} Services
          </h2>
          <p className={`text-lg text-gray-600 ${animationFlags.intro ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            {serviceInfo.intro}
          </p>
        </div>
      </section>
      
      {/* Packages */}
      <section id="packages" className={`py-16 bg-gray-50 ${animationFlags.packages ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 text-center ${animationFlags.packages ? 'slide-up' : 'opacity-0'}`}>
            Our Packages
          </h2>
          <p className={`text-lg text-gray-600 mb-10 text-center max-w-4xl mx-auto ${animationFlags.packages ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            Choose from our carefully designed packages or contact us for a custom solution tailored to your specific needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceInfo.packages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover-grow ${animationFlags.packages ? 'fade-in' : 'opacity-0'}`}
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className="h-48 overflow-hidden hover-shine">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <p className="text-2xl font-bold text-primary mb-4">${pkg.price.toLocaleString()}</p>
                  
                  <button
                    onClick={() => setActivePackage(activePackage === pkg.id ? null : pkg.id)}
                    className="text-primary font-medium hover:text-pink-600 mb-4 flex items-center transition-all duration-300"
                  >
                    {activePackage === pkg.id ? 'Hide Details' : 'View Details'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ml-1 transition-transform duration-300 ${activePackage === pkg.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activePackage === pkg.id && (
                    <div className="mt-2 mb-4 scale-in">
                      <h4 className="font-medium text-gray-900 mb-2">Package Includes:</h4>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start slide-in-right" style={{animationDelay: `${0.1 + idx * 0.05}s`}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button
                    onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary w-full hover-float"
                  >
                    Request This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section id="gallery" className={`py-16 bg-white ${animationFlags.gallery ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 text-center ${animationFlags.gallery ? 'slide-up' : 'opacity-0'}`}>
            Our {serviceInfo.title} Gallery
          </h2>
          <p className={`text-lg text-gray-600 mb-10 text-center max-w-4xl mx-auto ${animationFlags.gallery ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            Browse our portfolio of past {serviceInfo.title.toLowerCase()} to get inspired for your own event.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceInfo.gallery.map((item, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-64 hover-grow ${animationFlags.gallery ? 'scale-in' : 'opacity-0'}`}
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <img 
                  src={item.image} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                  <div className="p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-center">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className={`py-16 bg-gray-50 ${animationFlags.faq ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 text-center ${animationFlags.faq ? 'slide-up' : 'opacity-0'}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 mt-10">
            {serviceInfo.faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 ${animationFlags.faq ? 'slide-up' : 'opacity-0'}`}
                style={{animationDelay: `${0.2 + index * 0.1}s`}}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 scale-in' : 'max-h-0'
                  }`}
                >
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section id="contact" className={`py-16 bg-white ${animationFlags.contact ? 'fade-in' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-gray-900 mb-6 text-center ${animationFlags.contact ? 'slide-up' : 'opacity-0'}`}>
            Request a Quote
          </h2>
          <p className={`text-lg text-gray-600 mb-10 text-center ${animationFlags.contact ? 'slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            Fill out the form below and our events team will contact you within 24 hours to discuss your needs.
          </p>
          
          <form id="contact-form" className={`bg-gray-50 rounded-lg shadow-md p-6 ${animationFlags.contact ? 'scale-in' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="hover-grow">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
                  placeholder="Your Name"
                />
              </div>
              <div className="hover-grow">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
                  placeholder="Your Email"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="hover-grow">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="hover-grow">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
                />
              </div>
            </div>
            
            <div className="mb-6 hover-grow">
              <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-1">Preferred Package</label>
              <select
                id="package"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
              >
                <option value="">Select a package</option>
                {serviceInfo.packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                ))}
                <option value="custom">Custom Package</option>
              </select>
            </div>
            
            <div className="mb-6 hover-grow">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition-all duration-300 hover:border-primary"
                placeholder="Tell us more about your event and specific needs..."
              ></textarea>
            </div>
            
            <button type="submit" className="btn-primary w-full hover-float pulse">
              Submit Request
            </button>
          </form>
        </div>
      </section>
      
      {/* Back to top button */}
      <div className="text-center pb-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-primary border border-primary rounded-full p-3 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Services; 