import React, {useEffect, useState} from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity,
    ActivityIndicator, FlatList, Image, useWindowDimensions, 
    Modal} from "react-native";
import { getContact, objectContact, saveContactTemp, showModal } from "../config/redux/apiSlice";
import { RootState } from "../config/redux/store";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import http from "../config/http";
import Icon from "react-native-vector-icons/FontAwesome";
import Update from "./update";


const List = () => {
    const apiState = useAppSelector((state: RootState) => state.api);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const {width, height} = useWindowDimensions();

    const renderItem = ({item}: {item: objectContact}) => {
        return (
            <View style={{
                padding: 12,
                margin: 5,
                backgroundColor: '#FFFFFF',
                borderRadius: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    columnGap: 10
                }}>
                    <View style={{width: "20%"}}>
                        {
                            item.photo === 'N/A' ?
                            <Image
                                style={{
                                    flex: 1,
                                    width: 60,
                                    height: 80,
                                    borderRadius: 10
                                }}
                                resizeMode="contain"
                                source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'}}
                            /> :
                            <Image 
                                style={{
                                    flex: 1,
                                    width: 60,
                                    height: 80,
                                    borderRadius: 10
                                }}
                                resizeMode="contain"
                                source={{uri: item.photo}}
                            />
                        }
                    </View>
                    <View style={{width: "70%"}}>
                        <Text style={{fontSize: 18}}>
                            {item.firstName + ' ' + item.lastName}
                        </Text>
                        <Text style={{fontSize: 12}}>
                            Age {item.age}
                        </Text>
                        <TouchableOpacity
                            onPress={() => deleteContact(item)}
                            disabled={loading}
                        >
                            <Text style={{fontSize: 12, color: '#377ef2'}}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "10%"}}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(saveContactTemp({
                                    id: item.id,
                                    firstName: item.firstName,
                                    lastName: item.lastName,
                                    age: item.age.toString(),
                                    photo: item.photo
                                }));
                                dispatch(showModal(true));
                            }}
                        >
                            <Icon
                                name="pencil"
                                size={20}
                                color={"#377ef2"}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                
            </View>
        )
    }

    const getListContact = () => {
        http.get('contact').then((res: any) => {
            setLoading(false);
            setData(res.data.data);
            dispatch(getContact(res.data.data))
        }).catch((err) => {
            console.log("check error", err);
        })
    }

    const deleteContact = (item: objectContact) => {
        http.delete(`contact/${item.id}`).then((res: any) => {
            setLoading(true);
            getListContact();
        }).catch((err) => {
            console.log("check error", err);
        })
    }

    


    useEffect(() => {
        setLoading(true);
        getListContact();
    }, [])
    return (
        <SafeAreaView>
                <Modal
                    animationType="slide"
                    visible={apiState.showModal}
                >
                    <Update/>
                </Modal>
                <TextInput
                    placeholder="Cari Kontak"
                    style={{
                        padding: 12,
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                    }}
                />
                <View
                    style={{
                        backgroundColor: '#d7dbe6',
                        height: '100%',
                        padding: 10,
                        borderRadius: 20
                    }}
                >
                    {
                        loading ?
                        <ActivityIndicator/> :
                        <FlatList
                            data={apiState.contact}
                            renderItem={renderItem}
                            keyExtractor={(item: any) => item.id}
                        />
                    }
                </View>
                
        </SafeAreaView>
    )
};

export default List;