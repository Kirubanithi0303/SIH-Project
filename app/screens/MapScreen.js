import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedAgency, setSelectedAgency] = useState('All');

  const generateFakeData = () => {
    const states = [
      { name: 'Maharashtra', lat: 19.7515, lng: 75.7139, districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
      { name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, districts: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'] },
      { name: 'Gujarat', lat: 22.2587, lng: 71.1924, districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
      { name: 'Karnataka', lat: 15.3173, lng: 75.7139, districts: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'] },
      { name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, districts: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'] },
      { name: 'Rajasthan', lat: 27.0238, lng: 74.2179, districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'] }
    ];

    const agencies = ['CWC', 'CGWB', 'State PWD', 'IMD', 'ISRO'];
    const stations = [];
    let id = 1;

    states.forEach(state => {
      state.districts.forEach(district => {
        for (let i = 0; i < 15; i++) {
          const latOffset = (Math.random() - 0.5) * 1.5;
          const lngOffset = (Math.random() - 0.5) * 1.5;
          const waterLevel = Math.random() * 25 + 5;
          const agency = agencies[Math.floor(Math.random() * agencies.length)];
          
          let status = 'normal';
          if (waterLevel < 10) status = 'critical';
          else if (waterLevel < 18) status = 'warning';

          stations.push({
            id: id++,
            latitude: state.lat + latOffset,
            longitude: state.lng + lngOffset,
            state: state.name,
            district,
            agency,
            waterLevel: parseFloat(waterLevel.toFixed(2)),
            status,
            lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString().split('T')[0]
          });
        }
      });
    });

    return stations;
  };

  useEffect(() => {
    const data = generateFakeData();
    setStations(data);
    setFilteredStations(data);
  }, []);

  useEffect(() => {
    let filtered = stations;
    
    if (selectedState !== 'All') {
      filtered = filtered.filter(s => s.state === selectedState);
    }
    if (selectedDistrict !== 'All') {
      filtered = filtered.filter(s => s.district === selectedDistrict);
    }
    if (selectedAgency !== 'All') {
      filtered = filtered.filter(s => s.agency === selectedAgency);
    }
    
    setFilteredStations(filtered);
  }, [selectedState, selectedDistrict, selectedAgency, stations]);

  const getUniqueValues = (field) => {
    return ['All', ...new Set(stations.map(s => s[field]))];
  };

  const getMarkerColor = (status) => {
    if (status === 'critical') return '#F44336';
    if (status === 'warning') return '#FF9800';
    return '#4CAF50';
  };

  const stats = {
    total: filteredStations.length,
    critical: filteredStations.filter(s => s.status === 'critical').length,
    warning: filteredStations.filter(s => s.status === 'warning').length,
    normal: filteredStations.filter(s => s.status === 'normal').length,
    avgLevel: filteredStations.length > 0 ? 
      (filteredStations.reduce((sum, s) => sum + s.waterLevel, 0) / filteredStations.length).toFixed(2) : 0
  };

  const stateStats = getUniqueValues('state').slice(1).map(state => ({
    name: state,
    count: filteredStations.filter(s => s.state === state).length
  }));

  const agencyStats = getUniqueValues('agency').slice(1).map(agency => ({
    name: agency,
    count: filteredStations.filter(s => s.agency === agency).length
  }));

  return (
    <View style={styles.container}>
      {/* Header with Summary Stats */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>🌊 DWLR Station Dashboard</Text>
          <Text style={styles.subtitle}>Real-time Water Level Monitoring Across India</Text>
        </View>
        
        {/* Top Summary Bar */}
        <View style={styles.topSummary}>
          <View style={styles.topSummaryItem}>
            <Text style={styles.topSummaryNumber}>{stats.total}</Text>
            <Text style={styles.topSummaryLabel}>Total</Text>
          </View>
          <View style={styles.topSummaryItem}>
            <Text style={[styles.topSummaryNumber, {color: '#F44336'}]}>{stats.critical}</Text>
            <Text style={styles.topSummaryLabel}>Critical</Text>
          </View>
          <View style={styles.topSummaryItem}>
            <Text style={[styles.topSummaryNumber, {color: '#FF9800'}]}>{stats.warning}</Text>
            <Text style={styles.topSummaryLabel}>Warning</Text>
          </View>
          <View style={styles.topSummaryItem}>
            <Text style={[styles.topSummaryNumber, {color: '#4CAF50'}]}>{stats.normal}</Text>
            <Text style={styles.topSummaryLabel}>Normal</Text>
          </View>
          <View style={styles.topSummaryItem}>
            <Text style={styles.topSummaryNumber}>{stats.avgLevel}m</Text>
            <Text style={styles.topSummaryLabel}>Avg Level</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Side - Map and Filters */}
        <View style={styles.leftPanel}>
          {/* Compact Filters */}
          <View style={styles.filtersContainer}>
            <View style={styles.compactFilterRow}>
              <View style={styles.compactFilterItem}>
                <Text style={styles.compactLabel}>State:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getUniqueValues('state').slice(0, 6).map(state => (
                    <TouchableOpacity
                      key={state}
                      style={[styles.compactButton, selectedState === state && styles.compactButtonActive]}
                      onPress={() => {
                        setSelectedState(state);
                        setSelectedDistrict('All');
                      }}
                    >
                      <Text style={[styles.compactButtonText, selectedState === state && styles.compactButtonTextActive]}>
                        {state === 'All' ? 'All' : state.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.compactFilterItem}>
                <Text style={styles.compactLabel}>Agency:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getUniqueValues('agency').map(agency => (
                    <TouchableOpacity
                      key={agency}
                      style={[styles.compactButton, selectedAgency === agency && styles.compactButtonActive]}
                      onPress={() => setSelectedAgency(agency)}
                    >
                      <Text style={[styles.compactButtonText, selectedAgency === agency && styles.compactButtonTextActive]}>
                        {agency}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>

          {/* Map */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 20.5937,
              longitude: 78.9629,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}
          >
            {filteredStations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{ latitude: station.latitude, longitude: station.longitude }}
                pinColor={getMarkerColor(station.status)}
                title={`${station.district}, ${station.state}`}
                description={`Level: ${station.waterLevel}m | Status: ${station.status.toUpperCase()}`}
              />
            ))}
          </MapView>
        </View>

        {/* Right Side - Charts Only */}
        <View style={styles.rightPanel}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Selected State Info */}
            {selectedState !== 'All' && (
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>{selectedState} Overview</Text>
                <View style={styles.stateOverview}>
                  <View style={styles.overviewItem}>
                    <Text style={styles.overviewNumber}>
                      {filteredStations.filter(s => s.state === selectedState).length}
                    </Text>
                    <Text style={styles.overviewLabel}>Total Stations</Text>
                  </View>
                  <View style={styles.overviewItem}>
                    <Text style={[styles.overviewNumber, {color: '#F44336'}]}>
                      {filteredStations.filter(s => s.state === selectedState && s.status === 'critical').length}
                    </Text>
                    <Text style={styles.overviewLabel}>Critical</Text>
                  </View>
                  <View style={styles.overviewItem}>
                    <Text style={[styles.overviewNumber, {color: '#FF9800'}]}>
                      {filteredStations.filter(s => s.state === selectedState && s.status === 'warning').length}
                    </Text>
                    <Text style={styles.overviewLabel}>Warning</Text>
                  </View>
                  <View style={styles.overviewItem}>
                    <Text style={[styles.overviewNumber, {color: '#4CAF50'}]}>
                      {filteredStations.filter(s => s.state === selectedState && s.status === 'normal').length}
                    </Text>
                    <Text style={styles.overviewLabel}>Normal</Text>
                  </View>
                </View>
              </View>
            )}

            {/* State Distribution Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>State-wise Distribution</Text>
              {stateStats.map((state, index) => (
                <View key={state.name} style={styles.barContainer}>
                  <Text style={styles.barLabel}>{state.name}</Text>
                  <View style={styles.barBackground}>
                    <View 
                      style={[
                        styles.barFill, 
                        { width: `${(state.count / stats.total) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barValue}>{state.count}</Text>
                </View>
              ))}
            </View>

            {/* Agency Distribution Chart */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Agency-wise Distribution</Text>
              {agencyStats.map((agency, index) => (
                <View key={agency.name} style={styles.barContainer}>
                  <Text style={styles.barLabel}>{agency.name}</Text>
                  <View style={styles.barBackground}>
                    <View 
                      style={[
                        styles.barFill, 
                        { width: `${(agency.count / stats.total) * 100}%`, backgroundColor: '#4CAF50' }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barValue}>{agency.count}</Text>
                </View>
              ))}
            </View>

            {/* Status Legend */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Status Legend</Text>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                  <Text style={styles.legendText}>Critical (&lt;10m)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
                  <Text style={styles.legendText}>Warning (10-18m)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.legendText}>Normal (&gt;18m)</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    backgroundColor: '#1976D2',
    paddingTop: 20,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8
  },
  headerTop: {
    alignItems: 'center',
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 14,
    color: '#E3F2FD',
    fontWeight: '500'
  },
  topSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 15
  },
  topSummaryItem: {
    alignItems: 'center'
  },
  topSummaryNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff'
  },
  topSummaryLabel: {
    fontSize: 11,
    color: '#E3F2FD',
    marginTop: 2
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row'
  },
  leftPanel: {
    flex: 2,
    backgroundColor: '#fff'
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    padding: 15
  },
  filtersContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  compactFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  compactFilterItem: {
    flex: 1,
    marginHorizontal: 5
  },
  compactLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 5,
    color: '#1976D2'
  },
  compactButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  compactButtonActive: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2'
  },
  compactButtonText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600'
  },
  compactButtonTextActive: {
    color: '#fff',
    fontWeight: '700'
  },
  stateOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  overviewItem: {
    alignItems: 'center'
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1976D2'
  },
  overviewLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '600'
  },
  map: {
    flex: 1
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    borderTopWidth: 3,
    borderTopColor: '#1976D2'
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1976D2',
    textAlign: 'center'
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5
  },
  barLabel: {
    width: 100,
    fontSize: 13,
    color: '#333',
    fontWeight: '600'
  },
  barBackground: {
    flex: 1,
    height: 25,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  barFill: {
    height: '100%',
    backgroundColor: '#1976D2',
    borderRadius: 15,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2
  },
  barValue: {
    width: 40,
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'right',
    fontWeight: '700'
  },
  legendContainer: {
    flexDirection: 'column'
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2
  },
  legendText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  }
});