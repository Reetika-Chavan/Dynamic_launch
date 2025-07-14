"use client";

import React, { useState } from "react";
import { Trophy, Flag, Menu, X, ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NewsArticle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const article = {
    id: 1,
    title: "Max Verstappen Dominates Singapore Grand Prix in Spectacular Fashion",
    summary: "The Red Bull driver secured his 10th victory of the season with a masterful performance under the lights at Marina Bay Street Circuit.",
    content: `
      <p>Max Verstappen delivered another commanding performance at the Singapore Grand Prix, leading from pole position to secure his 10th victory of the 2024 Formula 1 season. The Dutch driver's masterful display under the Marina Bay Street Circuit lights further extended his championship lead and demonstrated why he remains the sport's most formidable competitor.</p>

      <p>Starting from pole position, Verstappen controlled the race from the very first corner, managing his tires expertly through the demanding 61-lap race. The Red Bull RB20 showed exceptional pace on the street circuit, with Verstappen consistently setting fastest sectors throughout the evening.</p>

      <p>"The car felt incredible tonight," Verstappen said after the race. "The team has done an amazing job with the setup, and I could really push when I needed to. Singapore is always challenging, but we had everything under control."</p>

      <p>Behind Verstappen, Charles Leclerc put in a strong performance for Ferrari, finishing second after a brilliant overtaking maneuver on Lando Norris in the closing stages. The Monégasque driver's aggressive move at Turn 14 with just eight laps remaining secured valuable points for the Scuderia in their constructors' championship battle.</p>

      <p>Lando Norris completed the podium for McLaren, though the British driver will rue a missed opportunity after losing second place to Leclerc. Despite the disappointment, Norris's third-place finish keeps McLaren firmly in the hunt for the constructors' title.</p>

      <p>The race wasn't without drama, as a safety car period on lap 45 bunched up the field and provided an opportunity for strategic plays. Several drivers, including Lewis Hamilton and George Russell, used the opportunity to switch to fresh tires, but the frontrunners had already built sufficient gaps to maintain their positions.</p>

      <p>With this victory, Verstappen now leads the championship by 75 points with just six races remaining in the season. The Red Bull driver's consistency and pace have been unmatched throughout 2024, making his fourth consecutive championship almost inevitable.</p>

      <p>The next round of the championship heads to Japan in two weeks' time, where Verstappen will look to continue his dominant form at the Suzuka Circuit. With momentum firmly on his side, the Dutch driver appears unstoppable in his quest for another title.</p>
    `,
    image: "https://dev11-images.csnonprod.com/v3/assets/blt210e3fdbc80b0a67/blt4c97a0ecc1a8ff10/verstap.avif",
    date: "2024-09-22",
    readTime: "4 min read",
    author: "F1 News Team",
    category: "Race Report"
  };

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
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-16 pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors group"
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to News
          </Link>
        </div>
      </div>

      {/* Article Hero */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-3xl">
              <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {article.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Meta */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="text-sm">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span className="text-sm">{article.readTime}</span>
              </div>
              <div className="text-sm">
                By <span className="text-red-400">{article.author}</span>
              </div>
            </div>
            <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Article Actions */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Share this article:</span>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Twitter
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  Facebook
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors">
                  LinkedIn
                </button>
              </div>
              <Link
                href="/news"
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                More News
              </Link>
            </div>
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

export default NewsArticle;