import {
    FlatList,
    ImageBackground,
    Pressable,
    Text,
    View,
    StyleSheet
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import AppGradient from '@/components/AppGradient';
import { FOCUS_DATA } from '@/constants/FocusData';
import IMAGES1 from '@/constants/focus-images';

const NatureFocus = () => {
    let router = useRouter();
    return (
        <View className="flex-1 pb-8">
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
                </View>

                <View>
                    <FlatList
                        data={FOCUS_DATA}
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    router.push(`timer/?id=${item.id}`)
                                }
                                className="h-48 my-3 rounded-md overflow-hidden"
                            >
                                <ImageBackground
                                    source={IMAGES1[item.id - 1]}
                                    resizeMode="cover"
                                    style={styles.backgroundImage}
                                >
                                    <LinearGradient
                                        colors={[
                                            'transparent',
                                            'rgba(0, 0, 0, 0.8)'
                                        ]}
                                        style={styles.gradient}
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center'
    },
    gradient: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%'
    },
    list: {
        paddingBottom: 150
    }
});

export default NatureFocus;
