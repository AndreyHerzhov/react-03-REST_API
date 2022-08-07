import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";
import { MaterialEditorForm } from "./MaterialEditorForm/MaterialEditorForm";
import { MaterialsList } from "./MaterialsList/MaterialsList";
import  * as API from '../services/api.js'


export class App extends Component {
  state = {
    materials: [],
    isLoading: false,
    error: null
}

async componentDidMount() {
 try {
  this.setState({isLoading: true})
  const materials = await API.getMaterials()
  this.setState({ materials, isLoading: false })
 } catch (error) {
  this.setState({error: true, isLoading: false})
  // console.log(error)
 }
}

 addMaterial = async (values) => {
  try {
    this.setState({isLoading: true})
  const material = await API.addMaterial(values)
  this.setState(state => ({
    materials: [...state.materials,material],
    isLoading: false
  }))
  } catch (error) {
    this.setState({error: true, isLoading: false})
    console.log(error)
  }
  
}

deleteMaterials = async(id) => {
  try {
    await API.deleteMaterial(id)
    this.setState(state => ({
    materials: state.materials.filter(material => material.id !== id)
  }))
  } catch (error) {
    this.setState({error: true})
    console.log(error)
  }
}

updateMaterial = async fields => {
  try {
      const updatedMaterial = await API.updateMaterial(fields)
      this.setState(state => ({
      materials: state.materials.map(material => material.id === fields.id
      ? updatedMaterial
      : material )
  }))
  } catch (error) {
    this.setState({error: true})
    console.log(error)
  }
}

  render() {
    const { materials, isLoading, error } = this.state
    return (
      <Layout>
        <GlobalStyle/>
        <button onClick={this.updateMaterial}>Click</button>
        {error && <p>Ops. Try again</p>}
        <MaterialEditorForm onSubmit={this.addMaterial} />
        {isLoading 
        ? 'LOADING....' 
        : <MaterialsList 
            items={materials}
            onDelete={this.deleteMaterials}
            onUpdate={this.updateMaterial}
        />}
        
      </Layout>
    )
  }
}
   
