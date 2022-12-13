import React from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Container } from "./styles";

export function Home() {
    const navigation = useNavigation();
    function handlePress() {
        navigation.navigate('Dashboard');
    }
    return (
        <Container>
            <Text>Mapa</Text>
            <Button onPress={handlePress} children='Dash'/>
          
        </Container>
    )
}