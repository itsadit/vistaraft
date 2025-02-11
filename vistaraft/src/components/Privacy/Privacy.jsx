function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center text-gray-900 dark:text-white">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 transition-transform duration-300 hover:scale-105">
        Privacy Policy
      </h1>

      {/* Privacy Policy Content */}
      <div className="text-left space-y-6">
        <section>
          <p>
            The terms "<strong>We</strong>," "<strong>Us</strong>," "
            <strong>Our</strong>," or "<strong>Company</strong>" refer to{" "}
            <strong>Vistaraft</strong>. The terms "<strong>You</strong>," "
            <strong>Your</strong>," or "<strong>Yourself</strong>" refer to the
            users of our services.
          </p>
          <p>
            This <strong>Privacy Policy</strong> is an electronic record governed by
            the Information Technology Act, 2000, and its related rules.
          </p>
          <p>
            By using our website or services, you agree to the terms of
            this Privacy Policy. If you do not agree, please refrain from using our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            User Information
          </h2>
          <p>
            To access certain services, you may be required to provide personal information, including:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Name</strong></li>
            <li><strong>Email address</strong></li>
            <li><strong>Gender</strong></li>
            <li><strong>Age</strong></li>
            <li><strong>PIN code</strong></li>
            <li><strong>Payment details</strong> (credit/debit card information)</li>
            <li><strong>Medical history</strong> (if applicable)</li>
            <li><strong>Biometric information</strong> (if applicable)</li>
            <li><strong>Password</strong></li>
            <li><strong>Occupation, interests, and other details</strong></li>
          </ul>
          <p>
            This information helps us enhance our services and personalize your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            Cookies and Tracking
          </h2>
          <p>
            We use <strong>cookies</strong> to enhance your experience on our website. These small files help us
            recognize you and understand your preferences.
          </p>
          <p>
            Cookies <strong>do not</strong> collect personal information unless provided voluntarily.
            Third-party advertisers may also use cookies, which are beyond our control.
          </p>
          <p>
            Additionally, we collect limited technical data such as your <strong>IP address</strong> for web page delivery and traffic analysis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            Links to Other Websites
          </h2>
          <p>
            Our Privacy Policy applies only to our website. Clicking on external links means you are subject to
            their privacy policies, which we do not control.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            Information Sharing and Security
          </h2>
          <p>
            We take data security seriously and implement measures such as:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Regular internal reviews</strong> of data collection practices</li>
            <li><strong>Encryption</strong> and physical security for sensitive data</li>
            <li><strong>Password-protected</strong> access to databases</li>
          </ul>
          <p>
            However, no system is entirely impenetrable, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            Policy Updates
          </h2>
          <p>
            As technology evolves, we may update this Privacy Policy. Any significant changes
            will be communicated to users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-500 pb-2 mb-2">
            Contact Us
          </h2>
          <p>If you have any questions about this Privacy Policy, reach out to us:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Email</strong>: Travelwithvistaraft@gmail.com</li>
            <li><strong>Postal Address</strong>: 1D/64 A, NIT Faridabad 121001</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
