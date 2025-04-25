import React, { useState } from 'react';
import {
  FaBicycle,
  FaClipboardCheck,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaTools,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaThumbsUp,
  FaSearch,
  FaDownload,
  FaPrint,
  FaShare,
  FaInfoCircle,
  FaQuestionCircle,
  FaHardHat,
  FaStethoscope,
  FaBalanceScale,
  FaMotorcycle,
  FaCloudUploadAlt,
  FaCarCrash,
  FaFireAlt
} from 'react-icons/fa';
import './BikeHowItWorks.css';

const BikeHowItWorks = () => {
  // State to track which accordion sections are open
  const [openSections, setOpenSections] = useState({
    typesOfClaims: true,
    claimProcess: false,
    trackClaim: false,
    documentsRequired: false,
    documentsByClaimType: false,
    rejectionReasons: false,
    avoidRejection: false,
    surveyorRole: false,
    thirdPartyDamage: false,
    stolenBike: false,
    successfulClaim: false,
    whySmooth: false,
    faqs: false
  });

  // State to track which document type is selected in the accordion
  const [selectedDocType, setSelectedDocType] = useState('accident');

  // Toggle accordion section
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle document type selection and prevent event bubbling
  const handleDocTypeSelect = (e, type) => {
    e.stopPropagation();
    setSelectedDocType(type);
  };

  // FAQs data
  const faqsData = [
    {
      question: "How long does it take to process a bike insurance claim?",
      answer: "Typically, bike insurance claims are processed within 7-14 days from the date of submission of all required documents. However, this may vary based on the complexity of the claim and verification requirements."
    },
    {
      question: "Do I need to inform the police about the accident?",
      answer: "Yes, in case of third-party injury/damage or theft, it's mandatory to file an FIR. Even for own damage claims, a police report can help streamline the claims process."
    },
    {
      question: "What if my bike is stolen?",
      answer: "In case of theft, immediately file an FIR at the nearest police station and contact our claims team. You'll need to submit the FIR, all original keys, and an attested copy of your Registration Certificate (RC)."
    },
    {
      question: "Will my premium increase after filing a claim?",
      answer: "Filing a claim may affect your No Claim Bonus (NCB), which could impact your premium at renewal. However, small claims processed under certain limits might not affect your NCB, depending on your policy terms."
    },
    {
      question: "How can I speed up my claim process?",
      answer: "To expedite your claim: (1) Report the incident immediately, (2) Submit all required documents at once, (3) Respond promptly to any queries, (4) Choose a network garage for cashless claims, (5) Keep your policy details handy when communicating with us."
    },
    {
      question: "What protective gear is covered under my policy?",
      answer: "Depending on your policy type and add-ons, specialized riding gear such as helmets, jackets, gloves, and other protective equipment may be covered up to specified limits."
    }
  ];

  const handleActionButtonClick = (e, action) => {
    e.stopPropagation();
    console.log(`Action triggered: ${action}`);
    // Implement actual functionality here
  };

  return (
    <div className="bike-claims-guide-container">
      <header className="claims-guide-header">
        <div className="header-content">
          <div className="header-icon">
            <FaMotorcycle size={40} />
          </div>
          <div className="header-text">
            <h1>Bike Insurance Claims Process</h1>
            <p>Everything you need to know about filing and tracking your bike insurance claim</p>
          </div>
        </div>
      </header>

      <div className="page-actions">
        <button 
          className="action-btn"
          onClick={(e) => handleActionButtonClick(e, 'print')}
        >
          <FaPrint /> Print
        </button>
        <button 
          className="action-btn"
          onClick={(e) => handleActionButtonClick(e, 'download')}
        >
          <FaDownload /> Download PDF
        </button>
        <button 
          className="action-btn"
          onClick={(e) => handleActionButtonClick(e, 'share')}
        >
          <FaShare /> Share
        </button>
      </div>

      <main className="claims-guide-content">
        <nav className="guide-navigation">
          <ul>
            <li><a href="#typesOfClaims" onClick={(e) => {e.preventDefault(); toggleSection('typesOfClaims')}}>Types of Claims</a></li>
            <li><a href="#claimProcess" onClick={(e) => {e.preventDefault(); toggleSection('claimProcess')}}>Claim Process</a></li>
            <li><a href="#documentsRequired" onClick={(e) => {e.preventDefault(); toggleSection('documentsRequired')}}>Documents Required</a></li>
            <li><a href="#rejectionReasons" onClick={(e) => {e.preventDefault(); toggleSection('rejectionReasons')}}>Reasons for Rejection</a></li>
            <li><a href="#surveyorRole" onClick={(e) => {e.preventDefault(); toggleSection('surveyorRole')}}>Surveyor's Role</a></li>
            <li><a href="#thirdPartyDamage" onClick={(e) => {e.preventDefault(); toggleSection('thirdPartyDamage')}}>Third-Party Claims</a></li>
            <li><a href="#stolenBike" onClick={(e) => {e.preventDefault(); toggleSection('stolenBike')}}>Stolen Bike Claims</a></li>
            <li><a href="#faqs" onClick={(e) => {e.preventDefault(); toggleSection('faqs')}}>FAQs</a></li>
          </ul>
        </nav>

        <div className="guide-sections">
          {/* Types of Bike Insurance Claims Section */}
          <section className="guide-section" id="typesOfClaims">
            <div 
              className="section-header" 
              onClick={() => toggleSection('typesOfClaims')}
            >
              <h2><FaMotorcycle /> Types of Bike Insurance Claims</h2>
              <span className="toggle-icon">
                {openSections.typesOfClaims ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.typesOfClaims && (
              <div className="section-content">
                <div className="claim-types-grid">
                  <div className="claim-type-card">
                    <div className="claim-type-icon accident">
                      <FaCarCrash />
                    </div>
                    <h3>Accident Claims</h3>
                    <p>For damages due to collisions or accidents</p>
                    <ul className="claim-features">
                      <li>Coverage for damages to your bike</li>
                      <li>Third-party liability coverage</li>
                      <li>Typical processing time: 3-7 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon theft">
                      <FaExclamationTriangle />
                    </div>
                    <h3>Theft Claims</h3>
                    <p>For stolen bikes or parts</p>
                    <ul className="claim-features">
                      <li>Full coverage for stolen bikes</li>
                      <li>Requires police report</li>
                      <li>Typical processing time: 30-45 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon natural-disaster">
                      <FaCloudUploadAlt />
                    </div>
                    <h3>Natural Disaster Claims</h3>
                    <p>For damage from floods, earthquakes, etc.</p>
                    <ul className="claim-features">
                      <li>Coverage for natural calamities</li>
                      <li>Document-heavy process</li>
                      <li>Typical processing time: 7-14 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon fire">
                      <FaFireAlt />
                    </div>
                    <h3>Fire Claims</h3>
                    <p>For damages due to fire incidents</p>
                    <ul className="claim-features">
                      <li>Coverage for fire damage</li>
                      <li>May require fire department report</li>
                      <li>Typical processing time: 5-10 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Bike Insurance Claim Process Section */}
          <section className="guide-section" id="claimProcess">
            <div 
              className="section-header" 
              onClick={() => toggleSection('claimProcess')}
            >
              <h2><FaClipboardCheck /> Bike Insurance Claim Process</h2>
              <span className="toggle-icon">
                {openSections.claimProcess ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.claimProcess && (
              <div className="section-content">
                <div className="process-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>1</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Report the Incident</h3>
                      <p>Notify us immediately through our app, website, or helpline. Provide your policy number and basic incident details.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Report within 24 hours for faster processing
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>2</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Claim Registration</h3>
                      <p>We'll register your claim and provide a unique claim reference number. Use this for all future communications.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Save your claim number in a safe place
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>3</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Document Submission</h3>
                      <p>Submit all required documents either through our app, email, or at our branch office.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Send all documents at once to avoid delays
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>4</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Bike Inspection</h3>
                      <p>Our surveyor will inspect your bike to assess the damage and estimate repair costs.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Schedule the inspection promptly
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>5</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Claim Approval</h3>
                      <p>Based on the assessment and policy terms, your claim will be approved with the final settlement amount.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Review the approval details carefully
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>6</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Repairs & Settlement</h3>
                      <p>For cashless claims, repairs will begin at the network garage. For reimbursement claims, you'll receive the approved amount in your account.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Verify repairs thoroughly before taking delivery
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="claim-types-comparison">
                  <h3>Types of Claim Settlements</h3>
                  <div className="claim-types-table">
                    <div className="claim-type-row header">
                      <div className="claim-type-cell">Claim Type</div>
                      <div className="claim-type-cell">Process</div>
                      <div className="claim-type-cell">Timeline</div>
                      <div className="claim-type-cell">Key Benefits</div>
                    </div>
                    <div className="claim-type-row">
                      <div className="claim-type-cell highlight">Cashless</div>
                      <div className="claim-type-cell">Repairs done at network garages without you paying upfront</div>
                      <div className="claim-type-cell">3-5 days</div>
                      <div className="claim-type-cell">
                        <ul>
                          <li>No upfront payment</li>
                          <li>Faster processing</li>
                          <li>Quality assured repairs</li>
                        </ul>
                      </div>
                    </div>
                    <div className="claim-type-row">
                      <div className="claim-type-cell highlight">Reimbursement</div>
                      <div className="claim-type-cell">You pay for repairs and then claim reimbursement</div>
                      <div className="claim-type-cell">7-14 days</div>
                      <div className="claim-type-cell">
                        <ul>
                          <li>Freedom to choose any garage</li>
                          <li>Control over repair process</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Documents Required Section */}
          <section className="guide-section" id="documentsRequired">
            <div 
              className="section-header" 
              onClick={() => toggleSection('documentsRequired')}
            >
              <h2><FaFileAlt /> Documents Required for Bike Claims</h2>
              <span className="toggle-icon">
                {openSections.documentsRequired ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.documentsRequired && (
              <div className="section-content">
                <div className="documents-content">
                  <div className="documents-tabs">
                    <button 
                      className={selectedDocType === 'accident' ? 'active' : ''}
                      onClick={(e) => handleDocTypeSelect(e, 'accident')}
                    >
                      Accident
                    </button>
                    <button 
                      className={selectedDocType === 'theft' ? 'active' : ''}
                      onClick={(e) => handleDocTypeSelect(e, 'theft')}
                    >
                      Theft
                    </button>
                    <button 
                      className={selectedDocType === 'natural' ? 'active' : ''}
                      onClick={(e) => handleDocTypeSelect(e, 'natural')}
                    >
                      Natural Disaster
                    </button>
                    <button 
                      className={selectedDocType === 'thirdParty' ? 'active' : ''}
                      onClick={(e) => handleDocTypeSelect(e, 'thirdParty')}
                    >
                      Third-Party
                    </button>
                  </div>
                  
                  <div className="documents-list">
                    {selectedDocType === 'accident' && (
                      <ul>
                        <li><FaCheckCircle className="document-icon success" /> Filled claim form</li>
                        <li><FaCheckCircle className="document-icon success" /> Insurance policy copy</li>
                        <li><FaCheckCircle className="document-icon success" /> Driving license</li>
                        <li><FaCheckCircle className="document-icon success" /> RC book copy</li>
                        <li><FaCheckCircle className="document-icon success" /> Photos of damaged bike</li>
                        <li><FaCheckCircle className="document-icon success" /> Estimate of repairs</li>
                        <li><FaCheckCircle className="document-icon warning" /> Original repair bills and receipts (for reimbursement)</li>
                        <li><FaCheckCircle className="document-icon warning" /> FIR copy (for major accidents)</li>
                      </ul>
                    )}
                    
                    {selectedDocType === 'theft' && (
                      <ul>
                        <li><FaCheckCircle className="document-icon success" /> Filled claim form</li>
                        <li><FaCheckCircle className="document-icon success" /> Insurance policy copy</li>
                        <li><FaCheckCircle className="document-icon success" /> RC book copy</li>
                        <li><FaCheckCircle className="document-icon success" /> FIR copy</li>
                        <li><FaCheckCircle className="document-icon success" /> All original keys</li>
                        <li><FaCheckCircle className="document-icon success" /> Final police report/non-traceable report</li>
                        <li><FaCheckCircle className="document-icon success" /> Transfer form with signature (RTO)</li>
                        <li><FaCheckCircle className="document-icon warning" /> Letter to RTO for vehicle ownership transfer</li>
                      </ul>
                    )}
                    
                    {selectedDocType === 'natural' && (
                      <ul>
                        <li><FaCheckCircle className="document-icon success" /> Filled claim form</li>
                        <li><FaCheckCircle className="document-icon success" /> Insurance policy copy</li>
                        <li><FaCheckCircle className="document-icon success" /> RC book copy</li>
                        <li><FaCheckCircle className="document-icon success" /> Photos of damaged bike</li>
                        <li><FaCheckCircle className="document-icon success" /> Estimate of repairs</li>
                        <li><FaCheckCircle className="document-icon warning" /> Newspaper cuttings as proof of calamity (if available)</li>
                        <li><FaCheckCircle className="document-icon warning" /> Weather report or government notification (if available)</li>
                      </ul>
                    )}
                    
                    {selectedDocType === 'thirdParty' && (
                      <ul>
                        <li><FaCheckCircle className="document-icon success" /> Filled claim form</li>
                        <li><FaCheckCircle className="document-icon success" /> Insurance policy copy</li>
                        <li><FaCheckCircle className="document-icon success" /> Driving license</li>
                        <li><FaCheckCircle className="document-icon success" /> RC book copy</li>
                        <li><FaCheckCircle className="document-icon success" /> FIR copy</li>
                        <li><FaCheckCircle className="document-icon success" /> Damage estimate of third-party property/medical report</li>
                        <li><FaCheckCircle className="document-icon warning" /> Details of the third party</li>
                        <li><FaCheckCircle className="document-icon warning" /> Witness statements (if any)</li>
                      </ul>
                    )}
                  </div>
                  
                  <div className="document-upload-info">
                    <h3>How to submit documents</h3>
                    <div className="upload-methods">
                      <div className="upload-method">
                        <span className="upload-icon"><FaCloudUploadAlt /></span>
                        <h4>Digital Upload</h4>
                        <p>Upload scanned documents through our mobile app or web portal for fastest processing</p>
                      </div>
                      <div className="upload-method">
                        <span className="upload-icon"><FaFileAlt /></span>
                        <h4>Email Submission</h4>
                        <p>Email scanned copies to claims@ourinsurance.com with your claim number in the subject line</p>
                      </div>
                      <div className="upload-method">
                        <span className="upload-icon"><FaUser /></span>
                        <h4>In-Person</h4>
                        <p>Visit our nearest branch office with original documents for verification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Track Your Bike Insurance Claim Section */}
          <section className="guide-section" id="trackClaim">
            <div 
              className="section-header" 
              onClick={() => toggleSection('trackClaim')}
            >
              <h2><FaSearch /> Track Your Bike Insurance Claim</h2>
              <span className="toggle-icon">
                {openSections.trackClaim ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.trackClaim && (
              <div className="section-content">
                <div className="tracking-interface">
                  <div className="tracking-mockup">
                    <div className="mockup-header">
                      <h3>Claim Tracking Interface</h3>
                    </div>
                    <div className="mockup-content">
                      <div className="tracking-options">
                        <h4>Track your claim via:</h4>
                        <div className="tracking-methods">
                          <div className="tracking-method">
                            <div className="method-icon"><FaUser /></div>
                            <div className="method-desc">Customer Portal Login</div>
                          </div>
                          <div className="tracking-method">
                            <div className="method-icon"><FaFileAlt /></div>
                            <div className="method-desc">Claim Number + Phone</div>
                          </div>
                          <div className="tracking-method">
                            <div className="method-icon"><FaMotorcycle /></div>
                            <div className="method-desc">Registration Number</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tracking-statuses">
                        <h4>Claim Status Meanings:</h4>
                        <div className="status-item">
                          <div className="status-indicator registered"></div>
                          <div className="status-details">
                            <h5>Registered</h5>
                            <p>Claim has been reported and registered in our system</p>
                          </div>
                        </div>
                        <div className="status-item">
                          <div className="status-indicator under-review"></div>
                          <div className="status-details">
                            <h5>Under Review</h5>
                            <p>Documents are being verified and assessed</p>
                          </div>
                        </div>
                        <div className="status-item">
                          <div className="status-indicator inspection"></div>
                          <div className="status-details">
                            <h5>Inspection Scheduled</h5>
                            <p>Surveyor appointment has been scheduled</p>
                          </div>
                        </div>
                        <div className="status-item">
                          <div className="status-indicator approved"></div>
                          <div className="status-details">
                            <h5>Approved</h5>
                            <p>Claim has been approved and repair authorization issued</p>
                          </div>
                        </div>
                        <div className="status-item">
                          <div className="status-indicator processing"></div>
                          <div className="status-details">
                            <h5>Processing</h5>
                            <p>Payment is being processed or repairs are underway</p>
                          </div>
                        </div>
                        <div className="status-item">
                          <div className="status-indicator settled"></div>
                          <div className="status-details">
                            <h5>Settled</h5>
                            <p>Claim has been fully settled and closed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* FAQs Section */}
          <section className="guide-section" id="faqs">
            <div 
              className="section-header" 
              onClick={() => toggleSection('faqs')}
            >
              <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
              <span className="toggle-icon">
                {openSections.faqs ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.faqs && (
              <div className="section-content">
                <div className="faqs-container">
                  {faqsData.map((faq, index) => (
                    <div className="faq-item" key={index}>
                      <h3 className="faq-question">{faq.question}</h3>
                      <div className="faq-answer">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BikeHowItWorks; 