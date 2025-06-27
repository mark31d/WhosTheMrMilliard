/* ------------------------------------------------------------------
   Components/GameSetupLocation.js
   • Выбор локации
   • Гарантировано раздаём роль Mr. Milliard + (N-1) случайных ролей
------------------------------------------------------------------- */
import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

/* ─── ассеты ─── */
const ARROW_BACK   = require('../assets/arrow_back.png');
const STAR_ICON    = require('../assets/Star.png');
const RIBBON_BG    = require('../assets/Location.png');
const BTN_START_BG = require('../assets/Start.png');

/* ─── пул всех 7 ролей ─── */
const ROLE_POOL = [
  { name: 'Mr. Milliard',     img: require('../assets/Mr.Milliard.png') },
  { name: 'The Bodyguard',    img: require('../assets/TheBodyguard.png') },
  { name: 'The Investigator', img: require('../assets/TheInvestigator.png') },
  { name: 'The Impersonator', img: require('../assets/TheImpersonator.png') },
  { name: 'The Gossip',       img: require('../assets/TheGossip.png') },
  { name: 'The Observer',     img: require('../assets/TheObserver.png') },
  { name: 'The Double Agent', img: require('../assets/TheDoubleAgent.png') },
];

/* ─── названия локаций ─── */
const LOCATION_LABELS = [
  '🎩 High Society Venues',
  '🚂 Luxury Transit Hubs',
  '🕰️ Secretive Business Settings',
  '🧖 Elegant Leisure Spots',
  '🌆 Urban Shadows',
  '🏡 Private Residences',
];

export default function GameSetupLocation() {
  const navigation            = useNavigation();
  const { players = [] }      = useRoute().params || {};

  /* ─── состояние ─── */
  const [locationLabel, setLocationLabel] = useState(null);
  const startEnabled = locationLabel !== null;

  /* ────────────────── гарантируем Mr. Milliard ────────────────── */
  const roles = useMemo(() => {
    if (players.length === 0) return [];

    // копия пула без Mr. Milliard
    const pool = ROLE_POOL.slice(1);

    // Фишеровская перетасовка оставшихся ролей
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // выбираем N-1 и добавляем Mr. Milliard
    const selection = [
      ROLE_POOL[0],                       // Mr. Milliard
      ...pool.slice(0, players.length - 1)
    ];

    // финальное перемешивание
    for (let i = selection.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selection[i], selection[j]] = [selection[j], selection[i]];
    }
    return selection;
  }, [players.length]);

  /* ─── рендер строки локации ─── */
  const renderItem = ({ item }) => {
    const selected = item === locationLabel;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.row, selected && styles.rowSelected]}
        onPress={() => setLocationLabel(item)}
      >
        <Image source={STAR_ICON} style={styles.flag} />
        <Text style={styles.label}>{item}</Text>
      </TouchableOpacity>
    );
  };

  /* ─── футер с кнопкой «Start» ─── */
  const renderFooter = () => (
    <TouchableOpacity
      disabled={!startEnabled}
      onPress={() =>
        navigation.navigate('RoleRevealScreen', {
          players,
          roles,
          locationLabel,
        })
      }
      activeOpacity={0.9}
      style={[styles.startBtn, !startEnabled && { opacity: 0.35 }]}
    >
      <Image source={BTN_START_BG} style={styles.startImg} />
    </TouchableOpacity>
  );

  /* ─── UI ─── */
  return (
    <View style={styles.wrapper}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Image source={ARROW_BACK} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Ribbon */}
      <Image source={RIBBON_BG} style={styles.ribbon} />

      {/* Список локаций */}
      <FlatList
        data={LOCATION_LABELS}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

/* ─── стили ─── */
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ff4a02',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 12,
    padding: 8,
    zIndex: 10,
  },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  ribbon: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  listContent: { paddingBottom: 160 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  rowSelected: {
    borderWidth: 2,
    borderColor: '#FDE572',
    borderRadius: 6,
  },

  flag: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 18,
  },
  label: { color: '#fff', fontSize: 20, fontWeight: '600' },

  startBtn: { marginTop: 24, alignSelf: 'center' },
  startImg: { width: 320, height: 100, resizeMode: 'contain' },
});
