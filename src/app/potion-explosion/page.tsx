"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shuffle, ArrowLeft, FlaskConical } from "lucide-react";

const PROFESSORS = [
	{
		name: "ALBERTUS HUMBLESCORE",
		rule: "You can discard 2 Ingredient marbles of the same color from your hand to discard 1 of your Little Help tokens.",
	},
	{
		name: "GIDEON PRISSYMANN",
		rule: "If you let one or more of your Ingredient marbles touch the table during your turn, you receive 1 Scolding token.",
	},
	{
		name: "ANTIGUA THRIFTYMIND",
		rule: "If your Ingredient Pool is full at the end of your turn, you may Exchange 1 of those Ingredients with the Ghastly Cauldron.",
		usesGhastlyCauldron: true,
	},
	{
		name: "OVERWHELMA EXPLOSIWA",
		rule: "If you collect 8 or more Ingredient marbles with your regular pick, you may Exchange 1 of those Ingredients with the Ghastly Cauldron.",
		usesGhastlyCauldron: true,
	},
	{
		name: "GRAVITHA TIDYGALL",
		rule: "When you place Ingredients on your Potion tiles, you have to start with the lowest layer and proceed upwards. The first time you place a marble in an upper layer of a Potion with 1 or more holes still empty in the lower layers, place a Scolding token on that Potion tile. You will be punished only once, though. There can only be a maximum of 1 Scolding token on each Potion tile. When that Potion is completed, add the Scolding token to your token pool.",
	},
	{
		name: "SHI ZAN SHUIMO",
		rule: "Whenever you take a Little Help token, you may choose to take 1 marble from the dispenser as normal OR activate the effect of a Potion you have already used.",
	},
	{
		name: "FRANKLIN STICKLER",
		rule: "When you perform your regular pick for the turn, you must pick two adjacent marbles from the same slide track of the Dispenser, instead of just one.",
	},
	{
		name: "ANXIOGENOUS O’CLOCKITT",
		rule: "You have 90 seconds to complete your turn. If the time runs out before you have completed your turn, you receive 1 Scolding token, then start the timer again. You receive 1 Scolding token each time you let the timer run out.",
	},
];

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

type Professor = {
	name: string;
	rule: string;
	usesGhastlyCauldron?: boolean;
};

export default function Randomizer() {
	const [randomizedItems, setRandomizedItems] = useState<Item[]>([]);
	const [randomizedProfessors, setRandomizedProfessors] = useState<Professor[]>([]);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isProfessorAnimating, setIsProfessorAnimating] = useState(false);

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

		// Randomize potions only
		const potionShuffled = shuffleArray(POTIONS);

		setTimeout(() => {
			setRandomizedItems(potionShuffled.slice(0, 6));
			setIsAnimating(false);
		}, 300);
	};

	const handleRandomizeProfessors = (count: number) => {
		setIsProfessorAnimating(true);

		// Pick random professors
		const professorShuffled = shuffleArray(PROFESSORS);

		setTimeout(() => {
			setRandomizedProfessors(professorShuffled.slice(0, count));
			setIsProfessorAnimating(false);
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
						<div className="flex flex-col gap-4">
							{/* Potion Randomizer */}
							<div className="flex flex-col items-center gap-2">
								<h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
									Randomize Potions
								</h3>
								<button
									onClick={handleRandomize}
									className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
								>
									<Shuffle
										className={`w-5 h-5 ${isAnimating ? "animate-spin" : ""}`}
									/>
									Randomize 6 Potions
								</button>
							</div>

							{/* Professor Randomizer */}
							<div className="flex flex-col items-center gap-2">
								<h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
									Randomize Professors
								</h3>
								<div className="flex gap-3">
									<button
										onClick={() => handleRandomizeProfessors(1)}
										className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
									>
										<Shuffle
											className={`w-5 h-5 ${isProfessorAnimating ? "animate-spin" : ""}`}
										/>
										1 Professor
									</button>
									<button
										onClick={() => handleRandomizeProfessors(2)}
										className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
									>
										<Shuffle
											className={`w-5 h-5 ${isProfessorAnimating ? "animate-spin" : ""}`}
										/>
										2 Professors
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Randomized Results - Professors */}
					{randomizedProfessors.length > 0 && (
						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
								Randomized Professor{randomizedProfessors.length > 1 ? 's' : ''}
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{randomizedProfessors.map((professor, index) => (
									<div
										key={index}
										className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 border-3 border-purple-500 dark:border-purple-600 rounded-xl p-5 shadow-lg animate-fade-in"
										style={{
											animationDelay: `${index * 100}ms`,
										}}
									>
										<h4 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-3">
											{professor.name}
											{professor.usesGhastlyCauldron && (
												<span className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-400">
													(uses the Ghastly Cauldron)
												</span>
											)}
										</h4>
										<p className="text-base text-gray-800 dark:text-gray-200">
											{professor.rule}
										</p>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Randomized Results - Potions */}
					{hasRandomizedItems && (
						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
								Randomized Potions
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

					{!hasRandomizedItems && randomizedProfessors.length === 0 && (
						<div className="mb-8 text-center p-12 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
							<Shuffle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
							<p className="text-gray-500 dark:text-gray-400 text-lg">
								Click the buttons above to randomize potions and professors!
							</p>
						</div>
					)}

					{/* All Professors List */}
					<div className="mt-4 mb-8">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
							<span className="w-1 h-6 bg-purple-500 rounded"></span>
							All Professors ({PROFESSORS.length})
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{PROFESSORS.map((professor, index) => (
								<div
									key={index}
									className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-2 border-purple-300 dark:border-purple-600 rounded-lg p-4 text-gray-800 dark:text-white shadow-sm"
								>
									<h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">
										{professor.name}
										{professor.usesGhastlyCauldron && (
											<span className="ml-2 text-xs font-normal text-gray-600 dark:text-gray-400">
												(uses the Ghastly Cauldron)
											</span>
										)}
									</h3>
									<p className="text-sm font-normal text-gray-700 dark:text-gray-300">
										{professor.rule}
									</p>
								</div>
							))}
						</div>
					</div>

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
