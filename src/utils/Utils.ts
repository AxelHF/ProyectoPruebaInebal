import AsyncStorage from '@react-native-community/async-storage';

interface AuthData {
  // Definir la estructura de authData aquí
}

const storeToken = async (authData: {}, nameIdentity: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(nameIdentity, JSON.stringify(authData));
  } catch (error) {
    // Manejo de errores aquí
  }
}

const getToken = async (authIdentity: string): Promise<any> => {
  try {
    const userData = await AsyncStorage.getItem(authIdentity);
    if (userData) {
      return JSON.parse(userData);
    }
    return {};
  } catch (error) {
    // Manejo de errores aquí
    return {};
  }
}

const mergeStorage = async (data: any, nameIdentity: string): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(nameIdentity, JSON.stringify(data));
  } catch (error) {
    // Manejo de errores aquí
  }
}

const removeStoragePropFromObject = async (nameObject: string, propertie: string): Promise<void> => {
  try {
    const obj:any = await getToken(nameObject);
    delete obj[propertie];
    await storeToken(obj, nameObject);
  } catch (error) {
    // Manejo de errores aquí
  }
}

const currentDate = (): string => {
  const today = new Date();
  let date:any = today.getDate();
  let month:any = today.getMonth() + 1;
  const year = today.getFullYear();

  if (date < 10) {
    date = '0' + date;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return year + '-' + month + '-' + date;
}

const tomorroDays = (days: number): Date => {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + days);
  return tomorrow;
}

const dateToYMD = (date: Date): string => {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const dateToYMDAddDay = (date: Date): string => {
  var d = date.getDate() + 1;
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const sumarDias = (fecha: Date, dias: number): Date => {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}

export {
  storeToken,
  getToken,
  mergeStorage,
  removeStoragePropFromObject,
  currentDate,
  tomorroDays,
  dateToYMD,
  sumarDias,
  dateToYMDAddDay
}