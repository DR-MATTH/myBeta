import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAbpVbzud0WP7THataX2R7HW961WjV3nQ4",
  authDomain: "clubhouse-8e965.firebaseapp.com",
  projectId: "clubhouse-8e965",
  storageBucket: "clubhouse-8e965.appspot.com",
  messagingSenderId: "227240151453",
  appId: "1:227240151453:web:091d2df0137d326aae4774"
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