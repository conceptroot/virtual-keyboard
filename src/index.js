import { Key } from "./js/key"; 
import data from './js/layout.json'
window.onload = async () => {
    console.log(data)
    const keys = []
    for  (let key of data) {
        keys.push(new Key(key))
    }
    console.log('#keys:', keys)
    

}
