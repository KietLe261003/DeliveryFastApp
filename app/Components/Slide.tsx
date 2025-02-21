import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import Loading from './Loading';

const { width } = Dimensions.get('window');

const SlideShow = () => {
    const [images, setImages] = useState([1]);
    const [isLoading, setIsLoading] = useState(false);
    if (images.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* {isLoading ? (
                <Loading />
            ) : ( */}
                <Carousel
                    width={width}
                    height={275}
                    data={images}
                    autoPlay
                    autoPlayInterval={5000} // Auto-scroll every 5 seconds
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <Image source={{ uri: `https://tse4.mm.bing.net/th?id=OIP.0XUjdfdhEBAK26aUkBJYUwHaEK&pid=Api&P=0&h=180` }} style={styles.image} resizeMode="cover" />
                        </View>
                    )}
                    pagingEnabled
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                />
            {/* )} */}
        </View>
    );
};

export default SlideShow;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 275,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        padding: 10,
    },
    slide: {
        width: width ,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
