import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [dwlrData, setDwlrData] = useState({
    totalStations: 5260,
    activeStations: 4987,
    avgWaterLevel: 12.45,
    rechargeRate: 2.3,
    lastUpdated: new Date().toLocaleString()
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRealTimeData = () => {
    setLoading(true);
    setTimeout(() => {
      setDwlrData({
        totalStations: 5260,
        activeStations: 4987 + Math.floor(Math.random() * 20),
        avgWaterLevel: 12.45 + (Math.random() - 0.5) * 2,
        rechargeRate: 2.3 + (Math.random() - 0.5) * 0.5,
        lastUpdated: new Date().toLocaleString()
      });
      setLoading(false);
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    fetchRealTimeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRealTimeData();
  };

  const getStatusColor = (level) => {
    if (level > 15) return ['#4CAF50', '#66BB6A'];
    if (level > 10) return ['#FF9800', '#FFB74D'];
    return ['#F44336', '#EF5350'];
  };

  const getStatusText = (level) => {
    if (level > 15) return 'Excellent';
    if (level > 10) return 'Moderate';
    return 'Critical';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradientHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>💧 DWLR Monitor</Text>
          <Text style={styles.subtitle}>Real-time Groundwater Intelligence</Text>
          <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
            <Ionicons name="refresh" size={16} color="#fff" />
            <Text style={styles.refreshText}>Updated: {dwlrData.lastUpdated.split(',')[1]}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          <LinearGradient colors={['#42A5F5', '#1E88E5']} style={styles.statCard}>
            <Ionicons name="water" size={28} color="#fff" />
            <Text style={styles.statNumber}>{dwlrData.totalStations.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Stations</Text>
          </LinearGradient>
          
          <LinearGradient colors={['#66BB6A', '#43A047']} style={styles.statCard}>
            <Ionicons name="pulse" size={28} color="#fff" />
            <Text style={styles.statNumber}>{dwlrData.activeStations.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Active Now</Text>
          </LinearGradient>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="speedometer" size={20} color="#667eea" />
            </View>
            <Text style={styles.cardTitle}>Water Level Status</Text>
          </View>
          
          <View style={styles.levelContainer}>
            <Text style={styles.levelValue}>{dwlrData.avgWaterLevel.toFixed(1)}<Text style={styles.unit}>m</Text></Text>
            <LinearGradient colors={getStatusColor(dwlrData.avgWaterLevel)} style={styles.statusBadge}>
              <Text style={styles.statusText}>{getStatusText(dwlrData.avgWaterLevel)}</Text>
            </LinearGradient>
          </View>
          
          <Text style={styles.levelDescription}>Average groundwater depth across monitored regions</Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="trending-up" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.cardTitle}>Recharge Analytics</Text>
          </View>
          
          <View style={styles.rechargeContainer}>
            <Text style={styles.rechargeValue}>{dwlrData.rechargeRate.toFixed(1)}<Text style={styles.unit}>mm/day</Text></Text>
            <Text style={styles.rechargeLabel}>Current Recharge Rate</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <LinearGradient 
                colors={['#4CAF50', '#66BB6A']} 
                style={[styles.progressBar, { width: `${Math.min((dwlrData.rechargeRate / 5) * 100, 100)}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>{Math.round((dwlrData.rechargeRate / 5) * 100)}% of optimal</Text>
          </View>
        </View>

        <View style={styles.alertCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="notifications" size={20} color="#FF9800" />
            </View>
            <Text style={styles.cardTitle}>Live Alerts</Text>
          </View>
          
          <View style={styles.alertItem}>
            <View style={styles.alertDot} />
            <Text style={styles.alertText}>273 stations showing declining trends</Text>
          </View>
          
          <View style={styles.alertItem}>
            <View style={[styles.alertDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.alertText}>Monsoon recharge active in 45 districts</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient colors={['#FF6B6B', '#EE5A52']} style={styles.actionGradient}>
              <Ionicons name="alert-circle" size={20} color="#fff" />
              <Text style={styles.actionText}>Emergency</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient colors={['#4ECDC4', '#44A08D']} style={styles.actionGradient}>
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.actionText}>Export Data</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Syncing data...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  gradientHeader: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  refreshText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
  },
  scrollContainer: {
    flex: 1,
    marginTop: -20,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  mainCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0f4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
    marginLeft: 12,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  levelValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  unit: {
    fontSize: 18,
    color: '#718096',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  levelDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  rechargeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rechargeValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  rechargeLabel: {
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  progressContainer: {
    marginTop: 15,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
  },
  alertCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    elevation: 3,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9800',
    marginRight: 12,
  },
  alertText: {
    fontSize: 14,
    color: '#2d3748',
    flex: 1,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#667eea',
  },
});

export default HomeScreen;