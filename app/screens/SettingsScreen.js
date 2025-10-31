import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const SettingsScreen = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // API Parameters
  const [stateName, setStateName] = useState('Rajasthan');
  const [districtName, setDistrictName] = useState('Jaipur');
  const [agencyName, setAgencyName] = useState('CGWb');
  const [startdate, setStartdate] = useState('2025-01-01');
  const [enddate, setEnddate] = useState('2025-09-24');

  const handleExportData = () => {
    // Mock export (integrate with sharing API)
    alert('Data exported! (Integrate with Share API for real export)');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings for Researchers & Policymakers</Text>
      
      <View style={styles.setting}>
        <Text>Enable Real-Time Alerts</Text>
        <Switch value={alertsEnabled} onValueChange={setAlertsEnabled} />
      </View>

      <View style={styles.setting}>
        <Text>Push Notifications for Low Levels</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <Text style={styles.sectionTitle}>API Parameters</Text>

      <View style={styles.inputContainer}>
        <Text>State Name:</Text>
        <TextInput
          style={styles.input}
          value={stateName}
          onChangeText={setStateName}
          placeholder="e.g., Rajasthan"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>District Name:</Text>
        <TextInput
          style={styles.input}
          value={districtName}
          onChangeText={setDistrictName}
          placeholder="e.g., Jaipur"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Agency Name:</Text>
        <TextInput
          style={styles.input}
          value={agencyName}
          onChangeText={setAgencyName}
          placeholder="e.g., CGWb"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Start Date:</Text>
        <TextInput
          style={styles.input}
          value={startdate}
          onChangeText={setStartdate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>End Date:</Text>
        <TextInput
          style={styles.input}
          value={enddate}
          onChangeText={setEnddate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert(`Settings applied: State: ${stateName}, District: ${districtName}, Agency: ${agencyName}, Start: ${startdate}, End: ${enddate}`)}>
        <Text style={styles.buttonText}>Apply Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleExportData}>
        <Text style={styles.buttonText}>Export DWLR Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert('App uses data from 5,260 DWLR stations for sustainable management.')}>
        <Text style={styles.buttonText}>About App</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#E3F2FD' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#1976D2' },
  setting: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFFFFF', marginVertical: 10, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15, textAlign: 'center', color: '#1976D2' },
  inputContainer: { padding: 20, backgroundColor: '#FFFFFF', marginVertical: 10, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  input: { borderWidth: 1, borderColor: '#1976D2', padding: 15, marginTop: 10, borderRadius: 10, fontSize: 16 },
  button: { backgroundColor: '#1976D2', padding: 15, borderRadius: 10, marginVertical: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default SettingsScreen;