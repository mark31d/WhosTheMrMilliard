import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BG_PLUS    = require('../assets/plus.png');
const BG_MINUS   = require('../assets/minus.png');
const BTN_NEXT   = require('../assets/Next.png');
const RIBBON_BG  = require('../assets/GameSetup.png');
const ARROW_BACK = require('../assets/arrow_back.png');

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;

export default function GameSetupPlayers() {
  const navigation = useNavigation();
  const [players, setPlayers] = useState(['', '']);

  // Гарантируем минимум 2 поля
  useEffect(() => {
    if (players.length < MIN_PLAYERS) {
      setPlayers(Array(MIN_PLAYERS).fill(''));
    }
  }, []);

  const allFilled = useMemo(
    () =>
      players.length >= MIN_PLAYERS &&
      players.every((p) => p.trim().length > 0),
    [players]
  );
  const canAdd   = players.length < MAX_PLAYERS;
  const canRemove= players.length > MIN_PLAYERS;

  const updateName = (i, txt) =>
    setPlayers((prev) => prev.map((p, idx) => (idx === i ? txt : p)));
  const addPlayer  = () => canAdd   && setPlayers((prev) => [...prev, '']);
  const removeLast = () => canRemove&& setPlayers((prev) => prev.slice(0, -1));
  const goNext     = () => navigation.navigate('GameSetupLocation', { players });

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Back Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          android_ripple={{ color: '#ffffff22' }}
        >
          <Image source={ARROW_BACK} style={styles.backIcon} />
        </Pressable>
      </View>

      {/* Ribbon */}
      <Image source={RIBBON_BG} style={styles.ribbon} />

      {/* Inputs */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {players.map((name, i) => (
          <View key={i} style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder={`Player ${i + 1}`}
              placeholderTextColor="#ffffff66"
              value={name}
              onChangeText={(t) => updateName(i, t)}
              returnKeyType="done"
            />
            {i === players.length - 1 && canRemove && (
              <Pressable
                style={styles.minusBtn}
                onPress={removeLast}
                android_ripple={{ color: '#ffffff22' }}
              >
                <Image source={BG_MINUS} style={styles.minusImg} />
              </Pressable>
            )}
          </View>
        ))}

        {canAdd && (
          <Pressable
            style={styles.plusWrapper}
            onPress={addPlayer}
            android_ripple={{ color: '#ffffff22' }}
          >
            <Image source={BG_PLUS} style={styles.plusImg} />
          </Pressable>
        )}
      </ScrollView>

      {/* Next */}
      <TouchableOpacity
        style={[styles.nextBtn, !allFilled && { opacity: 0.35 }]}
        activeOpacity={0.7}
        disabled={!allFilled}
        onPress={goNext}
      >
        <Image source={BTN_NEXT} style={styles.nextImg} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ff4a02',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0, right: 0,
    height: 44,
    zIndex: 10,
    justifyContent: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backIcon: { width: 150, height: 27, resizeMode: 'contain' },

  ribbon: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  scroll: { alignItems: 'stretch' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 6,
    backgroundColor: '#dc3800aa',
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#fff',
  },
  minusBtn: { padding: 8, marginLeft: 8 },
  minusImg: { width: 32, height: 32, resizeMode: 'contain' },

  plusWrapper: { alignSelf: 'center', marginVertical: 26 },
  plusImg: { width: 90, height: 90, resizeMode: 'contain' },

  nextBtn: { alignSelf: 'center', marginTop: 'auto', marginBottom: 24 },
  nextImg: { width: 280, height: 80, resizeMode: 'contain' },
});
