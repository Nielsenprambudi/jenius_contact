import React, {useEffect, useState} from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity,
    ActivityIndicator, FlatList, Image, useWindowDimensions, 
    Modal} from "react-native";
import { getContact, objectContact, showModal } from "../config/redux/apiSlice";
import { RootState } from "../config/redux/store";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";
import http from "../config/http";


const List = () => {
    const apiState = useAppSelector((state: RootState) => state.api);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("0");
    const [photo, setPhoto] = useState("");
    const [msg, setMsg] = useState('');
    const {width, height} = useWindowDimensions();

    const renderItem = ({item}: {item: objectContact}) => {
        return (
            <View style={{
                padding: 12,
                margin: 5,
                borderRadius: 5,
                borderWidth: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    columnGap: 5
                }}>
                    <View>
                        {
                            item.photo === 'N/A' ?
                            <Image
                                style={{
                                    flex: 1,
                                    width: 30,
                                }}
                                source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png'}}
                            /> :
                            <Image 
                                style={{
                                    flex: 1,
                                    width: 30,
                                }}
                                source={{uri: item.photo}}
                            />
                        }
                    </View>
                    <View>
                        <Text>
                            {item.firstName + ' ' + item.lastName}
                        </Text>
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

    const addContact = () => {
        setLoadingSubmit(true);
        http.post('contact', {
            firstName: firstName,
            lastName: lastName,
            age: parseInt(age),
            photo: photo === "" ? "N/A" : photo
        }).then((res: any) => {
            setLoadingSubmit(false);
            console.log("check res add contact", res);
        }).catch((err) => {
            console.log("check error add contact", err);
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
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 5,
                        paddingBottom: 5,
                        borderBottomWidth: 1,
                    }}>
                        <View style={{width: '90%'}}>
                            <Text style={{textAlign: 'center', margin: 10}}>
                                Tambah Kontak
                            </Text>    
                        </View>
                        <View style={{width: '10%'}}>
                            <TouchableOpacity
                                style={{margin: 10}} 
                                onPress={() => dispatch(showModal(false))}
                            >
                                <Text
                                    style={{textAlign: 'right'}}
                                >X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', rowGap: 5, margin: 5}}>
                        <View>
                            <Text>
                                First Name
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                value={firstName}
                                onChangeText={(val: string) => setFirstName(val)}
                                placeholder="Nama Depan"
                                style={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}                        
                            />
                        </View>
                        <View>
                            <Text>
                                Last Name
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                value={lastName}
                                onChangeText={(val: string) => setLastName(val)}
                                placeholder="Nama Belakang"
                                style={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}                        
                            />
                        </View>
                        <View>
                            <Text>
                                Umur
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                value={age}
                                onChangeText={(val: string) => setAge(val)}
                                keyboardType="number-pad"
                                placeholder="Umur"
                                style={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}                        
                            />
                        </View>
                        <View>
                            <Text>
                                Link Gambar
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                value={photo}
                                onChangeText={(val: string) => setPhoto(val)}
                                placeholder="Taruh link foto"
                                style={{
                                    padding: 5,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}                        
                            />
                        </View>
                        
                    </View>
                    <TouchableOpacity
                        style={{
                            margin: 5,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 8
                        }}
                        onPress={() => addContact()}
                        disabled={loadingSubmit}
                    >
                        {
                            loadingSubmit ?
                            <ActivityIndicator/> :
                            <Text>
                                Simpan Kontak
                            </Text>

                        }
                    </TouchableOpacity>
                    
                </Modal>
                <TextInput
                    placeholder="Cari Kontak"
                    style={{
                        padding: 12,
                        margin: 10,
                        borderRadius: 5,
                        borderWidth: 1,
                    }}
                />
                {
                    loading ?
                    <ActivityIndicator/> :
                    <FlatList
                        data={apiState.contact}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item.id}
                    />
                }
                
        </SafeAreaView>
    )
};

export default List;