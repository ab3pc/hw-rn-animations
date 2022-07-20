import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reactionsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    width: "50%",
    alignSelf: "center",
    justifyContent: "space-between",
    
  },
  circle: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width: 100,
    borderRadius: 75,
    height: 100,
    position: 'absolute',
    zIndex:-1,
    borderColor: '#e91e63',
    borderWidth: 4,
    backgroundColor: '#ff6090',
  },
});
