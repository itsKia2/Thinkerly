import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import AppGradient from '@/components/AppGradient';
import CustomTimer from '@/components/CustomTimer';
import CustomButton from '@/components/CustomButton';

function changeSeed(seed: number) {
    return seed + 1;
}

const Timer = () => {
    const [seed, setSeed] = useState(1);
    let duration = 3;
    let [startBool, setStart] = useState(false);
    let changeSeed = () => setSeed(seed + 1);
    let changeStart = () => setStart(!startBool);

    return (
        <View className="flex-1">
            <AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
                <View>
                    <Text className="text-zinc-50 font-bold text-3xl">
                        Timer page
                    </Text>

                    <Text className="text-zinc-50 font-bold text-2xl py-10">
                        Add timer below at center of page
                    </Text>
                </View>

                {/* The actual timer component */}
                <View className="pt-20">
                    <CustomTimer key={seed} start={startBool} time={duration} />
                </View>

                {/* Refresh button */}
                <View className="pt-20">
                    <CustomButton onPress={changeSeed} title="Refresh" />
                </View>

                {/* Start/Stop button */}
                <View className="pt-20">
                    <CustomButton onPress={changeStart} title="Start/Stop" />
                </View>
            </AppGradient>

            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

export default Timer;
