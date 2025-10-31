import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [waterLevel, setWaterLevel] = useState(0);
  const [levelColor, setLevelColor] = useState('#4CAF50');

  const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [12, 15, 18, 14, 16, 20],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const handlePlaceChange = (place) => {
    setSelectedPlace(place);
    const mockLevels = {
      'Jaipur': 15, 'Udaipur': 12, 'Jodhpur': 8, 'Kota': 6, 'Bikaner': 4
    };
    const level = mockLevels[place] || 10;
    setWaterLevel(level);
    setLevelColor(level >= 12 ? '#4CAF50' : level >= 8 ? '#FF9800' : '#F44336');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.header}>
        <Text style={styles.title}>📊 Dashboard</Text>
        <Text style={styles.subtitle}>Water Level Analytics</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="water" size={24} color="#fff" />
            <Text style={styles.statValue}>3,420</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
            <Ionicons name="warning" size={24} color="#fff" />
            <Text style={styles.statValue}>1,240</Text>
            <Text style={styles.statLabel}>Warning</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F44336' }]}>
            <Ionicons name="alert" size={24} color="#fff" />
            <Text style={styles.statValue}>600</Text>
            <Text style={styles.statLabel}>Critical</Text>
          </View>
        </View>

        <View style={styles.searchCard}>
          <Text style={styles.cardTitle}>🔍 Location Search</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter location (Jaipur, Udaipur, etc.)"
            value={selectedPlace}
            onChangeText={handlePlaceChange}
            placeholderTextColor="#999"
          />
          {selectedPlace && (
            <View style={styles.resultCard}>
              <Text style={styles.locationName}>{selectedPlace}</Text>
              <Text style={styles.waterLevelText}>Water Level: {waterLevel}m</Text>
              <View style={styles.levelBar}>
                <View style={[styles.levelFill, { 
                  width: `${(waterLevel/20)*100}%`, 
                  backgroundColor: levelColor 
                }]} />
              </View>
            </View>
          )}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>📈 Trend Analysis</Text>
          <LineChart
            data={mockData}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: '#2196F3',
              backgroundGradientFrom: '#2196F3',
              backgroundGradientTo: '#1976D2',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.alertsCard}>
          <Text style={styles.cardTitle}>⚠️ Recent Alerts</Text>
          <View style={styles.alertItem}>
            <Ionicons name="alert-circle" size={16} color="#F44336" />
            <Text style={styles.alertText}>Rajasthan: 15 stations critical</Text>
          </View>
          <View style={styles.alertItem}>
            <Ionicons name="warning" size={16} color="#FF9800" />
            <Text style={styles.alertText}>Gujarat: Water level dropping</Text>
          </View>
          <View style={styles.alertItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.alertText}>Kerala: Levels improving</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  searchCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resultCard: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  waterLevelText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  levelBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  levelFill: {
    height: 8,
    borderRadius: 4,
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
  alertsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
});

export default DashboardScreen;