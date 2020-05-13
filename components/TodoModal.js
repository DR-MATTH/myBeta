import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	TextInput,
	Keyboard,
	Animated
} from 'react-native'
import colors from '../colors'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import { Platform } from 'react-native'
import {Swipeable} from 'react-native-gesture-handler'

export default class TodoModal extends React.Component {
	state = {
		newTodo: '',
	}
	toggleTodoCompleted = index => {
		let list = this.props.list
		list.todos[index].completed = !list.todos[index].completed
		this.props.updateList(list)
	}
	renderTodo = (todo, index) => {
		return (
			<Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
				<View style={{flexDirection: 'column'}}>
				<View style={styles.todoContainer}>
					<TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
						<Ionicons
							name={todo.completed ? 'ios-square' : 'ios-square-outline'}
							size={32}
							color={colors.grey}
							style={{width: 32}}
						/>
					</TouchableOpacity>
					<Text
						style={{
							marginTop: 5,
							textDecorationLine: todo.completed ? 'line-through' : 'none',
							color: todo.completed ? colors.grey : colors.black,
						}}
					>
						{todo.title}
					</Text>
				</View>
				<View style={{backgroundColor: this.state.color, height: 1}} />
			</View>
			</Swipeable>
		)
	}
	deleteTodo = index => {
		let list = this.props.list
		list.todos.splice(index, 1)
		this.props.updateList(list)
	}
	rightActions = (dragX, index) => {
		return (
			<TouchableOpacity onPress={() => this.deleteTodo(index)}>
				<Animated.View style={styles.deleteButton}>
					<Animated.Text style={{color: colors.white, fontWeight: 'bold'}}>Delete</Animated.Text>
				</Animated.View>
			</TouchableOpacity>
		)
	}
	addTodo = () => {
		let list = this.props.list
		if (!list.todos.some(todo => todo.title === this.state.newTodo) && this.state.newTodo !== '') {
			list.todos.push({title: this.state.newTodo, completed: false})
			this.props.updateList(list)
		}
		
		this.setState({newTodo: ''})
		Keyboard.dismiss()
		
	}

	render() {
		const list = this.props.list
		const taskCount = list.todos.length
		const completedCount = list.todos.filter(todo => todo.completed).length
		return (
			// <KeyboardAvoidingView style={{flex: 1}} behavior='height'>
      <View style={styles.container}>
        <TouchableOpacity
          style={[{position: 'absolute', zIndex: 10},
          Platform.OS === 'ios' ? {top: 20, right: 20} : {top: 10, right: 10}]}
          onPress={this.props.closeModal}
        >
        <AntDesign name="close" size={48} color={colors.black} />
        </TouchableOpacity>

        <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={list.todos}
            renderItem={({item, index}) => this.renderTodo(item, index)}
            // keyExtractor={(_, index) => index.toString()}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="always"
          />
        </View>
        <KeyboardAvoidingView style={[styles.section, styles.footer]} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TextInput style={[styles.input, {borderColor: list.color}]}
						onChangeText={text => this.setState({newTodo: text})}
						value={this.state.newTodo}/>
          <TouchableOpacity style={[styles.addTodo, {backgroundColor: list.color}]}
						onPress={() => this.addTodo()}>
            <AntDesign name="plus" size={30} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		flex: 1,
		alignSelf: 'stretch',
	},
	header: {
		justifyContent: 'flex-end', //center
		marginLeft: 64,
		borderBottomWidth: 3,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: colors.black,
	},
	taskCount: {
		marginTop: 4,
		marginBottom: 16,
		color: colors.grey,
		fontWeight: '600',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: colors.black,
	},
	footer: {
		paddingHorizontal: 32,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		height: 48,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 6,
		marginRight: 8,
		paddingHorizontal: 8,
	},
	addTodo: {
		borderRadius: 4,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	todoContainer: {
		paddingVertical: 16,
		flexDirection: 'row',
	},
	deleteButton: {
		backgroundColor: colors.red,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		height: 40,
	},
})
