import Link from "next/link";
import { Shuffle, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Railroad Tiles Card */}
          <Link 
            href="/railroad-tiles"
            className="group block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
          >
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shuffle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Railroad Tiles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Randomize setup for a new Railroad Tiles game.
              </p>
            </div>
          </Link>
					
					{/* Potion Explosion Card */}
          <Link 
            href="/potion-explosion"
            className="group block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500"
          >
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shuffle className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Potion Explosion
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Randomize setup for a new Potion Explosion game.
              </p>
            </div>
          </Link>

          {/* Scoring Card */}
          {/* <Link 
            href="/scoring"
            className="group block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
          >
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Scoring
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Score your own game.
              </p>
            </div>
          </Link> */}
        </div>
      </main>
    </div>
  );
}
