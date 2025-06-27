/* ------------------------------------------------------------------
   Components/RoleRevealScreen.js
------------------------------------------------------------------- */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation, useRoute } from '@react-navigation/native';

/* ассеты */
const RIBBON_BG = require('../assets/How_to_play.png');
const PAUSE_BTN = require('../assets/Pause.png');
const QUESTION  = require('../assets/Question.png');

export default function RoleRevealScreen() {
  const navigation = useNavigation();
  const { players = [], roles = [], locationLabel = '' } =
    useRoute().params ?? {};

  const [current,  setCurrent]  = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [paused,   setPaused]   = useState(false);

  const role         = roles[current] ?? { name: '', img: QUESTION };
  const showLocation = role.name !== 'Mr. Milliard';
  const venue        = showLocation ? locationLabel : '';

  const reveal = () => setRevealed(true);

  const next = () => {
    if (current < players.length - 1) {
      setCurrent((p) => p + 1);
      setRevealed(false);
    } else {
      navigation.replace('RoundTimerScreen', { players, roles, locationLabel });
    }
  };

  /* сначала убираем диалог, потом навигация */
  const quit = () => {
    setPaused(false);                // мгновенно исчезает
    navigation.navigate('Menu');     // переход на экран «Menu»
  };

  return (
    <View style={styles.wrapper}>
      {/* Ribbon + Pause */}
      <View style={styles.ribbonWrap}>
        <Image source={RIBBON_BG} style={styles.ribbon} />
        <Text style={styles.ribbonTxt}>
          {players[current] || `Player ${current + 1}`}
        </Text>

        <TouchableOpacity
          style={styles.pauseBtn}
          activeOpacity={0.8}
          onPress={() => setPaused(true)}
        >
          <Image source={PAUSE_BTN} style={styles.pauseImg} />
        </TouchableOpacity>
      </View>

      {/* Карточка */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={revealed ? undefined : reveal}
      >
        <Image
          source={revealed ? role.img : QUESTION}
          style={revealed ? styles.picRole : styles.picQuestion}
          resizeMode="contain"
        />

        {revealed ? (
          <>
            <Text style={styles.role}>{role.name}</Text>
            {showLocation && <Text style={styles.venue}>{venue}</Text>}
          </>
        ) : (
          <Text style={styles.tapHint}>Tap to see your role</Text>
        )}
      </TouchableOpacity>

      {/* Next / Start */}
      {revealed && (
        <TouchableOpacity style={styles.nextBtn} onPress={next}>
          <Text style={styles.nextTxt}>
            {current < players.length - 1 ? 'Next' : 'Start Rounds'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Pause dialog */}
      <PauseDialog
        visible={paused}
        onResume={() => setPaused(false)}
        onQuit={quit}
      />
    </View>
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
const styles = StyleSheet.create({
  /* … предыдущие стили без изменений … */
  wrapper:   { flex: 1, backgroundColor: '#ff4a02', alignItems: 'center' },
  ribbonWrap:{ width: '110%', alignItems: 'center', marginTop: 48, marginBottom: 48, left: -15 },
  ribbon:    { width: '100%', height: 60, resizeMode: 'contain' },
  ribbonTxt: { position: 'absolute', left: '40%', top: 14, fontSize: 26, fontWeight: '700', color: '#fff' },
  pauseBtn:  { position: 'absolute', right: 20, top: -8 },
  pauseImg:  { width: 80, height: 80, resizeMode: 'contain' },
  card:        { flex: 1, width: '100%', alignItems: 'center' },
  picQuestion: { width: '85%', height: '85%', top: -20 },
  picRole:     { width: '100%', height: '100%', top: -10 },
  role:    { position: 'absolute', top: '6%',  width: '85%', textAlign: 'center', fontSize: 25, fontWeight: '700', color: '#fff' },
  venue:   { position: 'absolute', top: '13%', width: '85%', textAlign: 'center', fontSize: 24, color: '#ffd868' },
  tapHint: { position: 'absolute', bottom: 40, fontSize: 25, color: '#fff' },
  nextBtn:{ marginBottom: 40 },
  nextTxt:{ fontSize: 28, fontWeight: '700', color: '#fff' },
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
