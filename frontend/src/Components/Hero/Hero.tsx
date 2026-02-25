import React from 'react'
import hero from "./logo.png"
import { Link } from 'react-router-dom';
type Props = {}

const Hero = (props: Props) => {
  return (
     <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

      {/* تأثير خلفية ناعم */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-52 h-52 bg-indigo-600 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-sky-600 rounded-full blur-3xl" />
      </div>

      {/* المحتوى */}
      <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">

        {/* النص */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
            Your movies.
            <span className="block text-indigo-400">Organized.</span>
          </h1>

          <p className="text-gray-300 max-w-xl">
            Track, save and rediscover your favorite movies all in one place.
            A clean watchlist built for movie lovers.
          </p>

          <div className="flex gap-4">
            <Link to="/search" className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                               font-semibold text-white transition shadow-lg shadow-indigo-900/40">
              Get started
            </Link>

            <button className="px-6 py-3 rounded-lg border border-gray-600 
                               text-gray-200 hover:border-indigo-500 
                               hover:text-indigo-300 transition">
              Learn more
            </button>
          </div>
        </div>

        {/* صورة / لوغو */}
        <div className="flex justify-center">
          <div className="relative">

            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full 
                            bg-slate-900 border border-slate-700 
                            flex items-center justify-center shadow-[0_0_80px_rgba(79,70,229,0.5)]">

              <img
                src={hero}
                alt="Movies logo"
                className="w-36 md:w-44 object-contain"
              />

            </div>

            {/* دوائر ديكور */}
            <div className="absolute -bottom-6 -right-6 w-14 h-14 border border-indigo-400 rounded-full" />
            <div className="absolute -top-6 -left-4 w-8 h-8 bg-indigo-500 rounded-full blur-sm" />

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero