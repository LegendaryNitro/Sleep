import React, { useState } from 'react';
import { Upload, Video, Image, Check, AlertCircle } from 'lucide-react';

const VideoUpload: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    cast: '',
    director: '',
    producers: '',
    writers: '',
    runtime: '',
    genres: '',
    rating: '',
    year: '',
    language: '',
    subtitles: '',
    territories: '',
    pricingModel: '',
  });

  const [files, setFiles] = useState({
    video: null as File | null,
    poster: null as File | null,
    thumbnail: null as File | null,
  });

  const [artworkValidation, setArtworkValidation] = useState<{
    poster: { status: 'pending' | 'valid' | 'invalid'; message: string };
    thumbnail: { status: 'pending' | 'valid' | 'invalid'; message: string };
  }>({
    poster: { status: 'pending', message: '' },
    thumbnail: { status: 'pending', message: '' }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (type: 'video' | 'poster' | 'thumbnail', file: File) => {
    setFiles(prev => ({ ...prev, [type]: file }));
    
    if (type === 'poster' || type === 'thumbnail') {
      setTimeout(() => {
        const isValid = Math.random() > 0.3;
        setArtworkValidation(prev => ({
          ...prev,
          [type]: {
            status: isValid ? 'valid' : 'invalid',
            message: isValid 
              ? 'Artwork meets 2-color requirement' 
              : 'Artwork contains more than 2 colors. Please use only 2 colors.'
          }
        }));
      }, 1500);
    }
  };

  const steps = [
    { number: 1, title: 'Upload Files', description: 'Video and artwork' },
    { number: 2, title: 'Metadata', description: 'Movie information' },
    { number: 3, title: 'Cast & Crew', description: 'Credits and details' },
    { number: 4, title: 'Distribution', description: 'Territories and pricing' },
    { number: 5, title: 'Review', description: 'Final review and submit' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Upload</h1>
        <p className="text-gray-600">Upload your video content and distribute to OTT platforms</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center min-w-0">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step >= stepItem.number 
                ? 'bg-purple-600 border-purple-600 text-white' 
                : 'border-gray-300 text-gray-500'
            }`}>
              {step > stepItem.number ? <Check className="w-5 h-5" /> : stepItem.number}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step >= stepItem.number ? 'text-purple-600' : 'text-gray-500'}`}>
                {stepItem.title}
              </p>
              <p className="text-xs text-gray-500">{stepItem.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 ml-4 ${step > stepItem.number ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Upload Files</h2>
            
            {/* Video Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">Upload Video File</p>
              <p className="text-gray-500 mb-4">MP4, MOV, AVI (max 5GB)</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('video', e.target.files[0])}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                Choose File
              </label>
              {files.video && <p className="mt-2 text-sm text-green-600">✓ {files.video.name}</p>}
            </div>

            {/* Poster Upload */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 mb-1">Movie Poster</p>
                <p className="text-sm text-gray-500 mb-3">Vertical, 2 colors only</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('poster', e.target.files[0])}
                  className="hidden"
                  id="poster-upload"
                />
                <label htmlFor="poster-upload" className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                  Choose File
                </label>
                {files.poster && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600">✓ {files.poster.name}</p>
                    {artworkValidation.poster.status !== 'pending' && (
                      <div className={`flex items-center justify-center space-x-1 mt-2 p-2 rounded text-xs ${
                        artworkValidation.poster.status === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {artworkValidation.poster.status === 'valid' ? 
                          <Check className="w-3 h-3" /> : 
                          <AlertCircle className="w-3 h-3" />
                        }
                        <span>{artworkValidation.poster.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="font-medium text-gray-900 mb-1">Thumbnail</p>
                <p className="text-sm text-gray-500 mb-3">Landscape, 2 colors only</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('thumbnail', e.target.files[0])}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
                  Choose File
                </label>
                {files.thumbnail && (
                  <div className="mt-2">
                    <p className="text-xs text-green-600">✓ {files.thumbnail.name}</p>
                    {artworkValidation.thumbnail.status !== 'pending' && (
                      <div className={`flex items-center justify-center space-x-1 mt-2 p-2 rounded text-xs ${
                        artworkValidation.thumbnail.status === 'valid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {artworkValidation.thumbnail.status === 'valid' ? 
                          <Check className="w-3 h-3" /> : 
                          <AlertCircle className="w-3 h-3" />
                        }
                        <span>{artworkValidation.thumbnail.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Movie Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Movie Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter movie title"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Synopsis *</label>
                <textarea
                  value={formData.synopsis}
                  onChange={(e) => handleInputChange('synopsis', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Movie synopsis and description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Runtime (minutes) *</label>
                <input
                  type="number"
                  value={formData.runtime}
                  onChange={(e) => handleInputChange('runtime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Release Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="2024"
                />
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
            onClick={() => setStep(Math.min(5, step + 1))}
            disabled={step === 5}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 5 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;