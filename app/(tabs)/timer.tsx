import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    AppState,
    TextInput
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
    /* Expo-router gives id when button on focus-nature is pressed */
    /* required for audio and background image */
    const { id } = useLocalSearchParams();

    /* States used in program */
    const [seed, setSeed] = useState(1);
    let [startBool, setStart] = useState(false);
    let [durationPrompt, setPrompt] = useState(false);
    let [timerName, setTName] = useState('Study');
    /* DEFAULT DURATION = 10 */
    let [duration, changeDuration] = useState(10);

    /* Functions to change states */
    let changeSeed = () => setSeed(seed + 1);
    let changeStart = () => setStart(!startBool);
    let onPrompt = () => setPrompt(true);
    let offPrompt = () => setPrompt(false);

    /* AppState - stop timer when app is closed */
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    /* Audio Section */
    const audioFileName: string = FOCUS_DATA[Number(id) - 1].audio;
    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const audioSound = React.useRef(new Audio.Sound());
    let playing = false;

    const togglePlay = () => {
        if (playing) {
            PauseAudio();
            playing = false;
        } else {
            PlayAudio();
            playing = true;
        }
    };

    /* Loads the audio when screen loads */
    useEffect(() => {
        LoadAudio();

        /* When you close this timer screen the audio dumps */
        return () => {
            togglePlay();
            audioSound.current.unloadAsync();
        };
    }, []);

    /* Load the audio for the correlated image into cache */
    const LoadAudio = async () => {
        SetLoading(true);
        const checkLoading = await audioSound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
            try {
                const result = await audioSound.current.loadAsync(
                    AUDIO_FILES[audioFileName],
                    {},
                    true
                );
                if (result.isLoaded === false) {
                    SetLoading(false);
                    console.log('Error in Loading Audio');
                } else {
                    SetLoading(false);
                    SetLoaded(true);
                }
            } catch (error) {
                console.log(error);
                SetLoading(false);
            }
        } else {
            SetLoading(false);
        }
    };

    /* play the audio */
    const PlayAudio = async () => {
        try {
            const result = await audioSound.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === false) {
                    audioSound.current.playAsync();
                }
            }
        } catch (error) {}
    };

    /* pause the audio */
    const PauseAudio = async () => {
        try {
            const result = await audioSound.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === true) {
                    audioSound.current.pauseAsync();
                }
            }
        } catch (error) {}
    };

    /* event listener to pause music/timer when app is closed */
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
        <View className="flex-1 pb-8">
            <ImageBackground
                source={FOCUS_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.99)']}
                    style={styles.gradient}
                >
                    <View className="mb-6">
                        <Text className="text-zinc-50 mb-3 mt-1 font-bold text-3xl text-center">
                            Timer:{' '}
                            <TextInput
                                style={{
                                    width: 40,
                                    height: 20,
                                    textDecorationLine: 'underline'
                                }}
                                onChangeText={(text) => setTName(text)}
                                editable
                            >
                                {timerName}
                            </TextInput>
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
                                time={duration * 60}
                                timerName={timerName}
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
                                <Dialog.Title style={{ color: 'black' }}>
                                    Change timer duration
                                </Dialog.Title>
                                <Dialog.Description style={{ color: 'black' }}>
                                    Please enter the number of minutes below
                                </Dialog.Description>
                                <Dialog.Input
                                    style={styles.durationInput}
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

                        <View style={styles.button_3View}>
                            <CustomButton
                                onPress={togglePlay}
                                title="Start/Stop Audio"
                            />
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
        flex: 0.6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 1
    },
    button_1: {
        width: '52%',
        paddingBottom: '7%',
        paddingHorizontal: 18,
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
        paddingVertical: '8%',
        marginBottom: '7%',
        height: 27
    },
    button_3View: {
        width: 250,
        height: 27
    },
    durationInput: {
        color: 'black'
    }
});

export default Timer;
