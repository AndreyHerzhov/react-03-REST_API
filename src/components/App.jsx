import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";
import { MaterialEditorForm } from "./MaterialEditorForm/MaterialEditorForm";
import { Materials } from "./Materials/Materials";
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
  await API.deleteMaterial(id)
  this.setState(state => ({
    materials: state.materials.filter(material => material.id !== id)
  }))
}

  render() {
    const { materials, isLoading, error } = this.state
    return (
      <Layout>
        <GlobalStyle/>
        {error && <p>Ops. Try again</p>}
        <MaterialEditorForm onSubmit={this.addMaterial} />
        {isLoading 
        ? 'LOADING....' 
        : <Materials items={materials}
        onDelete={this.deleteMaterials}
        />}
        
      </Layout>
    )
  }
}
   
