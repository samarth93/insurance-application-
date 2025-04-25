import React, { useState } from 'react';
import {
  FaCar,
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
  FaCarCrash,
  FaStethoscope,
  FaBalanceScale
} from 'react-icons/fa';
import './CarHowItWorks.css';

const CarHowItWorks = () => {
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
    stolenCar: false,
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

  // FAQ data
  const faqData = [
    {
      question: "How long does it take to process a car insurance claim?",
      answer: "Most straightforward claims are processed within 3-5 working days after all required documents are submitted. Complex claims involving extensive damage assessment or third-party liability may take 7-14 working days."
    },
    {
      question: "Can I track my claim status online?",
      answer: "Yes, you can track your claim status through our mobile app or website. Simply log in to your account, navigate to 'My Claims' section, and you'll be able to see real-time updates on your claim processing."
    },
    {
      question: "What happens if my car is declared a total loss?",
      answer: "If your car is declared a total loss (where repair costs exceed a certain percentage of the car's value), we'll pay you the Insured Declared Value (IDV) of your car minus the policy deductible. If you have a Return to Invoice add-on, you'll receive the invoice value."
    },
    {
      question: "Do I need to pay anything out-of-pocket for repairs?",
      answer: "For cashless claims at network garages, you'll only need to pay the mandatory deductible and any expenses not covered by your policy. For reimbursement claims, you'll pay upfront and then be reimbursed after claim approval."
    },
    {
      question: "What if I disagree with the claim amount offered?",
      answer: "If you disagree with the claim amount, you can request a reassessment with detailed reasoning. Our claims team will review your case and explain the assessment criteria. If still unresolved, you can escalate to our grievance redressal team."
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
      question: "Can I change my preferred garage after filing a claim?",
      answer: "Yes, you can change your preferred garage before repairs begin. Contact our claims team immediately with your claim number and the details of your new preferred garage."
    }
  ];

  return (
    <div className="car-claims-guide-container">
      <header className="claims-guide-header">
        <div className="header-content">
          <div className="header-icon">
            <FaCar size={40} />
          </div>
          <div className="header-text">
            <h1>Car Insurance Claims Process</h1>
            <p>Everything you need to know about filing and tracking your car insurance claim</p>
          </div>
        </div>
      </header>

      <div className="page-actions">
        <button className="action-btn"><FaPrint /> Print</button>
        <button className="action-btn"><FaDownload /> Download PDF</button>
        <button className="action-btn"><FaShare /> Share</button>
      </div>

      <main className="claims-guide-content">
        <nav className="guide-navigation">
          <ul>
            <li><a href="#typesOfClaims">Types of Claims</a></li>
            <li><a href="#claimProcess">Claim Process</a></li>
            <li><a href="#documentsRequired">Documents Required</a></li>
            <li><a href="#rejectionReasons">Reasons for Rejection</a></li>
            <li><a href="#surveyorRole">Surveyor's Role</a></li>
            <li><a href="#thirdPartyDamage">Third-Party Claims</a></li>
            <li><a href="#stolenCar">Stolen Car Claims</a></li>
            <li><a href="#faqs">FAQs</a></li>
          </ul>
        </nav>

        <div className="guide-sections">
          {/* Types of Car Insurance Claims Section */}
          <section className="guide-section" id="typesOfClaims">
            <div 
              className="section-header" 
              onClick={() => toggleSection('typesOfClaims')}
            >
              <h2><FaCar /> Types of Car Insurance Claims</h2>
              <span className="toggle-icon">
                {openSections.typesOfClaims ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.typesOfClaims && (
              <div className="section-content">
                <div className="claim-types-grid">
                  <div className="claim-type-card">
                    <div className="claim-type-icon accident"></div>
                    <h3>Accident Claims</h3>
                    <p>For damages due to collisions or accidents</p>
                    <ul className="claim-features">
                      <li>Coverage for damages to your vehicle</li>
                      <li>Third-party liability coverage</li>
                      <li>Typical processing time: 3-7 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon theft"></div>
                    <h3>Theft Claims</h3>
                    <p>For stolen vehicles or parts</p>
                    <ul className="claim-features">
                      <li>Full coverage for stolen vehicles</li>
                      <li>Requires police report</li>
                      <li>Typical processing time: 30-45 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon natural-disaster"></div>
                    <h3>Natural Disaster Claims</h3>
                    <p>For damage from floods, earthquakes, etc.</p>
                    <ul className="claim-features">
                      <li>Coverage for natural calamities</li>
                      <li>Document-heavy process</li>
                      <li>Typical processing time: 7-14 days</li>
                    </ul>
                  </div>
                  
                  <div className="claim-type-card">
                    <div className="claim-type-icon fire"></div>
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

          {/* Car Insurance Claim Process Section */}
          <section className="guide-section" id="claimProcess">
            <div 
              className="section-header" 
              onClick={() => toggleSection('claimProcess')}
            >
              <h2><FaClipboardCheck /> Car Insurance Claim Process</h2>
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
                      <h3>Vehicle Inspection</h3>
                      <p>Our surveyor will inspect your vehicle to assess the damage and estimate repair costs.</p>
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
                      <h3>Repair Authorization</h3>
                      <p>For cashless claims, we'll authorize the garage to begin repairs. For reimbursement claims, you can proceed with repairs.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Use network garages for smoother experience
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline-item">
                    <div className="timeline-icon">
                      <span>7</span>
                    </div>
                    <div className="timeline-content">
                      <h3>Settlement</h3>
                      <p>For cashless claims, we settle directly with the garage. For reimbursement, submit repair bills for payment to your account.</p>
                      <div className="timeline-tip">
                        <FaInfoCircle /> <strong>Tip:</strong> Keep all original bills and receipts
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="process-types">
                  <div className="process-type">
                    <h3>Cashless Claims</h3>
                    <p>When you choose a network garage, we'll settle the bill directly with them.</p>
                    <ul>
                      <li>No upfront payment (except deductibles)</li>
                      <li>Faster processing</li>
                      <li>Quality-assured repairs</li>
                      <li>Streamlined documentation</li>
                    </ul>
                  </div>
                  
                  <div className="process-type">
                    <h3>Reimbursement Claims</h3>
                    <p>When you choose a non-network garage, you pay first and claim reimbursement later.</p>
                    <ul>
                      <li>Freedom to choose any garage</li>
                      <li>Requires all repair bills and receipts</li>
                      <li>Reimbursement after repair completion</li>
                      <li>Typically takes 7-10 days for payment</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Track Your Car Insurance Claim Section */}
          <section className="guide-section" id="trackClaim">
            <div 
              className="section-header" 
              onClick={() => toggleSection('trackClaim')}
            >
              <h2><FaSearch /> Track Your Car Insurance Claim in Real-Time</h2>
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
                    <div className="mockup-body">
                      <div className="mockup-stages">
                        <div className="mockup-stage completed">
                          <div className="stage-icon">✓</div>
                          <div className="stage-details">
                            <span className="stage-name">Reported</span>
                            <span className="stage-date">May 12, 2023</span>
                          </div>
                        </div>
                        <div className="mockup-stage completed">
                          <div className="stage-icon">✓</div>
                          <div className="stage-details">
                            <span className="stage-name">Documents Received</span>
                            <span className="stage-date">May 13, 2023</span>
                          </div>
                        </div>
                        <div className="mockup-stage active">
                          <div className="stage-icon">⟳</div>
                          <div className="stage-details">
                            <span className="stage-name">Under Assessment</span>
                            <span className="stage-date">In Progress</span>
                          </div>
                        </div>
                        <div className="mockup-stage">
                          <div className="stage-icon">○</div>
                          <div className="stage-details">
                            <span className="stage-name">Approved</span>
                            <span className="stage-date">Pending</span>
                          </div>
                        </div>
                        <div className="mockup-stage">
                          <div className="stage-icon">○</div>
                          <div className="stage-details">
                            <span className="stage-name">Settlement</span>
                            <span className="stage-date">Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tracking-info">
                    <h3>How to Track Your Claim</h3>
                    <ul className="tracking-methods">
                      <li>
                        <span className="method-name">Mobile App:</span>
                        <span className="method-description">Log in to our app, go to 'My Claims' section</span>
                      </li>
                      <li>
                        <span className="method-name">Website:</span>
                        <span className="method-description">Log in to your account, navigate to 'Track Claim'</span>
                      </li>
                      <li>
                        <span className="method-name">SMS:</span>
                        <span className="method-description">Send 'CLAIM STATUS [Claim Number]' to 9876543210</span>
                      </li>
                      <li>
                        <span className="method-name">Email:</span>
                        <span className="method-description">Email us at claims@insuretech.com with your claim number</span>
                      </li>
                      <li>
                        <span className="method-name">Phone:</span>
                        <span className="method-description">Call our 24/7 helpline at 1800-123-4567</span>
                      </li>
                    </ul>
                    
                    <div className="qr-tracking">
                      <div className="qr-placeholder">
                        <p>Scan to track</p>
                      </div>
                      <div className="qr-info">
                        <p>Scan this QR code to instantly track your claim status on your phone</p>
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
              <h2><FaFileAlt /> Documents Required for Car Insurance Claims</h2>
              <span className="toggle-icon">
                {openSections.documentsRequired ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.documentsRequired && (
              <div className="section-content">
                <div className="documents-master-list">
                  <h3>Master Document Checklist</h3>
                  <div className="document-checklist">
                    <div className="document-item">
                      <input type="checkbox" id="doc1" />
                      <label htmlFor="doc1">Duly filled car insurance claim form</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc2" />
                      <label htmlFor="doc2">Copy of insurance policy certificate</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc3" />
                      <label htmlFor="doc3">Driving license of the driver</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc4" />
                      <label htmlFor="doc4">Registration Certificate (RC) of insured vehicle</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc5" />
                      <label htmlFor="doc5">Police FIR (if lodged)</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc6" />
                      <label htmlFor="doc6">Pictures of damages to the vehicle</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc7" />
                      <label htmlFor="doc7">Original repair bills (for reimbursement)</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc8" />
                      <label htmlFor="doc8">Original payment receipts (for reimbursement)</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc9" />
                      <label htmlFor="doc9">Cancelled cheque for bank transfer</label>
                    </div>
                    <div className="document-item">
                      <input type="checkbox" id="doc10" />
                      <label htmlFor="doc10">Fire Brigade Report (for fire claims)</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Documents Required for Different Types of Claims */}
          <section className="guide-section" id="documentsByClaimType">
            <div 
              className="section-header" 
              onClick={() => toggleSection('documentsByClaimType')}
            >
              <h2><FaFileAlt /> Documents Required for Different Types of Claims</h2>
              <span className="toggle-icon">
                {openSections.documentsByClaimType ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            
            {openSections.documentsByClaimType && (
              <div className="section-content">
                <div className="document-accordion">
                  <div className="doc-type-tabs">
                    <button 
                      className={selectedDocType === 'accident' ? 'active' : ''}
                      onClick={() => setSelectedDocType('accident')}
                    >
                      <FaCarCrash /> Accident Claims
                    </button>
                    <button 
                      className={selectedDocType === 'theft' ? 'active' : ''}
                      onClick={() => setSelectedDocType('theft')}
                    >
                      <FaExclamationTriangle /> Theft Claims
                    </button>
                    <button 
                      className={selectedDocType === 'thirdParty' ? 'active' : ''}
                      onClick={() => setSelectedDocType('thirdParty')}
                    >
                      <FaBalanceScale /> Third-Party Claims
                    </button>
                    <button 
                      className={selectedDocType === 'ownDamage' ? 'active' : ''}
                      onClick={() => setSelectedDocType('ownDamage')}
                    >
                      <FaTools /> Own Damage Claims
                    </button>
                  </div>
                  
                  <div className="doc-type-content">
                    {selectedDocType === 'accident' && (
                      <div className="doc-checklist">
                        <h3>Documents Required for Accident Claims</h3>
                        <ul>
                          <li>Driving license of the driver</li>
                          <li>Duly filled car insurance claim form</li>
                          <li>Copy of insurance policy certificate</li>
                          <li>FIR (if lodged)</li>
                          <li>Registration Certificate (RC) of insured vehicle</li>
                          <li>Fire Brigade Report if lodged</li>
                          <li>Cancelled cheque</li>
                          <li>Pictures of damages to vehicle</li>
                          <li>Original repair bills (for reimbursement)</li>
                          <li>Original payment receipts (for reimbursement)</li>
                          <li>Original purchase invoice (if Return to Invoice add-on)</li>
                        </ul>
                      </div>
                    )}
                    
                    {selectedDocType === 'theft' && (
                      <div className="doc-checklist">
                        <h3>Documents Required for Theft Claims</h3>
                        <ul>
                          <li>FIR</li>
                          <li>Registration Certificate of insured vehicle</li>
                          <li>Duly filled car insurance claim form</li>
                          <li>Driving license of owner-driver</li>
                          <li>Copy of insurance policy certificate</li>
                          <li>Non-Traceable Certificate (NTC) from local police</li>
                          <li>Original purchase invoice (if Return to Invoice add-on)</li>
                          <li>Cancelled cheque</li>
                          <li>All original keys of the vehicle</li>
                          <li>RC transfer form with signature</li>
                        </ul>
                      </div>
                    )}
                    
                    {selectedDocType === 'thirdParty' && (
                      <div className="doc-checklist">
                        <h3>Documents Required for Third-Party Claims</h3>
                        <ul>
                          <li>Driving License of driver</li>
                          <li>Duly filled car insurance claim form</li>
                          <li>Copy of insurance policy certificate</li>
                          <li>FIR</li>
                          <li>Registration Certificate of insured vehicle</li>
                          <li>Photos of damages to vehicle</li>
                          <li>Third-party vehicle's information</li>
                          <li>Medical certificates (in case of injuries)</li>
                          <li>Witness statements (if available)</li>
                        </ul>
                      </div>
                    )}
                    
                    {selectedDocType === 'ownDamage' && (
                      <div className="doc-checklist">
                        <h3>Documents Required for Own Damage Claims</h3>
                        <ul>
                          <li>Driving License of driver</li>
                          <li>Duly filled car insurance claim form</li>
                          <li>Copy of Registration Certificate of insured vehicle</li>
                          <li>Copy of insurance policy certificate</li>
                          <li>Pictures of damages to insured vehicle</li>
                          <li>Original Repair bills (for reimbursement)</li>
                          <li>Original payment receipts (for reimbursement)</li>
                          <li>Original purchase invoice (if Return to Invoice add-on)</li>
                          <li>Cancelled cheque for bank transfer</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* FAQ Section */}
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
                <div className="faq-container">
                  <div className="faq-search">
                    <input 
                      type="text" 
                      placeholder="Search FAQs..." 
                      className="faq-search-input"
                    />
                    <button className="faq-search-btn"><FaSearch /></button>
                  </div>
                  
                  <div className="faq-list">
                    {faqData.map((faq, index) => (
                      <div className="faq-item" key={index}>
                        <div className="faq-question">
                          <FaQuestionCircle className="question-icon" />
                          <h3>{faq.question}</h3>
                        </div>
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="ask-question">
                    <h3>Still have questions?</h3>
                    <button className="ask-btn">Ask a Question</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="floating-help-btn">
        <FaQuestionCircle /> Need Help?
      </div>
    </div>
  );
};

export default CarHowItWorks; 
 