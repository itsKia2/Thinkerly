import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    AppState
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Dialog from 'react-native-dialog';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

import CustomTimer from '@/components/CustomTimer';
import CustomButton from '@/components/CustomButton';
import FOCUS_IMAGES from '@/constants/focus-images';
import { FOCUS_DATA, AUDIO_FILES } from '@/constants/FocusData';

const Timer = () => {
    /* States used in program */
    const [seed, setSeed] = useState(1);
    let [startBool, setStart] = useState(false);
    let [durationPrompt, setPrompt] = useState(false);
    /* DEFAULT DURATION = 10 */
    let [duration, changeDuration] = useState(10);
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    /* Functions to change states */
    let changeSeed = () => setSeed(seed + 1);
    let changeStart = () => setStart(!startBool);
    let onPrompt = () => setPrompt(true);
    let offPrompt = () => setPrompt(false);

    /* Expo-router gives id when button on focus-nature is pressed */
    const { id } = useLocalSearchParams();

    /* AppState - stop timer when app is closed */
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    /* Handle playing of music */
    const initializeSound = async () => {
        const audioFileName = FOCUS_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );
        setSound(sound);
        return sound;
    };

    const togglePlayPause = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound?.getStatusAsync();
        if (status?.isLoaded && !isPlayingAudio) {
            await sound?.playAsync();
            setPlayingAudio(true);
        } else {
            await sound?.pauseAsync();
            setPlayingAudio(false);
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                appState.current = nextAppState;
                setAppStateVisible(appState.current);
                setStart(false);
                console.log('AppState', appState.current);
            }
        );
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View className="flex-1">
            <ImageBackground
                source={FOCUS_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.gradient}
                >
                    <View className="mb-6">
                        <Text className="text-zinc-50 mb-3 mt-1 font-bold text-3xl text-center">
                            Timer
                        </Text>

                        <Text className="text-zinc-50 font-bold text-2xl py-2 text-center">
                            Press the Start/Stop button
                        </Text>
                        <Text className="text-zinc-50 font-bold text-xl text-center">
                            If you close the app it will stop the timer
                        </Text>
                    </View>

                    {/* The actual timer component */}
                    <View className="justify-center items-center mb-6">
                        <View className="mt-4 bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
                            <CustomTimer
                                key={seed}
                                start={startBool}
                                time={duration}
                            />
                        </View>
                    </View>

                    <View style={styles.dialogContentView}>
                        {/* Refresh and Start/Stop buttons */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.button_1}>
                                <CustomButton
                                    onPress={changeStart}
                                    title="Start/Stop"
                                />
                            </View>
                            <View style={styles.button_1}>
                                <CustomButton
                                    onPress={changeSeed}
                                    title="Refresh"
                                />
                            </View>
                        </View>

                        {/* Input duration button */}
                        <View>
                            <View style={styles.button_2View}>
                                <CustomButton
                                    onPress={onPrompt}
                                    title="Change Duration"
                                />
                            </View>
                            <Dialog.Container
                                visible={durationPrompt}
                                onBackdropPress={offPrompt}
                            >
                                <Dialog.Title>
                                    Change timer duration
                                </Dialog.Title>
                                <Dialog.Description>
                                    Please enter the number of seconds below
                                </Dialog.Description>
                                <Dialog.Input
                                    onChangeText={(text) => {
                                        if (text === '') {
                                            text = '0';
                                        }
                                        changeDuration(parseInt(text));
                                    }}
                                    value={duration.toString()}
                                    keyboardType="numeric"
                                ></Dialog.Input>
                                <Dialog.Button
                                    label="Continue"
                                    onPress={offPrompt}
                                />
                            </Dialog.Container>
                        </View>

                        <View>
                            <View style={styles.button_2View}>
                                <CustomButton
                                    onPress={togglePlayPause}
                                    title="Start/Stop Audio"
                                />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>

            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    dialogContentView: {
        flex: 0.25,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    button_1: {
        width: '52%',
        paddingBottom: 50,
        paddingHorizontal: 20,
        height: 27
    },
    gradient: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
    },
    button_2View: {
        width: 250,
        padding: 40,
        height: 27
    }
});

export default Timer;
