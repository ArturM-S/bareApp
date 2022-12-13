import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect, useRef} from "react";
import { View, Text, Modal, Image } from "react-native";
import { Button } from "../../components/Button";
import { Container } from "./styles";
import { Camera, CameraType } from "expo-camera";
import {FontAwesome} from '@expo/vector-icons';

export function Dashboard() {
    const camRef = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [hasPermission, setHasPermission] = useState(null);
    const navigation = useNavigation();
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function handlePress() {
        navigation.navigate('Home');
    }

    async function takePicture() {
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
            console.log(data);
        }
    }

    return (
        <Container>
            <Text>Dashboard</Text>
            <Camera style={{ flex: 1 }} type={type} ref={camRef}>
                <View style={{flex:1, backgroundColor:'transparent', flexDirection: 'row', alignItems:'center', justifyContent:'center'}}>
                    <Button onPress={() => {
                        setType(
                            type === CameraType.back
                            ? CameraType.front
                            : CameraType.back
                        );
                    }} children='Flip'/>
                </View>
            </Camera>
            <Button children='tirar foto' onPress={takePicture}/>
            <Button onPress={handlePress} children='Home' />
            {
                capturedPhoto && (
                    <Modal animationType='slide' transparent={false} visible={open}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', margin:20}}>
                            <Button children='Fechar' onPress={() => setOpen(false)}/>
                            <Image style={{width:'100%', height:300, borderRadius:20}} source={{uri: capturedPhoto}}/>
                        </View>
                    </Modal>
                )
            }
        </Container>
    )
}