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
  const [useCustomTime, setUseCustomTime] = useState(false);
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
    
    // Only 1 plaza fully closed (both directions)
    initial['M-2-Kallar Kahar TP (242 Km)'] = { 
      north: { status: 'closed', startTime: time1.toISOString(), reason: 'fog' }, 
      south: { status: 'closed', startTime: time1.toISOString(), reason: 'fog' } 
    };
    
    // Only 1 plaza with partial closure
    initial['M-2-Pindi Bhattian TP (116 Km)'] = { 
      north: { status: 'heavy', startTime: time2.toISOString(), reason: 'fog' }, 
      south: { status: 'open' } 
    };
    
    setPlazaStatuses(initial);
    setLastUpdated(new Date().toISOString());
    
    // Initialize diversions
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
      // Set current date/time as default
      const now = new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setCustomDateTime(localDateTime);
      setShowReasonModal(true);
    } else {
      setCurrentEdit({ motorway, plaza, direction });
      // Set current date/time as default for reopening too
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
          <span className="text-xs">{duration}</span>
        </div>
      );
    }
    return 'Open';
  };

  const handlePlazaClick = (motorway, plaza, direction, statusObj) => {
    // Remove the (XX Km) part from plaza name for detail modal
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
  const containerClass = viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-6xl h-[700px]';

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col items-center">
      <div className="bg-gray-800 rounded-lg p-4 mb-4 w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-bold">Interactive Demo</h2>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${viewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              <Smartphone className="w-5 h-5" />Mobile
            </button>
            <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${viewMode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              <Monitor className="w-5 h-5" />Desktop
            </button>
          </div>
        </div>
      </div>

      <div className={`${containerClass} bg-gray-800 rounded-xl shadow-2xl overflow-hidden border-4 border-gray-700`}>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="p-3">
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Navigation className="text-blue-600 w-6 h-6" />
                    Motorway Closure Status
                  </h1>
                  <p className="text-xs text-gray-600 mt-1">Real-time closure updates - Motorways</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>Copyright © 2026 reserved.</p>
                  <p className="font-semibold">Version 1.10.2</p>
                </div>
              </div>
              
              {lastUpdated && (
                <div className="text-xs text-gray-500 mt-2">
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
                <div className="flex overflow-x-auto">
                  {Object.keys(motorways).map((mway) => (
                    <button
                      key={mway}
                      onClick={() => setActiveTab(mway)}
                      className={`relative flex-1 px-4 py-3 text-sm font-bold transition-all whitespace-nowrap ${
                        activeTab === mway
                          ? `bg-gradient-to-br ${motorways[mway].gradient} text-white shadow-md`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{
                        borderRight: activeTab === mway ? 'none' : '1px solid #e5e7eb'
                      }}
                    >
                      {mway}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
              <h2 className="text-base font-bold text-gray-800 mb-3">{motorwayData.name}</h2>
              <div className="flex items-center gap-4 text-xs flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Open</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Closed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Closed for Buses & Trucks</span>
                </div>
              </div>
              {(closedCount > 0 || heavyCount > 0) && (
                <div className="flex items-center gap-3 flex-wrap mt-3">
                  {closedCount > 0 && (
                    <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                      <span className="text-red-600 font-semibold text-xs">{closedCount} Toll Plaza Closed</span>
                    </div>
                  )}
                  {heavyCount > 0 && (
                    <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
                      <Truck className="w-3 h-3 text-orange-600" />
                      <span className="text-orange-600 font-semibold text-xs">{heavyCount} Toll Plaza Partially Closed for Heavy Traffic (Buses / Trucks)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-3 mb-4 overflow-x-auto">
              <div className="min-w-[650px]">
                <div className="grid gap-2">
                  <div className="grid gap-3 pb-2 border-b-4 border-gray-500 font-semibold text-sm" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr' }}>
                    <div className="text-center">Sr. No.</div>
                    <div>Toll Plaza (TP)</div>
                    <div className="text-center">
                      <div>North Side</div>
                      <div className="text-xs font-normal text-gray-600 mt-1">({motorwayData.northDir})</div>
                    </div>
                    <div className="text-center">
                      <div>South Side</div>
                      <div className="text-xs font-normal text-gray-600 mt-1">({motorwayData.southDir})</div>
                    </div>
                  </div>

                  {motorwayData.plazas.map((plaza, index) => {
                    const key = `${activeTab}-${plaza}`;
                    const status = plazaStatuses[key] || { north: { status: 'open' }, south: { status: 'open' } };
                    
                    // Check if this is the start of a new section
                    const currentSection = motorwayData.sections?.find(
                      sec => sec.start === index
                    );
                    
                    // Check for diversion between this plaza and the next
                    const nextPlaza = motorwayData.plazas[index + 1];
                    const hasNorthDiversion = nextPlaza && isDiversionActive(activeTab, plaza, nextPlaza, 'north');
                    const hasSouthDiversion = nextPlaza && isDiversionActive(activeTab, plaza, nextPlaza, 'south');
                    
                    return (
                      <React.Fragment key={plaza}>
                        {currentSection && (
                          <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 py-2 px-4 font-semibold text-sm rounded-lg mt-2 mb-1 shadow-sm border border-blue-300">
                            {currentSection.name}
                          </div>
                        )}
                        <div className="grid gap-3 items-center py-2 border-b-2 border-gray-400 hover:bg-gray-50 transition-colors" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr' }}>
                          <div className="text-sm font-bold text-gray-700 text-center">{index + 1}</div>
                          <div className="text-sm font-medium text-gray-800">{plaza}</div>
                          <div className="flex justify-center">
                            <button onClick={() => handlePlazaClick(activeTab, plaza, 'north', status.north)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs min-w-[140px] font-semibold ${getStatusColor(status.north?.status)} cursor-pointer hover:opacity-80`}>
                              {getStatusIcon(status.north?.status)}
                              {getStatusText(status.north, true)}
                            </button>
                          </div>
                          <div className="flex justify-center">
                            <button onClick={() => handlePlazaClick(activeTab, plaza, 'south', status.south)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs min-w-[140px] font-semibold ${getStatusColor(status.south?.status)} cursor-pointer hover:opacity-80`}>
                              {getStatusIcon(status.south?.status)}
                              {getStatusText(status.south, true)}
                            </button>
                          </div>
                        </div>
                        {nextPlaza && editMode && (
                          <div className="grid gap-3 items-center py-2 bg-gray-100" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr' }}>
                            <div></div>
                            <div className="text-xs text-gray-600 italic flex items-center gap-2">
                              <span>Diversion</span>
                            </div>
                            <div className="flex justify-center">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNorthDiversion}
                                  onChange={() => toggleDiversion(activeTab, plaza, nextPlaza, 'north')}
                                  className="w-5 h-5 cursor-pointer accent-red-600"
                                />
                                <span className={`text-xs font-semibold ${hasNorthDiversion ? 'text-red-600' : 'text-gray-600'}`}>
                                  {hasNorthDiversion ? 'Active' : 'Off'}
                                </span>
                              </label>
                            </div>
                            <div className="flex justify-center">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasSouthDiversion}
                                  onChange={() => toggleDiversion(activeTab, plaza, nextPlaza, 'south')}
                                  className="w-5 h-5 cursor-pointer accent-red-600"
                                />
                                <span className={`text-xs font-semibold ${hasSouthDiversion ? 'text-red-600' : 'text-gray-600'}`}>
                                  {hasSouthDiversion ? 'Active' : 'Off'}
                                </span>
                              </label>
                            </div>
                          </div>
                        )}
                        {(hasNorthDiversion || hasSouthDiversion) && !editMode && (
                          <div className="grid gap-3 items-center py-1" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr' }}>
                            <div></div>
                            <div></div>
                            <div className="flex justify-center">
                              {hasNorthDiversion && (
                                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold text-center">
                                  DIVERSION
                                </div>
                              )}
                            </div>
                            <div className="flex justify-center">
                              {hasSouthDiversion && (
                                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold text-center">
                                  DIVERSION
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              {editMode && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Click any Open status to close or partially close a plaza. Click Closed or Partially Closed to reopen.</span>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <a href="https://wa.me/923225501818" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition-all">
                  <span className="text-2xl">💬</span>
                  <span className="font-bold">Contact</span>
                </a>
                <div className="flex gap-2">
                  {!isLoggedIn ? (
                    <button onClick={() => setShowLoginModal(true)} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md font-semibold transition-all">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => editMode ? saveStatuses() : setEditMode(true)} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-md font-semibold transition-all">
                        {editMode ? <><Save className="w-5 h-5" /><span>Save</span></> : <><Edit2 className="w-5 h-5" /><span>Edit</span></>}
                      </button>
                      <button onClick={() => { setIsLoggedIn(false); setEditMode(false); }} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md font-semibold transition-all">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-3 text-center text-gray-600 text-xs border-t border-gray-200 pt-3">
                <p>Pakistan Motorway Authority - Closure Status Information System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Login</h3>
              <button onClick={() => setShowLoginModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-2 border rounded-lg mb-3" />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-2 border rounded-lg mb-3" />
            {loginError && <p className="text-red-600 text-sm mb-3">{loginError}</p>}
            <button onClick={handleLogin} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">Login</button>
            <p className="text-xs text-gray-600 mt-3">Demo: admin_m2 / LHR@2024pk</p>
          </div>
        </div>
      )}

      {showDetailModal && detailModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Plaza Status Details</h3>
              <button onClick={() => setShowDetailModal(false)}><X className="w-6 h-6 text-gray-500 hover:text-gray-700" /></button>
            </div>
                          <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2 text-lg">{detailModalData.plaza}</p>
                <p className="text-sm text-gray-600"><strong>Direction:</strong> {detailModalData.direction === 'north' ? 'North' : 'South'} ({detailModalData.direction === 'north' ? motorwayData.northDir : motorwayData.southDir})</p>
              </div>
              
              {detailModalData.statusObj.status === 'open' ? (
                <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <p className="font-bold text-lg text-green-800">Open</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">This toll plaza is currently open for all traffic.</p>
                    {detailModalData.statusObj.lastOpenedTime && (
                      <>
                        <p className="text-sm text-gray-700"><strong>Opened At:</strong> {new Date(detailModalData.statusObj.lastOpenedTime).toLocaleString('en-PK', { timeZone: 'Asia/Karachi', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(/^24:/, '00:')} hrs</p>
                        <p className="text-sm text-gray-700"><strong>Open Duration:</strong> <span className="font-semibold text-base">{calculateDuration(detailModalData.statusObj.lastOpenedTime)}</span></p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-lg ${detailModalData.statusObj.status === 'closed' ? 'bg-red-50 border-2 border-red-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {detailModalData.statusObj.status === 'closed' ? (
                      <XCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <Truck className="w-6 h-6 text-orange-600" />
                    )}
                    <p className={`font-bold text-lg ${detailModalData.statusObj.status === 'closed' ? 'text-red-800' : 'text-orange-800'}`}>
                      {detailModalData.statusObj.status === 'closed' ? 'Closed' : 'Partially Closed for Heavy Traffic'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><strong>Reason:</strong> {reasons.find(r => r.id === detailModalData.statusObj.reason)?.label || 'N/A'}</p>
                    <p className="text-sm text-gray-700"><strong>Closed At:</strong> {new Date(detailModalData.statusObj.startTime).toLocaleString('en-PK', { timeZone: 'Asia/Karachi', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(/^24:/, '00:')} hrs</p>
                    <p className="text-sm text-gray-700"><strong>Duration:</strong> <span className="font-semibold text-base">{calculateDuration(detailModalData.statusObj.startTime)}</span></p>
                  </div>
                </div>
              )}
              
              <button onClick={() => setShowDetailModal(false)} className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {showReopenModal && currentEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Reopen Toll Plaza</h3>
              <button onClick={() => { setShowReopenModal(false); setCurrentEdit(null); setCustomDateTime(''); }}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <div className="mb-6">
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="font-semibold text-gray-800">{currentEdit.plaza.replace(/\s*\(\d+\s*Km\)$/, '')}</p>
                <p className="text-sm text-gray-600">
                  Direction: {currentEdit.direction === 'north' ? 'North' : 'South'} ({currentEdit.direction === 'north' ? motorways[activeTab].northDir : motorways[activeTab].southDir})
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Opening Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={customDateTime}
                  onChange={(e) => setCustomDateTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowReopenModal(false); setCurrentEdit(null); setCustomDateTime(''); }}
                className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-bold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmReopen}
                disabled={!customDateTime}
                className={`flex-1 py-3 rounded-lg font-bold text-white transition-all ${customDateTime ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Reopen
              </button>
            </div>
          </div>
        </div>
      )}

      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Select Closure Type & Reason</h3>
              <button onClick={() => { setShowReasonModal(false); setCustomDateTime(''); }}><X className="w-6 h-6 text-gray-500 hover:text-gray-700" /></button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Closed (All Traffic)</h4>
              <div className="space-y-2">
                {reasons.map(r => (
                  <button key={`closed-${r.id}`} onClick={() => { setSelectedReason(r.id); setSelectedClosureType('closed'); }} className={`w-full p-3 rounded-lg text-left border-2 transition-colors ${selectedReason === r.id && selectedClosureType === 'closed' ? 'bg-red-100 border-red-500' : 'bg-red-50 hover:bg-red-100 border-transparent'}`}>
                    <span className="font-semibold text-gray-800">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Partially Closed (Buses / Trucks Only)</h4>
              <div className="space-y-2">
                {reasons.map(r => (
                  <button key={`heavy-${r.id}`} onClick={() => { setSelectedReason(r.id); setSelectedClosureType('heavy'); }} className={`w-full p-3 rounded-lg text-left border-2 transition-colors ${selectedReason === r.id && selectedClosureType === 'heavy' ? 'bg-orange-100 border-orange-500' : 'bg-orange-50 hover:bg-orange-100 border-transparent'}`}>
                    <span className="font-semibold text-gray-800">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Closure Date & Time
              </label>
              <input
                type="datetime-local"
                value={customDateTime}
                onChange={(e) => setCustomDateTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button onClick={handleConfirmClosure} disabled={!selectedReason || !selectedClosureType || !customDateTime} className={`w-full py-3 rounded-lg font-bold text-white ${selectedReason && selectedClosureType && customDateTime ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>
              Save & Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
