import { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Timing } from './Timing';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { sizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const HALF_SECOND_IN_MS = 500;

const PATTERN = [
  1 * HALF_SECOND_IN_MS,
  1 * HALF_SECOND_IN_MS,
  1 * HALF_SECOND_IN_MS,
  1 * HALF_SECOND_IN_MS,
  1 * HALF_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject)
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={styles.thisGuySucks}>
          <Text style={styles.reallySucks}>Focusing on</Text>
          <Text style={styles.reallySucks}>{focusSubject}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar style={styles.progressBar} progress={progress} />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearBtnWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: sizes.med,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: sizes.xxl,
  },
  clearBtnWrapper: {
    alignItems: 'center',
  },
  thisGuySucks: {
    paddingTop: sizes.lrg,
  },
  reallySucks: {
    color: colors.white,
    textAlign: 'center',
  },
  progressContainer: {
    paddingTop: sizes.sml,
  },
  progressBar: {
    color: colors.progressBar,
    height: sizes.sml,
  },
});
