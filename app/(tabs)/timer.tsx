import { Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import AppGradient from '@/components/AppGradient';

const Timer = () => {
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
            </AppGradient>

            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

export default Timer;
