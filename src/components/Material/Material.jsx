import React, { Component } from "react"

const EditMaterial = ({onClose, onEdit}) => {
    return <div>
        <button type="button" onClick={() => 
                        {onEdit(); 
                        onClose()
                        }}
                        >Edit
                        </button>
        <button type="button" onClick={onClose}>Close</button>
    </div>
}

export class Material extends Component {
    state = {
        isModalOpen: false,
    }

    openMoadl = () => {
        this.setState({ isModalOpen: true} )
    }
    closeModal = () => {
        this.setState({ isModalOpen: false})
    }
    render() {
        const { item, onDelete, onUpdate } = this.props
        return (
            <div>
                <p><b>Title</b>: {item.title}</p>
                    <p><b>Link:</b> {item.link}</p>
                    <button type="button" 
                            onClick={() => onDelete(item.id)}>
                        Delete
                    </button>
                    <button type='button'
                            onClick={this.openMoadl}
                            // onClick={() => onUpdate({...item, title: Date.now()})}
                    >Edit</button>
                    {this.state.isModalOpen && 
                    <EditMaterial 
                            onClose={this.closeModal}
                            onEdit={() => onUpdate({ id: item.id, title: Date.now()})}/>}
            </div>)
        }
    }
    