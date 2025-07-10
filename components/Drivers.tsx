"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Trophy, Flag, Menu, X, Star } from 'lucide-react';
import Link from 'next/link';


const F1DriversPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch('/api/drivers');
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error("Failed to fetch drivers", error);
      }
    }

    fetchDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-black text-red-600 hover:text-red-400 transition-colors">
                F1
              </Link>
              <div className="hidden md:flex space-x-8">
                <a href="#" className="text-white hover:text-red-400 transition-colors">Races</a>
                <a href="#" className="text-red-400 font-semibold">Drivers</a>
                <a href="#" className="text-white hover:text-red-400 transition-colors">Teams</a>
                <Link href="news" className="text-white hover:text-red-400 transition-colors">News</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-colors">
                Watch Live
              </button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <a href="#" className="text-white hover:text-red-400">Races</a>
            <a href="#" className="text-red-400">Drivers</a>
            <a href="#" className="text-white hover:text-red-400">Teams</a>
            <Link href="news" className="text-white hover:text-red-400 transition-colors">News</Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden mt-16">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop"
            alt="F1 Drivers"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                2024 Championship
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">F1 Drivers</h1>
              <p className="text-xl text-gray-300">
                The worlds elite racing drivers competing for the ultimate prize.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Championship Leader */}
      {drivers.length > 0 && (
        <div className="py-16 bg-gradient-to-r from-blue-600/20 to-red-600/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-red-600/30">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative">
                  <Image
                    src={drivers[0].images.url}
                    alt={drivers[0].title}
                    width={192}
                    height={240}
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="text-center lg:text-left flex-1">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <Star className="text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-400 uppercase tracking-wide">Championship Leader</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <span className="text-4xl mr-3">{drivers[0].flag}</span>
                    <h2 className="text-3xl md:text-4xl font-black">{drivers[0].title}</h2>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className={`w-4 h-4 rounded-full ${drivers[0].teamcolour} mr-3`}></div>
                    <span className="text-xl">{drivers[0].team}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-black text-red-400">{drivers[0].points}</div>
                      <div className="text-gray-400 text-sm uppercase">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-red-400">{drivers[0].win}</div>
                      <div className="text-gray-400 text-sm uppercase">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-red-400">3</div>
                      <div className="text-gray-400 text-sm uppercase">Titles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drivers Grid */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Driver Standings</h2>
            <p className="text-gray-400 text-lg">2024 Championship Battle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drivers.map((driver, index) => (
              <div
                key={driver.uid}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all group cursor-pointer transform hover:scale-105"
              >
                <div className="relative">
                  <div className="relative w-full h-56">
                    <Image
                      src={driver.images.url}
                      alt={driver.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xl font-black text-red-400">#{index + 1}</span>
                  </div>
                  <div className="absolute top-4 right-4 text-2xl">{driver.flag}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`w-3 h-3 rounded-full ${driver.teamcolour} mr-2`}></div>
                    <span className="text-sm text-gray-400 uppercase tracking-wide">{driver.team}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{driver.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-black text-red-400">{driver.points}</div>
                      <div className="text-xs text-gray-500 uppercase">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-red-400">{driver.win}</div>
                      <div className="text-xs text-gray-500 uppercase">Wins</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black text-red-600 mb-4">FORMULA 1</div>
          <p className="text-gray-400 mb-6">The pinnacle of motorsport excellence</p>
          <div className="flex justify-center space-x-6">
            <Flag className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
            <Trophy className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            <p>&copy; 2024 Formula 1. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default F1DriversPage;