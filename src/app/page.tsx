'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [showIncomeDetails, setShowIncomeDetails] = useState(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const [showCommitteeDetails, setShowCommitteeDetails] = useState(false);
  const [showBudgetTable, setShowBudgetTable] = useState(false);
  const [showPamphletModal, setShowPamphletModal] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer to September 5, 2025 at 12:00 WIB
  useEffect(() => {
    const targetDate = new Date('2025-09-05T12:00:00+07:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Download pamflet function
  const downloadPamflet = () => {
    const link = document.createElement('a');
    link.href = '/pamflet.jpeg';
    link.download = 'Pamflet-Maulid-2025.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Budget data from Google Sheets
  const [budgetData, setBudgetData] = useState({
    incomeData: [
      { source: 'Donasi Anggota', amount: 15000000 },
      { source: 'Donasi Umum', amount: 8000000 },
      { source: 'Sponsor', amount: 5000000 },
      { source: 'Bazaar', amount: 3000000 },
    ],
    expenseData: [
      { item: 'Sewa Tempat', amount: 8000000 },
      { item: 'Sound System', amount: 3000000 },
      { item: 'Dekorasi', amount: 4000000 },
      { item: 'Konsumsi', amount: 6000000 },
      { item: 'Dokumentasi', amount: 2000000 },
      { item: 'Hadiah & Doorprize', amount: 3000000 },
      { item: 'Operasional', amount: 2000000 },
      { item: 'Lain-lain', amount: 3000000 },
    ],
    totalIncome: 31000000,
    totalExpense: 31000000,
    balance: 0
  });
  const [budgetLoading, setBudgetLoading] = useState(true);
  const [budgetError, setBudgetError] = useState<string | null>(null);

  // Fetch budget data from Google Sheets
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setBudgetLoading(true);
        const response = await fetch('/api/budget');
        
        if (!response.ok) {
          throw new Error('Failed to fetch budget data');
        }
        
        const data = await response.json();
        setBudgetData(data);
        setBudgetError(null);
      } catch (error) {
        console.error('Error fetching budget data:', error);
        setBudgetError('Failed to load budget data from Google Sheets');
        // Keep using default data if API fails
      } finally {
        setBudgetLoading(false);
      }
    };

    fetchBudgetData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchBudgetData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const { incomeData, expenseData } = budgetData;

  // Updated committee structure
  const committeeStructure = {
    pembina: [
      'Ustadz Abd Ro&apos;uf',
      'Ustadz Marhasan',
      'Ustadz A. Hadadi'
    ],
    leadership: [
      { position: 'Ketua', name: 'Chaerul Setiawan' },
      { position: 'Sekretaris', name: 'Achmad Faizal' },
      { position: 'Bendahara', name: 'Hilman Shobari' }
    ],
    sections: [
      {
        name: 'Sie. Dana',
        members: ['Oki Widayat', 'Kiki Muchorie', 'Agung Permadi', 'Firdaus']
      },
      {
        name: 'Sie. Acara',
        members: ['Jafar', 'Risky Sujarwo', 'Muhammad Lutfi', 'Zaenudin', 'Alim Hamzah Gea']
      },
      {
        name: 'Sie. Humas',
        members: ['Egi Firmansyah', 'Denis Akbar', 'Raihan', 'Fahri']
      },
      {
        name: 'Sie. Perlengkapan',
        members: ['Galuh Apriansya', 'Abdurrochim', 'Sidup Taslim']
      },
      {
        name: 'Sie. Konsumsi',
        members: ['Fakhri Rasyid', 'Rustami', 'Muhammad Sulaeman', 'Yasin', 'A. Nur Faizi']
      },
      {
        name: 'Sie. Keamanan',
        members: ['A. Fachrurrozi', 'Abdurrahman', 'Rahmat Fajar']
      },
      {
        name: 'Sie. Kewanitaan',
        members: ['Siti Hasanah', 'Rusmiati', 'Mia', 'Khoirunisa', 'Barkah']
      }
    ]
  };

  // Budget table data
  const budgetTableData = [
    { no: 1, uraian: 'Sie. Acara (Hadiah penceramah, dll)', jumlah: 10000000 },
    { no: 2, uraian: 'Sie. Perlengkapan (Akomodasi peralatan acara)', jumlah: 5000000 },
    { no: 3, uraian: 'Sie. Konsumsi', jumlah: 15000000 },
    { no: 4, uraian: 'Keamanan', jumlah: 1000000 }
  ];

  const totalIncome = budgetData.totalIncome;
  const totalExpense = budgetData.totalExpense;
  const totalBudgetTable = budgetTableData.reduce((sum, item) => sum + item.jumlah, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/background-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      
      {/* Pamphlet Modal */}
      {showPamphletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setShowPamphletModal(false)}
              className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="p-6">
              <Image
                src="/pamflet.jpeg"
                alt="Pamflet Maulid 2025"
                width={800}
                height={1000}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <button
                  onClick={downloadPamflet}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Pamflet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-6 sm:py-8 shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-4 sm:space-y-0">
              <Image
                src="/logo.png"
                alt="Ikhwanul Muslimin Logo"
                width={60}
                height={60}
                className="sm:mr-4 animate-pulse sm:w-20 sm:h-20"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-fade-in">
                  Peringatan Maulid Nabi Muhammad SAW 2025
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-emerald-100">
                  Majelis Al-Qur&apos;an, Sholawat, & Burdah Ikhwanul Muslimin
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Countdown Timer */}
        <section className="py-6 sm:py-8 bg-gradient-to-r from-emerald-700 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">⏰ Countdown Menuju Acara ⏰</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                <div className="text-2xl sm:text-4xl font-bold">{countdown.days}</div>
                <div className="text-xs sm:text-sm">Hari</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                <div className="text-2xl sm:text-4xl font-bold">{countdown.hours}</div>
                <div className="text-xs sm:text-sm">Jam</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                <div className="text-2xl sm:text-4xl font-bold">{countdown.minutes}</div>
                <div className="text-xs sm:text-sm">Menit</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-4">
                <div className="text-2xl sm:text-4xl font-bold">{countdown.seconds}</div>
                <div className="text-xs sm:text-sm">Detik</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 sm:py-8">
          {/* Event Information - Enhanced Design */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-4">
                  🕌 Informasi Acara 🕌
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-6">
                  {/* Location */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 sm:p-6 rounded-xl border-l-4 border-emerald-500 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-emerald-500 text-white p-3 rounded-full">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-emerald-800 mb-2">Tempat Pelaksanaan</h3>
                        <p className="text-gray-700 font-medium">Kediaman Ustadz Abd Ro&apos;uf</p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-500 text-white p-3 rounded-full">
                        <span className="text-xl">📅</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-blue-800 mb-2">Tanggal & Hari</h3>
                        <p className="text-gray-700 font-medium">Jum&apos;at, 05 September 2025</p>
                        <p className="text-gray-600 text-sm">12 Rabiul Awal 1447H</p>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500 text-white p-3 rounded-full">
                        <span className="text-xl">⏰</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-purple-800 mb-4">Susunan Acara</h3>
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <span className="text-gray-800 font-semibold">Jum&apos;at Berkah</span>
                              <span className="text-purple-600 font-bold text-sm sm:text-base">12:00 WIB s/d selesai</span>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <span className="text-gray-800 font-semibold">Pembacaan Burdah</span>
                              <span className="text-purple-600 font-bold text-sm sm:text-base">15:30 WIB s/d selesai</span>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <span className="text-gray-800 font-semibold">Pembacaan Maulid</span>
                              <span className="text-purple-600 font-bold text-sm sm:text-base">18:00 WIB s/d selesai</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pamflet - Fixed to show image properly */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative group cursor-pointer" onClick={() => setShowPamphletModal(true)}>
                    <Image
                      src="/pamflet.jpeg"
                      alt="Pamflet Maulid 2025"
                      width={300}
                      height={350}
                      className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-xs sm:max-w-sm"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Committee Structure */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800">
                  👥 Susunan Panitia
                </h2>
                <button
                  onClick={() => setShowCommitteeDetails(!showCommitteeDetails)}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="font-semibold">{showCommitteeDetails ? '🔼 Sembunyikan Detail' : '🔽 Tampilkan Detail'}</span>
                  {showCommitteeDetails ? (
                    <ChevronUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              
              {showCommitteeDetails && (
                <div className="space-y-6 animate-slide-down">
                  {/* Pembina */}
                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 sm:p-6 rounded-lg border border-emerald-200">
                    <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-3">Pembina</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {committeeStructure.pembina.map((name, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="text-gray-700 font-medium text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: name }}></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leadership */}
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 sm:p-6 rounded-lg border border-blue-200">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Pimpinan</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {committeeStructure.leadership.map((leader, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                          <h4 className="font-semibold text-blue-800 text-sm sm:text-base">{leader.position}</h4>
                          <p className="text-gray-700 text-sm sm:text-base">{leader.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {committeeStructure.sections.map((section, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">{section.name}</h4>
                        <div className="space-y-2">
                          {section.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="bg-white p-2 rounded shadow-sm">
                              <p className="text-gray-700 text-xs sm:text-sm">{member}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!showCommitteeDetails && (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-sm sm:text-base">Klik tombol di atas untuk melihat susunan lengkap panitia</p>
                </div>
              )}
            </div>
          </section>

          {/* Budget Table */}
          <section className="mb-8 sm:mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800">
                  📊 Tabel Anggaran Biaya
                </h2>
                <button
                  onClick={() => setShowBudgetTable(!showBudgetTable)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 text-sm sm:text-base"
                >
                  <span className="font-semibold">{showBudgetTable ? '🔼 Sembunyikan Tabel' : '🔽 Tampilkan Tabel'}</span>
                  {showBudgetTable ? (
                    <ChevronUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              
              {showBudgetTable && (
                <div className="animate-slide-down overflow-x-auto">
                  <table className="w-full border-collapse border border-emerald-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
                        <th className="border border-emerald-300 px-2 sm:px-4 py-3 text-left font-bold text-sm sm:text-base">No</th>
                        <th className="border border-emerald-300 px-2 sm:px-4 py-3 text-left font-bold text-sm sm:text-base">Uraian</th>
                        <th className="border border-emerald-300 px-2 sm:px-4 py-3 text-right font-bold text-sm sm:text-base">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetTableData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-emerald-50' : 'bg-white'}>
                          <td className="border border-emerald-200 px-2 sm:px-4 py-3 text-center font-bold text-gray-900 text-sm sm:text-base">{item.no}</td>
                          <td className="border border-emerald-200 px-2 sm:px-4 py-3 font-semibold text-gray-900 text-sm sm:text-base">{item.uraian}</td>
                          <td className="border border-emerald-200 px-2 sm:px-4 py-3 text-right font-bold text-emerald-700 text-sm sm:text-base">
                            {formatCurrency(item.jumlah)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gradient-to-r from-emerald-600 to-green-700 text-white font-bold">
                        <td className="border border-emerald-300 px-2 sm:px-4 py-3 text-center font-bold text-sm sm:text-base" colSpan={2}>TOTAL</td>
                        <td className="border border-emerald-300 px-2 sm:px-4 py-3 text-right font-bold text-lg sm:text-xl">
                          {formatCurrency(totalBudgetTable)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {!showBudgetTable && (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-sm sm:text-base">Klik tombol di atas untuk melihat tabel anggaran biaya</p>
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-emerald-800 font-semibold text-sm sm:text-base">Total Anggaran: {formatCurrency(totalBudgetTable)}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Budget Overview */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-6 sm:mb-8 text-center">
              💰 Rincian Anggaran
              {budgetLoading && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
              {budgetError && <span className="text-sm text-red-500 ml-2">(Error loading data)</span>}
            </h2>
            
            {budgetError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                <p className="text-red-700 text-sm">{budgetError}</p>
                <p className="text-red-600 text-xs mt-1">Menampilkan data default. Data akan diperbarui otomatis.</p>
              </div>
            )}
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Total Income */}
              <div 
                className={`bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-4 sm:p-6 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ${budgetLoading ? 'opacity-75' : ''}`}
                onClick={() => setShowIncomeDetails(!showIncomeDetails)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Total Dana Masuk</h3>
                    <p className="text-lg sm:text-2xl font-bold">
                      {budgetLoading ? 'Loading...' : formatCurrency(totalIncome)}
                    </p>
                  </div>
                  {showIncomeDetails ? (
                    <ChevronUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </div>

              {/* Total Expense */}
              <div 
                className={`bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-4 sm:p-6 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ${budgetLoading ? 'opacity-75' : ''}`}
                onClick={() => setShowExpenseDetails(!showExpenseDetails)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Total Dana Keluar</h3>
                    <p className="text-lg sm:text-2xl font-bold">
                      {budgetLoading ? 'Loading...' : formatCurrency(totalExpense)}
                    </p>
                  </div>
                  {showExpenseDetails ? (
                    <ChevronUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </div>

              {/* Balance */}
              <div className={`rounded-2xl p-4 sm:p-6 shadow-xl text-white sm:col-span-2 lg:col-span-1 ${budgetLoading ? 'opacity-75' : ''} ${
                budgetData.balance >= 0 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                  : 'bg-gradient-to-br from-orange-500 to-red-600'
              }`}>
                <h3 className="text-sm sm:text-lg font-semibold mb-2">Saldo</h3>
                <p className="text-lg sm:text-2xl font-bold">
                  {budgetLoading ? 'Loading...' : formatCurrency(budgetData.balance)}
                </p>
              </div>
            </div>

            {/* Income Details */}
            {showIncomeDetails && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border-l-4 border-green-500 animate-slide-down">
                <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-4">Rincian Dana Masuk</h3>
                <div className="space-y-3">
                  {incomeData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 text-sm sm:text-base">{item.source}</span>
                      <span className="font-semibold text-green-600 text-sm sm:text-base">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expense Details */}
            {showExpenseDetails && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-l-4 border-red-500 animate-slide-down">
                <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-4">Rincian Dana Keluar</h3>
                <div className="space-y-3">
                  {expenseData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 text-sm sm:text-base">{item.item}</span>
                      <span className="font-semibold text-red-600 text-sm sm:text-base">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Contact Information - Updated with Instagram */}
          <section className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">📞 Informasi Kontak</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-center">
              <div>
                <h3 className="font-semibold mb-4 text-sm sm:text-base">Panitia Acara</h3>
                <div>
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/6287850188977" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 hover:bg-white/10 p-0 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span className="text-sm sm:text-base">WhatsApp: +62 878-5018-8977</span>
                  </a>
                  
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/hadhroh_im" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 hover:bg-white/10 p-0 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span className="text-sm sm:text-base">Instagram: @Hadhroh_im</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Partisipasi</h3>
                <p className="text-sm sm:text-base">Bank BCA: 2302585866</p>
                <p className="text-sm sm:text-base">a.n. Oki Widayat</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-emerald-800 text-white py-4 sm:py-6 mt-8 sm:mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm sm:text-base">&copy; 2025 Majelis Al-Qur&apos;an, Sholawat, & Burdah Ikhwanul Muslimin. Semoga Allah SWT meridhoi acara ini.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}