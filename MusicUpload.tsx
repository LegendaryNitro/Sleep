import React, { useState } from 'react';
import { Upload, Music, Image, Check, AlertCircle } from 'lucide-react';

const MusicUpload: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    artists: '',
    isrc: '',
    composers: '',
    producers: '',
    genre: '',
    language: '',
    releaseDate: '',
    upc: '',
    territories: '',
    pricing: '',
    explicit: false,
  });

  const [files, setFiles] = useState({
    audio: null as File | null,
    coverArt: null as File | null,
  });

  const [artworkValidation, setArtworkValidation] = useState<{
    status: 'pending' | 'valid' | 'invalid';
    colors: string[];
    message: string;
  }>({ status: 'pending', colors: [], message: '' });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type: 'audio' | 'coverArt', file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    
    if (type === 'coverArt') {
      // Simulate artwork validation
      setTimeout(() => {
        const isValid = Math.random() > 0.3; // 70% chance of being valid
        setArtworkValidation({
          status: isValid ? 'valid' : 'invalid',
          colors: isValid ? ['#000000', '#FFFFFF'] : ['#FF0000', '#00FF00', '#0000FF'],
          message: isValid 
            ? 'Artwork meets 2-color requirement' 
            : 'Artwork contains more than 2 colors. Please use only 2 colors.'
        });
      }, 1500);
    }
  };

  const steps = [
    { number: 1, title: 'Upload Files', description: 'Audio file and cover art' },
    { number: 2, title: 'Metadata', description: 'Track information' },
    { number: 3, title: 'Distribution', description: 'Territories and pricing' },
    { number: 4, title: 'Review', description: 'Final review and submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Upload</h1>
        <p className="text-gray-600">Upload your music and distribute to major platforms</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step >= stepItem.number 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-500'
            }`}>
              {step > stepItem.number ? <Check className="w-5 h-5" /> : stepItem.number}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step >= stepItem.number ? 'text-blue-600' : 'text-gray-500'}`}>
                {stepItem.title}
              </p>
              <p className="text-xs text-gray-500">{stepItem.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 ml-4 ${step > stepItem.number ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Upload Files</h2>
            
            {/* Audio Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Upload Audio File</p>
              <p className="text-gray-500 mb-4">WAV, MP3, FLAC (max 500MB)</p>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('audio', e.target.files[0])}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Choose File
              </label>
              {files.audio && <p className="mt-2 text-sm text-green-600">✓ {files.audio.name}</p>}
            </div>

            {/* Cover Art Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Upload Cover Art</p>
              <p className="text-gray-500 mb-4">3000×3000px, JPG/PNG, RGB, 2 colors only</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('coverArt', e.target.files[0])}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload" className="bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                Choose File
              </label>
              {files.coverArt && (
                <div className="mt-4">
                  <p className="text-sm text-green-600 mb-2">✓ {files.coverArt.name}</p>
                  {artworkValidation.status !== 'pending' && (
                    <div className={`flex items-center justify-center space-x-2 p-3 rounded-lg ${
                      artworkValidation.status === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {artworkValidation.status === 'valid' ? 
                        <Check className="w-5 h-5" /> : 
                        <AlertCircle className="w-5 h-5" />
                      }
                      <span className="text-sm">{artworkValidation.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Track Metadata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Track Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter track title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artists *</label>
                <input
                  type="text"
                  value={formData.artists}
                  onChange={(e) => handleInputChange('artists', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Artist names"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ISRC</label>
                <input
                  type="text"
                  value={formData.isrc}
                  onChange={(e) => handleInputChange('isrc', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="International Standard Recording Code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Genre *</label>
                <select
                  value={formData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select genre</option>
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hip-hop">Hip Hop</option>
                  <option value="electronic">Electronic</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setStep(Math.min(4, step + 1))}
            disabled={step === 4}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 4 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicUpload;