import React, { useEffect, useState } from 'react';
import { donationService, PublicDonation } from '@/services/donationService';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, User } from 'lucide-react';

export function DonationWall() {
  const [donations, setDonations] = useState<PublicDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const publicDonations = await donationService.getPublicDonations(true);
      setDonations(publicDonations);
    } catch (err) {
      setError('Failed to load donations');
      console.error('Error loading donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadDonations}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Be the First to Donate!</h3>
        <p className="text-gray-600 mb-4">
          Your generous contribution will help make a difference in communities around the world.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Donor Wall</h2>
        <p className="text-gray-600">
          Thank you to our generous supporters who are making a difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <Card key={donation.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {donation.isAnonymous ? (
                    <User className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Heart className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-semibold text-gray-900">
                    {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                  </span>
                </div>
                <Badge variant={donation.isMonthly ? "default" : "secondary"}>
                  {donation.isMonthly ? 'Monthly' : 'One-time'}
                </Badge>
              </div>

              <div className="mb-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {formatAmount(donation.amount)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(donation.createdAt)}
                </div>
              </div>

              {donation.message && (
                <div className="flex items-start space-x-2">
                  <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 italic">
                    "{donation.message}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-gray-600 mb-4">
          Join our community of supporters and make your mark on the world
        </p>
        <button
          onClick={() => window.location.href = '/donate'}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Make a Donation
        </button>
      </div>
    </div>
  );
}

