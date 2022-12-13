import React from "react";
import { Text } from "react-native";
import { Loading } from "../Loading";
import { Container } from "./styles";

interface ButtonProps {
    children: React.ReactNode;
    isLoading?: boolean;
    onPress: () => void;
}

export function Button({children, isLoading, ...rest}: ButtonProps) {
    return(
        <Container {...rest}>
            
            {isLoading ? <Loading /> : <Text style={{color:'white', fontSize:25}}>{children}</Text>}

        </Container>
    )
}