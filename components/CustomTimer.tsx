import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Constants from 'expo-constants';

interface CustomTimerProps {
    start: boolean;
    time: number;
}

const CustomTimer = ({ start, time }: CustomTimerProps) => {
    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying={start}
                duration={time}
                colors="#004777"
                onComplete={() => {
                    console.log('COMPLETED TIMER');
                    /* return [true, 0]; */
                    return {
                        shouldRepeat: false,
                        delay: 1
                    };
                }}
            >
                {({ remainingTime }) => (
                    <View style={styles.remaining}>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.timeLeft}
                        >
                            Time Left:
                        </Text>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.remainingTime}
                        >
                            {remainingTime}
                        </Text>
                    </View>
                )}
            </CountdownCircleTimer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
        /* backgroundColor: '#ecf0f1', */
        /* padding: 20 */
    },
    remainingTime: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 30
    },
    timeLeft: {
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 17
    },
    remaining: {
        width: '87%'
    }
});

export default CustomTimer;
