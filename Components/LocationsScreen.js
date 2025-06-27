/* ------------------------------------------------------------------
   Components/LocationsScreen.js
   • “Locations” ribbon
   • Кнопка Back (arrow_back.png)
   • Категории-секции разворачиваются / сворачиваются по тапу
------------------------------------------------------------------- */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOCATION_CATEGORIES } from '../Components/locations';

/* ─── assets ─── */
const RIBBON_BG  = require('../assets/How_to_play.png');
const FLAG_ICON  = require('../assets/Star.png');
const ARROW_BACK = require('../assets/arrow_back.png');

const { width } = Dimensions.get('window');

export default function LocationsScreen() {
  const navigation          = useNavigation();
  const [opened, setOpened] = useState(new Set());      // хранит label открытых секций

  /* переключить открыто/закрыто */
  const toggle = useCallback(label => {
    setOpened(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }, []);

  /* пересчёт секций под текущий state */
  const sections = LOCATION_CATEGORIES.map(cat => ({
    title : cat.label,
    data  : opened.has(cat.label) ? cat.venues : [],    // пустой массив = скрыто
  }));

  return (
    <View style={styles.wrap}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Image source={ARROW_BACK} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Ribbon */}
      <View style={styles.ribbonBox}>
        <Image source={RIBBON_BG} style={styles.ribbonImg} />
        <Text style={styles.ribbonTxt}>Locations</Text>
      </View>

      {/* Список */}
      <SectionList
        sections={sections}
        keyExtractor={(item, idx) => item + idx}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.catRow}
            onPress={() => toggle(section.title)}
          >
            <Image source={FLAG_ICON} style={styles.flag} />
            <Text style={styles.catLabel}>{section.title}</Text>
          </TouchableOpacity>
        )}
        renderItem={({ item }) => (
          <Text style={styles.venue}>{item}</Text>
        )}
      />
    </View>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#ff4a02',
    paddingTop: 60,
    paddingHorizontal: 24,
  },

  /* back */
  backBtn:  { position: 'absolute', top: 20, left: 12, padding: 8 },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  /* ribbon */
  ribbonBox: { width, height: 60, marginBottom: 20, justifyContent: 'center', alignItems: 'center' ,left:-25,},
  ribbonImg: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain' ,  },
  ribbonTxt: { fontSize: 24, fontWeight: '700', color: '#fff' },

  /* list */
  list: { paddingBottom: 40 },

  catRow:   { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  flag:     { width: 40, height: 40, resizeMode: 'contain', marginRight: 12 },
  catLabel: { fontSize: 18, fontWeight: '700', color: '#fff' },

  venue: { fontSize: 18, color: '#fff', marginLeft: 52, marginTop: 6 },
});
