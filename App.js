import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator} from 'react-native'
import colors from './colors'
import {AntDesign} from '@expo/vector-icons'
import ListaDeClases from './components/ListaDeClases'
import AgregarClaseScreen from './components/AgregarClaseScreen'
import Fire from './Fire'


export default class App extends React.Component {
	
	state = {
		addTodoVisible: false,
		lists: [],
		user: {},
		loading: true,
	}
	componentDidMount() {
		const firebase = new Fire((error, user) => {
			if (error) {
				return alert('Algo salió mal!')
			}
			firebase.getLists(lists => {
				this.setState({lists, user}, () => {
					this.setState({loading: false})
				})
			})
			this.setState({user: user})
		})
	}

	componentWillUnmount() {
		firebase.detach()
	}

	toggleAddTodoModal() {
		this.setState({addTodoVisible: !this.state.addTodoVisible})
	}
	renderList = list => {
		return <ListaDeClases list={list} updateList={this.updateList} />
	}
	addList = list => {
		firebase.addList({
			name: list.name,
			color: list.color,
			todos: [],
		})
	}
	updateList = list => {
		firebase.updateList(list)
	}

	render() {
		if (this.state.loading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={colors.blue}/>
				</View>
			)
		}

		return (
			<View style={{flex: 1, padding: 0, margin: 0}}>
				<View style={{height: 29, backgroundColor: colors.lightBlue}} />
				<View style={styles.container}>
					<Modal
						animationType="slide"
						visible={this.state.addTodoVisible}
						onRequestClose={() => this.toggleAddTodoModal()}
						presentationStyle="pageSheet"
					>
						<AgregarClaseScreen closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
					</Modal>

					<View>
						<Text>User: {this.state.user.uid}</Text>
					</View>

					<View style={{flexDirection: 'row'}}>
						<View style={styles.divider} />
						<Text style={styles.title}>
							Class <Text style={{fontWeight: '300', color: colors.blue}}>duties</Text>
						</Text>
						<View style={styles.divider} />
					</View>
					<View style={{marginTop: 48}}>
						<TouchableOpacity style={styles.addButton} onPress={() => this.toggleAddTodoModal()}>
							<AntDesign name="plus" size={24} color={colors.blue} />
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 48}}>
						<Text style={styles.addText}>Añadir clase</Text>
					</View>
					<View>
						<FlatList
							data={this.state.lists}
							keyExtractor={item => item.id.toString()}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							renderItem={({item}) => this.renderList(item)}
							keyboardShouldPersistTaps="always"
						/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		// justifyContent: 'center',
		marginTop: 40,
	},
	divider: {
		backgroundColor: colors.lightBlue,
		height: 1,
		flex: 1,
		alignSelf: 'center',
	},
	title: {
		fontSize: 38,
		fontWeight: 'bold',
		color: colors.black,
		paddingHorizontal: 64,
	},
	addButton: {
		borderWidth: 2,
		borderColor: colors.lightBlue,
		borderRadius: 4,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addText: {
		color: colors.blue,
		fontWeight: 'bold',
		fontSize: 14,
		marginTop: 8,
	},
})
