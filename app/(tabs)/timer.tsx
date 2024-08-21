import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Dialog from 'react-native-dialog';
import { router, useLocalSearchParams } from 'expo-router';

import AppGradient from '@/components/AppGradient';
import CustomTimer from '@/components/CustomTimer';
import CustomButton from '@/components/CustomButton';
import FOCUS_IMAGES from '@/constants/focus-images';

const Timer = () => {
    /* States used in program */
    const [seed, setSeed] = useState(1);
    let [startBool, setStart] = useState(false);
    let [durationPrompt, setPrompt] = useState(false);
    /* DEFAULT DURATION = 10 */
    let [duration, changeDuration] = useState(10);

    /* Functions to change states */
    let changeSeed = () => setSeed(seed + 1);
    let changeStart = () => setStart(!startBool);
    let onPrompt = () => setPrompt(true);
    let offPrompt = () => setPrompt(false);

    /* NOTE might not actually work */
    const { id } = useLocalSearchParams();

    return (
        <View className="flex-1">
            <ImageBackground
                source={FOCUS_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <View>
                    <Text className="text-zinc-50 font-bold text-3xl">
                        Timer
                    </Text>

                    <Text className="text-zinc-50 font-bold text-2xl py-10">
                        Press the Start/Stop button
                    </Text>
                </View>

                {/* The actual timer component */}
                <View className="pt-20">
                    <CustomTimer key={seed} start={startBool} time={duration} />
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
                            <CustomButton onPress={onPrompt} title="Duration" />
                        </View>
                        <Dialog.Container
                            visible={durationPrompt}
                            onBackdropPress={offPrompt}
                        >
                            <Dialog.Title>Change timer duration</Dialog.Title>
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
                </View>
            </ImageBackground>

            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    dialogContentView: {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20
    },
    button_1: {
        width: '52%',
        padding: 9,
        height: 27
    },
    button_2View: {
        width: 300,
        padding: 9,
        height: 27
    }
});

export default Timer;
