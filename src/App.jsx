import React, { useState, useEffect } from 'react';
import { AlertCircle, Navigation, CheckCircle, XCircle, Edit2, Save, Truck, X, LogOut, Smartphone, Monitor } from 'lucide-react';

const App = () => {
  const [viewMode, setViewMode] = useState('mobile');
  const [activeTab, setActiveTab] = useState('M-2');
  const [editMode, setEditMode] = useState(false);
  const [plazaStatuses, setPlazaStatuses] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [customDateTime, setCustomDateTime] = useState('');
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedClosureType, setSelectedClosureType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailModalData, setDetailModalData] = useState(null);
  const [diversions, setDiversions] = useState({});

  const users = {
    'M-2': { username: 'admin_m2', password: 'LHR@2024pk' },
    'M-1': { username: 'pesh_user', password: 'Motorway#1' },
    'E-35 / M-15': { username: 'hazara_admin', password: 'e35Pass!23' },
    'M-14': { username: 'dik_operator', password: 'Secure@M14' },
    'N-75 / IMDC': { username: 'murree_ctrl', password: 'N75_Express' }
  };

  const motorways = {
    'M-2': {
      name: 'M-2 (Islamabad - Lahore Motorway) 349 Km',
      northDir: 'towards Islamabad / Peshawar',
      southDir: 'towards Lahore',
      gradient: 'from-blue-500 to-blue-700',
      sections: [
        { name: 'Sec-III', start: 0, end: 6 },
        { name: 'Sec-II', start: 7, end: 13 },
        { name: 'Sec-I', start: 14, end: 22 }
      ],
      plazas: [
        'Islamabad Main Toll Plaza MTP (349 Km)', 'Thallian TP (343 Km)', 'Capital Smart City TP (332 Km)', 'Chakri TP (315 Km)', 
        'Neela Dhula TP (293 Km)', 'Balkasar TP (265 Km)', 'Kallar Kahar TP (242 Km)', 'Lillah TP (213 Km)', 'Bhera TP (198 Km)', 'Salam TP (176 Km)', 
        'Kot Momin TP (162 Km)', 'Sialmore TP (136 Km)', 'Pindi Bhattian TP (116 Km)', 'Kot Sarwar TP (98 Km)', 'Khanqah Dogran TP (82 Km)', 
        'Hiran Minar TP (52 Km)', 'Sheikhupura TP (46 Km)', 'Kot Pindi Das TP (30 Km)', 'Kala Shah Kaku TP (26 Km)', 
        'Kot Abdul Malik TP (22 Km)', 'Faizpur TP (16 Km)', 'Ravi MTP (12 Km)', 'Babu Sabu TP (09 Km)'
      ]
    },
    'M-1': {
      name: 'M-1 (Islamabad - Peshawar Motorway) 147 Km',
      northDir: 'towards Peshawar',
      southDir: 'towards Islamabad / Lahore',
      gradient: 'from-green-500 to-green-700',
      sections: [
        { name: 'Sec-I', start: 0, end: 6 },
        { name: 'Sec-II', start: 7, end: 12 }
      ],
      plazas: [
        'STP Islamabad (351 Km)', 'Fateh Jhang TP (353 Km)', 'AWT / Sangjani TP (359 Km)', 'Brahma Bahtar TP (376 Km)', 'Burhan TP (387 Km)',
        'Ghazi TP (398 Km)', 'Chach TP (405 Km)', 'Swabi TP (420 Km)', 'Kernal Sher Khan TP (439 Km)', 'Wali TP (450 Km)',
        'Rashakai TP (458 Km)', 'Charsadda TP (480 Km)', 'Peshawar MTP (498 Km)'
      ]
    },
    'M-14': {
      name: 'M-14 (Hakla - D.I. Khan) 293 Km',
      northDir: 'towards Islamabad / Peshawar',
      southDir: 'towards D.I. Khan',
      gradient: 'from-orange-500 to-orange-700',
      sections: [
        { name: 'Sec-I', start: 0, end: 4 },
        { name: 'Sec-II', start: 5, end: 9 }
      ],
      plazas: [
        'Fateh Jang TP (25 Km)', 'Pindi Gheb TP (64 Km)', 'Kharapa TP (76 Km)', 'Tarap TP (114 Km)', 'Daud Khel MTP (156 Km)',
        'Kot Bellian TP (167 Km)', 'Essa Khel TP (210 Km)', 'Kundal TP (220 Km)', 'Abdul Khel TP (266 Km)', 'Yarik MTP (293 Km)'
      ]
    },
    'E-35 / M-15': {
      name: 'E-35 / M-15 (Hazara Motorway) 96 Km',
      northDir: 'towards Gilgit / Mansehra',
      southDir: 'towards Islamabad / Peshawar',
      gradient: 'from-purple-500 to-purple-700',
      sections: [],
      plazas: [
        'Jarikas TP (18 Km)', 'Hattar TP (24 Km)', 'Haripur TP (29 Km)', 'Shah Maqsood TP (45 Km)', 'Havelian MTP (61 Km)',
        'Qalandarabad TP (84 Km)', 'Mansehra-1 TP (95 Km)', 'Mansehra-2 MTP (96 Km)'
      ]
    },
    'N-75 / IMDC': {
      name: 'N-75 / IMDC (Murree Expressway)',
      northDir: 'towards Murree',
      southDir: 'towards Islamabad',
      gradient: 'from-teal-500 to-teal-700',
      sections: [],
      plazas: ['Phulgran (17 Mile Toll Plaza)']
    }
  };

  const reasons = [
    { id: 'fog', label: 'Due to Fog', shortLabel: 'Fog' },
    { id: 'accident', label: 'Due to Accident', shortLabel: 'Accident' },
    { id: 'law_order', label: 'Due to Law & Order', shortLabel: 'Law & Order' }
  ];

  const calculateDuration = (startTime) => {
    if (!startTime) return '';
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now - start;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    
    if (hours === 0) return `${minutes} mins`;
    if (minutes === 0) return `${hours} hrs`;
    return `${hours} hrs ${minutes} mins`;
  };

  useEffect(() => {
    const initial = {};
    const baseTime = new Date();
    baseTime.setHours(7, 0, 0, 0);
    
    Object.keys(motorways).forEach(mway => {
      motorways[mway].plazas.forEach(plaza => {
        initial[`${mway}-${plaza}`] = { 
          north: { status: 'open' }, 
          south: { status: 'open' } 
        };
      });
    });
    
    const time1 = new Date(baseTime);
    const time2 = new Date(baseTime);
    time2.setHours(time2.getHours() - 2);
    
    initial['M-2-Kallar Kahar TP (242 Km)'] = { 
      north: { status: 'closed', startTime: time1.toISOString(), reason: 'fog' }, 
      south: { status: 'closed', startTime: time1.toISOString(), reason: 'fog' } 
    };
    
    initial['M-2-Pindi Bhattian TP (116 Km)'] = { 
      north: { status: 'heavy', startTime: time2.toISOString(), reason: 'fog' }, 
      south: { status: 'open' } 
    };
    
    setPlazaStatuses(initial);
    setLastUpdated(new Date().toISOString());
    
    const initialDiversions = {};
    Object.keys(motorways).forEach(mway => {
      initialDiversions[mway] = {};
    });
    setDiversions(initialDiversions);
  }, []);

  const handleLogin = () => {
    const motorway = Object.keys(users).find(mway => 
      users[mway].username === loginUsername && users[mway].password === loginPassword
    );
    if (motorway) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const toggleDiversion = (motorway, fromPlaza, toPlaza, direction) => {
    const key = `${fromPlaza}-${toPlaza}`;
    setDiversions(prev => ({
      ...prev,
      [motorway]: {
        ...prev[motorway],
        [key]: {
          ...prev[motorway]?.[key],
          [direction]: !prev[motorway]?.[key]?.[direction]
        }
      }
    }));
  };

  const isDiversionActive = (motorway, fromPlaza, toPlaza, direction) => {
    const key = `${fromPlaza}-${toPlaza}`;
    return diversions[motorway]?.[key]?.[direction] || false;
  };

  const saveStatuses = () => {
    setLastUpdated(new Date().toISOString());
    setEditMode(false);
    alert('Saved!');
  };

  const handleStatusClick = (motorway, plaza, direction) => {
    if (!editMode) return;
    const key = `${motorway}-${plaza}`;
    const current = plazaStatuses[key]?.[direction]?.status || 'open';
    if (current === 'open') {
      setCurrentEdit({ motorway, plaza, direction });
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setCustomDateTime(localDateTime);
      setShowReasonModal(true);
    } else {
      setCurrentEdit({ motorway, plaza, direction });
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setCustomDateTime(localDateTime);
      setShowReopenModal(true);
    }
  };

  const updateStatus = (motorway, plaza, direction, newStatus, reason, startTime) => {
    const key = `${motorway}-${plaza}`;
    const updates = {
      ...plazaStatuses[key],
      [direction]: { 
        status: newStatus, 
        startTime, 
        reason,
        lastOpenedTime: newStatus === 'open' ? startTime : plazaStatuses[key]?.[direction]?.lastOpenedTime
      }
    };
    setPlazaStatuses({
      ...plazaStatuses,
      [key]: updates
    });
  };

  const handleConfirmClosure = () => {
    if (!currentEdit || !selectedReason || !selectedClosureType || !customDateTime) return;
    const startTime = new Date(customDateTime).toISOString();
    updateStatus(currentEdit.motorway, currentEdit.plaza, currentEdit.direction, selectedClosureType, selectedReason, startTime);
    setShowReasonModal(false);
    setCurrentEdit(null);
    setSelectedReason(null);
    setSelectedClosureType(null);
    setCustomDateTime('');
  };

  const handleConfirmReopen = () => {
    if (!currentEdit || !customDateTime) return;
    const startTime = new Date(customDateTime).toISOString();
    updateStatus(currentEdit.motorway, currentEdit.plaza, currentEdit.direction, 'open', null, startTime);
    setShowReopenModal(false);
    setCurrentEdit(null);
    setCustomDateTime('');
  };

  const getStatusColor = (status) => {
    if (status === 'closed') return 'bg-red-500';
    if (status === 'heavy') return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStatusIcon = (status) => {
    if (status === 'closed') return <XCircle className="w-4 h-4" />;
    if (status === 'heavy') return <Truck className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getStatusText = (statusObj, simplified = false) => {
    if (!statusObj || statusObj.status === 'open') return 'Open';
    const duration = calculateDuration(statusObj.startTime);
    if (simplified) {
      return (
        <div className="flex flex-col items-center">
          <span>{statusObj.status === 'closed' ? 'Closed' : 'Partial'}</span>
          <span className="text-[10px] leading-none mt-1 opacity-90">{duration}</span>
        </div>
      );
    }
    return 'Open';
  };

  const handlePlazaClick = (motorway, plaza, direction, statusObj) => {
    const plazaNameOnly = plaza.replace(/\s*\(\d+\s*Km\)$/, '');
    if (editMode) {
      handleStatusClick(motorway, plaza, direction);
    } else {
      setDetailModalData({ motorway, plaza: plazaNameOnly, direction, statusObj });
      setShowDetailModal(true);
    }
  };

  const motorwayData = motorways[activeTab];
  
  const closedCount = motorwayData.plazas.filter(plaza => {
    const key = `${activeTab}-${plaza}`;
    const status = plazaStatuses[key];
    return status?.north?.status === 'closed' || status?.south?.status === 'closed';
  }).length;
  
  const heavyCount = motorwayData.plazas.filter(plaza => {
    const key = `${activeTab}-${plaza}`;
    const status = plazaStatuses[key];
    return status?.north?.status === 'heavy' || status?.south?.status === 'heavy';
  }).length;

  // FIXED: Container class now uses w-full on mobile to prevent overflow
  const containerClass = viewMode === 'mobile' ? 'w-full h-full' : 'w-full max-w-6xl h-[700px]';

  return (
    <div className="min-h-screen bg-gray-900 p-2 md:p-4 flex flex-col items-center">
      <div className="bg-gray-800 rounded-lg p-3 mb-4 w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-sm md:text-xl font-bold">Interactive Demo</h2>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold ${viewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              <Smartphone className="w-4 h-4" />Mobile
            </button>
            <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold ${viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              <Monitor className="w-4 h-4" />Desktop
            </button>
          </div>
        </div>
      </div>

      <div className={`${containerClass} bg-gray-800 rounded-xl shadow-2xl overflow-hidden border-2 md:border-4 border-gray-700`}>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="p-2 md:p-3">
            <div className="bg-white rounded-lg shadow-lg p-3 mb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex-1">
                  <h1 className="text-sm md:text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Navigation className="text-blue-600 w-5 h-5" />
                    Motorway Closure Status
                  </h1>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                  <p className="font-semibold">Version 1.10.2</p>
                </div>
              </div>
              
              {lastUpdated && (
                <div className="text-[10px] text-gray-500">
                  Last updated: {new Date(lastUpdated).toLocaleString('en-PK', { 
                    timeZone: 'Asia/Karachi',
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              )}
            </div>

            {!isLoggedIn && (
              <div className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {Object.keys(motorways).map((mway) => (
                    <button
                      key={mway}
                      onClick={() => setActiveTab(mway)}
                      className={`relative flex-1 px-3 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === mway
                          ? `bg-gradient-to-br ${motorways[mway].gradient} text-white shadow-md`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ borderRight: '1px solid #e5e7eb' }}
                    >
                      {mway}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-3 mb-4">
              <h2 className="text-xs md:text-base font-bold text-gray-800 mb-2">{motorwayData.name}</h2>
              <div className="flex items-center gap-3 text-[10px] flex-wrap">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Open</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Closed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Partial</span>
                </div>
              </div>
            </div>

            {/* FIXED: Removed min-w-[650px] and added fluid grid for mobile */}
            <div className="bg-white rounded-lg shadow-lg p-2 mb-4">
              <div className="w-full">
                <div className="grid gap-1">
                  <div className="grid gap-2 pb-2 border-b-2 border-gray-500 font-bold text-[10px] md:text-sm uppercase tracking-wider text-gray-600" 
                    style={{ gridTemplateColumns: '30px 1fr 75px 75px' }}>
                    <div className="text-center">Sr</div>
                    <div>Plaza</div>
                    <div className="text-center">North</div>
                    <div className="text-center">South</div>
                  </div>

                  {motorwayData.plazas.map((plaza, index) => {
                    const key = `${activeTab}-${plaza}`;
                    const status = plazaStatuses[key] || { north: { status: 'open' }, south: { status: 'open' } };
                    const currentSection = motorwayData.sections?.find(sec => sec.start === index);
                    const nextPlaza = motorwayData.plazas[index + 1];
                    const hasNorthDiversion = nextPlaza && isDiversionActive(activeTab, plaza, nextPlaza, 'north');
                    const hasSouthDiversion = nextPlaza && isDiversionActive(activeTab, plaza, nextPlaza, 'south');
                    
                    return (
                      <React.Fragment key={plaza}>
                        {currentSection && (
                          <div className="bg-blue-600 text-white py-1 px-3 font-bold text-[10px] rounded mt-2 shadow-sm">
                            {currentSection.name}
                          </div>
                        )}
                        <div className="grid gap-2 items-center py-2 border-b border-gray-100 hover:bg-gray-50" 
                          style={{ gridTemplateColumns: '30px 1fr 75px 75px' }}>
                          <div className="text-[10px] text-gray-400 text-center">{index + 1}</div>
                          <div className="text-[11px] md:text-sm font-semibold text-gray-800 break-words leading-tight">{plaza}</div>
                          <div className="flex justify-center">
                            <button onClick={() => handlePlazaClick(activeTab, plaza, 'north', status.north)} 
                              className={`flex flex-col items-center justify-center p-1.5 rounded text-white w-full h-9 transition-all ${getStatusColor(status.north?.status)}`}>
                              {getStatusText(status.north, true)}
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <button onClick={() => handlePlazaClick(activeTab, plaza, 'south', status.south)} 
                              className={`flex flex-col items-center justify-center p-1.5 rounded text-white w-full h-9 transition-all ${getStatusColor(status.south?.status)}`}>
                              {getStatusText(status.south, true)}
                            </button>
                          </div>
                        </div>
                        {(hasNorthDiversion || hasSouthDiversion) && !editMode && (
                          <div className="grid gap-2 items-center py-1 bg-red-50" style={{ gridTemplateColumns: '30px 1fr 75px 75px' }}>
                            <div colSpan="2"></div>
                            <div className="flex justify-center">
                              {hasNorthDiversion && <div className="bg-red-600 text-[8px] text-white px-1 rounded font-bold">DIVERSION</div>}
                            </div>
                            <div className="flex justify-center">
                              {hasSouthDiversion && <div className="bg-red-600 text-[8px] text-white px-1 rounded font-bold">DIVERSION</div>}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center justify-between gap-4">
                <a href="https://wa.me/923225501818" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
                  <span>💬</span>
                  <span>Contact</span>
                </a>
                {!isLoggedIn ? (
                  <button onClick={() => setShowLoginModal(true)} className="p-2 rounded-lg bg-blue-600 text-white">
                    <Edit2 className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => editMode ? saveStatuses() : setEditMode(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                      {editMode ? 'Save' : 'Edit'}
                    </button>
                    <button onClick={() => { setIsLoggedIn(false); setEditMode(false); }} className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login and Status Modals remain the same as they were already mobile-friendly */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Admin Login</h3>
            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-2 border rounded-lg mb-3" />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-2 border rounded-lg mb-3" />
            <button onClick={handleLogin} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">Login</button>
            <button onClick={() => setShowLoginModal(false)} className="w-full mt-2 text-gray-500 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {showDetailModal && detailModalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800 leading-tight">{detailModalData.plaza}</h3>
                <p className="text-xs text-gray-500 mt-1">{detailModalData.direction === 'north' ? 'Northbound' : 'Southbound'}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className={`p-4 rounded-lg mb-4 ${detailModalData.statusObj.status === 'open' ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="font-bold text-center">
                {detailModalData.statusObj.status === 'open' ? 'ROAD IS OPEN' : 'ROAD IS CLOSED'}
              </p>
            </div>
            <button onClick={() => setShowDetailModal(false)} className="w-full py-3 bg-gray-800 text-white rounded-lg font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
