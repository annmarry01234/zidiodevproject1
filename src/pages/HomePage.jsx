import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Excel Data Platform</h1>
            <p className="text-lg mb-8">Upload your Excel files, analyze the data, and generate interactive charts!</p>
            <a href="/upload" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Get Started
            </a>
        </div>
    );
};

export default HomePage;