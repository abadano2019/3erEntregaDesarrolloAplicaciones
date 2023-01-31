import { Button, View } from 'react-native';

import { TaskList } from '../../components';
import { colors } from '../../constants/themes/colors.js';
import { styles } from './styles';
import { useState } from 'react'

const Records = ({onHandleReturn,tasks}) => {

  //const [contador, setContador] = useState(0);


  return (
    <View style={styles.container}>
      
      <TaskList 
        tasks={tasks}
      />
      <Button title="Volver" onPress={onHandleReturn} color={colors.primary} />
    </View>
  );
}

export default Records;