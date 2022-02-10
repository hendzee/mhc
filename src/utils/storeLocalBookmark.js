import AsyncStorage from "@react-native-async-storage/async-storage";

// Store data bookmark to local
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@data_bookmark', value.toString())
    } catch (e) {
        // Handling error
    }
}

export default storeData;