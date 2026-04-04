import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function TourismLanding() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const destinations = [
    {
      key: "demera",
      price: "$599",
      image: "/demera.jpg",
      rating: 4.8,
      reviews: 234,
      featured: true
    },
    {
      key: "lalibela",
      price: "$799",
      image: "/lalibela.jpg",
      rating: 4.9,
      reviews: 456,
      featured: true
    },
    {
      key: "afar",
      price: "$899",
      image: "/afar.jpg",
      rating: 4.7,
      reviews: 189,
      featured: false
    },
    {
      key: "abune",
      price: "$699",
      image: "/abune.jpg",
      rating: 4.8,
      reviews: 167,
      featured: false
    }
  ];

  const testimonials = [
    {
      reviewKey: "review1",
      nameKey: "name1"
    },
    {
      reviewKey: "review2",
      nameKey: "name2"
    },
    {
      reviewKey: "review3",
      nameKey: "name3"
    }
  ];

  const features = [
    {
      icon: "clock",
      titleKey: "bestPrices",
      descKey: "bestPricesDesc"
    },
    {
      icon: "shield",
      titleKey: "safeTravel",
      descKey: "safeTravelDesc"
    },
    {
      icon: "heart",
      titleKey: "authentic",
      descKey: "authenticDesc"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                MakiTravel
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                {t('nav.destinations')}
              </button>
              <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                {t('nav.testimonials')}
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                {t('nav.contact')}
              </button>
            </div>

            {/* Language Switcher and Login Button */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button 
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                {t('nav.login')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat" 
           style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01e7f?w=1600&h=900&fit=crop')",
           }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 text-lg font-semibold"
            >
              {t('hero.startJourney')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Destinations Section */}
      <div id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('destinations.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest, index) => (
            <Card key={index} className="group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white border-0 shadow-lg w-full">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-2/5 h-80 md:h-80 overflow-hidden bg-gray-200">
                  <img 
                    src={dest.image} 
                    alt={t(`destinations.${dest.key}.name`)}
                    className="w-full h-full rounded-lg object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1547471080-7cc2caa01e7f?w=600&h=400&fit=crop";
                    }}
                  />
                </div>

                <div className="md:w-3/5 flex flex-col">
                  <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {t(`destinations.${dest.key}.name`)}
                    </CardTitle>
                    <CardDescription className="text-gray-500 leading-relaxed mt-2">
                      {t(`destinations.${dest.key}.description`)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4 px-6">
                    <div className="flex items-center gap-3 text-gray-600 text-sm bg-emerald-50 p-3 rounded-xl">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium text-base">{t(`destinations.${dest.key}.duration`)}</span>
                    </div>
                    
                    <div className="flex gap-4 mt-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{t('amenities.hotelIncluded')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t('amenities.freeCancellation')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>{t('amenities.travelInsurance')}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 pb-6 px-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all duration-300 font-semibold py-6 text-base"
                    >
                      {t('bookNow')}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('testimonials.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{t(`testimonials.${testimonial.reviewKey}`)}"</p>
                <p className="font-semibold text-gray-800">- {t(`testimonials.${testimonial.nameKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('features.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {feature.icon === "clock" && (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {feature.icon === "shield" && (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {feature.icon === "heart" && (
                    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">{t(`features.${feature.titleKey}`)}</h3>
                <p className="text-gray-500">{t(`features.${feature.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-bold text-xl">MakiTravel</span>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
                {t('footer.description')}
              </p>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-lg mb-4">{t('footer.contactUs')}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@makitravel.com" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    info@makitravel.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+251111234567" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    +251 11 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">Addis Ababa, Ethiopia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MakiTravel. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}