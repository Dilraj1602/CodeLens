import React, { useState } from "react";
import data from "../data";

export default function HomePage() {
    const [username, setUsername] = useState("wolfstrix360");
    const [profile, setProfile] = useState("Leetcode");
    const [profileData, setProfileData] = useState({});

    const handleSearch = () => {
        if (username.trim() !== "") {
            console.log("Fetching data for:", username);
        }

        const selectedProfile = data.profiles.find((p) => p.name === profile);

        if (!selectedProfile) {
            console.error("Profile not found!");
            return;
        }

        const url = selectedProfile.baseurl + username;
        console.log("Opening URL:", url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProfileData(data);
            })
            .catch((error) => {
                throw error;
            });
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen bg-gray-900 w-full flex flex-col justify-center items-center text-white p-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-400 mb-6 drop-shadow-lg">
                CodeLens
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 text-center">
                Connect all your coding profiles with a single username.
            </p>

            {/* Search & Select Container */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-4">

                {/* Search Input */}
                <div className="flex items-center bg-gray-800 p-3 py-2 rounded-2xl shadow-lg w-full">
                    <input
                        type="text"
                        className="w-full bg-transparent border-none outline-none text-white text-base md:text-lg px-4"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            console.log("Username:", e.target.value);
                        }}
                    />
                </div>

                {/* Profile Select */}
                <div className="w-full sm:w-auto">
                    <select
                        className="bg-gray-800 text-white text-base w-full sm:w-auto p-3 rounded-xl shadow-lg"
                        value={profile}
                        onChange={(e) => {
                            setProfile(e.target.value);
                            console.log("Selected Profile:", e.target.value);
                        }}
                    >
                        {data.profiles.map((p) => (
                            <option key={p.name} value={p.name} className="px-1">
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search Button */}
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl mt-4 transition-all w-full sm:w-auto"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
