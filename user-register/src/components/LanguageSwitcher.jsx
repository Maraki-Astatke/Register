// LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation(); 
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
          i18n.language === 'en' 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('am')}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
          i18n.language === 'am' 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        አማ
      </button>
    </div>
  );
}