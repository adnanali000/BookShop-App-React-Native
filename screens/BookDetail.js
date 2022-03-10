import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';

import { SIZES, COLORS, FONTS, icons, images, dummyData } from '../constants'

const LineDivider = () => {
    return (
        <View style={{ width: 1, paddingVertical: 5 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const BookDetail = ({ route, navigation }) => {

    const [book, setBook] = useState(null);
    const [scrollViewHeight, setScrollViewHeight] = useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

    const indicator = new Animated.Value(0);

    useEffect(() => {
        let { book } = route.params;
        setBook(book);
    }, [book])

    function renderBookInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode='cover'
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                />
                {/* color overlay  */}
                <View style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: book.backgroundColor
                }}>

                </View>

                {/* navigation header  */}
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.radius,
                    height: 80,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode='contain'
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: book.navTintColor
                            }}
                        />

                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: book.navTintColor }}>Book Detail</Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginRight: SIZES.base }}
                        onPress={() => alert('more')}
                    >
                        <Image
                            source={icons.more_icon}
                            resizeMode='contain'
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: book.navTintColor,
                                alignSelf: 'flex-end'
                            }}
                        />

                    </TouchableOpacity>
                </View>

                {/* book cover  */}
                <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: 'center' }}>
                    <Image
                        source={book.bookCover}
                        resizeMode='contain'
                        style={{
                            flex: 1,
                            height: 'auto',
                            width: 150
                        }}
                    />
                </View>

                {/* book and author name  */}
                <View style={{ flex: 1.8, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: book.navTintColor, ...FONTS.h2 }}>{book.bookName}</Text>
                    <Text style={{ color: book.navTintColor, ...FONTS.h3 }}>{book.author}</Text>
                </View>

                {/* book info  */}
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    borderRadius: SIZES.radius,
                    margin: SIZES.padding,
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}>

                    {/* rating  */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.rating}</Text>
                        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Rating</Text>
                    </View>

                    <LineDivider />

                    {/* language  */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.language}</Text>
                        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Language</Text>
                    </View>

                    <LineDivider />
                    {/* pages  */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{book.pageNo}</Text>
                        <Text style={{ ...FONTS.h4, color: COLORS.white }}>Pages</Text>
                    </View>

                </View>

            </View>
        )
    }

    function BookDescription() {
        const indicatorSize = scrollViewHeight > scrollViewVisibleHeight ? 
                              scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewHeight :
                              scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;
        return (
            <View style={{flex:1,flexDirection:'row',padding:SIZES.padding}}>
                    {/* scroll bar  */}
                    <View style={{
                        height:'100%',
                        width:4,
                        backgroundColor:COLORS.gray1
                    }}>
                        <Animated.View 
                            style={{
                                width:4,
                                height:indicatorSize,
                                backgroundColor:COLORS.lightGray4,
                                transform:[{
                                    translateY: Animated.multiply(indicator,
                                    scrollViewVisibleHeight / scrollViewHeight).interpolate({
                                        inputRange:[0,difference],
                                        outputRange: [0,difference],
                                        extrapolate:'clamp'
                                    })
                                }]
                            }}
                        />

                    </View>

                    {/* description  */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width,height)=>{
                        setScrollViewHeight(height)
                    }}
                    onLayout = {({nativeEvent: {layout: {x,y,width,height}}})=>{
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll = {Animated.event(
                        [{nativeEvent: {contentOffset:{y:indicator}}}],
                        {useNativeDriver:false}

                    )}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2, marginBottom: SIZES.padding }}>Description</Text>
                    <Text style={{ color: COLORS.lightGray, ...FONTS.body2 }}>{book.description}</Text>
                </ScrollView>
            </View>
        )
    }

    if (book) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* book cover  */}
                <View style={{ flex: 4 }}>
                    {renderBookInfoSection()}
                </View>

                {/* description  */}
                <View style={{ flex: 2 }}>
                    {BookDescription()}
                </View>

                {/* buttons  */}
                <View style={{ height: 70 }}>

                </View>
            </View>
        )
    } else {
        return (<></>)
    }
}


export default BookDetail;