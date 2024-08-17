import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import beachImage from '@/assets/meditation-images/beach.webp';
import CustomButton from '@/components/CustomButton';

const App = () => {
    return (
        <View className="flex-1">
            {/* Background Image used for first index page */}
            <ImageBackground
                source={beachImage}
                resizeMode="cover"
                className="flex-1"
            >
                {/* Linear Gradient - currently darkens background image */}
                <LinearGradient
                    className="flex-1"
                    colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}
                >
                    <SafeAreaView className="flex-1 mx-5 my-12 justify-between">
                        <View>
                            {/* Title and subtitle  */}
                            <Text className="text-center text-white font-bold text-4xl">
                                Thinkerly !
                            </Text>
                            <Text className="text-center text-white text-2xl mt-3">
                                Improving Productivity Everywhere
                            </Text>
                        </View>

                        {/* Button on main page, currently does nothing (console.log)  */}
                        <View>
                            <CustomButton
                                onPress={() => console.log('tap')}
                                title="Focus?"
                            />
                        </View>

                        {/* Makes the StatusBar at the top light mode */}
                        {/* Default statusbar is hidden by background image due to flex-1 */}
                        <StatusBar style="light" />
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

export default App;
