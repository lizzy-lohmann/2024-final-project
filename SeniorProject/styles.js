import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Replace with the appropriate background color
    },
    header: {
        height: 85, // Set the height you want for your header
        backgroundColor: '#815cac', // Replace with the appropriate background color
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4, // This adds a shadow on Android
        shadowOffset: { width: 0, height: 2 }, // These lines add a shadow on iOS
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    footer: {
        height: 85, // Set the height you want for your footer
        backgroundColor: '#815cac', // Replace with the appropriate background color
        borderTopWidth: 1,
        borderTopColor: '#561d98', // This adds a slight line to the top of the footer to separate it from the content
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 85, // This should be the same as your footer height
    },
    footerButton: {
        flex: 1, // Assign flex to each button to distribute space evenly
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#561d98', // Set the border color for the buttons
        paddingVertical: 33,
    },
    footerButtonText: {
        color: '#f6f3f3',
    },
});

export default styles;