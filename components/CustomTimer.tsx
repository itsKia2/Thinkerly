import { View, Animated, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Constants from 'expo-constants';

interface CustomTimerProps {
    start: boolean;
    time: number;
}

const CustomTimer = ({ start, time }: CustomTimerProps) => {
    const [count, setCount] = useState(0);

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
                    <Animated.Text
                        style={{
                            ...styles.remainingTime
                            /* color: animatedColor */
                        }}
                    >
                        {remainingTime}
                    </Animated.Text>
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
        fontSize: 46,
        color: 'white'
    }
});

export default CustomTimer;
