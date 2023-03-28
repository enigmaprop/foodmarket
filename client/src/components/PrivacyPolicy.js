import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">
                Mall is committed to protecting your privacy. This Privacy Policy applies to our website [Insert your website URL] and governs data collection and usage. By using our website, you consent to the data practices described in this policy.
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Information we collect</h2>
              <p className="text-gray-600 mt-2">
                [Insert information about the types of information you collect from users, such as names, email addresses, etc.]
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">How we use your information</h2>
              <p className="text-gray-600 mt-2">
                [Insert information about how you use the information you collect from users, such as to personalize user experience, to send periodic emails, etc.]
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Sharing of your information</h2>
              <p className="text-gray-600 mt-2">
                [Insert information about who you may share user information with, such as third-party service providers, and why you may share this information.]
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Security of your information</h2>
              <p className="text-gray-600 mt-2">
                [Insert information about how you protect user information, such as through encryption, secure servers, etc.]
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Changes to this Privacy Policy</h2>
              <p className="text-gray-600 mt-2">
                [Insert information about how and when you may update this Privacy Policy.]
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-800">Contacting us</h2>
              <p className="text-gray-600 mt-2">
                If you have any questions about this Privacy Policy, please contact us at [Insert your contact email address].
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
