import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import {
  Wifi,
  BatteryCharging,
  Signal,
  Smartphone,
  Maximize2,
  Minimize2,
  Download,
  Settings,
  X,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  Circle,
  Square,
  Search,
  Lock,
  ChevronUp,
} from 'lucide-react';
import { Language } from '../types';

interface AndroidDeviceShellProps {
  currentLanguage: Language;
  children: React.ReactNode;
  onOpenSmsBridge: () => void;
}

export const AndroidDeviceShell: React.FC<AndroidDeviceShellProps> = ({
  currentLanguage,
  children,
  onOpenSmsBridge,
}) => {
  const [deviceMode, setDeviceMode] = useState<'smartphone' | 'fullscreen'>('smartphone');
  const [osState, setOsState] = useState<'lock' | 'home' | 'app' | 'recents' | 'chrome' | 'youtube'>('lock');
  const [currentTime, setCurrentTime] = useState('10:42');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [downloadingApk, setDownloadingApk] = useState(false);
  
  const constraintsRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadApk = () => {
    setDownloadingApk(true);
    setTimeout(() => {
      window.location.href = '/KisanSetu_Release.apk';
      setDownloadingApk(false);
    }, 800);
  };

  const appIcons = [
    { id: 'kisansetu', name: 'KisanSetu', icon: '🌾', color: 'bg-emerald-700', border: 'border-emerald-400', isApp: true, state: 'app' },
    { id: 'chrome', name: 'Chrome', icon: '🌐', color: 'bg-white', border: 'border-slate-200', isApp: true, state: 'chrome' },
    { id: 'youtube', name: 'YouTube', icon: '🎬', color: 'bg-red-600', border: 'border-red-400', isApp: true, state: 'youtube' },
    { id: 'phone', name: 'Phone', icon: '📞', color: 'bg-blue-600', isApp: false },
    { id: 'messages', name: 'Messages', icon: '💬', color: 'bg-amber-600', isApp: false },
    { id: 'camera', name: 'Camera', icon: '📷', color: 'bg-purple-600', isApp: false },
    { id: 'maps', name: 'Maps', icon: '📍', color: 'bg-red-500', isApp: false },
    { id: 'weather', name: 'Weather', icon: '🌤️', color: 'bg-sky-400', isApp: false },
    { id: 'settings', name: 'Settings', icon: '⚙️', color: 'bg-slate-600', isApp: false },
    { id: 'gallery', name: 'Gallery', icon: '🖼️', color: 'bg-pink-500', isApp: false },
  ];

  if (deviceMode === 'fullscreen') {
    return (
      <div className="relative min-h-screen">
        <div className="fixed top-2 right-2 z-50 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full border border-slate-700 shadow-xl text-xs">
          <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
            🤖 Android Native Mode
          </span>
          <button
            onClick={() => setDeviceMode('smartphone')}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Phone Frame</span>
          </button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div 
      ref={constraintsRef}
      className="min-h-screen bg-slate-950 py-6 px-2 flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      {/* Top Controls Toolbar outside phone frame */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between text-xs text-slate-300 px-1 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-white text-sm">Android 14 OS</span>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-mono">
            Pixel 8 Shell
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettingsDrawer(true)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('fullscreen')}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DRAGGABLE PHONE FRAME */}
      <motion.div 
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-[390px] h-[820px] bg-slate-900 rounded-[52px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-600/50 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Hardware Camera Hole Punch Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-50 border border-slate-800 shadow-inner" />

        {/* Android Screen Display Container */}
        <div className="w-full h-full bg-[#F6F8F5] dark:bg-slate-950 rounded-[40px] overflow-hidden flex flex-col relative border border-slate-800/40 shadow-inner cursor-default" onMouseDown={(e) => e.stopPropagation()}>
          
          {/* ANDROID SYSTEM STATUS BAR */}
          <div className="w-full h-8 bg-slate-950 text-slate-200 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold shrink-0 z-40 select-none">
            <span className="font-mono text-emerald-400 font-bold">{currentTime}</span>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[9px] bg-emerald-900/80 text-emerald-200 px-1 rounded font-mono">5G</span>
              <Signal className="w-3 h-3 text-emerald-400" />
              <Wifi className="w-3 h-3 text-emerald-400" />
              <div className="flex items-center gap-0.5 text-[10px] font-mono text-amber-300">
                <span>98%</span>
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              </div>
            </div>
          </div>

          {/* MAIN DISPLAY CONTENT AREA */}
          <div className="flex-1 relative no-scrollbar overflow-hidden">
            <AnimatePresence mode="wait">
              {/* LOCK SCREEN */}
              {osState === 'lock' && (
                <motion.div 
                  key="lock"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ y: -800 }}
                  drag="y"
                  dragConstraints={{ top: -800, bottom: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -150) setOsState('home');
                  }}
                  className="absolute inset-0 z-50 bg-gradient-to-b from-slate-900 to-emerald-950 flex flex-col items-center justify-center p-6 select-none"
                >
                  <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-white/10 p-4 rounded-full backdrop-blur-md border border-white/20"
                    >
                      <Lock className="w-12 h-12 text-emerald-400" />
                    </motion.div>
                    <div className="text-center">
                      <div className="text-6xl font-light text-white mb-2">{currentTime}</div>
                      <div className="text-emerald-300 font-medium">Monday, Nov 9</div>
                    </div>
                  </div>
                  
                  <div className="mb-12 flex flex-col items-center space-y-2 opacity-60">
                    <ChevronUp className="w-6 h-6 text-white animate-bounce" />
                    <span className="text-xs text-white font-medium uppercase tracking-widest">Swipe up to unlock</span>
                  </div>
                </motion.div>
              )}

              {/* HOME SCREEN */}
              {osState === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white p-6 flex flex-col justify-between overflow-y-auto no-scrollbar select-none"
                >
                  <div className="mt-8 text-center space-y-1">
                    <div className="text-5xl font-extrabold font-mono text-emerald-400 tracking-tight">{currentTime}</div>
                    <div className="text-xs text-slate-300 font-medium">Karnal, Haryana • 28°C 🌤️</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 flex items-center gap-2 text-xs text-slate-300 shadow-lg my-6">
                    <Search className="w-4 h-4 text-emerald-400" />
                    <span className="flex-1 font-medium">Search Apps or KisanSetu...</span>
                  </div>

                  {/* DRAGGABLE APP ICONS GRID */}
                  <div className="grid grid-cols-4 gap-x-4 gap-y-6 flex-1 items-start mt-4">
                    {appIcons.map((app) => (
                      <motion.div
                        key={app.id}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.4}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => app.isApp && setOsState(app.state as any)}
                        className="flex flex-col items-center gap-1.5 cursor-pointer"
                      >
                        <div className={`w-14 h-14 rounded-2xl ${app.color} ${app.border || ''} border-2 flex items-center justify-center text-2xl shadow-xl relative`}>
                          {app.icon}
                          {app.id === 'kisansetu' && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-slate-950 rounded-full animate-pulse" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-white/80 truncate w-full text-center">
                          {app.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* DOCK */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-3 grid grid-cols-4 gap-4 mt-auto">
                    {appIcons.slice(0, 4).map(app => (
                      <div key={`dock-${app.id}`} className="flex justify-center">
                         <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center text-xl shadow-lg cursor-pointer`} onClick={() => app.isApp && setOsState(app.state as any)}>
                            {app.icon}
                         </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* RECENTS SCREEN */}
              {osState === 'recents' && (
                <motion.div 
                  key="recents"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  className="w-full h-full bg-slate-950 text-white p-6 flex flex-col justify-between select-none"
                >
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Recent Android Tasks</div>
                  <div className="flex-1 overflow-x-auto flex items-center gap-6 no-scrollbar pb-10">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="min-w-[260px] h-[450px] bg-slate-900 border-2 border-emerald-500 rounded-3xl p-4 shadow-2xl flex flex-col cursor-pointer"
                      onClick={() => setOsState('app')}
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌾</span>
                          <span className="font-extrabold text-sm text-white">KisanSetu AI</span>
                        </div>
                        <span className="text-[9px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-mono">Active</span>
                      </div>
                      <div className="flex-1 bg-[#F6F8F5] rounded-xl p-4 text-slate-900 overflow-hidden relative">
                        <div className="font-bold text-xs text-emerald-800 mb-2 underline decoration-emerald-300">KisanSetu Live Stream</div>
                        <div className="space-y-2 opacity-80 text-[10px]">
                           <div className="flex justify-between"><span>Region:</span> <span className="font-bold">Karnal, HR</span></div>
                           <div className="flex justify-between"><span>Crop:</span> <span className="font-bold text-emerald-700">Wheat</span></div>
                           <div className="flex justify-between"><span>Mandi:</span> <span className="font-bold">₹2,275/qtl</span></div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
                      </div>
                    </motion.div>
                    
                    {/* Mock Second App */}
                    <div className="min-w-[260px] h-[450px] bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col opacity-50 grayscale scale-95">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">📞</span>
                        <span className="font-bold text-sm text-white">Phone</span>
                      </div>
                      <div className="flex-1 bg-slate-800 rounded-xl" />
                    </div>
                  </div>
                  <button onClick={() => setOsState('home')} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-sm transition-colors mb-2">Clear All Tasks</button>
                </motion.div>
              )}

              {/* CHROME APP */}
              {osState === 'chrome' && (
                <motion.div key="chrome" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full bg-white flex flex-col">
                  <div className="bg-slate-100 p-2 flex items-center gap-2 border-b">
                    <div className="flex-1 bg-white rounded-full px-3 py-1 text-[10px] border truncate text-slate-600">https://www.google.com</div>
                    <RefreshCw className="w-3 h-3 text-slate-400" />
                  </div>
                  <iframe src="https://www.google.com/search?q=indian+agriculture&igu=1" className="w-full flex-1 border-0" title="Google Search" />
                </motion.div>
              )}

              {/* YOUTUBE APP */}
              {osState === 'youtube' && (
                <motion.div key="youtube" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full bg-black flex flex-col">
                   <div className="bg-red-600 p-2 flex items-center justify-between">
                     <div className="flex items-center gap-1 text-white font-bold text-xs"><span className="text-lg">🎬</span> YouTube</div>
                     <Search className="w-4 h-4 text-white" />
                   </div>
                   <div className="flex-1 overflow-y-auto no-scrollbar">
                     <iframe src="https://www.youtube.com/embed?listType=search&list=farming+india" className="w-full h-full border-0" title="YouTube Farming" />
                   </div>
                </motion.div>
              )}

              {/* ACTIVE KISAN SETU APP SCREEN */}
              {osState === 'app' && (
                <motion.div 
                  key="app"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full flex flex-col relative"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NATIVE ANDROID 3-BUTTON SYSTEM NAVIGATION BAR */}
          <div className="w-full h-11 bg-slate-950 text-slate-400 flex items-center justify-around shrink-0 border-t border-slate-800/80 z-40 select-none">
            <button
              onClick={() => {
                if (osState === 'app' || osState === 'chrome' || osState === 'youtube') setOsState('home');
                else if (osState === 'recents') setOsState('home');
                else if (osState === 'home') setOsState('lock');
              }}
              className="p-2 hover:text-white active:scale-90 transition-transform"
              title="Android Back Button"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </button>

            <button
              onClick={() => osState !== 'lock' && setOsState('home')}
              className="p-2 hover:text-white active:scale-90 transition-transform"
              title="Android Home Button"
            >
              <Circle className="w-4 h-4 fill-slate-300 text-slate-300" />
            </button>

            <button
              onClick={() => osState !== 'lock' && setOsState('recents')}
              className="p-2 hover:text-white active:scale-90 transition-transform"
              title="Android Recent Apps Button"
            >
              <Square className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Android OS Settings Drawer */}
      <AnimatePresence>
        {showSettingsDrawer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 text-xs"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Android App Settings</h3>
                </div>
                <button onClick={() => setShowSettingsDrawer(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">App Specifications:</div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  <div>ApplicationId: <span className="text-emerald-600 font-bold">com.kisansetu.ai</span></div>
                  <div>Build: <span className="text-emerald-600 font-bold">Native Bridge V14</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200">Granted Android Permissions:</div>
                <div className="space-y-1.5">
                  {['RECORD_AUDIO', 'CAMERA', 'SEND_SMS', 'INTERNET'].map((perm, i) => (
                    <div key={i} className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>android.permission.{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

