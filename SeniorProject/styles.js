import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 95,
        backgroundColor: '#815cac',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    headerButton: {
        marginTop: 35,
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },

    headerButtonText: {
        color: '#fbfafd',
    },

    searchInput: {
        flex: 1,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: 35,
    },
    footer: {
        height: 85,
        backgroundColor: '#815cac',
        borderTopWidth: 1,
        borderTopColor: '#561d98',
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
        marginBottom: 85,
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#561d98',
        paddingVertical: 33,
    },
    footerButtonText: {
        color: '#f6f3f3',
    },

    //added for profile page
    editTextBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },

    fieldTitle: {
        textAlign: 'left',
        marginBottom: 5,
        color: '#555',
        fontWeight: 'bold',
    }
});

export default styles;