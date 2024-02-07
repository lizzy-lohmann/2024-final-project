import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';


export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Content of your header goes here */}
                <Text>Header</Text>
            </View>
            <View style={styles.content}>
                {/* Content of your page goes here */}
                <Text>Page Content</Text>
            </View>
            <View style={styles.footer}>
                {/* Footer buttons go here */}
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Messaging</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
