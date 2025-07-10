"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Calendar,
  Trophy,
  Flag,
  Play,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

type HeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  cta_text: string;
};

const F1Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/hero-slides");
        const data = await res.json();
        setHeroSlides(data);
      } catch (err) {
        console.error("Error fetching slides:", err);
      }
    }

    fetchSlides();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const teams = [
    { name: "Red Bull Racing", color: "bg-blue-600", wins: 15 },
    { name: "Mercedes", color: "bg-teal-500", wins: 8 },
    { name: "Ferrari", color: "bg-red-600", wins: 12 },
    { name: "McLaren", color: "bg-orange-500", wins: 6 },
    { name: "Alpine", color: "bg-pink-500", wins: 3 },
    { name: "Aston Martin", color: "bg-green-600", wins: 4 },
  ];

  const races = [
    { name: "Bahrain GP", date: "Mar 02", status: "completed" },
    { name: "Saudi Arabia GP", date: "Mar 09", status: "completed" },
    { name: "Australia GP", date: "Mar 24", status: "completed" },
    { name: "Japan GP", date: "Apr 07", status: "next" },
    { name: "China GP", date: "Apr 21", status: "upcoming" },
    { name: "Miami GP", date: "May 05", status: "upcoming" },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-black text-red-600">F1</div>
              <div className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-white hover:text-red-400 transition-colors"
                >
                  Races
                </a>
                <Link
                  href="/drivers"
                  className="text-white hover:text-red-400 transition-colors"
                >
                  Drivers
                </Link>
                <a
                  href="#"
                  className="text-white hover:text-red-400 transition-colors"
                >
                  Teams
                </a>
                <Link
                  href="/news"
                  className="text-white hover:text-red-400 transition-colors"
                >
                  News
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-colors">
                Watch Live
              </button>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <a href="#" className="text-white hover:text-red-400">
              Races
            </a>
            <Link
              href="/drivers"
              className="text-white hover:text-red-400 transition-colors"
            >
              Drivers
            </Link>
            <a href="#" className="text-white hover:text-red-400">
              Teams
            </a>
            <Link
              href="/news"
              className="text-white hover:text-red-400 transition-colors"
            >
              News
            </Link>
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold">
              Watch Live
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="mb-4">
                {heroSlides.length > 0 && (
                  <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                    {heroSlides[currentSlide].title}
                  </span>
                )}
              </div>
              {heroSlides.length > 0 && (
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  {heroSlides[currentSlide].subtitle}
                </h1>
              )}

              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Experience the pinnacle of motorsport with unparalleled speed,
                precision, and drama.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {heroSlides.length > 0 && (
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                    <Play size={20} />
                    {heroSlides[currentSlide].cta_text}
                  </button>
                )}

                <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all">
                  Explore Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-red-600 w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-red-600 mb-2">
                23
              </div>
              <div className="text-gray-400 uppercase tracking-wide">Races</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-red-600 mb-2">
                20
              </div>
              <div className="text-gray-400 uppercase tracking-wide">
                Drivers
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-red-600 mb-2">
                10
              </div>
              <div className="text-gray-400 uppercase tracking-wide">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-black text-red-600 mb-2">
                350+
              </div>
              <div className="text-gray-400 uppercase tracking-wide">KM/H</div>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Constructor Standings
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow the intense battle between the world&rsquo;s most
              prestigious racing teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <div
                key={team.name}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${team.color}`}></div>
                    <span className="text-2xl font-black">#{index + 1}</span>
                  </div>
                  <Trophy className="text-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Points</span>
                  <span className="text-2xl font-black text-red-400">
                    {team.wins * 25}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* calendar */}
      <div className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Race Calendar
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don&rsquo;t miss a single moment of the championship battle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {races.map((race) => (
              <div
                key={race.name}
                className={`bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all cursor-pointer ${
                  race.status === "next"
                    ? "border-red-600 bg-red-600/10"
                    : race.status === "completed"
                    ? "border-gray-700"
                    : "border-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="text-red-400" />
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      race.status === "next"
                        ? "bg-red-600 text-white"
                        : race.status === "completed"
                        ? "bg-gray-600 text-gray-300"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {race.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{race.name}</h3>
                <p className="text-gray-400 mb-4">{race.date}</p>
                <div className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                  <span className="mr-2">View Details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Never Miss a Race
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get live updates, exclusive content, and behind-the-scenes access to
            Formula 1
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              Subscribe Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all">
              Download App
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-black text-red-600 mb-4">
                FORMULA 1
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The official home of Formula 1. Experience the speed, passion,
                and drama of the worlds premier motorsport championship.
              </p>
              <div className="flex space-x-4">
                <Flag className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
                <Trophy className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
                <Calendar className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">
                Championship
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Driver Standings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Constructor Standings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Race Results
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Statistics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wide">
                Experience
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Live Timing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    F1 TV
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tickets
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Formula 1. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default F1Homepage;
