import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { useAppDispatch } from "../config/redux/hooks";
import { showModal } from "../config/redux/apiSlice";
import List from "./list";


const Home = () => {
    const dispatch = useAppDispatch();
    return (
        <>
            <List/>
            <TouchableOpacity 
                style={{
                    position: 'absolute', 
                    bottom: 5, 
                    right: 10,
                    width: 60,
                    height: 60, 
                    borderRadius: 50,
                    backgroundColor: '#377ef2'
                }}
                onPress={() => dispatch(showModal(true))}
            >
                <Text style={{
                    margin: 'auto',
                    fontSize: 25,
                    color: 'white'
                }}>+</Text>
            </TouchableOpacity>
        </>
    )
};

export default Home;