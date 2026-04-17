import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";


export default function Index() {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Text style={styles.text}>Z O N O</Text>
      </View>

      <View style={styles.bottom} />
      <View style={styles.centerLoginBox}>
        <View style={styles.loginBox}>
            <Text style={styles.loginText}>Welcome to ZONO, Log In!</Text>
          
            <TextInput 
              style={styles.input} 
              placeholder="USERNAME"
              placeholderTextColor="#c0c0c0"
            />

            <TextInput 
              style={styles.input} 
              placeholder="PASSWORD"
              placeholderTextColor="#c0c0c0"
            />


          <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
            <Image
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleText}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleText: {
    color: '#444',
    fontSize: 14,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
  },
  top: { // gray at top
    flex: 0.08, // 0.08/1 of the screen
    justifyContent: "flex-start", // vertical placement of Z O N O 
    alignItems: "center", // horizontal placement Z O N O
    backgroundColor: '#898989',
  },
  bottom: { // blue background
    flex: 0.92, // 0.92/1 of the screen
    backgroundColor: "#1fa3fc"
  },
  text: { // wording of  Z O N O
    fontSize: 50, 
      fontWeight: "bold", 
      fontFamily: "monospace",
      color: "#ffff",
  },
  centerLoginBox: { // keep white login box center
    position: "absolute",
    top: 50,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 10, // for layering, keeps everying in the login box in front
  },
  loginBox: { // white login box
    width: 450,
    height: 450,
    backgroundColor: "white",
    borderRadius: 30, // curveyness of white box
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { // "Welcome to ZONO, Log In !"
    fontSize: 28,
    fontWeight: "bold",
    color: "#898989",
    fontFamily: "monospace",
    textAlign: "center",
    width: "60%", // the width the words spread out,
    marginBottom: 20, // adds a litte more space under the welcomeWords
  },
  input: { // input boxes
    fontFamily: "monospace",
    height: 35,
    width: 250,
    margin: 20,
    borderWidth: 2,
    borderColor: "#898989",
  },
});