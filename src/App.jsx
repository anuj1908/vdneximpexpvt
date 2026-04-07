import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, MapPin, ChevronRight, Menu, X, 
  Globe, Truck, Ship, Plane, Box, ShieldCheck, 
  ChevronDown, Facebook, Twitter, Linkedin, Instagram, 
  ArrowRight, Upload, Send, CheckCircle2,
  DollarSign, Cloud, Wind, TrendingUp, Check, Search,
  Target, Eye, Award, Users
} from 'lucide-react';

// --- ASSETS & DATA ---
const LOGO_SRC = "/logo.png"; 

const services = [
  { id: 1, title: 'Air Freight', icon: Plane, desc: 'Fast and reliable global air freight services ensuring your cargo arrives on time.', img: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=70&w=600', details: 'Air freight is the fastest and most reliable way to ship goods globally. At VDNEX, we partner with major airlines to provide priority, standard, and deferred air freight solutions. Whether you are shipping perishable goods, high-value electronics, or urgent documents, our dedicated air freight team ensures swift customs clearance and door-to-door delivery.' },
  { id: 2, title: 'Ocean Freight', icon: Ship, desc: 'Cost-effective sea cargo solutions globally tailored for both FCL and LCL shipments.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=70&w=600', details: 'Ocean freight is the backbone of global trade. We offer comprehensive Full Container Load (FCL) and Less than Container Load (LCL) services worldwide. Our deep relationships with top ocean carriers allow us to secure competitive rates and flexible sailing schedules, ensuring your bulk shipments and large-scale cargo are handled with the utmost efficiency.' },
  { id: 3, title: 'Road Transport', icon: Truck, desc: 'Extensive road network with modern fleets for secure and timely domestic delivery.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&w=600', details: 'Our road transport network provides seamless first-mile and last-mile connectivity. With a modern fleet of GPS-enabled vehicles, we offer Full Truckload (FTL) and Less than Truckload (LTL) services. We prioritize route optimization and real-time tracking to ensure your cargo navigates through complex domestic networks safely and dependably.' },
  { id: 4, title: 'Customs Broking', icon: ShieldCheck, desc: 'Hassle-free customs clearance services handled by our compliance experts.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=70&w=600', details: 'Navigating customs regulations can be complex and time-consuming. Our licensed customs brokers simplify this process by ensuring all documentation, tariff classifications, and compliance checks are executed flawlessly. We minimize delays at borders and ports, ensuring a smooth transition for your imports and exports.' },
  { id: 5, title: 'Warehousing', icon: Box, desc: 'Secure, scalable warehousing space with advanced inventory management.', img: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=70&w=600', details: 'Our strategically located warehousing facilities offer scalable storage solutions to meet your seasonal and long-term inventory needs. Equipped with state-of-the-art Warehouse Management Systems (WMS), we provide secure storage, pick-and-pack services, inventory tracking, and seamless integration with your supply chain.' },
  { id: 6, title: '3PL Logistics', icon: Globe, desc: 'End-to-end 3PL supply chain management streamlining your operations.', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=70&w=600', details: 'Focus on your core business while we handle your entire supply chain. Our Third-Party Logistics (3PL) solutions integrate transportation, warehousing, inventory forecasting, and order fulfillment. We design customized logistics architectures that reduce operational costs and enhance your market responsiveness.' },
];

const sliderData = [
  { title: "Safety and sustainability in operations", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=70&w=1600" },
  { title: "Customer-centric approach", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=70&w=1600" },
  { title: "Integrity in motion", img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=70&w=1600" },
  { title: "Efficiency through technology", img: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=70&w=1600" }
];

// Dictionary mapping major trading countries to their key sea and air ports.
const PORTS_BY_COUNTRY = {
  "China": ["Port of Shanghai", "Port of Shenzhen", "Port of Ningbo-Zhoushan", "Port of Guangzhou", "Port of Qingdao", "Port of Tianjin", "Hong Kong International (HKG)", "Shanghai Pudong (PVG)"],
  "United States": ["Port of Los Angeles", "Port of Long Beach", "Port of New York & New Jersey", "Port of Savannah", "Port of Houston", "Memphis International (MEM)", "Los Angeles Int (LAX)", "JFK International (JFK)"],
  "India": ["Jawaharlal Nehru Port (Nhava Sheva)", "Mundra Port", "Chennai Port", "Kolkata Port", "Mumbai Port", "Cochin Port", "Delhi Airport (DEL)", "Mumbai Airport (BOM)", "Chennai Airport (MAA)"],
  "United Arab Emirates": ["Port of Jebel Ali (Dubai)", "Khalifa Port (Abu Dhabi)", "Dubai International Airport (DXB)"],
  "Singapore": ["Port of Singapore", "Changi Airport (SIN)"],
  "Germany": ["Port of Hamburg", "Port of Bremen", "Frankfurt Airport (FRA)", "Leipzig/Halle Airport (LEJ)"],
  "United Kingdom": ["Port of Felixstowe", "Port of Southampton", "Port of London", "London Heathrow (LHR)"],
  "Netherlands": ["Port of Rotterdam", "Port of Amsterdam", "Amsterdam Schiphol (AMS)"],
  "South Korea": ["Port of Busan", "Port of Incheon", "Incheon Int Airport (ICN)"],
  "Japan": ["Port of Tokyo", "Port of Yokohama", "Port of Kobe", "Port of Osaka", "Narita Int Airport (NRT)", "Haneda Airport (HND)"],
  "Australia": ["Port of Melbourne", "Port of Sydney", "Port of Brisbane", "Sydney Airport (SYD)"],
  "Malaysia": ["Port Klang", "Port of Tanjung Pelepas", "Kuala Lumpur Int (KUL)"],
  "Vietnam": ["Ho Chi Minh City Port", "Hai Phong Port", "Da Nang Port", "Noi Bai Int (HAN)", "Tan Son Nhat (SGN)"],
  "Canada": ["Port of Vancouver", "Port of Montreal", "Toronto Pearson (YYZ)"],
  "France": ["Port of Le Havre", "Port of Marseille", "Paris Charles de Gaulle (CDG)"]
};

// Constant array for Indian States to avoid CORS API Fetch Failures
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
];

// --- EXTERNAL COMPONENTS ---

// Smart Autocomplete Input - Prevents browser crashes by only rendering matching results
const SmartPortAutocomplete = ({ country, value, onChange, placeholder }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Sync internal query state if parent value changes
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logic to filter ports without overloading DOM
  useEffect(() => {
    const availablePorts = PORTS_BY_COUNTRY[country] || [];
    
    if (query.length > 0) {
      const filtered = availablePorts.filter(p => p.toLowerCase().includes(query.toLowerCase()));
      // Limit to 10 suggestions to ensure browser never crashes, even with huge datasets
      setSuggestions(filtered.slice(0, 10));
    } else {
      // If empty, show top 5 ports for that country as default suggestions
      setSuggestions(availablePorts.slice(0, 5));
    }
  }, [query, country]);

  const handleSelect = (selectedPort) => {
    setQuery(selectedPort);
    onChange(selectedPort);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => { 
            setQuery(e.target.value); 
            onChange(e.target.value); // Pass exact typed value to parent (allows custom ports!)
            setShowSuggestions(true); 
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base pr-10"
          required
        />
        <Search className="absolute right-3 top-3.5 text-slate-400" size={18} />
      </div>
      
      {/* Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-2xl max-h-60 overflow-y-auto custom-scrollbar">
          <li className="px-3 py-1.5 bg-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0">
            Suggested Ports for {country}
          </li>
          {suggestions.map((s, i) => (
            <li 
              key={i} 
              className="px-4 py-2.5 hover:bg-orange-50 cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-0 flex items-center justify-between"
              onClick={() => handleSelect(s)}
            >
              {s} <ChevronRight size={14} className="text-orange-300"/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LiveTicker = () => {
  const [rates, setRates] = useState(null);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    // Add Fallbacks in case APIs block the preview environment (CORS)
    fetch('https://api.frankfurter.app/latest?from=USD&to=INR,EUR,GBP')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(() => {
        setRates({ INR: 83.15, EUR: 0.92, GBP: 0.79 }); // Fallback data
      });

    const fetchWeather = async () => {
      const hubs = [
        { name: 'Mumbai Port', lat: 18.94, lon: 72.83 },
        { name: 'Dubai Port', lat: 25.20, lon: 55.27 },
        { name: 'Singapore Port', lat: 1.29, lon: 103.85 }
      ];
      try {
        const weatherData = await Promise.all(hubs.map(async hub => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${hub.lat}&longitude=${hub.lon}&current_weather=true`);
          const data = await res.json();
          return { name: hub.name, temp: data.current_weather.temperature, wind: data.current_weather.windspeed };
        }));
        setWeather(weatherData);
      } catch (e) { 
        setWeather([
          { name: 'Mumbai Port', temp: 31, wind: 14 },
          { name: 'Dubai Port', temp: 36, wind: 18 },
          { name: 'Singapore Port', temp: 29, wind: 10 }
        ]); // Fallback data
      }
    };
    fetchWeather();
  }, []);

  const renderTickerContent = () => (
    <>
      <div className="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full border border-orange-500/20 font-black tracking-widest uppercase text-[10px]">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> Market Data
      </div>
      
      {rates ? (
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-slate-300">
            <DollarSign size={14} className="text-green-400"/> USD/INR 
            <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded shadow-inner border border-slate-700">₹{rates.INR.toFixed(2)}</span>
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <DollarSign size={14} className="text-green-400"/> USD/EUR 
            <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded shadow-inner border border-slate-700">€{rates.EUR.toFixed(3)}</span>
          </span>
          <span className="flex items-center gap-2 text-slate-300">
            <DollarSign size={14} className="text-green-400"/> USD/GBP 
            <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded shadow-inner border border-slate-700">£{rates.GBP.toFixed(3)}</span>
          </span>
        </div>
      ) : <span className="text-slate-500 italic">Loading Forex...</span>}
      
      <span className="text-slate-700 font-light mx-2">|</span>
      
      <div className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-black tracking-widest uppercase text-[10px]">
         <Globe size={12}/> Global Hubs
      </div>

      {weather.length > 0 ? (
         <div className="flex items-center gap-6">
           {weather.map((w, i) => (
             <span key={i} className="flex items-center gap-2 text-slate-300">
               <Cloud size={14} className="text-cyan-400"/> {w.name} 
               <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded shadow-inner border border-slate-700">{w.temp}°C</span> 
               <span className="text-slate-500 font-medium text-[10px]">({w.wind} km/h)</span>
             </span>
           ))}
         </div>
      ) : <span className="text-slate-500 italic">Loading Weather...</span>}
    </>
  );

  return (
    <div className="bg-slate-950 text-cyan-400 py-3 overflow-hidden border-b border-white/5 flex items-center relative z-50">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
      
      <div className="ticker-track flex items-center whitespace-nowrap text-xs font-semibold tracking-wider w-max">
        <div className="flex flex-shrink-0 items-center gap-8 px-8">
          {renderTickerContent()}
        </div>
        <div className="flex flex-shrink-0 items-center gap-8 px-8">
          {renderTickerContent()}
        </div>
      </div>
    </div>
  );
};

// --- PAGE VIEWS ---

const HomeView = ({ navigateTo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-slate-950">
        {sliderData.map((slide, index) => (
          <div key={`bg-${index}`} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 z-10" />
             <img 
               src={slide.img} 
               alt="Logistics Background" 
               loading={index === 0 ? "eager" : "lazy"} 
               className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'}`} 
             />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-12 max-w-7xl mx-auto">
           <div key={`text-${currentSlide}`} className="w-full mt-10 md:mt-0 flex flex-col items-center">
             <h4 className="text-cyan-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 animate-fade-in-up drop-shadow-md flex items-center justify-center gap-2 text-sm md:text-base">
                <TrendingUp size={18} className="hidden md:block"/> NEXT-GEN LOGISTICS
             </h4>
             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-black mb-6 md:mb-8 leading-tight animate-fade-in-up delay-100 drop-shadow-2xl max-w-4xl px-2">
                {sliderData[currentSlide].title}
             </h1>
             <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200 w-full sm:w-auto px-4">
                <button onClick={() => navigateTo('about')} className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-md font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:-translate-y-1 w-full sm:w-auto text-sm md:text-base">
                  Learn More
                </button>
                <button onClick={() => navigateTo('contact')} className="bg-orange-500 hover:bg-orange-400 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-md font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:-translate-y-1 w-full sm:w-auto text-sm md:text-base">
                  Request a Quote
                </button>
             </div>
           </div>
        </div>
      </div>

      <section className="py-16 md:py-24 px-4 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16">
           <div className="lg:w-1/2 flex gap-8 animate-on-scroll slide-in-left">
              <div className="hidden lg:flex w-16 justify-center items-start pt-2 border-r-2 border-slate-200 pr-8 relative">
                 <h2 className="text-6xl font-black text-slate-200 uppercase writing-vertical transform -rotate-180 tracking-[0.4em] whitespace-nowrap">About VDNEX</h2>
              </div>
              <div>
                 <h3 className="text-orange-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center gap-2 text-sm md:text-base">
                    <span className="w-8 h-0.5 bg-orange-500"></span> About Us
                 </h3>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950 mb-6 leading-tight">Delivering Logistics Excellence Worldwide</h2>
                 <p className="text-slate-600 mb-5 leading-relaxed text-base md:text-lg">
                   Founded with a vision to redefine logistics excellence and led by partners <strong className="text-blue-950">Vishal Chavan</strong> and <strong className="text-blue-950">CA Paresh Tiwari</strong>, VDNEX IMPEX & SERVICES PVT LTD delivers integrated freight forwarding and supply chain management services across the globe. 
                 </p>
                 <button onClick={() => navigateTo('about')} className="bg-blue-950 hover:bg-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-bold uppercase text-xs md:text-sm tracking-wide flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-900/20 mt-6 w-full sm:w-auto">
                    Discover More <ArrowRight size={18}/>
                 </button>
              </div>
           </div>
           
           <div className="lg:w-1/2 flex flex-col justify-center animate-on-scroll slide-in-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                 <div className="bg-blue-950 text-white py-8 md:py-10 px-6 rounded-xl text-center group hover:bg-blue-900 transition-colors flex flex-col justify-center items-center shadow-lg">
                    <h5 className="text-4xl md:text-5xl font-black text-orange-500 mb-2 md:mb-3 group-hover:scale-110 transition-transform">100+</h5>
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-100">Global Partners</p>
                 </div>
                 <div className="bg-orange-500 text-white py-8 md:py-10 px-6 rounded-xl text-center group hover:bg-orange-600 transition-colors flex flex-col justify-center items-center shadow-lg">
                    <h5 className="text-4xl md:text-5xl font-black text-blue-950 mb-2 md:mb-3 group-hover:scale-110 transition-transform">1M+</h5>
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-100">Sq.Ft. Space</p>
                 </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-2">
                <div className="w-full sm:w-1/2 rounded-xl overflow-hidden shadow-lg h-48 relative group">
                  <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=70&w=600" alt="Logistics Facility" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-blue-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="w-full sm:w-1/2 flex flex-col justify-center space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-2.5 rounded-lg text-orange-500 shrink-0"><ShieldCheck size={24}/></div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm md:text-base">Certified Security</h4>
                      <p className="text-xs md:text-sm text-slate-500 mt-1">ISO certified facilities for maximum cargo protection.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2.5 rounded-lg text-blue-900 shrink-0"><TrendingUp size={24}/></div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm md:text-base">Real-time Tracking</h4>
                      <p className="text-xs md:text-sm text-slate-500 mt-1">Complete digital visibility of your supply chain.</p>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-12 bg-slate-50">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16 animate-on-scroll">
               <h3 className="text-orange-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-sm md:text-base">
                  <span className="w-4 md:w-8 h-0.5 bg-orange-500"></span> Our Services <span className="w-4 md:w-8 h-0.5 bg-orange-500"></span>
               </h3>
               <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950">Comprehensive Logistics Solutions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                     <div key={service.id} onClick={() => navigateTo('service', service.id)} className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group transition-all duration-300 animate-on-scroll cursor-pointer delay-${(idx % 3) * 100}`}>
                        <div className="relative h-48 md:h-56 overflow-hidden">
                           <img src={service.img} alt={service.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"/>
                           <div className="absolute inset-0 bg-blue-950/30 group-hover:bg-blue-950/10 transition-colors duration-300"/>
                        </div>
                        <div className="p-6 md:p-8 relative mt-2">
                           <div className="absolute -top-10 md:-top-12 right-6 md:right-8 bg-orange-500 text-white p-3 md:p-4 rounded-xl shadow-xl group-hover:-translate-y-2 transition-transform duration-300">
                              <Icon size={28} className="md:w-8 md:h-8"/>
                           </div>
                           <h4 className="text-xl md:text-2xl font-bold text-blue-950 mb-3 md:mb-4 pr-12">{service.title}</h4>
                           <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed line-clamp-2">{service.desc}</p>
                           <span className="text-orange-500 font-bold uppercase tracking-wide text-xs md:text-sm flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                              Read More <ArrowRight size={16}/>
                           </span>
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
    </>
  );
};

const AboutView = ({ navigateTo }) => (
  <div className="bg-slate-50 min-h-screen pb-16">
    {/* HERO SECTION */}
    <div className="relative py-24 md:py-32 bg-blue-950 text-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80" alt="About Hero" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 to-blue-950"></div>
      </div>
      <div className="relative z-10 animate-fade-in-up px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Driving Global Trade Forward</h1>
        <p className="text-blue-100 text-base md:text-xl mb-8 leading-relaxed font-light">
          We are more than just a logistics company. We are your strategic partners in navigating the complexities of international and domestic supply chains.
        </p>
        <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm bg-blue-950/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm border border-orange-500/30">
          <span className="text-slate-300 cursor-pointer hover:text-white transition-colors" onClick={() => navigateTo('home')}>Home</span> / About Us
        </p>
      </div>
    </div>
    
    {/* OUR STORY SECTION */}
    <section className="py-16 md:py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center animate-on-scroll">
        <div className="lg:w-1/2 relative group">
          <div className="absolute inset-0 bg-orange-500 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
          <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50adf?auto=format&fit=crop&q=80&w=1000" alt="VDNEX Operations" loading="lazy" className="relative rounded-2xl shadow-xl w-full h-[400px] md:h-[500px] object-cover z-10 group-hover:-translate-y-2 transition-transform duration-500"/>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl z-20 animate-fade-in-up delay-300 hidden md:block border-b-4 border-blue-950">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-500">
                <Globe size={32} />
              </div>
              <div>
                <h4 className="font-black text-blue-950 text-2xl">Global</h4>
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Reach & Network</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-orange-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center gap-2 text-sm md:text-base">
            <span className="w-8 h-0.5 bg-orange-500"></span> Our Story
          </h3>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-6 leading-tight">A Legacy of Logistics Excellence based in Vasai</h2>
          <p className="text-slate-600 mb-5 leading-relaxed text-base">
            Headquartered in the bustling industrial hub of Vasai, Maharashtra, <strong className="text-blue-950">VDNEX IMPEX & SERVICES PVT LTD</strong> was founded with a clear and unwavering vision: to redefine the standards of logistics by providing highly integrated, reliable, and transparent supply chain management services.
          </p>
          <p className="text-slate-600 mb-8 leading-relaxed text-base">
            Our expertise spans across every critical mode of transport — Air, Sea, and Road. Whether it is complex customs broking, massive 3PL warehousing, or cross-border freight forwarding, we combine years of industry experience with cutting-edge technology. We ensure that your cargo reaches its destination efficiently, safely, and exactly on time, turning your logistics into a competitive advantage.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-orange-500 shrink-0 mt-1" size={20}/>
              <div>
                <h4 className="font-bold text-blue-950 text-sm md:text-base">Trusted Partners</h4>
                <p className="text-xs text-slate-500 mt-1">100+ Global network nodes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-orange-500 shrink-0 mt-1" size={20}/>
              <div>
                <h4 className="font-bold text-blue-950 text-sm md:text-base">End-to-End Care</h4>
                <p className="text-xs text-slate-500 mt-1">Complete 3PL management.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* MISSION & VISION SECTION */}
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
        
        {/* Mission Card */}
        <div className="bg-blue-950 p-8 md:p-12 rounded-2xl text-white transform hover:-translate-y-2 transition-all duration-300 shadow-xl group overflow-hidden relative">
          <div className="absolute -right-10 -top-10 text-white/5 transform group-hover:scale-110 transition-transform duration-700">
            <Target size={200} />
          </div>
          <div className="relative z-10">
            <div className="bg-blue-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-8 border border-blue-800 group-hover:border-orange-500 transition-colors">
              <Target size={32} className="text-orange-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Our Mission</h3>
            <p className="text-blue-100 leading-relaxed text-sm md:text-base">
              To be among the most trusted and preferred global logistics providers. We strive to be consistently recognized for our operational excellence, continuous innovation, and an absolute commitment to customer satisfaction. We aim to simplify global trade for businesses of all sizes.
            </p>
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-orange-500 p-8 md:p-12 rounded-2xl text-white transform hover:-translate-y-2 transition-all duration-300 shadow-xl group overflow-hidden relative">
          <div className="absolute -right-10 -top-10 text-white/10 transform group-hover:scale-110 transition-transform duration-700">
            <Eye size={200} />
          </div>
          <div className="relative z-10">
            <div className="bg-orange-600/50 w-16 h-16 rounded-xl flex items-center justify-center mb-8 border border-orange-400 group-hover:border-blue-950 transition-colors">
              <Eye size={32} className="text-blue-950" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-blue-950">Our Vision</h3>
            <p className="text-orange-50 leading-relaxed text-sm md:text-base">
              To deliver world-class logistics solutions driven by cutting-edge technology, steadfast reliability, and transparent communication. We envision a future where our sustainable operational practices not only drive business growth but also positively impact the global environment.
            </p>
          </div>
        </div>

      </div>
    </section>

    {/* LEADERSHIP / FOUNDERS SECTION */}
    <section className="py-16 md:py-24 px-4 md:px-12 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
           <h3 className="text-orange-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center justify-center gap-2 text-sm md:text-base">
              <span className="w-8 h-0.5 bg-orange-500"></span> Leadership <span className="w-8 h-0.5 bg-orange-500"></span>
           </h3>
           <h2 className="text-3xl md:text-5xl font-extrabold text-blue-950">Meet Our Founders</h2>
           <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
             The visionary minds behind VDNEX Impex & Services. Their combined expertise in global logistics and financial strategy drives our company forward.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          
          {/* Founder 1: Vishal Chavan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-950 animate-on-scroll text-center group">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-slate-50 group-hover:border-blue-950 transition-colors relative">
              {/* Note: Placeholder image representing a professional businessman. Replace with actual photo. */}
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" alt="Vishal Chavan" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-1">Vishal Chavan</h3>
            <p className="text-orange-500 font-bold mb-5 uppercase tracking-wider text-xs md:text-sm">Partner & Co-Founder</p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              With a profound understanding of international trade dynamics and supply chain operations, Vishal spearheads the strategic growth and global partnerships at VDNEX. His hands-on leadership ensures operational excellence, robust client relationships, and seamless cargo movements across borders.
            </p>
            <div className="mt-6 flex justify-center gap-3">
               <span className="bg-slate-100 p-2 rounded-md text-slate-400 hover:bg-blue-950 hover:text-white cursor-pointer transition-colors"><Linkedin size={18}/></span>
               <span className="bg-slate-100 p-2 rounded-md text-slate-400 hover:bg-blue-950 hover:text-white cursor-pointer transition-colors"><Mail size={18}/></span>
            </div>
          </div>

          {/* Founder 2: CA Paresh Tiwari */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-orange-500 animate-on-scroll delay-100 text-center group">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl border-4 border-slate-50 group-hover:border-orange-500 transition-colors relative">
              {/* Note: Placeholder image representing a professional businessman. Replace with actual photo. */}
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" alt="CA Paresh Tiwari" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-1">CA Paresh Tiwari</h3>
            <p className="text-orange-500 font-bold mb-5 uppercase tracking-wider text-xs md:text-sm">Partner & Co-Founder</p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Bringing extensive financial expertise and compliance acumen, CA Paresh Tiwari oversees the fiscal strategies and regulatory frameworks of VDNEX. His deep knowledge ensures that our customs broking, taxation strategies, and 3PL services are highly transparent, legally compliant, and financially optimized for our clients.
            </p>
            <div className="mt-6 flex justify-center gap-3">
               <span className="bg-slate-100 p-2 rounded-md text-slate-400 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors"><Linkedin size={18}/></span>
               <span className="bg-slate-100 p-2 rounded-md text-slate-400 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors"><Mail size={18}/></span>
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
);

const CareerView = ({ navigateTo }) => {
  const [status, setStatus] = useState('idle');

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Using Advanced FormSubmit.co Framework (Supports file attachments)
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/vdneximpex@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative py-20 md:py-24 bg-blue-950 text-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-blue-950/90"></div>
        <div className="relative z-10 animate-fade-in-up px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Career at VDNEX</h1>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="text-slate-300 cursor-pointer hover:text-white" onClick={() => navigateTo('home')}>Home</span> / Career</p>
        </div>
      </div>

      <section className="py-16 md:py-20 px-4 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 animate-on-scroll">
        <div className="lg:w-1/2">
          <h3 className="text-orange-500 font-bold mb-3 uppercase tracking-[0.2em] flex items-center gap-2 text-sm md:text-base">
            <span className="w-8 h-0.5 bg-orange-500"></span> Join Our Team
          </h3>
          <h2 className="text-2xl md:text-4xl font-extrabold text-blue-950 mb-6 leading-tight">Build Your Future With Us</h2>
          <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
            At VDNEX IMPEX & SERVICES, we believe that our greatest asset is our people. We are always on the lookout for talented, driven, and innovative individuals to join our growing global logistics family. 
          </p>
          <ul className="space-y-3 md:space-y-4 mb-8">
            <li className="flex gap-3 text-slate-700 font-medium text-sm md:text-base"><CheckCircle2 className="text-orange-500 flex-shrink-0"/> Global Career Opportunities</li>
            <li className="flex gap-3 text-slate-700 font-medium text-sm md:text-base"><CheckCircle2 className="text-orange-500 flex-shrink-0"/> Dynamic and Inclusive Work Environment</li>
            <li className="flex gap-3 text-slate-700 font-medium text-sm md:text-base"><CheckCircle2 className="text-orange-500 flex-shrink-0"/> Continuous Learning and Development</li>
          </ul>
          <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" alt="Logistics Team" loading="lazy" className="rounded-xl shadow-lg w-full h-48 md:h-64 object-cover"/>
        </div>
        
        <div className="lg:w-1/2 bg-white p-6 md:p-10 rounded-2xl shadow-xl border-t-4 border-orange-500">
          <h3 className="text-xl md:text-2xl font-bold text-blue-950 mb-6">Apply Now</h3>
          <form className="space-y-4 md:space-y-5" onSubmit={handleCareerSubmit}>
            <input type="hidden" name="_subject" value="New Career Application from VDNEX Website" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">First Name *</label>
                <input type="text" name="firstName" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required/>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Last Name *</label>
                <input type="text" name="lastName" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required/>
              </div>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
              <input type="email" name="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required/>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input type="tel" name="phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required/>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Position Applying For</label>
              <select name="position" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base">
                <option>Logistics Coordinator</option>
                <option>Customs Clearing Agent</option>
                <option>Sales Executive</option>
                <option>Warehouse Manager</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Upload Resume / CV *</label>
              <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center bg-slate-50 hover:bg-orange-50 transition-colors cursor-pointer relative overflow-hidden flex flex-col items-center justify-center">
                <Upload className="text-orange-500 mb-2" size={24}/>
                <span className="text-xs md:text-sm text-slate-500">Click to browse or drag and drop your file here</span>
                <input type="file" name="attachment" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" required />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className={`w-full text-white font-bold py-4 rounded-md uppercase tracking-wide transition-colors mt-4 text-sm md:text-base flex justify-center items-center gap-2
                ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : status === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-950 hover:bg-blue-800'}
                ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {status === 'idle' && 'Submit Application'}
              {status === 'submitting' && 'Uploading...'}
              {status === 'success' && <><Check size={18}/> Application Sent!</>}
              {status === 'error' && <><X size={18}/> Error Occurred</>}
            </button>
            {status === 'success' && (
              <p className="text-green-600 text-xs text-center mt-2">Success! (Owner: Please check vdneximpex@gmail.com to activate FormSubmit on your first try).</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

const ContactView = ({ navigateTo }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); 

  // Advanced Form States
  const [serviceType, setServiceType] = useState('');
  const [tradeType, setTradeType] = useState('');
  const [mentorshipType, setMentorshipType] = useState('');
  const [countries, setCountries] = useState([]);
  const [states] = useState(INDIAN_STATES); // Using stable internal array
  
  // New Fully Decoupled Origin/Destination States
  const [pickupState, setPickupState] = useState('');
  const [deliveryState, setDeliveryState] = useState('');
  
  const [originCountry, setOriginCountry] = useState('');
  const [originPort, setOriginPort] = useState('');
  
  const [destCountry, setDestCountry] = useState('');
  const [destPort, setDestPort] = useState('');

  // Fetch API Data for Global Countries
  useEffect(() => {
    // Fetch Global Countries (REST Countries API - Free)
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(res => res.json())
      .then(data => {
        const sortedCountries = data.map(c => c.name.common).sort();
        setCountries(sortedCountries);
      })
      .catch(() => {
        // Fallback to dictionary keys if API is blocked by browser preview/CORS
        setCountries(Object.keys(PORTS_BY_COUNTRY).sort());
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    let extendedMessage = `--- Service Requirements ---\nCategory: ${serviceType}\n`;
    
    if (serviceType === 'International') {
      extendedMessage += `Trade Type: ${tradeType}\n`;
      extendedMessage += `Origin (Pickup): ${originPort}, ${originCountry}\n`;
      extendedMessage += `Destination (Delivery): ${destPort}, ${destCountry}\n`;
    } else if (serviceType === 'Domestic') {
      extendedMessage += `Trade Type: ${tradeType}\n`;
      extendedMessage += `Pickup State: ${pickupState}\n`;
      extendedMessage += `Delivery State: ${deliveryState}\n`;
    } else if (serviceType === 'Mentorship') {
      extendedMessage += `Mentorship Focus: ${mentorshipType}\n`;
    }
    
    extendedMessage += `\n--- Client Message ---\n${formData.message}`;

    // ADVANCED FRAMEWORK: Using FormSubmit.co
    const API_ENDPOINT = "https://formsubmit.co/ajax/vdneximpex@gmail.com";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email, 
          subject: `Website Query: ${formData.subject} - [${serviceType}]`,
          message: extendedMessage
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setServiceType(''); setTradeType(''); setMentorshipType('');
        setOriginCountry(''); setOriginPort('');
        setDestCountry(''); setDestPort('');
        setPickupState(''); setDeliveryState(''); 
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative py-20 md:py-24 bg-blue-950 text-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-blue-950/90"></div>
        <div className="relative z-10 animate-fade-in-up px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm"><span className="text-slate-300 cursor-pointer hover:text-white" onClick={() => navigateTo('home')}>Home</span> / Contact</p>
        </div>
      </div>

      <section className="py-16 md:py-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 animate-on-scroll">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center group">
            <div className="bg-orange-100 p-4 rounded-full mb-4 md:mb-6 group-hover:bg-orange-500 transition-colors"><MapPin className="text-orange-500 group-hover:text-white transition-colors" size={32}/></div>
            <h4 className="text-lg md:text-xl font-bold text-blue-950 mb-2 md:mb-3">Head Office</h4>
            <p className="text-slate-600 text-sm md:text-base">VDNEX IMPEX & SERVICES PVT LTD.<br/>Vasai, Maharashtra, India.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center group">
            <div className="bg-blue-100 p-4 rounded-full mb-4 md:mb-6 group-hover:bg-blue-950 transition-colors"><Phone className="text-blue-950 group-hover:text-white transition-colors" size={32}/></div>
            <h4 className="text-lg md:text-xl font-bold text-blue-950 mb-2 md:mb-3">Phone Support</h4>
            <p className="text-slate-600 text-sm md:text-base">+91-22 12345678<br/>Mon-Fri, 9am - 6pm</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center flex flex-col items-center group sm:col-span-2 md:col-span-1">
            <div className="bg-orange-100 p-4 rounded-full mb-4 md:mb-6 group-hover:bg-orange-500 transition-colors"><Mail className="text-orange-500 group-hover:text-white transition-colors" size={32}/></div>
            <h4 className="text-lg md:text-xl font-bold text-blue-950 mb-2 md:mb-3">Email Us</h4>
            <p className="text-slate-600 text-sm md:text-base">vdneximpex@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 animate-on-scroll">
          <div className="lg:w-2/3 bg-white p-6 md:p-12 rounded-2xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold text-blue-950 mb-6 flex items-center gap-3">
              <Send className="text-orange-500"/> Submit a Detailed Query
            </h3>
            
            {/* ADVANCED DYNAMIC CONTACT FORM */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" placeholder="John Doe" required/>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Your Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" placeholder="john@example.com" required/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" placeholder="E.g. Requesting a quote" required/>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Service Category *</label>
                  <select 
                    value={serviceType} 
                    onChange={(e) => { 
                      setServiceType(e.target.value); 
                      setTradeType(''); setMentorshipType(''); 
                      setOriginCountry(''); setOriginPort('');
                      setDestCountry(''); setDestPort('');
                      setPickupState(''); setDeliveryState('');
                    }} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                    <option value="" disabled>Select a Service</option>
                    <option value="International">International Shipping</option>
                    <option value="Domestic">Domestic Shipping</option>
                    <option value="Mentorship">Mentorship Program</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC FIELDS: International OR Domestic */}
              {(serviceType === 'International' || serviceType === 'Domestic') && (
                <div className="grid grid-cols-1 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner">
                  
                  {/* Trade Type Selection */}
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Trade Type *</label>
                    <select value={tradeType} onChange={(e) => setTradeType(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                      <option value="" disabled>Select Trade Type</option>
                      <option value="Export">Export / Outbound</option>
                      <option value="Import">Import / Inbound</option>
                      <option value="Cross-Trade">Cross-Trade</option>
                    </select>
                  </div>
                  
                  {/* International Origin & Destination (Fully Flexible) */}
                  {serviceType === 'International' && (
                     <>
                       {/* Origin Block */}
                       <div className="border-l-4 border-orange-500 pl-4 py-2">
                         <h4 className="font-bold text-blue-950 mb-3">Origin (Pickup Location)</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Origin Country *</label>
                             <select value={originCountry} onChange={(e) => {
                                 setOriginCountry(e.target.value);
                                 setOriginPort('');
                               }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                               <option value="" disabled>Select Country</option>
                               {countries.map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                           </div>
                           
                           {originCountry && (
                             <div className="animate-fade-in-up">
                               <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Origin Port Name *</label>
                               <SmartPortAutocomplete 
                                 country={originCountry} 
                                 value={originPort} 
                                 onChange={setOriginPort} 
                                 placeholder={`Search or type port in ${originCountry}...`}
                               />
                             </div>
                           )}
                         </div>
                       </div>
                       
                       {/* Destination Block */}
                       <div className="border-l-4 border-blue-900 pl-4 py-2 mt-2 border-t border-slate-200 pt-4">
                         <h4 className="font-bold text-blue-950 mb-3">Destination (Delivery Location)</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Destination Country *</label>
                             <select value={destCountry} onChange={(e) => {
                                 setDestCountry(e.target.value);
                                 setDestPort('');
                               }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                               <option value="" disabled>Select Country</option>
                               {countries.map(c => <option key={c} value={c}>{c}</option>)}
                             </select>
                           </div>
                           
                           {destCountry && (
                             <div className="animate-fade-in-up">
                               <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Destination Port Name *</label>
                               <SmartPortAutocomplete 
                                 country={destCountry} 
                                 value={destPort} 
                                 onChange={setDestPort} 
                                 placeholder={`Search or type port in ${destCountry}...`}
                               />
                             </div>
                           )}
                         </div>
                       </div>
                     </>
                  )}

                  {/* Domestic Specific Fields (Point A to Point B) */}
                  {serviceType === 'Domestic' && (
                     <>
                       <div className="border-l-4 border-orange-500 pl-4 py-2">
                         <h4 className="font-bold text-blue-950 mb-3">Origin (Pickup Location)</h4>
                         <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Pickup State *</label>
                         <select value={pickupState} onChange={(e) => setPickupState(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                           <option value="" disabled>Select State</option>
                           {states.length > 0 ? states.map(s => <option key={s} value={s}>{s}</option>) : <option disabled>Loading states...</option>}
                         </select>
                       </div>
                       
                       <div className="border-l-4 border-blue-900 pl-4 py-2 mt-2 border-t border-slate-200 pt-4">
                         <h4 className="font-bold text-blue-950 mb-3">Destination (Delivery Location)</h4>
                         <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Delivery State *</label>
                         <select value={deliveryState} onChange={(e) => setDeliveryState(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                           <option value="" disabled>Select State</option>
                           {states.length > 0 ? states.map(s => <option key={s} value={s}>{s}</option>) : <option disabled>Loading states...</option>}
                         </select>
                       </div>
                     </>
                  )}
                </div>
              )}

              {/* DYNAMIC FIELDS: Mentorship */}
              {serviceType === 'Mentorship' && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner">
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Mentorship Program Focus *</label>
                  <select value={mentorshipType} onChange={(e) => setMentorshipType(e.target.value)} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" required>
                    <option value="" disabled>Select Focus Area</option>
                    <option value="International Sales">International Sales</option>
                    <option value="Domestic Sales">Domestic Sales</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">Detailed Message *</label>
                <textarea rows="5" name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base" placeholder="Tell us about your logistics needs..." required></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className={`w-full md:w-auto text-white font-bold py-3.5 md:py-4 px-8 rounded-md uppercase tracking-wide transition-all text-sm md:text-base flex items-center justify-center gap-2
                  ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : status === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}
                  ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && <><Check size={18}/> Message Sent!</>}
                {status === 'error' && <><X size={18}/> Error. Try Again</>}
              </button>
              
              {status === 'success' && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  Thank you! Your message has been successfully sent to vdneximpex@gmail.com.
                  <br/><span className="text-xs text-slate-500">(Site Owner: Please check your email to activate FormSubmit on the very first try).</span>
                </p>
              )}
            </form>

          </div>
          <div className="lg:w-1/3 bg-slate-200 rounded-2xl overflow-hidden shadow-xl min-h-[300px] md:min-h-[400px]">
            {/* Maps Placeholder */}
            <iframe 
              title="VDNEX Vasai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120448.9717551062!2d72.74838382375936!3d19.380722123985172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7aec0a4b41bef%3A0xbd1a4ca919d6a613!2sVasai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailView = ({ navigateTo, activeServiceId }) => {
  const service = services.find(s => s.id === activeServiceId) || services[0];
  const Icon = service.icon;

  return (
    <div className="bg-slate-50 min-h-screen pb-16 md:pb-20">
      <div className="relative py-20 md:py-24 bg-blue-950 text-center" style={{backgroundImage: `url("${service.img}")`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-blue-950/85"></div>
        <div className="relative z-10 animate-fade-in-up px-4">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 flex justify-center items-center gap-3 md:gap-4">
            <Icon className="text-orange-500 w-10 h-10 md:w-12 md:h-12"/> {service.title}
          </h1>
          <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm">
            <span className="text-slate-300 cursor-pointer hover:text-white" onClick={() => navigateTo('home')}>Home</span> / Services / <span className="text-white">{service.title}</span>
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-12 -mt-10 relative z-20 animate-on-scroll">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={service.img} alt={service.title} loading="lazy" className="w-full h-full object-cover min-h-[250px] md:min-h-[400px]" />
          </div>
          <div className="lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-4 md:mb-6">{service.title} Solutions</h3>
            <p className="text-base md:text-lg text-slate-600 mb-4 md:mb-6 leading-relaxed">
              {service.desc}
            </p>
            <div className="h-1 w-16 md:w-20 bg-orange-500 mb-4 md:mb-6"></div>
            <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              {service.details}
            </p>
            <button onClick={() => navigateTo('contact')} className="bg-blue-950 hover:bg-blue-800 text-white w-full sm:w-max px-6 md:px-8 py-3.5 md:py-4 rounded-md font-bold uppercase text-xs md:text-sm tracking-wide transition-colors shadow-lg">
              Get a Quote for {service.title}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


// --- MAIN APP RENDERER ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky navbar animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top and set page
  const navigateTo = (page, serviceId = null) => {
    setCurrentPage(page);
    if (serviceId) setActiveServiceId(serviceId);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-run animation observer when page changes
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage, activeServiceId]);

  // Safely update the browser tab (favicon) to the imported logo
  useEffect(() => {
    try {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.filter = 'invert(1) grayscale(1) brightness(2)';
          ctx.drawImage(img, 0, 0);
          link.href = canvas.toDataURL('image/png');
        } catch (e) {
          link.href = typeof LOGO_SRC === 'string' ? LOGO_SRC : '';
        }
      };
      img.onerror = () => {
        link.href = typeof LOGO_SRC === 'string' ? LOGO_SRC : '';
      };
      
      if (typeof LOGO_SRC === 'string') {
        img.src = LOGO_SRC;
      }
      document.title = "VDNEX IMPEX & SERVICES";
    } catch(err) {
      // Bypassed
    }
  }, []);

  return (
    <div className="font-sans text-slate-800 relative">
      {/* --- GLOBAL STYLES --- */}
      <style>{`
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        .animate-on-scroll { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        .slide-in-left { transform: translateX(-60px); }
        .slide-in-right { transform: translateX(60px); }
        .is-visible.slide-in-left, .is-visible.slide-in-right { transform: translate(0); }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        
        /* TICKER ANIMATION */
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: tickerScroll 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        
        /* CUSTOM SCROLLBAR FOR DROPDOWN */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px;}
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px;}
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>

      {/* --- LIVE DATA TICKER (MOVING FRAME) --- */}
      <LiveTicker />

      {/* --- TOP BAR --- */}
      <div className="bg-slate-900 text-slate-300 text-xs md:text-sm py-2 px-4 md:px-12 flex flex-col sm:flex-row justify-between items-center z-50 relative gap-2 sm:gap-0">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="mailto:vdneximpex@gmail.com" className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
            <Mail size={14} className="text-orange-500"/> vdneximpex@gmail.com
          </a>
          <a href="tel:+912212345678" className="flex items-center gap-1.5 hover:text-orange-500 transition-colors">
            <Phone size={14} className="text-orange-500"/> +91-22 12345678
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block mr-2">Follow us:</span>
          <span className="hover:text-orange-500 cursor-pointer transition-colors"><Facebook size={14}/></span>
          <span className="hover:text-orange-500 cursor-pointer transition-colors"><Twitter size={14}/></span>
          <span className="hover:text-orange-500 cursor-pointer transition-colors"><Linkedin size={14}/></span>
          <span className="hover:text-orange-500 cursor-pointer transition-colors"><Instagram size={14}/></span>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      <nav className={`sticky top-0 w-full flex justify-between items-center transition-all duration-300 z-[100] px-4 md:px-12 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-1.5 border-b border-orange-500/20' : 'bg-white shadow-md py-2 md:py-3'}`}>
        {/* Logo - OPTIMIZED SIZE FOR BETTER NAVBAR PROPORTIONS & ANIMATION */}
        <div className="flex items-center cursor-pointer py-1" onClick={() => navigateTo('home')}>
          <img src={LOGO_SRC} alt="VDNEX IMPEX Logo" className={`w-auto object-contain mix-blend-multiply transform origin-left transition-all duration-300 ${isScrolled ? 'h-10 sm:h-12 lg:h-14' : 'h-12 sm:h-14 md:h-16 lg:h-20'}`} />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 items-center font-bold text-slate-800 text-base uppercase tracking-wider">
          <button onClick={() => navigateTo('home')} className={`hover:text-orange-500 transition-colors ${currentPage === 'home' ? 'text-orange-500' : ''}`}>Home</button>
          <button onClick={() => navigateTo('about')} className={`hover:text-orange-500 transition-colors ${currentPage === 'about' ? 'text-orange-500' : ''}`}>About Us</button>
          
          <div className="relative group py-4">
            <button className={`hover:text-orange-500 transition-colors flex items-center gap-1 ${currentPage === 'service' ? 'text-orange-500' : ''}`}>
              Our Services <ChevronDown size={16}/>
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 bg-white shadow-xl border-t-4 border-orange-500 py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:translate-y-0 translate-y-2">
              {services.map(s => (
                <button 
                  onClick={() => navigateTo('service', s.id)} 
                  key={s.id} 
                  className="block w-full text-left px-6 py-3 text-sm hover:bg-slate-50 hover:text-orange-500 hover:pl-8 transition-all border-b border-slate-100 last:border-0 capitalize font-semibold"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          
          <button onClick={() => navigateTo('career')} className={`hover:text-orange-500 transition-colors ${currentPage === 'career' ? 'text-orange-500' : ''}`}>Career</button>
          <button onClick={() => navigateTo('contact')} className={`hover:text-orange-500 transition-colors ${currentPage === 'contact' ? 'text-orange-500' : ''}`}>Contact</button>
        </div>

        <div className="hidden lg:block">
          <button onClick={() => navigateTo('contact')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-md font-extrabold transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 tracking-widest text-sm">
            GET A QUOTE
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-blue-900 p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden fixed inset-0 z-30 bg-white transition-transform duration-300 pt-32 px-6 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-5 text-lg font-bold text-blue-900 pb-10">
          <button className="text-left py-2 border-b border-slate-100" onClick={() => navigateTo('home')}>Home</button>
          <button className="text-left py-2 border-b border-slate-100" onClick={() => navigateTo('about')}>About Us</button>
          
          <div className="flex flex-col gap-3 pl-4 border-l-2 border-orange-200 py-2">
            <span className="text-sm text-slate-400 uppercase tracking-widest">Our Services</span>
            {services.map(s => (
              <button key={s.id} className="text-left text-base text-slate-700 py-1" onClick={() => navigateTo('service', s.id)}>
                {s.title}
              </button>
            ))}
          </div>

          <button className="text-left py-2 border-b border-slate-100" onClick={() => navigateTo('career')} >Career</button>
          <button className="text-left py-2 border-b border-slate-100" onClick={() => navigateTo('contact')}>Contact</button>
          <button onClick={() => navigateTo('contact')} className="bg-orange-500 text-white px-6 py-4 rounded-md mt-6 w-full uppercase tracking-wide shadow-lg">Get a Quote</button>
        </div>
      </div>

      {/* --- DYNAMIC PAGE RENDERER --- */}
      <main className="overflow-x-hidden">
        {currentPage === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutView navigateTo={navigateTo} />}
        {currentPage === 'career' && <CareerView navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactView navigateTo={navigateTo} />}
        {currentPage === 'service' && <ServiceDetailView navigateTo={navigateTo} activeServiceId={activeServiceId} />}
      </main>

      {/* --- GLOBAL CTA BANNER (Hidden on Contact Page to avoid redundancy) --- */}
      {currentPage !== 'contact' && (
        <section className="relative py-20 md:py-28 bg-blue-950 bg-fixed bg-center bg-cover overflow-hidden" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80")'}}>
           <div className="absolute inset-0 bg-blue-950/85"></div>
           <div className="relative max-w-5xl mx-auto text-center px-4 animate-on-scroll">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight drop-shadow-md">
                 Precision, Reliability, and Excellence in Logistics
              </h2>
              <p className="text-blue-100 text-base md:text-xl mb-8 md:mb-10 max-w-3xl mx-auto font-light">
                 VDNEX IMPEX & SERVICES PVT LTD delivers smart, reliable freight and supply chain services worldwide from our base in Vasai. Partner with us for unparalleled efficiency.
              </p>
              <button onClick={() => navigateTo('contact')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-md font-bold uppercase tracking-widest text-sm md:text-lg transition-all shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 w-full sm:w-auto">
                 GET A QUOTE
              </button>
           </div>
        </section>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 md:pt-24 pb-8 md:pb-10 px-4 md:px-12 border-t-4 border-orange-500 overflow-hidden">
         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            {/* Col 1: About */}
            <div className="animate-on-scroll">
               {/* Footer Logo - INCREASED SIZE */}
               <div className="mb-6 cursor-pointer inline-block bg-slate-200 p-3 rounded-xl" onClick={() => navigateTo('home')}>
                  <img src={LOGO_SRC} alt="VDNEX IMPEX Logo" className="h-16 md:h-24 w-auto object-contain mix-blend-multiply" />
               </div>
               <p className="mb-6 md:mb-8 leading-relaxed text-xs md:text-sm">
                 VDNEX IMPEX & SERVICES PVT LTD delivers smart, reliable freight and supply chain services worldwide. We make logistics a competitive advantage for your business, ensuring cargo safety and timeliness.
               </p>
               <div className="flex gap-3">
                  <span className="bg-slate-800 p-2.5 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition-all"><Facebook size={16}/></span>
                  <span className="bg-slate-800 p-2.5 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition-all"><Twitter size={16}/></span>
                  <span className="bg-slate-800 p-2.5 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition-all"><Linkedin size={16}/></span>
                  <span className="bg-slate-800 p-2.5 rounded-md hover:bg-orange-500 hover:text-white cursor-pointer transition-all"><Instagram size={16}/></span>
               </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="animate-on-scroll delay-100">
               <h4 className="text-white font-bold text-base md:text-lg mb-6 md:mb-8 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 uppercase tracking-wider">Quick Links</h4>
               <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
                  <li><button onClick={() => navigateTo('home')} className="hover:text-orange-500 flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-orange-500 flex-shrink-0"/> Home</button></li>
                  <li><button onClick={() => navigateTo('about')} className="hover:text-orange-500 flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-orange-500 flex-shrink-0"/> About Us</button></li>
                  <li><button onClick={() => navigateTo('career')} className="hover:text-orange-500 flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-orange-500 flex-shrink-0"/> Career</button></li>
                  <li><button onClick={() => navigateTo('contact')} className="hover:text-orange-500 flex items-center gap-2 transition-colors"><ChevronRight size={14} className="text-orange-500 flex-shrink-0"/> Contact Us</button></li>
               </ul>
            </div>

            {/* Col 3: Services */}
            <div className="animate-on-scroll delay-200">
               <h4 className="text-white font-bold text-base md:text-lg mb-6 md:mb-8 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 uppercase tracking-wider">Our Services</h4>
               <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
                  {services.map(s => (
                    <li key={s.id}>
                      <button onClick={() => navigateTo('service', s.id)} className="hover:text-orange-500 flex items-center gap-2 transition-colors text-left">
                        <ChevronRight size={14} className="text-orange-500 flex-shrink-0"/> {s.title}
                      </button>
                    </li>
                  ))}
               </ul>
            </div>

            {/* Col 4: Contact */}
            <div className="animate-on-scroll delay-300">
               <h4 className="text-white font-bold text-base md:text-lg mb-6 md:mb-8 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500 uppercase tracking-wider">Our Address</h4>
               <ul className="space-y-4 md:space-y-5 text-xs md:text-sm">
                  <li className="flex gap-3 md:gap-4 items-start">
                     <div className="bg-slate-800 p-2 rounded text-orange-500 shrink-0"><MapPin size={16}/></div>
                     <span className="leading-relaxed mt-0.5">VDNEX IMPEX & SERVICES PVT LTD.<br/>Vasai, Maharashtra, India.</span>
                  </li>
                  <li className="flex gap-3 md:gap-4 items-start">
                     <div className="bg-slate-800 p-2 rounded text-orange-500 shrink-0"><Phone size={16}/></div>
                     <span className="mt-0.5">+91-22 12345678</span>
                  </li>
                  <li className="flex gap-3 md:gap-4 items-start">
                     <div className="bg-slate-800 p-2 rounded text-orange-500 shrink-0"><Mail size={16}/></div>
                     <span className="mt-0.5 flex-wrap break-all">vdneximpex@gmail.com</span>
                  </li>
               </ul>
            </div>
         </div>

         {/* Copyright Bar */}
         <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-center md:text-left gap-4 md:gap-0">
            <p>Copyright &copy; {new Date().getFullYear()} VDNEX Impex & Services Pvt Ltd. All Rights Reserved.</p>
            <p className="flex items-center justify-center gap-1">Website designed with <span className="text-orange-500 font-bold">Logistics UI</span></p>
         </div>
      </footer>
    </div>
  );
}
