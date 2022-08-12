//App.js
/**
* @author Puseletso
*/

import React from "react";
import{
Stylesheet,
View,
Button,
Image,
ActivityIndicator,
Platform,
SafeAreaView,
Text,
}from"react-native";
import storage from'@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
export default class App extends React.Component{

state={
// placeholder image
imagePath: require("./img/default.jpg")
}

 <script>
   function onSubmit(token) {
     document.getElementById("demo-form").submit();
   }
 </script>

chooseFile=()=>{
var options={
title: 'Select Image',
storageOptions:{ 
skipBackup: true,// do not backup to iCloud
path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
},
};
ImagePicker.showImagePicker(options, response=>{
if (response.didCancel){
console.log('User cancelled image picker', storage());
}else if(response.error){
console.log('ImagePicker Error:', response.error);
}else if(response.customButton){
console.log('User tapped custom button:', response.customButton);
}else{
let path=this.getPlatformPath(response).value;
let fileName=this.getFileName(response.fileName, path);
this.setState({imagePath: path});
}
});
};

/**
* Get the file name and handle the invalid null case
*/
getFileName(name, path){
if(name!=null){return name;}

if(Platform.OS==="ios"){
path="~"+path.substring(path.indexOf("/Documents"));
}
returm path.split("/").pop();
}

/**
* Get platform specific value from response
*/
getPlatformPath({path, uri}){

return Platform.select({
android:{"value":path},
ios:{"value":uri}
})
}

/**
* Get platform specific Uri with the required format
*/
gerPlatformURI(imagePath){
let imgSource=imagePath;
if (isNaN(imagePath)){
imgSource={uri: this.state.imagePath};
if(Platform.OS=='android'){
imgSource.uri="file:///"+imgSource.uri;
}
}
return imgSource
}

render(){
let{imagePath}=this.state;
let imgSource=this.getPlatformURI(imagePath)
return(
<SafeAreaView style={styles.container}>
<View style={styles.imgContainer}>
<Image style={styles.uploadImage} source={imgSource}/>
<View style={styles.eightyWidthStyle}>

<Button title={'Upload Image'} onPress={this.chooFile}></Button>
</View>
</View>
</SafeAreaView>
)
}
}

const styles=Stylesheet.create({
container:{
flex:1,
width:'100%',
height:'100%',
backgroundColor:'#e6e6fa',
},
imgContainer:{
alignItems:'center',
justifyContent:'center',
position:'absolute',
width:'100%',
height:'100%',
},
eightyWidthStyle:{
width:'80%',
height:2,
},
uploadImage:{
width:'80%',
height:300,
),
});

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of vehicles from your database
async function getVehicles(db) {
  const vehiclesCol = collection(db, 'vehicles');
  const vehicleSnapshot = await getDocs(vehiclesCol);
  const vehicleList = vehicleSnapshot.docs.file(doc => doc.data());
  return vehicleList;
}
