import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyC0mlScDx25Bdq-FvQUSyN_jgpE9ExJIds',
	authDomain: 'mybeta-f8e31.firebaseapp.com',
	databaseURL: 'https://mybeta-f8e31.firebaseio.com',
	projectId: 'mybeta-f8e31',
	storageBucket: 'mybeta-f8e31.appspot.com',
	messagingSenderId: '504838730603',
	appId: '1:504838730603:web:343e7e7540dd4bf06e122e',
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