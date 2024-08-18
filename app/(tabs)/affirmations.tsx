import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';

/* TODO refactor into music page later thank you
 *  */

const Affirmation = () => {
    return (
        <View className="flex-1">
            <AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-zinc-50 font-bold text-3xl">
                        I've skipped Affirmations
                    </Text>
                    <Text className="text-zinc-50 font-bold text-2xl py-10">
                        Come back to this if need be
                    </Text>
                </ScrollView>
            </AppGradient>

            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

export default Affirmation;
