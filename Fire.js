import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAcyZaql0nnrOeDGhw_kWSX9s9pZ7iUe6s",
  authDomain: "mybeta-60ec0.firebaseapp.com",
  databaseURL: "https://mybeta-60ec0.firebaseio.com",
  projectId: "mybeta-60ec0",
  storageBucket: "mybeta-60ec0.appspot.com",
  messagingSenderId: "406131745425",
  appId: "1:406131745425:web:cf712a41b8064f69ef1530",
  measurementId: "G-8Q92GBYX8B"
}
class Fire {
  constructor(callback) {
    this.init(callback)
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user)
      } else {
        firebase.auth().signInAnonymously().catch(error => {
          callback(error)
        })
      }
    })
  }
  getLists(callback) {
    let ref = this.ref.orderBy('name')
    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = []
      snapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()})
      })
      callback(lists)
    })
  }
  addList(list) {
    let ref = this.ref
    ref.add(list)
  }
  updateList(list) {
    let ref = this.ref
    ref.doc(list.id).update(list)
  }

  get userId() {
    return firebase.auth().currentUser.uid
  }
  get ref() {
    return firebase.firestore().collection('users').doc(this.userId).collection('lists')
  }
  detach() {
    this.unsubscribe()
  }
}
  
export default Fire