import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    body:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
    },
    todolist:{
        boxShadow:'0 0 5px black',
        padding:10,
        borderRadius:10,
        display:'flex',
        flexDirection:'column',
        gap:10,
    },
    todolistHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        gap:10,
        width:320,
        borderBottomWidth:1,
        borderBottomColor:'lightgray',
        paddingBottom:10,
    },
    input:{
        cursor:'pointer',
        flex:1,
    },
    button:{
        backgroundColor:'gray',
        padding:10,
        borderRadius:10,
    },
    buttonText:{
        color:'white',
        cursor:'pointer',
    },

})