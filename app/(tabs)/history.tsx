import { Button, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppGradient from '@/components/AppGradient';
import { StatusBar } from 'expo-status-bar';

const TimerHistory = () => {
    const [storedText, setStoredText] = useState<string | null>(null);

    // empty function rn
    const getData = async () => {
        return () => console.log();
    };

    // Fetch the data once when the app is loaded
    useEffect(() => {
        getData();
    }, []);

    return (
        <View className="flex-1 pb-8">
            <AppGradient colors={['#161b2e', '#0a4d4a', '#766e67']}>
                <View style={styles.container}>
                    <Button title="Load from Storage" onPress={getData} />
                    {storedText && (
                        <Text style={styles.storedText}>
                            Stored Text: {storedText}
                        </Text>
                    )}
                </View>
            </AppGradient>
            {/* Default statusbar is hidden by background image due to flex-1 */}
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    },
    storedText: {
        marginTop: 20,
        fontSize: 18,
        color: 'white'
    }
});

export default TimerHistory;
