import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Settings, Activity } from 'lucide-react';

/* eslint-disable react/no-unescaped-entities */
const VelocityTimeCalculator = () => {
  const [currentVelocity, setCurrentVelocity] = useState(55);
  const REFERENCE_VELOCITY = 60;
  const TOTAL_DISTANCE = 100;

  const calculateRiskAndTime = (velocity: number) => {
    const timeInMinutes = (TOTAL_DISTANCE / velocity) * 60;
    const referenceTimeInMinutes = (TOTAL_DISTANCE / REFERENCE_VELOCITY) * 60;
    const velocityDifference = velocity - REFERENCE_VELOCITY;
    const velocityPercentageChange = (velocityDifference / REFERENCE_VELOCITY) * 100;
    const fatalRiskIncrease = velocityDifference > 0 ? Math.abs(velocityPercentageChange * 4) : 0;
    const brakingDistance = 2.5 * Math.pow(velocity/30, 2);
    const timeChange = ((referenceTimeInMinutes - timeInMinutes) / referenceTimeInMinutes) * 100;

    return {
      totalTime: timeInMinutes.toFixed(1),
      velocityChange: velocityPercentageChange.toFixed(1),
      fatalRisk: fatalRiskIncrease.toFixed(1),
      brakingDistance: brakingDistance.toFixed(1),
      timeChange: timeChange.toFixed(1)
    };
  };

  const generateChartData = () => {
    const chartPoints = [];
    for (let velocity = 10; velocity <= 300; velocity += 10) {
      const timeInMinutes = (TOTAL_DISTANCE / velocity) * 60;
      chartPoints.push({
        velocity: velocity,
        standardTime: timeInMinutes,
        selectedVelocityLine: (TOTAL_DISTANCE / currentVelocity) * 60
      });
    }
    return chartPoints;
  };

  const calculatedValues = calculateRiskAndTime(currentVelocity);
  const chartData = generateChartData();

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Header - Full Width */}
      <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
        <div className="w-full px-3 py-2">
          <div className="flex justify-between items-center">
            <div className="text-base font-medium">
              Velocidade ref.: 60 km/h
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/marcelodeveloper/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                LinkedIn
              </a>
              <a 
                href="https://wa.me/5575991674108" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width */}
      <main className="w-full px-3 pt-14">
        {/* Developer Info */}
        <Card className="w-full mb-3">
          <CardContent className="py-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h1 className="text-xl font-bold">Marcelo Guimarães</h1>
                <p className="text-gray-600">Programador Fullstack</p>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>Formações:</strong> ADS, Gestão Comercial</p>
                <p><strong>Pós:</strong> IA, ML & Deep Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation */}
        <div className="w-full bg-amber-50 border-l-4 border-amber-500 p-3 rounded mb-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Por que criei esta calculadora?</h3>
              <p className="text-sm">
                &quot;Baseado em um estudo que mostrou que dirigir agressivamente por 1609 km economizou apenas 31 minutos (3%), mas triplicou os riscos.&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3">
          {/* Controls and Analysis */}
          <div className="lg:col-span-4 space-y-3 w-full">
            {/* Settings */}
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuração
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <label className="text-sm">Velocidade:</label>
                  <Input
                    type="number"
                    min="1"
                    value={currentVelocity}
                    onChange={(event) => setCurrentVelocity(Number(event.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm">km/h</span>
                </div>
                <div className="text-lg font-medium mt-2">
                  {calculatedValues.totalTime} minutos
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="w-full bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-red-600">Análise de Risco</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-gray-700">Alteração na velocidade</div>
                  <div className="text-2xl font-bold text-red-600">
                    {calculatedValues.velocityChange.startsWith('-') ? '' : '+'}
                    {calculatedValues.velocityChange}%
                  </div>
                  <div className="text-sm text-gray-600">em relação a 60 km/h</div>
                </div>

                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-gray-700">Risco de acidente fatal</div>
                  <div className="text-2xl font-bold text-red-600">
                    {parseFloat(calculatedValues.fatalRisk) > 0 ? '+' : ''}
                    {calculatedValues.fatalRisk}%
                  </div>
                  <div className="text-sm text-gray-600">4% para cada 1% acima de 60 km/h</div>
                </div>

                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-gray-700">Distância de frenagem</div>
                  <div className="text-2xl font-bold text-red-600">
                    {calculatedValues.brakingDistance}m
                  </div>
                  <div className="text-sm text-gray-600">dobra a cada +10 km/h</div>
                </div>

                <div className="bg-white/50 rounded-lg p-3">
                  <div className="text-gray-700">Alteração no tempo</div>
                  <div className="text-2xl font-bold text-green-600">
                    {calculatedValues.timeChange > 0 ? '+' : '-'}
                    {Math.abs(parseFloat(calculatedValues.timeChange))}%
                  </div>
                  <div className="text-sm text-gray-600">em relação ao tempo base</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div className="lg:col-span-8 w-full">
            <Card className="w-full h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Relação Velocidade x Tempo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] sm:h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="velocity"
                        label={{ value: 'Velocidade (km/h)', position: 'bottom' }}
                        domain={[0, 300]}
                      />
                      <YAxis
                        label={{ value: 'Tempo (min)', angle: -90, position: 'insideLeft' }}
                        domain={[0, 600]}
                      />
                      <Tooltip 
                        formatter={(value) => [`${parseFloat(value).toFixed(1)} min`]}
                        labelFormatter={(value) => `${value} km/h`}
                      />
                      <Legend />
                      <ReferenceLine 
                        y={60} 
                        stroke="red" 
                        strokeDasharray="3 3" 
                        label={{ value: "1h", position: "right" }}
                      />
                      <ReferenceLine 
                        x={60} 
                        stroke="orange" 
                        strokeDasharray="3 3" 
                        label={{ value: "60 km/h", position: "top" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="standardTime"
                        name="Padrão"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="selectedVelocityLine"
                        name="Atual"
                        stroke="#22c55e"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Info Cards */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-700">Você sabia?</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Um estudo australiano mostrou que condutores em áreas urbanas 
                      economizam apenas 26 segundos por dia com excesso de velocidade.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-medium text-purple-700">Dados Alarmantes</h4>
                    <p className="text-sm text-purple-600 mt-1">
                      Um pedestre atropelado a 60 km/h tem 80-100% de risco de morte. 
                      A 50 km/h, esse risco cai para cerca de 50%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* References */}
        <div className="w-full mt-3 bg-white p-3 rounded-lg shadow">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
            <div>• Cidade: 40-60 km/h</div>
            <div>• Rodovia: 80-120 km/h</div>
            <div>• A 60 km/h = 100.0 min (base)</div>
            <div>• A {currentVelocity} km/h = {calculatedValues.totalTime} min</div>
          </div>
        </div>
      </main>
    </div>
  );
};
/* eslint-enable react/no-unescaped-entities */

export default VelocityTimeCalculator;