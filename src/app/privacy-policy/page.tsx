import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Mapman – Privacy Policy</h1>
      
      <p className="mb-4">Mapman operates the Mapman mobile application (the "App"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use Mapman.</p>
      
      <p className="mb-8">By using the App, you agree to the practices described in this Privacy Policy.</p>
      
      <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
      <h3 className="text-lg font-semibold mt-4 mb-2">1.1 Personal Information</h3>
      <p className="mb-2">We collect only the minimum personal information required to provide our services:</p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-1">Mobile phone number – used solely for OTP-based login and account verification.</li>
        <li className="mb-1">We do not collect passwords.</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">1.2 Location Information</h3>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-1">Mapman collects location data to enable map-based and location-dependent features.</li>
        <li className="mb-1">Location access is collected only with your permission.</li>
        <li className="mb-1">You can enable or disable location access at any time through your device settings.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-2">1.3 Usage Information</h3>
      <p className="mb-2">We may collect limited, non-personal usage data such as:</p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-1">App interactions</li>
        <li className="mb-1">Device information (model, OS version)</li>
        <li className="mb-1">Crash logs and performance data</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
      <p className="mb-2">We use the collected information to:</p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-1">Authenticate users using OTP</li>
        <li className="mb-1">Provide and improve map-based features</li>
        <li className="mb-1">Maintain app performance and security</li>
        <li className="mb-1">Communicate important service-related updates</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">3. Data Sharing</h2>
      <p className="mb-4">We do not sell your personal data.</p>
      <p className="mb-2">We may share limited data only with:</p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-1">Service providers (such as OTP SMS services or map providers) strictly for app functionality</li>
        <li className="mb-1">Legal authorities if required by law</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">4. Data Security</h2>
      <p className="mb-2">We use reasonable technical and organizational measures to protect your data.</p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-1">Data is encrypted during transmission</li>
        <li className="mb-1">However, no method of electronic storage is 100% secure</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">5. User Choices & Rights</h2>
      <p className="mb-2">You have the right to:</p>
      <ul className="list-disc pl-6 mb-4">
        <li className="mb-1">Access or update your information</li>
        <li className="mb-1">Withdraw location permissions via device settings</li>
        <li className="mb-1">Request account and data deletion</li>
      </ul>
      <p className="mb-6">To exercise these rights, contact us using the email below.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">6. Data Retention</h2>
      <p className="mb-6">We retain personal data only for as long as necessary to provide the App's services or comply with legal obligations.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
      <p className="mb-6">Mapman is not intended for children under 13. We do not knowingly collect personal information from children.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">8. Changes to This Policy</h2>
      <p className="mb-6">We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated date.</p>

      <h2 className="text-xl font-bold mt-8 mb-4">9. Contact Us</h2>
      <p className="mb-2">If you have any questions about this Privacy Policy, please contact us:</p>
      <p className="mb-6"><strong>mapman6760@gmail.com</strong></p>
    </div>
  );
}
