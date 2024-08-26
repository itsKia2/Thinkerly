import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerHistory = () => {
    const [storedText, setStoredText] = useState<string | null>(null);

    // Function to retrieve data from AsyncStorage
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key');
            if (value !== null) {
                setStoredText(value);
            }
        } catch (e) {
            console.error('Failed to fetch the data from storage');
        }
    };

    // Fetch the data once when the app is loaded
    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Load from Storage" onPress={getData} />
            {storedText && (
                <Text style={styles.storedText}>Stored Text: {storedText}</Text>
            )}
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
        color: 'blue'
    }
});

export default TimerHistory;
