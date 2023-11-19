import React from 'react'
import { View, Text, Image } from 'react-native'

import {styles, btnImg} from './screenheader.style'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }: { iconUrl: any, dimension?: any, handlePress?: any }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} style={btnImg(dimension)} resizeMode='cover'/>
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn