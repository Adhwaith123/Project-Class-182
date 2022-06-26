import * as React from 'react';
import react from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component{
    constructor(){
        super()
        this.state={
            hasCamerPermission:null,
            faces:[]
        }
    }
    componentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then()
        .then(this.onCameraPermissions)
    }
    onCameraPermissions(status){
        this.setState({hasCamerPermission:status.status==="granted"})


    }
    onFaceDetected=(faces)=>{
        this.setState({
            faces:faces
        })
    }
    onFaceDetectionError=(error)=>{
        console.log(error)
    }
    render(){
        const{hasCamerPermission}=this.state
        if(hasCamerPermission===null){
            return(<View></View>)
        }
        if(hasCamerPermission===false){
            return(<View style={styles.container}>
                <Text>No Access To Camera</Text>
            </View>)
        }
        console.log(this.state.faces)
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.deroidView}></SafeAreaView>
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>Frap</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                    style={{flex:1}}
                    type={Camera.Constants.Type.front}
                    faceDetectorSettings={{
                        mode:FaceDetector.Constants.mode.fast,
                        detectLandmarks:FaceDetector.Constants.Landmarks.all,
                        runClassifications:FaceDetector.Constants.classifications.all
                    }}
                    onFacesDetected={this.onFaceDetected()}
                    onFaceDetectionError={this.onFaceDetectionError()}>

                    </Camera>
                </View>
                <View style={styles.filterContainer}></View>
                <View style={styles.actionContainer}></View>
            </View>
        )

    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});