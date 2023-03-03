import { type FC } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  type GestureResponderEvent
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IProps {
  iconName: string
  text: string
  size?: number
  handleAction: ((event: GestureResponderEvent) => void) | undefined
}

export const IconButton: FC<IProps> = ({
  iconName,
  text,
  handleAction,
  size = 24
}) => (
  <TouchableOpacity onPress={handleAction}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name={iconName} size={size} />
      <Text style={{ fontSize: 16 }}>{text}</Text>
    </View>
  </TouchableOpacity>
)
