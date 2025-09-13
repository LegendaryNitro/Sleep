import React, { useState } from 'react';
import { Check, FileText, Shield, Globe } from 'lucide-react';

interface TermsConditionsProps {
  onAccept: () => void;
  onDecline: () => void;
  context: 'signup' | 'submission';
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onAccept, onDecline, context }) => {
  const [accepted, setAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
    }
  };

  const sections = [
    {
      title: "1. Accounts & Eligibility",
      content: "You must be at least 18 years old to use ARO Platform. By creating an account, you represent that all information provided is accurate and complete. You are responsible for maintaining the security of your account credentials."
    },
    {
      title: "2. Grant of Rights",
      content: "By uploading content to ARO, you grant us a non-exclusive, worldwide license to distribute, promote, and monetize your content across our partner platforms. You retain all ownership rights to your original content."
    },
    {
      title: "3. Warranties & Clearances",
      content: "You warrant that you own all rights to the content you upload, including musical compositions, recordings, videos, and artwork. You are responsible for obtaining all necessary clearances, licenses, and permissions."
    },
    {
      title: "4. Distribution & Partners",
      content: "ARO distributes content to various digital platforms including streaming services, OTT platforms, and AVOD/SVOD services. Distribution timing and availability may vary by platform and territory."
    },
    {
      title: "5. Payments & Fees",
      content: "ARO retains a commission from your earnings as specified in your distribution agreement. Payments are processed monthly for earnings above the minimum threshold. You are responsible for applicable taxes."
    },
    {
      title: "6. Content Guidelines",
      content: "All content must comply with our quality standards and partner platform requirements. Artwork must follow our 2-color rule. Content must not infringe copyright or contain illegal material."
    },
    {
      title: "7. Takedown (DMCA Style)",
      content: "We respond to valid copyright infringement notices. If your content is subject to a takedown request, we will investigate and may remove content pending resolution."
    },
    {
      title: "8. Privacy & Data (POPIA/GDPR)",
      content: "We collect and process personal data in accordance with POPIA and GDPR. You have rights to access, correct, and delete your personal information. Phone number verification is required for account security."
    },
    {
      title: "9. Marketing Consent (SMS/WhatsApp)",
      content: "By providing consent, you agree to receive promotional messages via SMS and WhatsApp about ARO services, new features, and industry updates. You may opt out at any time."
    },
    {
      title: "10. Liability & Indemnity",
      content: "ARO's liability is limited to the maximum extent permitted by law. You agree to indemnify ARO against claims arising from your content or breach of these terms."
    },
    {
      title: "11. Termination",
      content: "Either party may terminate this agreement with 30 days notice. Upon termination, we will cease distribution of your content and process final payments according to our standard schedule."
    },
    {
      title: "12. Dispute Resolution (South Africa)",
      content: "These terms are governed by South African law. Disputes will be resolved through binding arbitration in Johannesburg, South Africa, unless otherwise agreed."
    },
    {
      title: "13. Updates to Terms",
      content: "We may update these terms periodically. Material changes will be communicated via email and platform notifications. Continued use constitutes acceptance of updated terms."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Terms & Conditions</h1>
            <p className="text-gray-600">ARO Music & Video Distribution Platform</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                {context === 'signup' ? 'Account Registration' : 'Content Submission'}
              </p>
              <p className="text-sm text-blue-700">
                Please read these terms carefully before {context === 'signup' ? 'creating your account' : 'submitting your content'}.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms-accept"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms-accept" className="text-sm text-gray-700">
              <span className="font-medium">I have read and agree to the Terms & Conditions *</span>
              <br />
              <span className="text-gray-500">
                By checking this box, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </span>
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="marketing-consent"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="marketing-consent" className="text-sm text-gray-700">
              <span className="font-medium">Marketing Communications (Optional)</span>
              <br />
              <span className="text-gray-500">
                I consent to receive promotional messages via SMS and WhatsApp about ARO services and updates.
              </span>
            </label>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <Globe className="w-4 h-4" />
            <span>
              These terms are governed by South African law and comply with POPIA/GDPR data protection requirements.
            </span>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onDecline}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            disabled={!accepted}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Accept & Continue</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Last updated: January 2024 • Version 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;