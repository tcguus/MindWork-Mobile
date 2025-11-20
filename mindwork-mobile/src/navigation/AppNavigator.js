import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { colors } from '../theme';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import NewAssessmentScreen from '../screens/Assessments/NewAssessmentScreen';
import AssessmentDetailsScreen from '../screens/Assessments/AssessmentDetailsScreen';
import HistoryScreen from '../screens/Assessments/HistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import { View, Text } from 'react-native';

const Placeholder = ({ title }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{ color: colors.primary }}>{title}</Text>
    </View>
);

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.secondary,
                drawerActiveTintColor: colors.primary,
                sceneContainerStyle: { backgroundColor: colors.background }
            }}
        >
            <Drawer.Screen name="Dashboard" component={HomeScreen} options={{ title: 'Início' }} />
            <Drawer.Screen
                name="NewAssessment"
                component={NewAssessmentScreen}
                options={{ title: 'Nova Avaliação' }}
            />
            <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Minhas Avaliações' }} />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Meu Perfil' }}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{ title: 'Sobre o App' }}
            />
            <Drawer.Screen
                name="AssessmentDetails"
                component={AssessmentDetailsScreen}
                options={{
                    title: 'Detalhes',
                    drawerItemStyle: { display: 'none' }
                }}
            />
        </Drawer.Navigator>
    );
}