import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import beachImage from '@/assets/focus-images/beach.webp';
import CustomButton from '@/components/CustomButton';
import AppGradient from '@/components/AppGradient';

/* TODO !!!
 * TODO Index page is simple, button to go to timer page
 * TODO Button from timer page to change background image (keep images from og project)
 * TODO use audios to enhance experience
 *  */

const App = () => {
    const router = useRouter();
    return (
        <View className="flex-1">
            {/* Background Image used for first index page */}
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                {/* AppGradient (uses LinearGradient) - currently darkens background image */}
                <AppGradient
                    colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}
                >
                    <SafeAreaView className="flex-1 justify-center">
                        <View>
                            {/* Title and subtitle  */}
                            <Text className="text-center text-white font-bold text-4xl">
                                Thinkerly !
                            </Text>
                            <Text className="text-center text-white text-2xl mt-3 mb-3">
                                Improving Productivity Everywhere
                            </Text>

                            {/* Button on main page  */}
                            <View className="pt-20">
                                <CustomButton
                                    onPress={() => router.push('/nature-focus')}
                                    title="Focus?"
                                />
                            </View>
                        </View>

                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
            {/* Makes the StatusBar at the top light mode */}
            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

export default App;
