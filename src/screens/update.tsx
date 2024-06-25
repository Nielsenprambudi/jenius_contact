import React, {useEffect, useState} from "react";
import { View, Text, TextInput, SafeAreaView, TouchableOpacity,
    ActivityIndicator, FlatList, Image, useWindowDimensions, 
    Modal} from "react-native";
import http from "../config/http";
import Icon from "react-native-vector-icons/FontAwesome";
import { showModal, delContactTemp, getContact } from "../config/redux/apiSlice";
import { RootState } from "../config/redux/store";
import { useAppDispatch, useAppSelector } from "../config/redux/hooks";

const Update = () => {
    const apiState = useAppSelector((state: RootState) => state.api);
    const dispatch = useAppDispatch();
    const [firstName, setFirstName] = useState(apiState.tempContact?.firstName);
    const [lastName, setLastName] = useState(apiState.tempContact?.lastName);
    const [age, setAge] = useState(apiState.tempContact?.age);
    const [photo, setPhoto] = useState(apiState.tempContact?.photo);
    const [msg, setMsg] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const addContact = () => {
        setLoadingSubmit(true);
        http.post('contact', {
            firstName: firstName,
            lastName: lastName,
            age: age && parseInt(age),
            photo: photo === "" ? "N/A" : photo
        }).then((res: any) => {
            setLoadingSubmit(false);
            getListContact();
            console.log("check res add contact", res);
        }).catch((err) => {
            setLoadingSubmit(false);
            console.log("check error add contact", err);
        })
    }

    const updateContact = () => {
        setLoadingSubmit(true);
        http.put(`contact/${apiState.tempContact?.id}`, {
            firstName: firstName,
            lastName: lastName,
            age: age && parseInt(age),
            photo: photo === "" ? "N/A" : photo
        }).then((res: any) => {
            setLoadingSubmit(false);
            getListContact();
        }).catch((err) => {
            setLoadingSubmit(false);
            console.log("check error update contact", err.response);
        })
    }

    const getListContact = () => {
        http.get('contact').then((res: any) => {
            dispatch(getContact(res.data.data))
        }).catch((err) => {
            console.log("check error", err);
        })
    }


    return (
        <View>
            <View style={{
                flexDirection: 'row',
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <View style={{width: '90%'}}>
                    <Text style={{textAlign: 'center', margin: 10}}>
                        Tambah Kontak
                    </Text>    
                </View>
                <View style={{width: '10%'}}>
                    <TouchableOpacity
                        style={{margin: 10}} 
                        onPress={() => {
                            dispatch(delContactTemp());
                            dispatch(showModal(false))
                        }}
                    >
                        <Text
                            style={{textAlign: 'right'}}
                        >X</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    backgroundColor: '#d7dbe6',
                    height: '100%',
                    padding: 10,
                    borderRadius: 20
                }}
            >

                <View style={{
                    flexDirection: 'column', 
                    rowGap: 5, 
                    margin: 2,
                    padding: 15, 
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF'
                }}>
                    <View>
                        <Text>
                            First Name
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            value={firstName}
                            onChangeText={(val: string) => setFirstName(val)}
                            placeholder="Tulis Nama Depan"
                            style={{
                                padding: 5,
                                borderBottomWidth: 1,
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
                            placeholder="Tulis Nama Belakang"
                            style={{
                                padding: 5,
                                borderBottomWidth: 1,
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
                            placeholder="Isi Umur"
                            style={{
                                padding: 5,
                                borderBottomWidth: 1,
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
                                borderBottomWidth: 1,
                                borderRadius: 5,
                            }}                        
                        />
                    </View>
                    
                </View>
                <TouchableOpacity
                    style={{
                        margin: 10,
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 8,
                        backgroundColor: '#377ef2'
                    }}
                    onPress={() => {
                        apiState.tempContact?.id === "" ?
                        addContact() : updateContact()
                    }}
                    disabled={loadingSubmit}
                >
                    {
                        loadingSubmit ?
                        <ActivityIndicator color={"#FFFFFF"}/> :
                        <Text
                            style={{textAlign: 'center', color: '#ffffff', fontSize: 18}}
                        >
                            {
                                apiState.tempContact?.id === "" ?
                                "Simpan Kontak" : "Ubah Kontak"
                            }
                            
                        </Text>

                    }
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Update;