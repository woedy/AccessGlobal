import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Eye, EyeOff } from "lucide-react";

interface DonationPersonalization {
  message: string;
  isPublic: boolean;
  isAnonymous: boolean;
}

interface DonationPersonalizationStepProps {
  personalization: DonationPersonalization;
  onPersonalizationChange: (field: keyof DonationPersonalization, value: string | boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DonationPersonalizationStep({
  personalization,
  onPersonalizationChange,
  onNext,
  onBack
}: DonationPersonalizationStepProps) {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Personalize Your Donation</h2>
          <p className="text-xl text-gray-600">Add a personal touch to your contribution</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Message Section */}
          <div className="mb-8">
            <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
              Leave a Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Share why you're donating or leave a message of hope..."
              value={personalization.message}
              onChange={(e) => onPersonalizationChange('message', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
              maxLength={200}
            />
            <div className="text-sm text-gray-500 mt-2 text-right">
              {personalization.message.length}/200 characters
            </div>
          </div>

          {/* Privacy Options */}
          <div className="space-y-6">
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
              
              {/* Public Display Option */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Display on Donor Wall
                    </Label>
                    <p className="text-sm text-gray-500">
                      Show your donation on our public donor wall
                    </p>
                  </div>
                </div>
                <Switch
                  checked={personalization.isPublic}
                  onCheckedChange={(checked) => onPersonalizationChange('isPublic', checked)}
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <EyeOff className="h-5 w-5 text-gray-600" />
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Make Anonymous
                    </Label>
                    <p className="text-sm text-gray-500">
                      Hide your name on the donor wall
                    </p>
                  </div>
                </div>
                <Switch
                  checked={personalization.isAnonymous}
                  onCheckedChange={(checked) => onPersonalizationChange('isAnonymous', checked)}
                />
              </div>
            </div>

            {/* Preview */}
            {personalization.isPublic && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Preview on Donor Wall:</h4>
                <div className="bg-white rounded p-3 border">
                  <div className="flex items-center space-x-2 mb-2">
                    {personalization.isAnonymous ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Heart className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-medium text-gray-900">
                      {personalization.isAnonymous ? 'Anonymous' : 'Your Name'}
                    </span>
                  </div>
                  {personalization.message && (
                    <p className="text-sm text-gray-700 italic">
                      "{personalization.message}"
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <Button onClick={onBack} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">
              Back
            </Button>
            <Button
              onClick={onNext}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

