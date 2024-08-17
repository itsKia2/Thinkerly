import { FlatList, ImageBackground, Pressable, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import AppGradient from '@/components/AppGradient';
import { MEDITATION_DATA } from '@/constants/MeditationData';
import MEDITATION_IMAGES from '@/constants/meditation-images';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';

const NatureMeditate = () => {
    const router = useRouter();
    return (
        <View className="flex-1">
            <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
                <View className="mb-6">
                    <Text className="text-gray-200 mb-3 font-bold text-2xl text-left">
                        Welcome Omer!
                    </Text>
                    <Text className="text-indigo-100 text-xl font-medium">
                        Start your focusing now.
                    </Text>
                    <Text className="text-indigo-100 text-xl font-medium">
                        Choose your background image
                    </Text>

                    <View className="px-5 py-2">
                        <CustomButton
                            onPress={() => router.back()}
                            title="Index page"
                        />
                    </View>
                </View>

                <View>
                    <FlatList
                        data={MEDITATION_DATA}
                        className="mb-20"
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => console.log('boop')}
                                className="h-48 my-3 rounded-md overflow-hidden"
                            >
                                <ImageBackground
                                    source={MEDITATION_IMAGES[item.id - 1]}
                                    resizeMode="cover"
                                    className="flex-1 rounded-lg justify-center"
                                >
                                    <LinearGradient
                                        colors={[
                                            'transparent',
                                            'rgba(0, 0, 0, 0.8)'
                                        ]}
                                        className="flex-1 justify-center items-center"
                                    >
                                        <Text className="text-gray-100 text-3xl font-bold text-center">
                                            {item.title}
                                        </Text>
                                    </LinearGradient>
                                </ImageBackground>
                            </Pressable>
                        )}
                    />
                </View>
            </AppGradient>

            {/* Makes the StatusBar at the top light mode */}
            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

export default NatureMeditate;
