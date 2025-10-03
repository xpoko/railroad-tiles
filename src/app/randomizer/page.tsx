"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shuffle, ArrowLeft, MapPin, Users, Truck, Train } from "lucide-react";

const LOCATIONS = [
	{
		name: "CENTRAL STATION",
		condition:
			"The Central Station must be connected to at least 5 Stations only counting Railroad paths.",
		type: "",
	},
	{
		name: "CITY HALL",
		condition:
			"The City Hall must have at least 2 adjacent tiles in each of the four orthogonal directions (up, down, left, right).",
		type: "",
	},
	{
		name: "GAS STATION",
		condition:
			"The Gas Station must be part of a continuous path with at least 8 connected Highway segments; in case of looping paths, the same Highway segment cannot be counted more than once.",
		type: "",
	},
	{
		name: "METROPOLIS",
		condition:
			"The Metropolis must be part of a City made of at least 5 Town tiles.",
		type: "",
	},
	{
		name: "STADIUM",
		condition:
			"The Stadium must have at least 3 Traveler pawns in the tiles that surround it.",
		type: "",
	},
	{
		name: "TEMPLE",
		condition:
			"The Temple must not have any Car nor Train Pinpoints on the tiles that surround it.",
		type: "",
	},
	{
		name: "AIRPORT",
		condition:
			"The Airport must be placed in the same row or column as at least 1 Town tile that is part of a City.",
		type: "",
	},
	{
		name: "SWAMP",
		condition:
			"The Swamp must not have any Traveler Pinpoints on the tiles that surround it.",
		type: "",
	},
	{
		name: "AMUSEMENT PARK",
		condition:
			"The Theme Park must have at least 2 Cities connected to it only through Highways.",
		type: "",
	},
	{
		name: "QUARRY",
		condition:
			"The Quarry must be part of a continuous path with at least 8 connected Railroad segments; in case of looping paths, the same Railroad segment cannot be counted more than once.",
		type: "",
	},
	{
		name: "RACING STANDS",
		condition:
			"The Racing Stands must be part of a Highway loop: a path made of Highway segments that returns to the starting point, passing through each segment only once.",
		type: "",
	},
	{
		name: "OBSERVATORY",
		condition:
			"The Observatory must be placed in the same row or column as at least 6 other tiles.",
		type: "",
	},
	{
		name: "CEMETERY",
		condition:
			"The Cemetery must be completely surrounded by other tiles (8 tiles).",
		type: "",
	},
	{
		name: "FACTORY",
		condition:
			"The Factory must have at least 3 Trains on the tiles that surround it.",
		type: "",
	},
	{
		name: "HOTEL",
		condition:
			"The Hotel must be in the same row and/or column as at least 4 Stations. This tile counts as a Town tile.",
		type: "",
	},
	{
		name: "BARRACKS",
		condition:
			"The Military Base must not have any Stations on the tiles that surround it.",
		type: "",
	},
	{
		name: "DUMP",
		condition:
			"The Junkyard must not have any Town tiles in the spaces surrounding it.",
		type: "",
	},
];

const RED_PAWNS = [
	{
		name: "FAMILY",
		condition:
			"When you place the Family, you gain 2 additional points if there is at least 1 Traveler connected to this pawn's Pinpoints only through either Highways or Railroads (without switching at Stations).",
		type: "",
	},
	{
		name: "MECHANIC",
		condition:
			"You may place the Mechanic on a Train Pinpoint. If you do, you gain 1 additional point.",
		type: "",
	},
	{
		name: "POLICE OFFICER",
		condition:
			"You may place the Police Officer on any tile where 3 or more Highway segments intersect, even without a Pinpoint. If you do, you gain 1 additional point.",
		type: "",
	},
	{
		name: "MAYOR",
		condition:
			"When you place the Mayor, you gain 2 additional points if it is placed within your Biggest Rectangle at the time when you place it.",
		type: "",
	},
	{
		name: "THIEF",
		condition:
			"You may place the Thief on any tile with a Station, even without a Pinpoint.",
		type: "",
	},
	{
		name: "TOURIST",
		condition:
			"You may place the Tourist on any tile that you placed during the current round, even without a Pinpoint.",
		type: "",
	},
	{
		name: "DOG",
		condition:
			"You may place the Dog on any tile containing a Traveler, even without an empty Pinpoint.",
		type: "",
	},
];

const BLUE_PAWNS = [
	{
		name: "RACING CAR",
		condition:
			"When you place the Racing Car, you gain 2 additional points if there are no other Cars connected to this pawn's Pinpoint within 2 tiles distance only through Highways.",
		type: "",
	},
	{
		name: "BUS",
		condition:
			"When you place the Bus, you gain 2 additional points if there is at least 1 Traveler connected to this pawn's Pinpoint only through Highways.",
		type: "",
	},
	{
		name: "TOW TRUCK",
		condition:
			"When you place the Tow Truck, you may remove any Traveler's pawn's Pinpoint only through Highways to gain 2 points.",
		type: "",
	},
	{
		name: "CEMENT MIXER",
		condition:
			"When you place the Cement Mixer, you may draw a Route tile from the bag. If you do, you must place the tile following the regular rules.",
		type: "",
	},
	{
		name: "TRACTOR",
		condition:
			"When you place the Tractor, you gain 2 additional points if there are no Town tiles in the spaces surrounding it.",
		type: "",
	},
	{
		name: "OFF-ROAD VEHICLE",
		condition:
			'When you place the Off-Road Vehicle, you gain 2 additional points if there is a "Dead-End Highway" tile connected to this pawn\'s Pinpoint only through Highways.',
		type: "",
	},
];

const YELLOW_PAWNS = [
	{
		name: "STEAM TRAIN",
		condition:
			"When you place the Steam Train, you gain 2 additional points if there is a Station connected to this pawn's Pinpoint within 2 tiles distance only through Railroads.",
		type: "",
	},
	{
		name: "CIRCUS WAGON",
		condition: "Once placed, the Circus Wagon counts as a Traveler Pinpoint.",
		type: "",
	},
	{
		name: "LIGHT RAIL",
		condition:
			"When you place the Light Rail, you gain 2 additional points if there is a Town tile connected to this pawn's Pinpoint only through Railroads.",
		type: "",
	},
	{
		name: "CRANE WAGON",
		condition:
			"When you place the Crane Wagon, you can move Stations (except this one) (without any pawns on it) to a new position in your play area, following the regular placement rules.",
		type: "",
	},
	{
		name: "CARGO WAGON",
		condition:
			"When you place the Cargo Wagon, you gain 2 additional points if there are no Stations on the tiles that surround it.",
		type: "",
	},
	{
		name: "BULLET TRAIN",
		condition:
			'When you place the Bullet Train, you gain 2 additional points if there is a "Straight Railway" tile connected to this pawn\'s Pinpoint only through Railroads.',
		type: "",
	},
];

type TabType = "locations" | "red" | "blue" | "yellow";

type Item = {
	name: string;
	condition: string;
	type: string;
};

export default function Randomizer() {
	const [activeTab, setActiveTab] = useState<TabType>("locations");
	const [randomizedItems, setRandomizedItems] = useState<{
		locations: Item[];
		red: Item[];
		blue: Item[];
		yellow: Item[];
	}>({
		locations: [],
		red: [],
		blue: [],
		yellow: [],
	});
	const [isAnimating, setIsAnimating] = useState(false);

	const shuffleArray = <T,>(array: T[]): T[] => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	const getCurrentList = (): Item[] => {
		switch (activeTab) {
			case "locations":
				return LOCATIONS;
			case "red":
				return RED_PAWNS;
			case "blue":
				return BLUE_PAWNS;
			case "yellow":
				return YELLOW_PAWNS;
		}
	};

	const handleRandomize = () => {
		setIsAnimating(true);

		// Randomize all lists at once
		const locationShuffled = shuffleArray(LOCATIONS);
		const redShuffled = shuffleArray(RED_PAWNS);
		const blueShuffled = shuffleArray(BLUE_PAWNS);
		const yellowShuffled = shuffleArray(YELLOW_PAWNS);

		setTimeout(() => {
			setRandomizedItems({
				locations: locationShuffled.slice(0, 3),
				red: redShuffled.slice(0, 1),
				blue: blueShuffled.slice(0, 1),
				yellow: yellowShuffled.slice(0, 1),
			});
			setIsAnimating(false);
		}, 300);
	};

	const tabs = [
		{
			id: "locations" as TabType,
			label: "Locations",
			icon: MapPin,
			color: "blue",
		},
		{ id: "red" as TabType, label: "Red Pawns", icon: Users, color: "red" },
		{ id: "blue" as TabType, label: "Blue Pawns", icon: Truck, color: "blue" },
		{
			id: "yellow" as TabType,
			label: "Yellow Pawns",
			icon: Train,
			color: "yellow",
		},
	];

	const getTabColorClasses = (tabId: TabType, isActive: boolean) => {
		const colors = {
			locations: {
				active: "bg-blue-500 text-white",
				inactive:
					"text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700",
			},
			red: {
				active: "bg-red-500 text-white",
				inactive:
					"text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700",
			},
			blue: {
				active: "bg-blue-500 text-white",
				inactive:
					"text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700",
			},
			yellow: {
				active: "bg-yellow-500 text-white",
				inactive:
					"text-gray-600 dark:text-gray-400 hover:bg-yellow-50 dark:hover:bg-gray-700",
			},
		};
		return isActive ? colors[tabId].active : colors[tabId].inactive;
	};

	const getAccentColor = () => {
		switch (activeTab) {
			case "locations":
				return {
					border: "border-blue-400 dark:border-blue-600",
					text: "text-blue-600 dark:text-blue-400",
					bg: "bg-blue-500",
				};
			case "red":
				return {
					border: "border-red-400 dark:border-red-600",
					text: "text-red-600 dark:text-red-400",
					bg: "bg-red-500",
				};
			case "blue":
				return {
					border: "border-blue-400 dark:border-blue-600",
					text: "text-blue-600 dark:text-blue-400",
					bg: "bg-blue-500",
				};
			case "yellow":
				return {
					border: "border-yellow-400 dark:border-yellow-600",
					text: "text-yellow-600 dark:text-yellow-400",
					bg: "bg-yellow-500",
				};
		}
	};

	const currentList = getCurrentList();
	const accentColor = getAccentColor();
	const hasRandomizedItems = randomizedItems.locations.length > 0;

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
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
						Railroad Tiles
					</h1>
					<p className="text-center text-gray-600 dark:text-gray-400 mb-2">
						Setup Randomizer
					</p>

					{/* Controls */}
					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 mb-2">
						<div className="flex flex-col md:flex-row items-center gap-4 justify-center">
							<button
								onClick={handleRandomize}
								className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
							>
								<Shuffle
									className={`w-5 h-5 ${isAnimating ? "animate-spin" : ""}`}
								/>
								Randomize
							</button>
						</div>
					</div>

					{/* Randomized Results - All Categories */}
					{hasRandomizedItems && (
						<div className="mb-8">
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
								Randomized Selection
							</h2>

							{/* Locations */}
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
									<MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
									Locations (3)
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{randomizedItems.locations.map((item, index) => (
										<div
											key={index}
											className="flex flex-col gap-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-blue-400 dark:border-blue-600 rounded-lg p-3 text-center text-gray-800 dark:text-white font-semibold shadow-sm animate-fade-in"
											style={{
												animationDelay: `${index * 100}ms`,
											}}
										>
											<span className="text-sm text-blue-600 dark:text-blue-400 font-bold block">
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

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Red Pawns */}
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
										<Users className="w-5 h-5 text-red-600 dark:text-red-400" />
										Red Pawn (1)
									</h3>
									{randomizedItems.red.map((item, index) => (
										<div
											key={index}
											className="flex flex-col gap-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-red-400 dark:border-red-600 rounded-lg p-3 text-center text-gray-800 dark:text-white font-semibold shadow-sm animate-fade-in"
											style={{
												animationDelay: `${300 + index * 100}ms`,
											}}
										>
											<span className="text-lg">{item.name}</span>
											<span className="text-sm font-normal">
												{item.condition}
											</span>
										</div>
									))}
								</div>

								{/* Blue Pawns */}
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
										<Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
										Blue Pawn (1)
									</h3>
									{randomizedItems.blue.map((item, index) => (
										<div
											key={index}
											className="flex flex-col gap-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-blue-400 dark:border-blue-600 rounded-lg p-3 text-center text-gray-800 dark:text-white font-semibold shadow-sm animate-fade-in"
											style={{
												animationDelay: `${400 + index * 100}ms`,
											}}
										>
											<span className="text-lg">{item.name}</span>
											<span className="text-sm font-normal">
												{item.condition}
											</span>
										</div>
									))}
								</div>

								{/* Yellow Pawns */}
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
										<Train className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
										Yellow Pawn (1)
									</h3>
									{randomizedItems.yellow.map((item, index) => (
										<div
											key={index}
											className="flex flex-col gap-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-3 text-center text-gray-800 dark:text-white font-semibold shadow-sm animate-fade-in"
											style={{
												animationDelay: `${500 + index * 100}ms`,
											}}
										>
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
								Click the <strong>Randomize All</strong> button to generate your
								setup!
							</p>
						</div>
					)}

					{/* Tabs - Moved to bottom */}
					<div className="flex flex-wrap gap-2 mb-4">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${getTabColorClasses(
										tab.id,
										isActive
									)}`}
								>
									<Icon className="w-4 h-4" />
									{tab.label}
								</button>
							);
						})}
					</div>

					{/* All Items List */}
					<div className="mt-4 mb-8">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
							<span className={`w-1 h-6 ${accentColor.bg} rounded`}></span>
							All Items ({currentList.length})
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
							{currentList.map((item, index) => (
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
