
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PIDDataPoint } from '../types';

const PIDSimulator: React.FC = () => {
  const [p, setP] = useState(2.0);
  const [i, setI] = useState(0.5);
  const [d, setD] = useState(1.0);
  const [sp, setSp] = useState(50);
  const [data, setData] = useState<PIDDataPoint[]>([]);
  
  // Internal state for simulation
  const lastErrorRef = useRef(0);
  const integralRef = useRef(0);
  const currentPvRef = useRef(0);
  const timeRef = useRef(0);

  const resetSimulation = () => {
    lastErrorRef.current = 0;
    integralRef.current = 0;
    currentPvRef.current = 0;
    timeRef.current = 0;
    setData([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const error = sp - currentPvRef.current;
      integralRef.current += error * 0.1; // dt = 0.1
      const derivative = (error - lastErrorRef.current) / 0.1;
      
      const output = (p * error) + (i * integralRef.current) + (d * derivative);
      
      // Simple physical model (a mass with some inertia and damping)
      // PV_new = PV_old + (Output - Friction) * dt
      currentPvRef.current += (output - currentPvRef.current * 0.1) * 0.1;
      
      lastErrorRef.current = error;
      timeRef.current += 0.1;

      setData(prev => {
        const newData = [...prev, {
          time: Number(timeRef.current.toFixed(1)),
          sp: sp,
          pv: Number(currentPvRef.current.toFixed(2))
        }];
        // Keep only last 100 points
        return newData.slice(-100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [p, i, d, sp]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-copper-400 flex items-center gap-2">
            <span className="w-3 h-3 bg-copper-500 rounded-full animate-pulse"></span>
            Real-time PID Loop Simulator
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" tick={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sp" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} name="Setpoint (SP)" />
                <Line type="monotone" dataKey="pv" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} name="Process Var (PV)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <label className="block text-sm font-medium text-slate-400 mb-1">Proportional (Kp): {p.toFixed(1)}</label>
            <input 
              type="range" min="0" max="10" step="0.1" value={p} 
              onChange={(e) => setP(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-copper-500"
            />
            
            <label className="block text-sm font-medium text-slate-400 mt-4 mb-1">Integral (Ki): {i.toFixed(1)}</label>
            <input 
              type="range" min="0" max="5" step="0.1" value={i} 
              onChange={(e) => setI(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-copper-500"
            />

            <label className="block text-sm font-medium text-slate-400 mt-4 mb-1">Derivative (Kd): {d.toFixed(1)}</label>
            <input 
              type="range" min="0" max="2" step="0.1" value={d} 
              onChange={(e) => setD(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-copper-500"
            />

            <label className="block text-sm font-medium text-slate-400 mt-4 mb-1">Setpoint: {sp}</label>
            <input 
              type="range" min="10" max="90" step="1" value={sp} 
              onChange={(e) => setSp(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />

            <button 
              onClick={resetSimulation}
              className="w-full mt-6 py-2 px-4 bg-slate-700 hover:bg-slate-600 transition-colors rounded-md text-sm font-semibold"
            >
              Reset Controller
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500 italic">
        *This interactive demo simulates a generic closed-loop feedback controller. Adjust parameters to see how it affects response time, overshoot, and steady-state error.
      </p>
    </div>
  );
};

export default PIDSimulator;
