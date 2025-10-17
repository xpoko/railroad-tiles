"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shuffle, ArrowLeft, FlaskConical } from "lucide-react";

const POTIONS = [
	{
		name: "POTION OF WISDOM",
		condition:
			"Take one Ingredient of your choice from the Dispenser. No Explosions are triggered.",
		type: "",
	},
	{
		name: "ELIXIR OF BLIND LOVE",
		condition: "Steal all the Ingredients from 1 opponent's Pool.",
		type: "",
	},
	{
		name: "POTION OF MAGNETICAL ATTRACTION",
		condition:
			"Take 2 adjacent Ingredients of different colors from the same slide track of the Dispenser. No Explosions are triggered.",
		type: "",
	},
	{
		name: "POTION OF PRISMATIC JOY",
		condition:
			"You can place all Ingredients in your Pool on any holes of your incomplete Potions, regardless of their color.",
		type: "",
	},
	{
		name: "ABYSSAL DRAFT",
		condition:
			"Take up to 1 Ingredient of each color from the bottom row of the Dispenser slide tracks. You can only take 1 Ingredient from each slide track.",
		type: "",
	},
	{
		name: "SANDS OF TIME",
		condition: "Activate again the effect of 1 Potion you already used.",
		type: "",
	},
	{
		name: "BALM OF UTTERMOST STICKINESS",
		condition:
			"Take 2 or more adjacent Ingredients of the same color from the same slide track of the Dispenser. No Explosions are triggered.",
		type: "",
	},
	{
		name: "FILTER OF LAVAMANCING",
		condition:
			"Discard up to 5 Ingredients of 1 color from the same slide track of the Dispenser back into the tank. No Explosions are triggered.",
		type: "",
	},
	{
		name: "FULMINATING SERUM",
		condition:
			"Discard 2 Ingredients of your choice from the same slide track of the Dispenser back into the tank. No Explosions are triggered.",
		type: "",
	},
	{
		name: "SERUM OF INVISIBILITY",
		condition:
			"Steal an ingredient from one opponent’s Pool or incomplete Potion",
		type: "",
	},
	{
		name: "TONIC OF GLACIAL PRESERVATION",
		condition:
			"You can place up to 2 marbles from your hand on any holes of its tile as temporary storage, for a later use",
		type: "",
	},
	{
		name: "GENEROSITY CONFECTION",
		condition:
			"Take a number of adjacent Ingredients from the same slide track of the Dispenser equal to the number of players, then place 1 of these Ingredients in each opponent's Pool and keep 1 for yourself. If an opponent's Pool is already full, discard that Ingredient back into the Dispenser.",
		type: "",
	},
	{
		name: "CONCENTRATE OF SELFISHNESS",
		condition: "Steal 1 Ingredient from each opponent's Pool.",
		type: "",
	},
	{
		name: "BREW OF FEATHER TOUCH",
		condition:
			"Take 2 or more adjacent Ingredients of the same color from the same row of the Dispenser (not slide track). You can only take 1 Ingredient from each slide track. No explosions are triggered.",
		type: "",
	},
	{
		name: "CHAMELEONIC VARNISH",
		condition:
			"Choose a color. All Ingredients of that color in your hand are now treated as being a single other color of your choice (you cannot choose 'wild' as your color).",
		type: "",
	},
	{
		name: "GHASTLY CONCOCTION",
		condition: "Exchange an Ingredient in your hand with the Ghastly Cauldron.",
		type: "",
	},
	{
		name: "DRAM OF POLTERGEIST SWEAT",
		condition:
			"Steal 1 Ingredient from 1 opponent's Pool, then Exchange it with the Ghastly Cauldron.",
		type: "",
	},
];

type Item = {
	name: string;
	condition: string;
	type: string;
};

export default function Randomizer() {
	const [randomizedItems, setRandomizedItems] = useState<Item[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);

	const shuffleArray = <T,>(array: T[]): T[] => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	const handleRandomize = () => {
		setIsAnimating(true);

		// Randomize potions
		const potionShuffled = shuffleArray(POTIONS);

		setTimeout(() => {
			setRandomizedItems(potionShuffled.slice(0, 6));
			setIsAnimating(false);
		}, 300);
	};

	const hasRandomizedItems = randomizedItems.length > 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-4 transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Home
					</Link>

					<h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">
						Potion Explosion
					</h1>
					<p className="text-center text-gray-600 dark:text-gray-400 mb-2">
						Potion Randomizer
					</p>

					{/* Controls */}
					<div className="bg-gradient-to-r from-pink-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 mb-2">
						<div className="flex flex-col md:flex-row items-center gap-4 justify-center">
							<button
								onClick={handleRandomize}
								className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
							>
								<Shuffle
									className={`w-5 h-5 ${isAnimating ? "animate-spin" : ""}`}
								/>
								Randomize
							</button>
						</div>
					</div>

					{/* Randomized Results - Potions */}
					{hasRandomizedItems && (
						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
								Randomized Selection
							</h2>

							{/* Potions */}
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
									<FlaskConical className="w-5 h-5 text-pink-600 dark:text-pink-400" />
									Potions (6)
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{randomizedItems.map((item, index) => (
										<div
											key={index}
											className="flex flex-col gap-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-pink-400 dark:border-pink-600 rounded-lg p-3 text-center text-gray-800 dark:text-white font-semibold shadow-sm animate-fade-in"
											style={{
												animationDelay: `${index * 100}ms`,
											}}
										>
											<span className="text-sm text-pink-600 dark:text-pink-400 font-bold block">
												#{index + 1}
											</span>
											<span className="text-lg">{item.name}</span>
											<span className="text-sm font-normal">
												{item.condition}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{!hasRandomizedItems && (
						<div className="mb-8 text-center p-12 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
							<Shuffle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
							<p className="text-gray-500 dark:text-gray-400 text-lg">
								Click the <strong>Randomize</strong> button to generate your
								potions!
							</p>
						</div>
					)}

					{/* All Potions List */}
					<div className="mt-4 mb-8">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
							<span className="w-1 h-6 bg-pink-500 rounded"></span>
							All Potions ({POTIONS.length})
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							{POTIONS.map((item, index) => (
								<div
									key={index}
									className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 text-center text-gray-700 dark:text-gray-300 text-sm font-medium"
								>
									{item.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(-10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.3s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	);
}
