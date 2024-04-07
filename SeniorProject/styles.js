import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'space-between'
    },
    container: {
        flexGrow: 1,
        flex: 1,
        backgroundColor: '#d3d1d1',
    },
    header: {
        height: 95,
        backgroundColor: '#815cac',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    headerProfile: {
        height: 95,
        backgroundColor: '#815cac',
        flexDirection: 'row',
        justifyContent: 'space-between', // This will spread your items on both ends
        paddingHorizontal: 10, // Add some padding if necessary
        alignItems: 'center',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        zIndex: 1000,
    },
    headerButton: {
        marginTop: 30,
        padding: 10,
        height: 25,
        width: 25,
        alignItems: 'center'
    },
    headerButtonImage: {
        marginTop: 30,
        padding: 10,
        height: 40,
        width: 40,
    },
    headerButtonImageTwo: {
        marginTop: 30,
        padding: 0,
        height: 35,
        width: 35,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        marginLeft: 15,
        marginRight: 5,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: 35,
    },
    footer: {
        height: 85,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        borderTopWidth:2,
        borderColor: '#9d7ac7',
        //paddingVertical: 33,
        height: 85,
        width: 80,
    },
    footerButtonText: {
        color: '#815cac',
        textDecorationStyle: "double",
    },
    activeFooterButton: {
        borderTopWidth:4,
        borderColor: '#561d98',
        paddingVertical: 33,
        marginBottom: 0,
    },
    footerButtonImage: {
        alignItems: 'flex-end',
        height: 40,
        width: 40,
    },

    //added for profile page
    editTextBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    textBox: {
        backgroundColor: '#b28edc',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    fieldText: {
        textAlign: 'left',
        color: '#efdede'
    },
    fieldTitle: {
        textAlign: 'left',
        marginBottom: 1,
        color: '#9b96a1',
        fontWeight: 'bold',
    },
    fieldContainer: {
        backgroundColor: '#815cac',
        width: 380,
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 80,
    },
    avatar: {
        width: 120,
        height: 135,
        borderRadius: 65,
        backgroundColor: '#cccccc',
        marginBottom: 5,
    },

    //added for calendar
    subFooter: {
        backgroundColor: '#b28edc',
        padding: 10,
        alignItems: 'flex-start',
    },
    subFooterText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'left',
    },

    // Styles for the chat list items
    chatItem: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#fff',
      },
    chatDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    lastMessage: {
        fontSize: 14,
        color: '#999',
    },
    lastMessageTime: {
        fontSize: 12,
        color: '#999',
        marginLeft: 'auto',
    },
    notificationBubble: {
        backgroundColor: 'red',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    notificationText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Styles specific to ChatDetailScreen
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 20,
        marginRight: 10,
        fontSize: 16,
    },
    myMessage: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#0078D7', // A shade of blue
        alignSelf: 'flex-end',
        borderRadius: 15,
        maxWidth: '80%',
    },
    theirMessage: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#E1E1E1', // Light gray
        alignSelf: 'flex-start',
        borderRadius: 15,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
    },
    theirMessageText: {
        color: '#000', // Black color for text in 'their' messages
    },
    
});
export default styles;