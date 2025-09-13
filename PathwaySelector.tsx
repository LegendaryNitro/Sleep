import React from 'react';
import { Music, Video, ArrowRight } from 'lucide-react';

interface PathwaySelectorProps {
  onSelectPathway: (pathway: 'music' | 'video') => void;
}

const PathwaySelector: React.FC<PathwaySelectorProps> = ({ onSelectPathway }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 pt-20 pb-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              ARO
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Professional Music & Video Distribution Platform
            </p>
          </div>
        </div>
      </div>

      {/* Pathway Selection */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Choose Your Distribution Path
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Music Pathway */}
            <div 
              onClick={() => onSelectPathway('music')}
              className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-400 transition-colors">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Music Distribution</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Upload audio tracks, add metadata, cover art, and distribute to Spotify, Apple Music, YouTube Music, and more.
                </p>
                <div className="flex items-center justify-center text-blue-300 group-hover:text-blue-200">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Video Pathway */}
            <div 
              onClick={() => onSelectPathway('video')}
              className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-400 transition-colors">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Video Distribution</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Upload movies, add metadata, posters, and distribute to OTT platforms, AVOD/SVOD services worldwide.
                </p>
                <div className="flex items-center justify-center text-purple-300 group-hover:text-purple-200">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwaySelector;