/* ------------------------------------------------------------------
   Components/SettingsScreen.js
   • Ribbon “Settings”
   • Кнопка Timer Sound показывает ON / OFF (PNG-иконка без прозрачности)
   • Share / Terms — PNG-кнопки-иконки
------------------------------------------------------------------- */
import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

/* ─── assets ─── */
const RIBBON_BG  = require('../assets/How_to_play.png');
const ICO_SOUND  = require('../assets/Timer_sound.png');
const ICO_SHARE  = require('../assets/Share.png');
const ICO_TERMS  = require('../assets/Terms.png');
const ARROW_BACK = require('../assets/arrow_back.png');

export default function SettingsScreen() {
  const navigation   = useNavigation();
  const [soundOn, setSoundOn] = useState(true);

  /* читаем сохранённое значение */
  useEffect(() => {
    AsyncStorage.getItem('timerSound').then((v) => {
      if (v !== null) setSoundOn(v === 'on');
    });
  }, []);

  /* ON / OFF */
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    AsyncStorage.setItem('timerSound', next ? 'on' : 'off');
  };

  /* share */
  const shareApp = () =>
    Share.share({
      title: "Who's the Mr. Milliard?",
      message:
        'Try this party game!\nDownload for iOS & Android: https://example.com/app',
    });

  /* Terms */
  const showTermsAlert = () =>
    Alert.alert(
      'Coming soon',
      'Our legal team is polishing the paperwork. Terms of Use will be available in a future update.',
      [{ text: 'OK' }],
    );

  /* UI */
  return (
    <View style={styles.wrap}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <Image source={ARROW_BACK} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Ribbon */}
      <View style={styles.ribbonBox}>
        <Image source={RIBBON_BG} style={styles.ribbonImg} />
        <Text style={styles.ribbonTxt}>Settings</Text>
      </View>

      {/* Timer Sound */}
      <TouchableOpacity style={styles.btn} onPress={toggleSound} activeOpacity={0.85}>
        <Image source={ICO_SOUND} style={styles.btnImg} resizeMode="stretch" />
        <Text style={styles.soundTxt}>{soundOn ? 'On' : 'Off'}</Text>
      </TouchableOpacity>

      {/* Share the App */}
      <TouchableOpacity style={styles.btn} onPress={shareApp} activeOpacity={0.85}>
        <Image source={ICO_SHARE} style={styles.btnImg} resizeMode="stretch" />
      </TouchableOpacity>

      {/* Terms of Use */}
      <TouchableOpacity style={[styles.btn, { marginBottom: 40 }]} onPress={showTermsAlert} activeOpacity={0.85}>
        <Image source={ICO_TERMS} style={styles.btnImg} resizeMode="stretch" />
      </TouchableOpacity>
    </View>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#ff4a02', paddingTop: 60, paddingHorizontal: 24, alignItems: 'center' },

  backBtn:  { position: 'absolute', top: 20, left: 12, padding: 8 },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  ribbonBox: { width: '100%', height: 60, marginBottom: 40, justifyContent: 'center', alignItems: 'center' },
  ribbonImg: { width: '100%', height: '100%', position: 'absolute', resizeMode: 'contain' },
  ribbonTxt: { fontSize: 24, fontWeight: '700', color: '#fff' },

  btn:    { width: '100%', alignItems: 'center', marginBottom: 24 },
  btnImg: { width: '100%', height: 80 },

  soundTxt: { position: 'absolute', right: 70, top: 27, fontSize: 22, fontWeight: '500', color: '#fff' },
});
