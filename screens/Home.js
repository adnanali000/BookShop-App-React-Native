import React,{useState} from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image   
} from 'react-native';

import {SIZES,COLORS,FONTS,icons,images} from '../constants'

const Home = ()=>{

    const profileData = {
        name:'Adnan',
        point: 200
    }

    const [profile,setProfile] = useState(profileData);

    function renderHeader(profile) {
        return(
            <View style={{
                flex:1,
                flexDirection:'row',
                paddingHorizontal:SIZES.padding,
                alignItems:'center'
            }}>
                {/* greeting  */}
                <View style={{flex:1}}>
                    <View style={{marginRight:SIZES.padding}}>
                        <Text style={{...FONTS.h3,color:COLORS.white}}>Welcome</Text>
                        <Text style={{...FONTS.h2,color:COLORS.white}}>{profile.name}</Text>
                    </View>
                </View>

                {/*points  */}

                <TouchableOpacity style={{
                    height:40,
                    backgroundColor:COLORS.primary,
                    paddingLeft:3,
                    paddingRight:SIZES.radius,
                    borderRadius:20
                }}
                onPress={()=>alert("points")}
                >
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <View style={{height:30,width:30,alignItems:'center',justifyContent:'center',borderRadius:25,
                                    backgroundColor:'rgba(0,0,0,0.5)'}}>

                                        <Image 
                                            source={icons.plus_icon}
                                            resizeMode='contain'
                                            style={{
                                                width:20,
                                                height:20
                                            }}
                                        />
                        </View>
                        <Text style={{...FONTS.body3,color:COLORS.white,marginLeft:SIZES.base}}>{profile.point} points</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.black}}>
            <View style={{height:200}}>
                {renderHeader(profile)}
            </View>
        </SafeAreaView>
    )
}


export default Home;