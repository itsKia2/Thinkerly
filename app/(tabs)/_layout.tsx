import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import Colors from '@/constants/Colors';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarStyle: [
                    {
                        position: 'absolute',
                        display: 'flex'
                    }
                ]
            }}
        >
            <Tabs.Screen
                name="nature-focus"
                options={{
                    tabBarLabel: 'Focus',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="flower-tulip"
                            size={24}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="affirmations"
                options={{
                    tabBarLabel: 'Affirmations',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="open-book" size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
