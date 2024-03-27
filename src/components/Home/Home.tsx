import React, { FC, useState } from 'react';
import { HomeWrapper } from './Home.styled';
import { Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';
import instance from '../../utils/instance';
import { FAB, ListItem, Icon, Switch } from "@rneui/themed";

interface HomeProps {}

const Home: FC<HomeProps> = (props) => {
  const [amie, setAmie] = useState('');
  const [institution, setInstitution] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await instance.get(`wssest/amie/${amie}?param1=PRUEBA&param2=ineval2024`);
      const data = response.data;
      if (data.length > 0) {
        setInstitution(data[0]);
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAmieChange = (value: string) => {
    setAmie(value);
  };

  return (
    <HomeWrapper data-testid="Home">
      <Text>Buscar por AMIE:</Text>
      <TextInput
        placeholder="Ingrese el AMIE"
        onChangeText={handleAmieChange}
        value={amie}
      />
      <Button
        title="Buscar"
        onPress={fetchData}
      />
      {institution.id && (
        <View
         style={{
            marginHorizontal: "auto",
            width: '100%',
            justifyContent:'space-between',
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          <Text
            style={{
               width:'100%',
               fontWeight:'bold'
            }}
          >Datos Institución</Text>
          <Text
            style={{
               width:'50%',
               fontWeight:'bold'
            }}
          >AMIE: &nbsp;
            <Text
            style={{
               fontWeight:'normal'
            }}>
               {institution.amie}
            </Text>
          </Text>
          <Text
            style={{
               width:'50%',
               fontWeight:'bold'
            }}
            >Nombre: &nbsp;
               <Text
               style={{
                  fontWeight:'normal'
               }}>
                  {institution.nm_inst}
               </Text>
            </Text>
          <Text
            style={{
               width:'50%',
               fontWeight:'bold'
            }}
            >Provincia: &nbsp;
               <Text
               style={{
                  fontWeight:'normal'
               }}>
                  {institution.nm_prov}
               </Text>
            </Text>
        </View>
      )}
      <Text
         style={{
               fontWeight:'bold'
         }}
      >Estudiantes:</Text>
      {students.map((student, index) => (
        <ListItem key={index} bottomDivider topDivider>
          <Icon name='person' />
          <ListItem.Content>
            <ListItem.Title>Código: {student.codigo}</ListItem.Title>
            <ListItem.Subtitle>IMAT: {student.imat}</ListItem.Subtitle>
            <ListItem.Subtitle>ILYL: {student.ilyl}</ListItem.Subtitle>
            <ListItem.Subtitle>ICN: {student.icn}</ListItem.Subtitle>
            <ListItem.Subtitle>IES: {student.ies}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </HomeWrapper>
  );
};

export default Home;
