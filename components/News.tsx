"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Flag, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const F1News = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        console.error("Failed to load news:", err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b border-red-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-black text-red-600 hover:text-red-400 transition-colors"
              >
                F1
              </Link>
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
                <a href="#" className="text-red-400 font-semibold">
                  News
                </a>
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
            <a href="#" className="text-red-400">
              News
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden mt-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605106702842-0124c8aa490b?w=1200"
            alt="F1 News"
            fill
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                F1 News
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                Latest Headlines
              </h1>
              <p className="text-xl text-gray-300">
                Get the latest updates from the world of Formula 1.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Top Stories
            </h2>
            <p className="text-gray-400 text-lg">
              Stay informed on the 2024 F1 season
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {newsItems.map((news, idx) => (
    <Link
      href={idx === 0 ? "/article" : "#"}
      key={idx}
      className="group"
    >
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all group cursor-pointer transform hover:scale-105">
        <div className="relative">
          {news.image ? (
            <Image
              src={news.image}
              alt={news.title}
              width={800}
              height={224}
              className="w-full h-56 object-cover"
            />
          ) : (
            <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
              No Image Available
            </div>
          )}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded px-3 py-1 text-sm text-red-400 font-semibold">
            {new Date(news.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{news.title}</h3>
          <p className="text-gray-400 text-sm">{news.summary}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-black text-red-600 mb-4">FORMULA 1</div>
          <p className="text-gray-400 mb-6">Catch all the news as it breaks</p>
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

export default F1News;
