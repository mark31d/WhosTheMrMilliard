/* ------------------------------------------------------------------
   Components/RoundTimerScreen.js
   • Таймер + «Pause» (Quit / Resume)
   • Тик звучит только если «Timer Sound» = ON
------------------------------------------------------------------- */
import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundPlayer from 'react-native-sound-player';

/* assets */
const BG_IMG    = require('../assets/background2.png');
const RIBBON_BG = require('../assets/How_to_play.png');
const PAUSE_BTN = require('../assets/Pause.png');
const BTN_NEXT  = require('../assets/Next_Round.png');
const BTN_SHOW  = require('../assets/Show.png');

/* constants */
const ROUND_SEC = 120;
const BTN_H     = 80;

/* ------------------------------------------------------------------ */
export default function RoundTimerScreen() {
  const navigation            = useNavigation();
  const { params = {} }       = useRoute();
  const { players = [], roles = [], locationLabel } = params;

  /* имя миллиардера */
  const milliardName = useMemo(() => {
    const idx = roles.findIndex((r) => r?.name === 'Mr. Milliard');
    return idx >= 0 ? players[idx] : undefined;
  }, [players, roles]);

  /* state */
  const [roundNumber, setRoundNumber] = useState(1);
  const [secLeft,     setSecLeft]     = useState(ROUND_SEC);
  const [paused,      setPaused]      = useState(false);
  const [soundOn,     setSoundOn]     = useState(true);

  /* читаем настройку звука один раз */
  useEffect(() => {
    AsyncStorage.getItem('timerSound').then((v) => {
      if (v !== null) setSoundOn(v === 'on');
    });
  }, []);

  /* тик-таймер */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setSecLeft((s) => (s === 0 ? 0 : s - 1));

      if (soundOn) {
        try {
          SoundPlayer.playSoundFile('tick', 'mp3');
        } catch {}
      }
    }, 1000);
    return () => clearInterval(id);
  }, [paused, soundOn]);

  const mmss =
    `${String(Math.floor(secLeft / 60)).padStart(2, '0')} : ` +
    `${String(secLeft % 60).padStart(2, '0')}`;

  const nextRound = () => {
    setRoundNumber((r) => r + 1);
    setSecLeft(ROUND_SEC);
  };

  const showMilliard = () =>
    navigation.replace('MilliardRevealScreen', {
      currentPlayer: milliardName ?? 'Unknown',
      locationLabel,
    });

  /* Quit */
  const quit = () => {
    setPaused(false);
    navigation.navigate('Menu');
  };

  /* UI */
  return (
    <ImageBackground source={BG_IMG} style={styles.wrapper} resizeMode="cover">
      {/* Ribbon */}
      <View style={styles.ribbonWrap}>
        <Image source={RIBBON_BG} style={styles.ribbonImg} />
        <Text style={styles.ribbonTxt}>{`Round ${roundNumber}`}</Text>
        <TouchableOpacity style={styles.pauseBtn} onPress={() => setPaused(true)} activeOpacity={0.85}>
          <Image source={PAUSE_BTN} style={styles.pauseImg} />
        </TouchableOpacity>
      </View>

      {/* Timer */}
      <View style={styles.timerWrap}>
        <Text style={styles.timer}>{mmss}</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.btnWrap} onPress={nextRound} activeOpacity={0.85}>
        <Image source={BTN_NEXT} style={styles.btnImg} resizeMode="stretch" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnWrap, styles.btnBottom]} onPress={showMilliard} activeOpacity={0.85}>
        <Image source={BTN_SHOW} style={styles.btnImg} resizeMode="stretch" />
      </TouchableOpacity>

      {/* Pause dialog */}
      <PauseDialog visible={paused} onResume={() => setPaused(false)} onQuit={quit} />
    </ImageBackground>
  );
}

/* ────────── PauseDialog ────────── */
function PauseDialog({ visible, onResume, onQuit }) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      {Platform.OS === 'ios' ? (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="#0008"
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: '#0008' }]} />
      )}

      <View style={pd.card}>
        <Text style={pd.title}>Game Paused</Text>
        <Text style={pd.msg}>
          Take a breath, fix your tie, and gather your thoughts.{"\n"}
          The mystery can wait — for now.
        </Text>

        <View style={pd.row}>
          <TouchableOpacity style={pd.btn} onPress={onQuit}>
            <Text style={pd.quitTxt}>Quit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pd.btn} onPress={onResume}>
            <Text style={pd.resumeTxt}>Resume</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/* ─── styles ─── */
const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', paddingTop: 48 },

  ribbonWrap: { width: '110%', alignItems: 'center', marginBottom: 48, left: -15 },
  ribbonImg:  { width: '100%', height: 60, resizeMode: 'contain' },
  ribbonTxt:  { position: 'absolute', left: '40%', top: 14, fontSize: 26, fontWeight: '700', color: '#fff' },
  pauseBtn:   { position: 'absolute', right: 20, top: -8 },
  pauseImg:   { width: 80, height: 80, resizeMode: 'contain' },

  timerWrap: { flex: 1, justifyContent: 'center' },
  timer:     { fontSize: 64, color: '#fff', textAlign: 'center' },

  btnWrap:   { width: '86%', height: BTN_H, marginBottom: 32 },
  btnBottom: { marginBottom: 60 },
  btnImg:    { width: '100%', height: '100%' },
});

/* диалог */
const pd = StyleSheet.create({
  card:  { marginHorizontal: 24, marginTop: '40%', backgroundColor: '#fff', borderRadius: 14, padding: 24, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  msg:   { fontSize: 16, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  row:   { flexDirection: 'row', alignSelf: 'stretch' },
  btn:   { flex: 1, padding: 14, alignItems: 'center' },
  quitTxt:   { color: '#d12323', fontSize: 18, fontWeight: '600' },
  resumeTxt: { color: '#ff8c00', fontSize: 18, fontWeight: '600' },
});
