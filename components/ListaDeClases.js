import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native'
import colors from '../colors'
import Tareas from './Tareas'

export default class ListaDeClases extends React.Component {

  state = {
    showListVisible: false
  }
  toggleListModal() {
    this.setState({showListVisible: !this.state.showListVisible})
  }
  render() {
    const list = this.props.list

    const total = list.todos.length
    const completados = list.todos.filter(todo => todo.completed).length
    const faltan = total - completados
  
    return (
			<View>
				<Modal
					animationType="slide"
					visible={this.state.showListVisible}
					presentationStyle="fullScreen"
					onRequestClose={() => this.toggleListModal()}
				>
					<Tareas list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList} />
				</Modal>
				<TouchableOpacity
					style={[styles.listContainer, {backgroundColor: list.color}]}
					onPress={() => this.toggleListModal()}
					onLongPress={() => console.log('Hey!')}
				>
					<Text style={styles.listTitle} numberOfLines={1}>
						{list.name}
					</Text>
					<View>
						<Text style={styles.count}>{completados}</Text>
						<Text style={styles.subTitle}>Completadas</Text>
					</View>
					<View>
						<Text style={styles.count}>{faltan}</Text>
						<Text style={styles.subTitle}>Faltan</Text>
					</View>

					{/* <View style={{flexDirection: 'row'}}>
						<View>
							<Text style={styles.count}>{forman}</Text>
							<Text style={styles.subTitle}>Forman</Text>
						</View>
						<View>
							<Text style={styles.count}>{faltan}</Text>
							<Text style={styles.subTitle}>Faltan</Text>
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View>
							<Text style={styles.count}>{guardia}</Text>
							<Text style={styles.subTitle}>Guardia</Text>
						</View>
						<View>
							<Text style={styles.count}>{permisos}</Text>
							<Text style={styles.subTitle}>Permisos</Text>
						</View>
					</View>
					<View>
						<Text style={styles.count}>{total}</Text>
						<Text style={styles.subTitle}>Total</Text>
					</View> */}
				</TouchableOpacity>
			</View>
		)
  }
}

const styles = StyleSheet.create({
	listContainer: {
		paddingVertical: 32,
		paddingHorizontal: 16,
		borderRadius: 6,
		marginHorizontal: 12,
		alignItems: 'center',
		width: 200,
	},
	listTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.white,
		marginBottom: 18,
	},
	count: {
		fontSize: 48,
		fontWeight: 'bold',
		color: colors.white,
		paddingHorizontal: 15,
		alignSelf: 'center',
	},
	subTitle: {
		fontSize: 12,
		fontWeight: 'bold',
		color: colors.white,
		paddingHorizontal: 5,
		alignSelf: 'center',
	},
})