/* ------------------------------------------------------------------
   Components/HowToPlay.js
   • Ribbon “How to Play”
   • ScrollView содержит и текст, и две PNG-кнопки-иконки
------------------------------------------------------------------- */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* ─── assets ─── */
const RIBBON_BG     = require('../assets/How_to_play.png');
const ARROW_BACK    = require('../assets/arrow_back.png');
const BTN_LOCATION  = require('../assets/Locations.png');
const BTN_CHARACTER = require('../assets/Characters.png');

export default function HowToPlay() {
  const navigation = useNavigation();

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
        <Text style={styles.ribbonText}>How to Play</Text>
      </View>

      {/* Scrollable block: long text + buttons */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.txt}>
          In Who’s the Mr. Milliard?, all players except one secretly receive
          the same location — a glamorous, mysterious setting from the retro
          world of high society.{'\n\n'}
          One player, however, is Mr. Milliard — the hidden billionaire — who
          doesn’t know where he is.{'\n\n'}
          His goal?{'\n'}
          Figure out the location without revealing himself.{'\n\n'}
          The others?{'\n'}
          Uncover who among them is Mr. Milliard before it’s too late.
        </Text>

        {/* Locations */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Locations')}
          activeOpacity={0.85}
        >
          <Image source={BTN_LOCATION} style={styles.btnImg} resizeMode="stretch" />
        </TouchableOpacity>

        {/* Characters */}
        <TouchableOpacity
          style={[styles.btn, { marginBottom: 40 }]}
          onPress={() => navigation.navigate('Characters')}
          activeOpacity={0.85}
        >
          <Image source={BTN_CHARACTER} style={styles.btnImg} resizeMode="stretch" />
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
  },

  /* back */
  backBtn:  { position: 'absolute', top: 20, left: 12, padding: 8 },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  /* ribbon */
  ribbonBox: { width: '100%', height: 60, marginBottom: 32, justifyContent: 'center', alignItems: 'center' },
  ribbonImg: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'contain' },
  ribbonText:{ fontSize: 24, fontWeight: '700', color: '#fff' },

  /* scrollable area */
  scrollContent: {
    alignItems: 'stretch',
    paddingBottom: 50,          // место под «home-indicator»
  },

  txt: { fontSize: 18, fontWeight: '800',color: '#fff', lineHeight: 20, marginBottom: 26 },

  /* PNG-buttons */
  btn:    { width: '100%', alignItems: 'center', marginBottom: 24 },
  btnImg: { width: '100%', height: 80 },
});
