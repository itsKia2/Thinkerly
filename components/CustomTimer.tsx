import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface CustomTimerProps {
    start: boolean;
    time: number;
}

const CustomTimer = ({ start, time }: CustomTimerProps) => {
    const formattedTimeMinutes = (time: number) =>
        String(Math.floor(time / 60)).padStart(2, '0');
    const formattedTimeSeconds = (time: number) =>
        String(time % 60).padStart(2, '0');

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
                            {formattedTimeMinutes(remainingTime)}:
                            {formattedTimeSeconds(remainingTime)}
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
        alignItems: 'center'
        /* paddingTop: Constants.statusBarHeight */
        /* backgroundColor: '#ecf0f1', */
        /* padding: 20 */
    },
    remainingTime: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 30
    },
    timeLeft: {
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 17
    },
    remaining: {
        color: 'black',
        width: '87%'
    }
});

export default CustomTimer;
