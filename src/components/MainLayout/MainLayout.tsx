import React, { FC } from 'react';
import Header from './Header';

interface IProps {
    children: React.ReactNode
}

const MainLayout: FC<IProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="max-w-6xl mx-auto w-full p-3 h-full flex-grow mb-5 mt-20">
                {children}
            </main>

            <footer className="flex flex-col items-center justify-center border-t border-gray-300 text-lg h-16 bg-white">
                <a href="https://github.com/babinm1h" target="_blank" rel="noreferrer" className="text-cyan-700 underline">
                    Babin Mihail 2022
                </a>
            </footer>
        </>
    );
};

export default MainLayout;