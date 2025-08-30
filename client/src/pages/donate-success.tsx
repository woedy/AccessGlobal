import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { stripeService } from '@/services/stripeService';
import { api } from '@/config/api';

export default function DonateSuccess() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [donationDetails, setDonationDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const params = new URLSearchParams(location.split('?')[1] || '');
  const sessionId = params.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Remove duplicate session_id parameter if present
      const cleanSessionId = sessionId.split('?')[0];
      fetchDonationDetails(cleanSessionId);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  const handleSuccessfulPayment = async (sessionId: string) => {
    try {
      const result = await stripeService.handleSuccessfulPayment(sessionId);
      setDonationDetails(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDonationDetails = async (sessionId: string) => {
    try {
      // Fetch donation details from the server using the session ID
      const response = await fetch(api(`donations/session/${sessionId}`));
      if (response.ok) {
        const donation = await response.json();
        setDonationDetails(donation);
      } else {
        // If donation not found, create a basic success message
        setDonationDetails({
          id: sessionId,
          amount: 0,
          isMonthly: false,
          donorInfo: {
            firstName: 'Donor',
            lastName: '',
            email: ''
          },
          message: '',
          isPublic: true,
          status: 'completed',
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Failed to fetch donation details:', err);
      // Show basic success message even if fetch fails
      setDonationDetails({
        id: sessionId,
        amount: 0,
        isMonthly: false,
        donorInfo: {
          firstName: 'Donor',
          lastName: '',
          email: ''
        },
        message: '',
        isPublic: true,
        status: 'completed',
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Processing your donation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <a
            href="/donate"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You!</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            Your donation has been processed successfully. You're now part of our mission to create pathways to opportunity for communities worldwide.
          </p>
          <p className="text-3xl font-bold text-yellow-300 italic">The World is Yours.</p>
        </div>
      </div>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Donation Confirmed
            </h2>
            <p className="text-gray-600">
              We've sent a confirmation email with your donation details.
            </p>
          </div>

          {donationDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Session ID</p>
                  <p className="font-medium text-gray-900">{donationDetails.sessionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-green-600">Completed</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              What happens next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Confirmation Email</h4>
                <p className="text-sm text-gray-600">
                  You'll receive a detailed receipt and confirmation
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Impact Updates</h4>
                <p className="text-sm text-gray-600">
                  Stay informed about how your donation is making a difference
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
                  <svg
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Community</h4>
                <p className="text-sm text-gray-600">
                  Join our community of supporters and stay connected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Want to do more?
            </h3>
            <p className="text-blue-700 mb-4">
              Share our mission with friends and family, or consider becoming a monthly supporter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Make Another Donation
              </a>
              <a
                href="/get-involved"
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Involved
              </a>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Questions about your donation?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help. Contact us with any questions or concerns.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
