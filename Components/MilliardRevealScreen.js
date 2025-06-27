/* ------------------------------------------------------------------
   Components/MilliardRevealScreen.js
   • Показывает Mr Milliard
   • Кнопка «Pause» открывает блюр-диалог Quit / Resume
------------------------------------------------------------------- */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';   // expo: expo-blur
import { useNavigation, useRoute } from '@react-navigation/native';

/* ─── ассеты ─── */
const BG_IMG    = require('../assets/background2.png');
const RIBBON_BG = require('../assets/How_to_play.png');
const PAUSE_BTN = require('../assets/Pause.png');
const BTN_HOME  = require('../assets/Home.png');
const MR_IMG    = require('../assets/Mr.Milliard.png');

/* ───────────────────────────────────────────────────────────── */
export default function MilliardRevealScreen() {
  const navigation          = useNavigation();
  const { params = {} }     = useRoute();
  const { currentPlayer }   = params;

  const [paused, setPaused] = useState(false);

  /* надпись в ленте */
  const ribbonLabel = currentPlayer
    ? `Player : ${currentPlayer}`
    : 'Player';

  /* обработчик Quit: сразу скрыть модалку, затем в меню */
  const quit = () => {
    setPaused(false);
    navigation.navigate('Menu');
  };

  return (
    <ImageBackground source={BG_IMG} style={styles.wrapper} resizeMode="cover">
      {/* ── лента ── */}
      <View style={styles.ribbonWrap}>
        <Image source={RIBBON_BG} style={styles.ribbonImg} />
        <Text
          style={[
            styles.ribbonTxt,
            ribbonLabel.length > 14 && { fontSize: 22 },
          ]}
          numberOfLines={1}
        >
          {ribbonLabel}
        </Text>

        <TouchableOpacity
          style={styles.pauseBtn}
          activeOpacity={0.85}
          onPress={() => setPaused(true)}
        >
          <Image source={PAUSE_BTN} style={styles.pauseImg} />
        </TouchableOpacity>
      </View>

      {/* ── Mr. Milliard ── */}
      <View style={styles.card}>
        <Text style={styles.roleName}>Mr. Milliard</Text>
        <Image source={MR_IMG} style={styles.roleImg} resizeMode="contain" />
      </View>

      {/* ── Home ── */}
      <TouchableOpacity
        style={styles.btnWrap}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Menu')}
      >
        <Image source={BTN_HOME} style={styles.btnImg} resizeMode="stretch" />
      </TouchableOpacity>

      {/* ── Pause dialog ── */}
      <PauseDialog
        visible={paused}
        onResume={() => setPaused(false)}
        onQuit={quit}
      />
    </ImageBackground>
  );
}

/* ─────────── диалог паузы ─────────── */
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

/* ─── стили ─── */
const CARD_H = 500;

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', paddingTop: 48 },

  ribbonWrap: { width: '110%', alignItems: 'center', marginBottom: 48, left: -15 },
  ribbonImg:  { width: '100%', height: 60, resizeMode: 'contain' },
  ribbonTxt:  { position: 'absolute', left: '30%', top: 14, fontSize: 26, fontWeight: '700', color: '#fff' },
  pauseBtn:   { position: 'absolute', right: 20, top: -8 },
  pauseImg:   { width: 80, height: 80, resizeMode: 'contain' },

  card: { width: '80%', height: CARD_H, alignItems: 'center', marginBottom: 18, marginTop: -76 },
  roleName: { fontSize: 30, fontWeight: '700', color: '#fff', marginTop: 60, marginBottom: -40, zIndex: 1 },
  roleImg:  { width: '100%', flex: 1, marginTop: -10 },

  btnWrap: { width: '90%', height: 80, marginBottom: 30, marginTop: -15 },
  btnImg:  { width: '100%', height: '100%' },
});

/* стили диалога */
const pd = StyleSheet.create({
  card:  { marginHorizontal: 24, marginTop: '40%', backgroundColor: '#fff', borderRadius: 14, padding: 24, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  msg:   { fontSize: 16, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  row:   { flexDirection: 'row', alignSelf: 'stretch' },
  btn:   { flex: 1, padding: 14, alignItems: 'center' },
  quitTxt:   { color: '#d12323', fontSize: 18, fontWeight: '600' },
  resumeTxt: { color: '#ff8c00', fontSize: 18, fontWeight: '600' },
});
