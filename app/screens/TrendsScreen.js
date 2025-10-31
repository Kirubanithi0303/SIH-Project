import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const TrendsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const getData = () => {
    if (selectedPeriod === 'weekly') {
      return {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [{ data: [12, 11, 10, 9] }]
      };
    } else if (selectedPeriod === 'yearly') {
      return {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{ data: [15, 14, 12, 11, 10] }]
      };
    }
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{ data: [12, 11, 9, 7, 6, 8] }]
    };
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.header}>
        <Text style={styles.title}>📈 Trends</Text>
        <Text style={styles.subtitle}>Water Level Analysis</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          {['weekly', 'monthly', 'yearly'].map(period => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.activePeriod]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodText, selectedPeriod === period && styles.activePeriodText]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Water Level Trends</Text>
          <LineChart
            data={getData()}
            width={screenWidth - 40}
            height={200}
            chartConfig={{
              backgroundColor: '#FF9800',
              backgroundGradientFrom: '#FF9800',
              backgroundGradientTo: '#F57C00',
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

        <View style={styles.insightsCard}>
          <Text style={styles.cardTitle}>📊 Key Insights</Text>
          <View style={styles.insightItem}>
            <Ionicons name="trending-down" size={16} color="#F44336" />
            <Text style={styles.insightText}>Water levels declining by 0.5m annually</Text>
          </View>
          <View style={styles.insightItem}>
            <Ionicons name="warning" size={16} color="#FF9800" />
            <Text style={styles.insightText}>Critical period: April-June</Text>
          </View>
          <View style={styles.insightItem}>
            <Ionicons name="water" size={16} color="#2196F3" />
            <Text style={styles.insightText}>Monsoon recovery: July-September</Text>
          </View>
        </View>

        <View style={styles.predictionCard}>
          <Text style={styles.cardTitle}>🔮 Predictions</Text>
          <Text style={styles.predictionText}>
            Based on current trends, water levels may drop to critical levels by summer 2025.
          </Text>
          <Text style={styles.recommendationText}>
            💡 Recommendation: Implement water conservation measures immediately.
          </Text>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    marginBottom: 20,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activePeriod: {
    backgroundColor: '#FF9800',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chartCard: {
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
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
  insightsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  predictionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  predictionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  recommendationText: {
    fontSize: 14,
    color: '#9C27B0',
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default TrendsScreen;