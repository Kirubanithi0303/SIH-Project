import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DecisionScreen = () => {
  const [currentData, setCurrentData] = useState({
    waterLevel: 12.5,
    rechargeRate: 1.8,
    riskLevel: 'moderate',
    stationsAtRisk: 273,
    totalStations: 5260
  });

  const [recommendations, setRecommendations] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState('researcher');

  useEffect(() => {
    generateRecommendations();
  }, [selectedUserType, currentData]);

  const generateRecommendations = () => {
    const baseRecommendations = {
      researcher: [
        {
          id: 1,
          title: 'Data Collection Enhancement',
          description: 'Increase monitoring frequency in critical zones',
          priority: 'high',
          action: 'Deploy additional sensors in 15 high-risk districts',
          timeline: '2-3 months'
        },
        {
          id: 2,
          title: 'Trend Analysis Study',
          description: 'Conduct comprehensive seasonal pattern analysis',
          priority: 'medium',
          action: 'Analyze 5-year historical data for predictive modeling',
          timeline: '1-2 months'
        }
      ],
      planner: [
        {
          id: 1,
          title: 'Recharge Infrastructure',
          description: 'Plan artificial recharge structures',
          priority: 'high',
          action: 'Identify 50 locations for check dams and percolation tanks',
          timeline: '6-12 months'
        },
        {
          id: 2,
          title: 'Water Budget Planning',
          description: 'Develop district-wise water allocation strategy',
          priority: 'high',
          action: 'Create sustainable extraction limits for each district',
          timeline: '3-6 months'
        }
      ],
      policymaker: [
        {
          id: 1,
          title: 'Regulatory Framework',
          description: 'Implement groundwater extraction regulations',
          priority: 'critical',
          action: 'Draft policy for mandatory water level monitoring',
          timeline: '1-3 months'
        },
        {
          id: 2,
          title: 'Incentive Programs',
          description: 'Create farmer incentives for water conservation',
          priority: 'high',
          action: 'Launch subsidy program for drip irrigation systems',
          timeline: '3-6 months'
        }
      ]
    };

    setRecommendations(baseRecommendations[selectedUserType] || []);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return '#F44336';
      case 'high': return '#FF5722';
      case 'moderate': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#D32F2F';
      case 'high': return '#F57C00';
      case 'medium': return '#1976D2';
      case 'low': return '#388E3C';
      default: return '#757575';
    }
  };

  const handleImplementAction = (recommendation) => {
    Alert.alert(
      'Implementation Plan',
      `Action: ${recommendation.action}\n\nTimeline: ${recommendation.timeline}\n\nWould you like to create an implementation plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create Plan', onPress: () => Alert.alert('Success', 'Implementation plan created and assigned to relevant departments.') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Decision Support System</Text>
        <Text style={styles.subtitle}>AI-powered recommendations for groundwater management</Text>
      </View>

      <View style={styles.userTypeSelector}>
        <Text style={styles.selectorTitle}>Select User Type:</Text>
        <View style={styles.typeButtons}>
          <TouchableOpacity
            style={[styles.typeButton, selectedUserType === 'researcher' && styles.activeType]}
            onPress={() => setSelectedUserType('researcher')}
          >
            <Ionicons name="flask" size={20} color={selectedUserType === 'researcher' ? '#fff' : '#666'} />
            <Text style={[styles.typeText, selectedUserType === 'researcher' && styles.activeTypeText]}>Researcher</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.typeButton, selectedUserType === 'planner' && styles.activeType]}
            onPress={() => setSelectedUserType('planner')}
          >
            <Ionicons name="map" size={20} color={selectedUserType === 'planner' ? '#fff' : '#666'} />
            <Text style={[styles.typeText, selectedUserType === 'planner' && styles.activeTypeText]}>Planner</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.typeButton, selectedUserType === 'policymaker' && styles.activeType]}
            onPress={() => setSelectedUserType('policymaker')}
          >
            <Ionicons name="document-text" size={20} color={selectedUserType === 'policymaker' ? '#fff' : '#666'} />
            <Text style={[styles.typeText, selectedUserType === 'policymaker' && styles.activeTypeText]}>Policy Maker</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="speedometer" size={24} color={getRiskColor(currentData.riskLevel)} />
          <Text style={styles.cardTitle}>Current Status Assessment</Text>
        </View>
        
        <View style={styles.statusGrid}>
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{currentData.waterLevel}m</Text>
            <Text style={styles.statusLabel}>Avg Water Level</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusValue}>{currentData.rechargeRate}</Text>
            <Text style={styles.statusLabel}>Recharge Rate</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusValue, { color: getRiskColor(currentData.riskLevel) }]}>
              {currentData.riskLevel.toUpperCase()}
            </Text>
            <Text style={styles.statusLabel}>Risk Level</Text>
          </View>
        </View>
        
        <View style={styles.riskIndicator}>
          <Text style={styles.riskText}>
            {currentData.stationsAtRisk} of {currentData.totalStations} stations require attention
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(currentData.stationsAtRisk / currentData.totalStations) * 100}%`,
                  backgroundColor: getRiskColor(currentData.riskLevel)
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>Recommended Actions</Text>
        
        {recommendations.map((rec) => (
          <View key={rec.id} style={styles.recommendationCard}>
            <View style={styles.recHeader}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(rec.priority) }]}>
                <Text style={styles.priorityText}>{rec.priority.toUpperCase()}</Text>
              </View>
            </View>
            
            <Text style={styles.recDescription}>{rec.description}</Text>
            
            <View style={styles.actionContainer}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#666" />
              <Text style={styles.actionText}>{rec.action}</Text>
            </View>
            
            <View style={styles.timelineContainer}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.timelineText}>Timeline: {rec.timeline}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.implementButton}
              onPress={() => handleImplementAction(rec)}
            >
              <Text style={styles.implementButtonText}>Create Implementation Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.emergencyCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="warning" size={24} color="#F44336" />
          <Text style={styles.cardTitle}>Emergency Protocols</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.emergencyButton}
          onPress={() => Alert.alert('Emergency Alert', 'Critical water level alert sent to all stakeholders.')}
        >
          <Ionicons name="alert-circle" size={20} color="#fff" />
          <Text style={styles.emergencyButtonText}>Trigger Critical Alert</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emergencyButton, { backgroundColor: '#FF9800' }]}
          onPress={() => Alert.alert('Resource Mobilization', 'Emergency resource allocation initiated.')}
        >
          <Ionicons name="construct" size={20} color="#fff" />
          <Text style={styles.emergencyButtonText}>Mobilize Resources</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#E3F2FD',
    marginTop: 5,
    textAlign: 'center',
  },
  userTypeSelector: {
    margin: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  typeButtons: {
    flexDirection: 'row',
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeType: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  activeTypeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  riskIndicator: {
    marginTop: 15,
  },
  riskText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
  },
  recommendationsSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timelineText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  implementButton: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  implementButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emergencyCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DecisionScreen;