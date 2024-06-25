import React, {useState} from "react";
import { Text, TouchableOpacity,
    useWindowDimensions} from "react-native";
import { RootState } from "../config/redux/store";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import { showModal } from "../config/redux/apiSlice";
import List from "./list";


const Home = () => {
    const apiState = useAppSelector((state: RootState) => state.api);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const {width, height} = useWindowDimensions();
    return (
        <>
            <List/>
            <TouchableOpacity 
                style={{
                    position: 'absolute', 
                    bottom: 0, 
                    right: 10,
                    width: 60,
                    height: 60, 
                    borderRadius: 50,
                    borderWidth: 1
                }}
                onPress={() => dispatch(showModal(true))}
            >
                <Text style={{
                    margin: 'auto',
                    fontSize: 25
                }}>+</Text>
            </TouchableOpacity>
        </>
    )
};

export default Home;