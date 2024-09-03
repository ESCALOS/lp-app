import React, { useState } from 'react';
import LinearProgrammingForm from './components/LinearProgrammingForm';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center`}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
      >
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
      <LinearProgrammingForm />
    </div>
  );
};

export default App;
