import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Replace with the appropriate background color
    },
    header: {
        height: 60, // Set the height you want for your header
        backgroundColor: '#EFEFEF', // Replace with the appropriate background color
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4, // This adds a shadow on Android
        shadowOffset: { width: 0, height: 2 }, // These lines add a shadow on iOS
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    footer: {
        height: 60, // Set the height you want for your footer
        backgroundColor: '#EFEFEF', // Replace with the appropriate background color
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC', // This adds a slight line to the top of the footer to separate it from the content
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute', // This ensures footer is always at the bottom
        bottom: 0,
        left: 0,
        right: 0,
    },
    content: {
        flex: 1, // This makes sure the content takes all the space between the header and footer
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60, // This should be the same as your footer height
    },
    footerButton: {
        // Style for your footer buttons
    },
    footerButtonText: {
        // Style for the text inside your footer buttons
    },
});

export default styles;