// Mock API utility for DWLR data integration
// In production, replace with actual API endpoints

export const fetchDWLRData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock DWLR station data
  const mockData = [
    {
      stationId: 'RJ001',
      stationName: 'Jaipur Central DWLR',
      latitude: 26.9124,
      longitude: 75.7873,
      waterLevel: 15.2,
      district: 'Jaipur',
      state: 'Rajasthan',
      lastUpdated: new Date().toISOString(),
      status: 'active'
    },
    {
      stationId: 'RJ002',
      stationName: 'Udaipur Lake DWLR',
      latitude: 24.5854,
      longitude: 73.7125,
      waterLevel: 8.7,
      district: 'Udaipur',
      state: 'Rajasthan',
      lastUpdated: new Date().toISOString(),
      status: 'active'
    },
    {
      stationId: 'RJ003',
      stationName: 'Jodhpur Desert DWLR',
      latitude: 26.2389,
      longitude: 73.0243,
      waterLevel: 22.1,
      district: 'Jodhpur',
      state: 'Rajasthan',
      lastUpdated: new Date().toISOString(),
      status: 'active'
    },
    {
      stationId: 'RJ004',
      stationName: 'Kota Industrial DWLR',
      latitude: 25.2138,
      longitude: 75.8648,
      waterLevel: 6.3,
      district: 'Kota',
      state: 'Rajasthan',
      lastUpdated: new Date().toISOString(),
      status: 'warning'
    },
    {
      stationId: 'RJ005',
      stationName: 'Bikaner Arid DWLR',
      latitude: 28.0229,
      longitude: 73.3119,
      waterLevel: 28.5,
      district: 'Bikaner',
      state: 'Rajasthan',
      lastUpdated: new Date().toISOString(),
      status: 'active'
    }
  ];
  
  return mockData;
};

export const fetchRealtimeAvailability = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalStations: 5260,
    activeStations: 4987,
    averageWaterLevel: 12.45,
    rechargeRate: 2.3,
    criticalStations: 273,
    lastUpdated: new Date().toISOString()
  };
};

export const fetchTrendData = async (period = 'monthly') => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const trendData = {
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      waterLevels: [12.5, 11.8, 10.2, 8.7, 6.3, 5.1, 7.8, 9.2, 11.5, 13.2, 14.1, 13.8],
      rechargeRates: [2.1, 1.8, 1.2, 0.8, 0.3, 0.1, 3.2, 4.1, 2.8, 2.3, 2.0, 2.2]
    },
    yearly: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      waterLevels: [15.2, 14.8, 13.5, 12.1, 11.8, 12.5],
      rechargeRates: [3.2, 2.8, 2.1, 1.8, 1.5, 2.3]
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      waterLevels: [12.8, 12.5, 12.1, 11.9],
      rechargeRates: [0.8, 0.6, 0.4, 0.3]
    }
  };
  
  return trendData[period] || trendData.monthly;
};

export const generateDecisionRecommendations = async (userType, currentData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const recommendations = {
    researcher: [
      {
        id: 1,
        title: 'Enhanced Monitoring Network',
        description: 'Deploy additional sensors in critical zones for better data coverage',
        priority: 'high',
        estimatedCost: '₹25 lakhs',
        timeline: '2-3 months',
        expectedImpact: 'Improved prediction accuracy by 30%'
      },
      {
        id: 2,
        title: 'Predictive Model Development',
        description: 'Develop AI-based models for seasonal water level prediction',
        priority: 'medium',
        estimatedCost: '₹15 lakhs',
        timeline: '4-6 months',
        expectedImpact: 'Early warning system for drought conditions'
      }
    ],
    planner: [
      {
        id: 1,
        title: 'Artificial Recharge Infrastructure',
        description: 'Plan and implement check dams and percolation tanks',
        priority: 'critical',
        estimatedCost: '₹2.5 crores',
        timeline: '8-12 months',
        expectedImpact: 'Increase groundwater recharge by 40%'
      },
      {
        id: 2,
        title: 'Water Budget Allocation',
        description: 'Develop sustainable extraction limits for each district',
        priority: 'high',
        estimatedCost: '₹10 lakhs',
        timeline: '3-4 months',
        expectedImpact: 'Prevent over-extraction in 15 districts'
      }
    ],
    policymaker: [
      {
        id: 1,
        title: 'Groundwater Regulation Policy',
        description: 'Implement mandatory monitoring and extraction limits',
        priority: 'critical',
        estimatedCost: '₹5 lakhs',
        timeline: '1-2 months',
        expectedImpact: 'Legal framework for sustainable groundwater use'
      },
      {
        id: 2,
        title: 'Farmer Incentive Program',
        description: 'Subsidies for water-efficient irrigation systems',
        priority: 'high',
        estimatedCost: '₹50 crores',
        timeline: '6-12 months',
        expectedImpact: 'Reduce agricultural water consumption by 25%'
      }
    ]
  };
  
  return recommendations[userType] || [];
};